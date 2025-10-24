import { useEffect, useRef } from "react";

import Layout from "../../components/layout";
import { getOverview } from "../../../utils/articleHelper";
import ReactHtmlParser from "html-react-parser";
import { useRouter } from "next/router";
import SideBarUser from "../../components/layout/SideBarUser";
import useUserStore from "@/store/user";
import useThreadStore from "@/store/thread";
import ArticleDetail from "@/components/home/ArticleDetail";

const DetailPage = () => {
  const { token } = useUserStore();
  const { thread, getThreadBySlug, resetThread } = useThreadStore();
  const targetRef = useRef(null);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    getThreadBySlug(slug);

    return () => {
      resetThread();
    };
  }, [slug, getThreadBySlug, resetThread]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = () => {
    targetRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const siteTitle = thread
    ? `${getOverview(thread.title)} | The North`
    : "Loading";

  const siteDescription = thread
    ? ReactHtmlParser(getOverview(thread?.body))
    : "Loading";

  return (
    <Layout siteTitle={siteTitle} siteDescription={siteDescription}>
      <div
        className={`${
          !token ? "mt-6" : "mt-6 md:mt-[-30px]"
        } flex w-full justify-center gap-0 md:px-0`}
      >
        <SideBarUser />

        <div className=" px-4 flex w-full min-h-screen max-w-full flex-col mx-auto pb-16">
          <main className="pt-8 md:pt-0 pb-16 lg:pb-24">
            <ArticleDetail
              scrollToSection={scrollToSection}
              targetRef={targetRef}
            />
            <button
              onClick={scrollToTop}
              className="hidden xs:block fixed z-90 bottom-8 right-8 border-0 w-10 h-10 rounded-full drop-shadow-md bg-black text-white text-3xl font-bold"
            >
              &uarr;
            </button>
          </main>
        </div>
      </div>
    </Layout>
  );
};


export default DetailPage;
