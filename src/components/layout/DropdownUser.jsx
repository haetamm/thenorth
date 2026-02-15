import React from "react";
import Image from "next/image";
import useUserStore from "@/store/user";
import { useModalStore } from "@/store/modal";
import { dropdownItems } from "../../../utils/links";
import Link from "next/link";

const DropdownItem = ({ href, icon: Icon, label, onClick }) => (
  <Link
    href={href}
    className="py-1 cursor-pointer hidden xs:block"
    onClick={(e) => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    }}
  >
    <span className="py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white flex">
      <Icon className="h-5 w-5" />
      <span className="ml-2">{label}</span>
    </span>
  </Link>
);

const UserProfile = ({ username }) => (
  <div className="flex justify-between">
    <div className="hidden truncate text-start leading-5 xl:block hover:text-red-600">
      <div className="flex items-center gap-1 truncate font-bold pointer-events-none start">
        <p className="truncate text-md">{username}</p>
      </div>
      <small className="truncate text-light-secondary dark:text-dark-secondary pointer-events-none">
        <small>@{username}</small>
      </small>
    </div>
  </div>
);

const DropdownUser = () => {
  const { token, username, role } = useUserStore();
  const { openModalLogout } = useModalStore();

  if (!token) return null;

  const items = dropdownItems(openModalLogout).filter(
    (item) => !item.role || item.role === role,
  );

  return (
    <div className="justify-center lg:flex lg:justify-between hidden sm:block relative xl:w-11/12">
      <div className="dropdown dropdown-top">
        <button
          tabIndex="0"
          className="custom-button flex items-center justify-between gap-4 self-start p-2 text-xl text-white xs:p-3 xl:pr-5"
          type="button"
        >
          <div className="flex justify-between gap-0 xl:gap-3 truncate">
            <figure className="w-[40px]">
              <Image
                priority
                src="/image/noimage.png"
                className="hidden md:block"
                height={60}
                width={60}
                alt="default"
              />
            </figure>
            <UserProfile username={username} />
          </div>
        </button>
        <div className="dropdown-content mb-1 shadow bg-base-100 rounded-md hidden xs:block w-[15rem]">
          {items.map((item, index) => (
            <DropdownItem
              key={index}
              href={item.href}
              icon={item.icon}
              label={item.label}
              onClick={item.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownUser;
