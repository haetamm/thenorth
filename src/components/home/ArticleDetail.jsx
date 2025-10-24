import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillSetting } from "react-icons/ai";
import { BsFillChatTextFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { formatDate } from "../../../utils/articleHelper";
import { useRouter } from "next/router";
import useUserStore from "@/store/user";
import ReactHtmlParser from "html-react-parser";
import { useModalStore } from "@/store/modal";
import FormCommentComp from "../thread/FormCommentComp";
import useThreadStore from "@/store/thread";
import Loader from "../layout/Loader";
import NotFoundComp from "../thread/NotFoundComp";
import ButtonLike from "../layout/ButtonLike";

const ArticleDetail = ({ scrollToSection, targetRef }) => {
  const { thread, loading, comments } = useThreadStore();

  const { token, username } = useUserStore();
  const { openModalDeleteThread } = useModalStore();
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  if (loading || !thread) {
    return (
      <div className="w-full mt-10">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {thread ? (
        <article className="mx-auto w-full max-w-2xl  format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
            <address className="flex items-center justify-between mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <Image
                  priority
                  src="/image/noimage.png"
                  className="mr-4 w-16 h-16 rounded-full"
                  height={60}
                  width={60}
                  alt="dafault"
                />
                <div>
                  <a
                    href="#"
                    rel="author"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {thread.user?.username}
                  </a>
                  <p className="text-base font-light text-gray-500 dark:text-gray-400">
                    CEO Flowbite
                  </p>
                  <p className="text-base font-light text-gray-500 dark:text-gray-400">
                    <small>{formatDate(thread.updated_at)}</small>
                  </p>
                </div>
              </div>
              <BsFillArrowLeftCircleFill
                onClick={handleGoBack}
                className="h-12 w-12 cursor-pointer"
              />
            </address>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {thread.title}
            </h1>
          </header>

          <hr className="border-gray-300" />
          <div className="flex items-center justify-between px-4 py-6">
            <span className="text-md font-medium text-blue-600 uppercase">
              Web Programming
            </span>

            <div className="flex items-center">
              <span
                onClick={scrollToSection}
                className="text-md font-medium text-gray-500 flex flex-row items-center mr-5 cursor-pointer"
              >
                <BsFillChatTextFill className="w-4 h-4 mr-1" />
                <span>{comments?.length}</span>
              </span>

              <ButtonLike
                liked={thread.liked}
                like_count={thread.like_count}
                id={thread.id}
              />
              <div className="dropdown dropdown-left cursor-pointer">
                <button
                  tabIndex="0"
                  type="button"
                  className="text-md font-medium text-gray-500 flex flex-row items-center select-none"
                >
                  <AiFillSetting className="h-5 w-5 cursor-pointer" />
                </button>
                {token && thread.user?.username === username && (
                  <>
                    <ul
                      tabIndex="0"
                      className="dropdown-content mr-2 mt-0 menu p-1 shadow bg-base-100 rounded-md w-[7rem]"
                    >
                      <li>
                        <Link href={`/update/${thread.slug}`}>Edit</Link>
                      </li>
                      <li>
                        <div
                          onClick={() => {
                            openModalDeleteThread(thread.id);
                          }}
                        >
                          Delete
                        </div>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>

          <hr className="border-gray-300 mb-8 mt-0" />

          <div className="flex justify-center mb-4">
            <Image
              src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"
              alt="post-image"
              width={640}
              height={360}
              priority
            />
          </div>
          
          <div className="wysiwyg-content">
            {thread ? ReactHtmlParser(thread.body || "-") : "-"}
          </div>

          <div ref={targetRef}>
            <FormCommentComp threadId={thread.id} />
          </div>
        </article>
      ) : (
        <NotFoundComp />
      )}
    </>
  );
};

export default ArticleDetail;
