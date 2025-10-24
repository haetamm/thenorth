import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useUserStore from "@/store/user";
import DropdownUser from "./DropdownUser";
import { sidebarItems } from "../../../utils/links";
import { IoMdCreate } from "react-icons/io";
import { isActive } from "../../../utils/helper";

const SideBarUser = () => {
  const { token } = useUserStore();
  const { pathname } = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {token && (
        <div className="flex w-0 shrink-0 transition-opacity duration-200 xs:w-20 md:w-24 lg:max-w-none xl:-mr-0 xl:w-full xl:max-w-[18rem] 2xl:justify-end">
          <div className="fixed bottom-0 z-10 flex w-full flex-col justify-between bg-slate-800/90 backdrop-blur-sm border-r border-slate-700 py-0 xs:top-0 xs:h-full xs:w-auto xs:border-0 xs:px-2 xs:py-3 xs:pt-2 md:px-4 xl:w-72">
            <div className="flex flex-col mt-0 xs:mt-10 md:mt-5 justify-center gap-2 xs:items-center xl:items-stretch">
              <div className="flex items-center justify-around xs:flex-col xs:justify-center xl:block">
                {sidebarItems.map(({ href, label, icon: Icon, isDisabled }) => (
                  <Link key={label} href={href} passHref legacyBehavior>
                    <a
                      className={`group py-1 outline-none flex ${
                        isDisabled ? "cursor-not-allowed" : ""
                      }`}
                    >
                      <div
                        className={`custom-button flex items-center justify-center gap-4 self-start p-2 text-xl ${
                          isActive(pathname, href)
                            ? "text-cyan-400"
                            : "text-slate-300"
                        } xs:p-3 xl:pr-5`}
                      >
                        <Icon className="h-7 w-7" />
                        <p className="hidden xl:block">{label}</p>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>

              <Link href="/create" passHref legacyBehavior>
                <a
                  className={`${
                    isActive(pathname, "/create") ? "hidden md:block" : ""
                  } cursor-pointer custom-button main-tab accent-tab absolute right-4 -translate-y-[72px] bg-cyan-500 text-lg font-bold text-white outline-none transition hover:bg-cyan-600 active:bg-cyan-700 xs:static xs:translate-y-0 rounded-full p-2 xl:w-11/12`}
                >
                  <IoMdCreate className="h-6 w-6 xl:hidden" />
                  <p className="hidden xl:block text-center">Create</p>
                </a>
              </Link>
            </div>
            <DropdownUser />
          </div>
        </div>
      )}
    </>
  );
};

export default SideBarUser;