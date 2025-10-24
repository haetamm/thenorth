import Image from "next/image";
import { formatDate } from "../../../utils/articleHelper";
import useAdminStore from "@/store/admin";
import Pagination from "../layout/Pagination";
import { fieldTable } from "../../../utils/fields";
import Loader from "../layout/Loader";
import SearchComp from "./SearchComp";
import ButtonActivation from "./ButtonActivation";
import CardUserComp from "./CardUserComp";

const TableUserComp = () => {
  const { users, loading, currentPage, totalPages, setCurrentPage } =
    useAdminStore();

  return (
    <>
      <div className="mx-auto w-full px-3 md:px-6 mb-20 xs:mb-0">
        <section className=" text-gray-800">
          <SearchComp />

          <div className="block  xs:shadow-lg bg-white">
            <div className="flex flex-col">
              <div className="hidden xs:block overflow-x-auto">
                <div className="inline-block w-full ">
                  <div className="h-[calc(100vh-290px)] xs:h-[calc(100vh-190px)] overflow-auto">
                    <table className="w-full mb-0 overflow-auto mx-auto">
                      <thead className="border-b text-left w-full bg-white sticky top-0 z-10 shadow-md">
                        <tr>
                          {fieldTable.map((coloum, index) => (
                            <th
                              key={index}
                              scope="col"
                              className="text-sm bg-gray-50 font-medium px-8 py-4"
                            >
                              {coloum}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {loading ? (
                          <tr>
                            <td
                              colSpan="4"
                              style={{ position: "relative", height: "100px" }}
                            >
                              <Loader />
                            </td>
                          </tr>
                        ) : users.length ? (
                          users.map((user) => (
                            <tr key={user.id} className="border-b">
                              <td
                                scope="row"
                                className="text-sm font-normal px-8 py-2.5 whitespace-nowrap text-left"
                              >
                                <div className="flex flex-row items-center">
                                  <Image
                                    className="rounded-full w-12"
                                    src="/image/noimage.png"
                                    alt="Avatar"
                                    width={48}
                                    height={48}
                                  />
                                  <div className="ml-2">
                                    <p className="mb-0.5 font-medium">
                                      {user.username}
                                    </p>
                                    {new Date() <
                                    new Date(user.expried_token) ? (
                                      <span className="bg-green-200 py-0 px-2 rounded-full">
                                        online
                                      </span>
                                    ) : (
                                      <span className="bg-red-200 py-0 px-2 rounded-full">
                                        offline
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="text-sm font-normal px-8 py-2.5 whitespace-nowrap text-left">
                                <div className="flex flex-col">
                                  <p className="mb-0.5">
                                    {formatDate(user.created_at)}
                                  </p>
                                </div>
                              </td>
                              <td className="align-middle text-sm font-normal px-8 py-2.5 whitespace-nowrap text-left">
                                <span
                                  className={`text-xs py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-medium ${
                                    user.deleted_at === null
                                      ? "bg-green-200 text-green-600"
                                      : "bg-red-200 text-red-600"
                                  } rounded-full`}
                                >
                                  {user.deleted_at === null
                                    ? "Active"
                                    : "Inactive"}
                                </span>
                              </td>
                              <td className="align-middle text-sm font-normal px-8 py-2.5 whitespace-nowrap text-left">
                                <ButtonActivation
                                  deleted_at={user.deleted_at}
                                  id={user.id}
                                  username={user.username}
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center py-4">
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <CardUserComp />
              <div className=" py-3 bg-transparent border-t">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TableUserComp;
