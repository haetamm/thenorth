import Link from "next/link";
import { useRouter } from "next/router";
import { activeLink, isActive } from "../../../utils/helper";

const NavThreadPage = () => {
  const { pathname } = useRouter();
  const classActive =
    "bg-white rounded-tl-lg rounded-tr-lg border-l border-t border-r border-gray-100";

  const linkNav = [
    {
      href: "/my",
      label: "My Thread",
    },
    {
      href: "/my/likes",
      label: "My Likes",
    },
  ];

  return (
    <ul className="grid grid-flow-col text-center text-gray-500  p-1">
      {linkNav.map(({ href, label }, index) => (
        <Link key={index} href={href}>
          <div
            className={`${
              activeLink(pathname, href) ? classActive : ""
            } flex justify-center py-4`}
          >
            {label}
          </div>
        </Link>
      ))}
    </ul>
  );
};

export default NavThreadPage;
