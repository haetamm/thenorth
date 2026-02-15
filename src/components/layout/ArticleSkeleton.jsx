import React from "react";

const ArticleSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col h-full animate-pulse"
        >
          <div className="h-48 w-full bg-gray-300 rounded-t-xl"></div>

          <div className="flex flex-col flex-1 p-5">
            <div className="space-y-2 mb-3">
              <div className="h-5 bg-gray-300 rounded w-4/5"></div>
              <div className="h-5 bg-gray-300 rounded w-3/5"></div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="space-y-1 flex-1">
                <div className="h-4 bg-gray-300 rounded w-20"></div>
                <div className="h-3 bg-gray-300 rounded w-16"></div>
              </div>
            </div>

            <div className="space-y-2 mb-4 flex-1">
              <div className="h-3 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded w-5/6"></div>
              <div className="h-3 bg-gray-300 rounded w-4/6"></div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="h-4 bg-gray-300 rounded w-8"></div>
                <div className="h-4 bg-gray-300 rounded w-8"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded w-12"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleSkeleton;
