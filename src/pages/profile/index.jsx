import Layout from "../../components/layout";
import SideBarUser from "../../components/layout/SideBarUser";
import useUserStore from "@/store/user";

import FormProfile from "@/components/profile/FormProfile";

const ProfilePage = () => {
  const { username, loading } = useUserStore();
  const siteTitle = `${loading ? "loading" : `${username} | The North`} `;
  const siteDescription =
    "Lorem ipsum dolor sit amet consectetur a doloremque fugit cumque eaque impedit nesciunt quidem obcaecati?";

  return (
    <Layout siteTitle={siteTitle} siteDescription={siteDescription}>
      <div className="flex w-full md:-mt-[40px] min-h-[calc(100vh-56px)] py-8 md:py-0 pb-24 xs:pb-0 justify-center gap-0 ">
        <SideBarUser />

        <div className="flex w-full max-w-full flex-col mx-auto">
            <div className="mx-auto max-w-screen-xl px-2 md:px-8">
                <div className="mx-auto">
                  <div className=" p-0 xs:px-6 flex justify-center">
                    <div className="xs:container max-w-screen-lg mx-auto">
                      <h2 className="font-semibold text-xl text-gray-600">
                        My Profile
                      </h2>
                      <p className="text-gray-500 mb-6">
                        Stay fit, All day, every day.
                      </p>

                      <FormProfile />
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
