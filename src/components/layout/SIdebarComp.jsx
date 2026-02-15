import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GiWorld } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import useUserStore from "@/store/user";
import { isActive } from "../../../utils/helper";
import { useSidebar } from "@/store/sidebar";
import { menuItems } from "../../../utils/links";

const SidebarComp = () => {
  const { token, role, username } = useUserStore();
  const { pathname } = useRouter();
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <>
      {isOpen && (
        <div className="fixed w-full h-full z-40 md:hidden top-0">
          <div className="bg-gray-800 opacity-50 w-full h-full" />

          <div className="w-64 z-40 fixed top-0 bg-white shadow h-full flex flex-col pb-4">
            <div className="px-6 h-screen overflow-auto flex flex-col justify-between">
              <div>
                <div className="mt-10 flex justify-end items-center">
                  <Link
                    onClick={() => closeSidebar()}
                    href={"/"}
                    className="hidden lg:flex items-center"
                  >
                    <GiWorld size={40} />
                    <p className="text-base md:text-xl font-bold text-gray-800 ml-3 hidden md:block">
                      The North
                    </p>
                  </Link>
                  <button
                    aria-label="close menu"
                    onClick={() => closeSidebar()}
                    className="text-gray-800 "
                  >
                    <AiOutlineClose className="w-6 h-6" />
                  </button>
                </div>

                <ul>
                  {menuItems
                    .filter(
                      (item) =>
                        item.visible === true || item.visible(token, role),
                    )
                    .map(({ label, icon, link }) => (
                      <li key={label}>
                        <Link href={link} className="cursor-pointer">
                          <div
                            onClick={() => closeSidebar()}
                            className={`flex items-center py-4 ${
                              isActive(pathname, link)
                                ? "text-indigo-700 border-b-2 border-indigo-700"
                                : "text-gray-800"
                            }`}
                          >
                            {icon}
                            <p className="ml-3 font-bold xl:text-base md:text-xl">
                              {label}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="mt-auto">
                {token && (
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex items-center justify-between">
                      <Link
                        href={"/profile"}
                        onClick={() => closeSidebar()}
                        className="flex items-center"
                      >
                        <Image
                          src="/image/noimage.png"
                          alt="default"
                          className="rounded h-10 w-10 object-cover"
                          height={48}
                          width={48}
                        />
                        <p className="text-gray-800 text-base leading-4 ml-2">
                          {username}
                        </p>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarComp;
