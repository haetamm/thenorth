import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import SideBarUser from "../../components/layout/SideBarUser";
import useUserStore from "@/store/user";
import TableUserComp from "@/components/admin/TableUserComp";
import Error403Comp from "@/components/admin/Error403Comp";
import useAdminStore from "@/store/admin";

const Admin = () => {
  const { role } = useUserStore();
  const siteTitle = `${
    role === "ADMIN" ? "Admin | The North" : "Error Forbidden"
  }`;
  const siteDescription = `${
    role === "ADMIN"
      ? "Lorem ipsum dolor sit amet consectetur a doloremque fugit cumque eaque impedit nesciunt quidem obcaecati?"
      : "Error Forbidden"
  }`;

  const { fetchUsers, setCurrentPage } = useAdminStore();
  const router = useRouter();
  const page = Number(router.query.page) || 1;

  useEffect(() => {
    if (role !== "ADMIN") {
      router.push("/home");
    }
  }, [role, router]);

  useEffect(() => {
    setCurrentPage(page);
    fetchUsers(page);
  }, [fetchUsers, page, setCurrentPage]);

  return (
    <Layout siteTitle={siteTitle} siteDescription={siteDescription}>
      <div className={`flex w-full gap-0 md:mt-[-40px]`}>
        <SideBarUser />

        <div className=" flex w-full flex-col mx-auto ">
          {role === "ADMIN" ? (
            <section className="bg-white md:bg-transparent py-6 sm:py-4 lg:py-0">
              <h2 className="my-3 xs:my-0 md:my-1 lg:my-3 text-center text-2xl font-bold text-gray-800 md:mb-3 lg:text-3xl">
                Administrator
              </h2>
              <TableUserComp />
            </section>
          ) : (
            <Error403Comp />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
