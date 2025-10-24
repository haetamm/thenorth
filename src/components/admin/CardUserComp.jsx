import Image from "next/image";
import { formatDate } from "../../../utils/articleHelper";
import useAdminStore from "@/store/admin";
import ButtonActivation from "./ButtonActivation";

const CardUserComp = () => {
  const { users, loading } = useAdminStore();

  const CardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="rounded-full bg-gray-300 w-12 h-12"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        <div className="h-8 bg-gray-300 rounded w-full mt-2"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="mx-auto w-full xs:hidden py-6 md:px-6 mb-20 xs:mb-0">
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="mx-auto w-full px-3 md:px-6 mb-20 xs:mb-0">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="xs:hidden mx-auto w-full py-6 md:px-6 mb-20 xs:mb-0">
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <Image
                  className="rounded-full w-12 h-12"
                  src="/image/noimage.png"
                  alt="Avatar"
                  width={48}
                  height={48}
                />

                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    new Date() < new Date(user.expried_token)
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{user.username}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span
                    className={`text-xs py-1 px-2.5 rounded-full ${
                      new Date() < new Date(user.expried_token)
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {new Date() < new Date(user.expried_token)
                      ? "online"
                      : "offline"}
                  </span>
                  <span
                    className={`text-xs py-1 px-2.5 rounded-full ${
                      user.deleted_at === null
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.deleted_at === null ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-gray-500 font-medium">Created Date</p>
                <p className="text-gray-800">{formatDate(user.created_at)}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">User ID</p>
                <p className="text-gray-800 font-mono text-xs">{user.id}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <ButtonActivation
                deleted_at={user.deleted_at}
                id={user.id}
                username={user.username}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardUserComp;