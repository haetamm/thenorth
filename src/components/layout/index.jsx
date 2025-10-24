import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import useUserStore from "@/store/user";
import NavComp from "./NavComp";
import FooterComp from "./FooterComp";
import HeadComp from "./HeadComp";
import SidebarComp from "./SIdebarComp";
import Modal from "./Modal";
import Loader from "./Loader";

const Index = ({ children, siteTitle, siteDescription, guestToken }) => {
  const { loadingFetch, username, fetchUser, token } = useUserStore();
  const [guest, setGuest] = useState(guestToken || false);

  useEffect(() => {
    if (token && !username) {
      fetchUser();
    }
  }, [fetchUser, guestToken, setGuest, token, username]);

  return (
    <>
      {loadingFetch && (
        <div className="fixed top-0 left-0 w-full h-full bg-blue-200 bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-lg font-semibold">
            <Loader />
          </div>
        </div>
      )}
      <div className="bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen flex flex-col">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <HeadComp siteTitle={siteTitle} siteDescription={siteDescription} />
        <NavComp guest={guest} />
        <div className="h-[46px] md:h-[56px]"></div>
        <div className="kontener mx-auto flex-grow ">{children}</div>
        <FooterComp guest={guest} />
      </div>
      <SidebarComp />
      <Modal />
    </>
  );
};

export default Index;
