import useAdminStore from "@/store/admin";
import { useModalStore } from "@/store/modal";
import useThreadStore from "@/store/thread";
import useUserStore from "@/store/user";
import { useRouter } from "next/router";
import React from "react";

const Modal = () => {
  const router = useRouter();
  const { isOpen, closeModal, type, id, commentId } = useModalStore();
  const { deleteThread, deleteComment } = useThreadStore();
  const { deleteUser, activeUser } = useAdminStore();
  const { logoutUser } = useUserStore();
  const handleSubmit = () => {
    if (type === "logout") {
      logoutUser(router);
      closeModal();
    } else if (type === "deleteThread") {
      deleteThread(id, router);
      closeModal();
    } else if (type === "deleteComment") {
      deleteComment(id, commentId);
      closeModal();
    } else if (type === "activateUser") {
      activeUser(id);
      closeModal();
    } else if (type === "deactivateUser") {
      deleteUser(id);
      closeModal();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50">
          <form
            method="dialog"
            className="w-[300px] rounded-lg px-8 py-3 bg-white"
          >
            <h3 className="font-bold text-lg">
              {type === "logout"
                ? "Logout"
                : type === "activateUser"
                  ? "Activated"
                  : type === "deactivateUser"
                    ? "Deactivated"
                    : "Delete"}
            </h3>
            <p className="py-4">
              {type === "logout"
                ? "You can always log back in at any time."
                : "Yakin?"}
            </p>
            <div className="flex justify-end">
              <div className="">
                <button
                  onClick={() => closeModal()}
                  className="px-3 py-1 rounded hover:bg-yellow-600 bg-yellow-400"
                >
                  Cancel
                </button>
              </div>
              <div className=" ml-2">
                <button
                  onClick={handleSubmit}
                  className="px-3 py-1 rounded hover:bg-red-600 bg-red-400"
                >
                  {type === "activateUser"
                    ? "Activated"
                    : type === "deactivateUser"
                      ? "Deactivated"
                      : "Yes"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Modal;
