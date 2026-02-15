import useAdminStore from "@/store/admin";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosSearch, IoMdArrowDropdown } from "react-icons/io";

const SearchComp = () => {
  const { currentPage, totalPages, setCurrentPage } = useAdminStore();
  const router = useRouter();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push(`?page=${page}`);
  };
  return (
    <>
      <div className="my-2 flex flex-row space-x-1">
        <div className="relative">
          <select
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
            className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            {(() => {
              const options = [];
              for (let i = 1; i <= totalPages; i++) {
                options.push(
                  <option key={i} value={i}>
                    {i}
                  </option>,
                );
              }
              return options;
            })()}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <IoMdArrowDropdown className="fill-current h-4 w-4" />
          </div>
        </div>
        <div className="block relative">
          <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            <IoIosSearch className="h-4 w-4 fill-current text-gray-500" />
          </span>
          <input
            placeholder="Search"
            className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
          />
        </div>
      </div>
    </>
  );
};

export default SearchComp;
