import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaComment,
  FaHeart,
  FaRegHeart,
  FaArrowRight,
  FaUserCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  formatDate,
  isoToWIB,
  getOverview,
} from "../../../utils/articleHelper";
import ReactHtmlParser from "html-react-parser";
import useUserStore from "@/store/user";

const ButtonLike = ({ liked, like_count, id, size = "sm" }) => {
  const sizeClass = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors duration-200">
      {liked ? (
        <FaHeart className={`${sizeClass} text-red-500 fill-current`} />
      ) : (
        <FaRegHeart className={`${sizeClass} fill-current`} />
      )}
      <span className="text-sm font-medium">{like_count || 0}</span>
    </button>
  );
};

const ArticleComp = ({ threads }) => {
  const { token } = useUserStore();

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${token ? "xl:rid-cols-3" : "xl:grid-cols-4"} gap-6 w-full`}
    >
      {threads.length > 0 &&
        threads.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-red-300 group flex flex-col h-full"
          >
            <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-gray-200">
              <Image
                priority
                src="/image/notfound.png"
                fill
                alt={post?.title || "Thread image"}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />

              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-white/95 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                  Post
                </span>
              </div>
            </div>

            <div className="flex flex-col flex-1 p-5">
              <h2 className="text-lg font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-red-600 transition-colors">
                <Link href={`/thread/${post?.slug}`}>
                  {getOverview(post?.title)}
                </Link>
              </h2>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                  <FaUserCircle className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {post?.user?.username}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <FaCalendarAlt className="w-3 h-3" />
                    <span
                      className="cursor-help"
                      title={`${formatDate(post?.created_at)}, ${isoToWIB(post?.created_at)}`}
                    >
                      {new Date(post?.created_at).diffforHumans()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                {ReactHtmlParser(getOverview(post?.body))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaComment className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {post?.comment_count || 0}
                    </span>
                  </div>
                  <ButtonLike
                    liked={post?.liked}
                    like_count={post?.like_count}
                    id={post?.id}
                  />
                </div>

                <Link
                  href={`/thread/${post?.slug}`}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-sm transition-colors group/link"
                >
                  Baca
                  <FaArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ArticleComp;
