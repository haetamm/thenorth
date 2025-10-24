import { useEffect } from "react";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import useUserStore from "@/store/user";
import SideBarUser from "../../components/layout/SideBarUser";
import useThreadStore from "@/store/thread";
import ArticleComp from "@/components/home/ArticleComp";
import ArticleSkeleton from "@/components/layout/ArticleSkeleton";
import Pagination from "@/components/layout/Pagination";

const HomePage = () => {
  const { token } = useUserStore();
  const {
    loading,
    threads,
    fetchThread,
    setCurrentPage,
    currentPage,
    totalPages,
  } = useThreadStore();

  const router = useRouter();
  const page = Number(router.query.page) || 1;

  useEffect(() => {
    setCurrentPage(page);
    fetchThread(page);
  }, [fetchThread, page, setCurrentPage]);

  return (
    <Layout siteTitle="Home | The North" siteDescription="Some description">
      <div className="flex w-full justify-center">
        <SideBarUser />
        <div className="flex-1 bg-gray-50 min-h-screen pb-24 xs:pb-8">
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${token ? 'py-8 md:py-0 md:-mt-[27px]' : 'py-8'}`}>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Latest Posts
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Temukan diskusi terbaru dan bagikan pemikiranmu
              </p>
            </div>
            
            {loading ? (
              <ArticleSkeleton />
            ) : (
              <>
                {threads && threads.length > 0 ? (
                  <ArticleComp threads={threads} />
                ) : (
                  <div className="text-center py-16">
                    <div className="text-gray-500 text-lg mb-4">
                      Belum ada post
                    </div>
                    <p className="text-gray-400">
                      Jadilah yang pertama memulai diskusi!
                    </p>
                  </div>
                )}
              </>
            )}
            
            {threads && threads.length > 0 && !loading && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;