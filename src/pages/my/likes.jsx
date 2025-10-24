import React from "react";
import { useEffect } from "react";
import Layout from "../../components/layout/index";
import ArticleComp from "../../components/home/ArticleComp";
import SideBarUser from "../../components/layout/SideBarUser";
import useThreadStore from "@/store/thread";
import Pagination from "@/components/layout/Pagination";
import { useRouter } from "next/router";
import NavThreadPage from "@/components/thread/NavThreadPage";
import ArticleSkeleton from "@/components/layout/ArticleSkeleton";
import { FaHeart, FaSearch, FaPlus } from "react-icons/fa";

const MyLikeThreadPage = () => {
  const {
    loading,
    myLikes,
    fetchMyLikes,
    setCurrentPage,
    currentPage,
    totalPages,
  } = useThreadStore();
  const siteTitle = "Threads Yang Disukai | The North";
  const siteDescription = "Lihat thread-thread yang telah Anda sukai";

  const router = useRouter();
  const page = Number(router.query.page) || 1;
  useEffect(() => {
    setCurrentPage(page);
    fetchMyLikes(page);
  }, [fetchMyLikes, page, setCurrentPage]);

  return (
    <Layout siteTitle={siteTitle} siteDescription={siteDescription}>
      <div className="flex w-full min-h-[calc(100vh-56px)]">
        <SideBarUser />
        <div className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-24 xs:pb-8 py-8 md:py-0">
          <div className="mb-6">
            <NavThreadPage />
          </div>
          
          <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
            <div className="mb-8 text-center border-b border-gray-100 pb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
                <FaHeart className="text-red-500" />
                Threads Yang Disukai
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Kumpulan thread yang sudah kamu like
              </p>
            </div>

            <div className="w-full">
              {loading ? (
                <ArticleSkeleton />
              ) : (
                <>
                  {myLikes && myLikes.length > 0 ? (
                    <ArticleComp threads={myLikes} />
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                        <FaHeart className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                        Belum ada thread yang disukai
                      </h3>
                      <p className="text-gray-500 mb-6 text-sm md:text-base">
                        Like thread yang menarik untuk menyimpannya di sini
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button 
                          onClick={() => router.push('/home')}
                          className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
                        >
                          <FaSearch className="w-4 h-4" />
                          Jelajahi Thread
                        </button>
                        <button 
                          onClick={() => router.push('/create')}
                          className="border border-gray-300 hover:border-red-300 text-gray-700 hover:text-red-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
                        >
                          <FaPlus className="w-4 h-4" />
                          Buat Thread
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            
            {myLikes && myLikes.length > 0 && !loading && (
              <div className="mt-8 pt-6 border-t border-gray-100">
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

export default MyLikeThreadPage;