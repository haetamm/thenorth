import useAdminStore from "@/store/admin";
import { useModalStore } from "@/store/modal";
import React from "react";

const ButtonActivation = ({ deleted_at, id, username }) => {
  const { openModalActivate, openModalDeactivate } = useModalStore();
  const { loadingActivation } = useAdminStore();
  const handleActivation = () => {
    if (deleted_at === null) {
      openModalDeactivate(id);
    } else {
      openModalActivate(username);
    }
  };

  return (
    <>
      <button
        onClick={handleActivation}
        className={`${
          deleted_at === null
            ? "bg-red-200 text-red-600"
            : "bg-green-200 text-green-600"
        } py-[1px] px-2.5 cursor-pointer font-medium text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 transition duration-300 ease-in-out rounded-full`}
      >
        {loadingActivation
          ? "Loading"
          : deleted_at === null
            ? "Deactivate"
            : "Activate"}
      </button>
    </>
  );
};

export default ButtonActivation;
