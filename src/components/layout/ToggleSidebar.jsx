import { useRouter } from "next/router";
import Link from "next/link";
import { authLinks } from "../../../utils/links";
import { isActive } from "../../../utils/helper";
import useUserStore from "@/store/user";
import { useModalStore } from "@/store/modal";
import Loader from "./Loader";
import { AiOutlineMenu } from "react-icons/ai";
import { useSidebar } from "@/store/sidebar";
import useHasMounted from "@/hooks/useHasMounted";

const ToggleSidebar = () => {
  const { openModalLogout } = useModalStore();
  const { openSidebar } = useSidebar();
  const { token, loading } = useUserStore();
  const { pathname } = useRouter();
  const mounted = useHasMounted();

  if (!mounted) return null;

  return (
    <div className="flex items-center">
      {loading ? (
        <Loader />
      ) : !token ? (
        authLinks.map(({ href, label }, index) => (
          <Link key={index} href={href} passHref legacyBehavior>
            <a
              className={`${
                isActive(pathname, href)
                  ? "text-red-500 font-bold bg-blue-700"
                  : "bg-gray-100"
              } mr-2 focus:outline-none border-gray-300 border transition duration-150 ease-in-out hover:bg-gray-300 rounded text-gray-600 px-5 text-md py-1`}
            >
              {label}
            </a>
          </Link>
        ))
      ) : (
        <span className="relative mr-6">
          <button
            onClick={() => openModalLogout()}
            className="bg-red-300 text-black focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none border-gray-300 border transition duration-150 ease-in-out hover:bg-gray-300 rounded px-5 text-md py-1"
          >
            Logout
          </button>
        </span>
      )}

      <button
        id="menu"
        onClick={() => openSidebar()}
        aria-label="open menu"
        className="md:hidden focus:outline-none bg-black p-1 focus:ring-2 focus:ring-gray-600 text-white"
      >
        <AiOutlineMenu className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ToggleSidebar;
