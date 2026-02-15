import useUserStore from "@/store/user";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { schemaUpdateUser } from "../../../utils/validation";
import { inputProfileFields } from "../../../utils/fields";
import { IoMdArrowDropup, IoMdClose } from "react-icons/io";
import { FaSave } from "react-icons/fa";

const FormProfile = () => {
  const { username, loadingUpdate, updateUser } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(schemaUpdateUser),
    mode: "onChange",
    defaultValues: {
      username: username || "",
      password: "",
    },
  });

  useEffect(() => {
    reset({
      username: username || "",
      password: "",
    });
  }, [reset, username]);

  const onSubmit = async (formData) => {
    await updateUser(formData, setError);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded shadow-lg p-2 px-4 md:p-8 mb-6"
      >
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Personal Details</p>
            <p>Please fill out all the fields.</p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              {inputProfileFields
                .slice(0, 4)
                .map(({ name, placeholder, readOnly, type }, index) => (
                  <div key={index} className="md:col-span-5">
                    <input
                      {...register(name.toLowerCase().replace(/\s/g, ""))}
                      placeholder={placeholder}
                      disabled={readOnly}
                      type={type}
                      className={`${
                        readOnly
                          ? "cursor-not-allowed  focus:border-blueGray-500 dark:focus:bg-gray-800 focus:outline-none"
                          : "focus:bg-white"
                      } bg-gray-200  text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base  transition duration-500 ease-in-out transform border-transparent rounded-lg  ${
                        errors[placeholder.toLowerCase().replace(/\s/g, "")]
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {errors[name.toLowerCase().replace(/\s/g, "")] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[name.toLowerCase().replace(/\s/g, "")].message}
                      </p>
                    )}
                  </div>
                ))}

              <div className="md:col-span-5 inline-block xs:flex space-x-1.5">
                {inputProfileFields
                  .slice(4, 6)
                  .map(({ placeholder, readOnly }, index) => (
                    <input
                      key={index}
                      placeholder={placeholder}
                      readOnly={readOnly}
                      className="w-full xs:w-1/2 cursor-not-allowed text-black placeholder-gray-600  px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 dark:focus:bg-gray-800 focus:outline-none"
                    />
                  ))}
              </div>

              <div className="md:col-span-5 inline-block md:flex space-x-1.5">
                {inputProfileFields
                  .slice(6, 9)
                  .map(({ placeholder, readOnly, type }, index) =>
                    type === "select" ? (
                      <div key={index} className="md:col-span-2">
                        <div className="h-[44px] text-base transition px-0.5 duration-500 ease-in-out transform rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400 flex border border-gray-200 items-center mt-2">
                          <input
                            readOnly={readOnly}
                            placeholder={placeholder}
                            className="cursor-not-allowed px-4 appearance-none outline-none text-white placeholder-gray-600 w-full bg-transparent rounded-lg"
                          />
                          <button
                            tabIndex="-1"
                            className="cursor-pointer outline-none focus:outline-none transition-all text-black hover:text-red-600"
                          >
                            <IoMdClose className="w-4 h-4 mx-2 fill-current" />
                          </button>
                          <button
                            tabIndex="-1"
                            className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-black hover:text-blue-600"
                          >
                            <IoMdArrowDropup className="w-4 h-4 mx-2 fill-current" />
                          </button>
                        </div>
                      </div>
                    ) : type === "text" ? (
                      <div key={index} className="md:col-span-1">
                        <input
                          placeholder={placeholder}
                          readOnly={readOnly}
                          className="cursor-not-allowed text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 dark:focus:bg-gray-800 focus:outline-none"
                        />
                      </div>
                    ) : null,
                  )}
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-4" />
        <div className="flex flex-row-reverse p-3">
          <div className="flex-initial pl-3">
            <button
              type="submit"
              disabled={loadingUpdate || !isValid}
              className="disabled:bg-gray-300 cursor-pointer flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out"
            >
              <FaSave className="w-[24px] h-[24px]" />
              <span className="pl-2 mx-1">
                {loadingUpdate ? "Loading" : "Save"}
              </span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormProfile;
