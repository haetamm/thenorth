import Link from "next/link";
import InputCustom from "./InputCustom";
import useBackgroundChange from "@/hooks/changeBackground";

const FormComp = ({
  control,
  fields,
  namePage,
  isFormValid,
  errors,
  handleSubmit,
  loading,
}) => {
  const bgColor = useBackgroundChange(
    "bg-gradient-to-tr from-blue-300 to-slate-300",
    400,
  );

  return (
    <div
      className={`flex md:w-1/2 h-[350px] shadow-3xl justify-center py-10 items-center border-l-4 border-dashed ${bgColor} rounded-lg`}
    >
      <form
        className={`${bgColor} w-full xs:w-[60%] md:w-[90%] lg:w-[65%] xl:w-[55%] px-4 py-4`}
        onSubmit={handleSubmit}
      >
        <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello</h1>
        <p className="text-sm font-normal text-gray-600 mb-5">
          {namePage === "Sign Up" ? "Squy register" : "Squy login"}
        </p>

        {fields.map((field) => (
          <InputCustom
            key={field.name}
            control={control}
            field={field}
            errors={errors}
          />
        ))}

        <button
          type="submit"
          disabled={loading || !isFormValid}
          className={`${
            !isFormValid ? "select-none" : "cursor-pointer"
          } disabled:bg-indigo-400 block w-full bg-indigo-600 mt-1 py-2 rounded-2xl text-white font-semibold mb-2`}
        >
          {loading ? "Loading" : namePage}
        </button>
        {namePage === "Sign Up" ? (
          <span className="text-sm ml-2">
            Have an account already?
            <Link
              href={"/guest/login"}
              className="hover:text-blue-500 cursor-pointer"
            >
              {" "}
              Sign In
            </Link>
          </span>
        ) : (
          <span className="text-sm ml-2">
            Don&apos;t have an account?
            <Link
              href={"/guest/register"}
              className="hover:text-blue-500 cursor-pointer"
            >
              {" "}
              Sign up
            </Link>
          </span>
        )}
      </form>
    </div>
  );
};

export default FormComp;
