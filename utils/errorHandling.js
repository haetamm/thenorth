import { toast } from "react-toastify";

export const handleFormErrors = (error, setError = null) => {
  const { response } = error;

  if (!response) {
    toast.error("An error occurred. Please try again later.");
    return;
  }

  const { status, data } = response;

  switch (status) {
    case 422: {
      const { errors } = data;
      if (setError && typeof setError === "function") {
        errors.forEach(({ path, msg }) => {
          setError(path, { type: "manual", message: msg });
        });
      } else {
        errors.forEach(({ path, msg }) => {
          toast.error(`Error in ${path}: ${msg}`);
        });
      }
      break;
    }

    case 403: {
      toast.error(
        `${
          data.message
            ? data.message
            : "You are not authorized to access this resource"
        } `,
      );
      break;
    }

    case 401: {
      toast.error(`${data.message} | Please log in again.`);
      break;
    }

    case 400: {
      toast.error(`${data.messages}`);
      break;
    }

    default: {
      if (status >= 500 && status < 600) {
        toast.error(
          data.message || "An error occurred. Please try again later.",
        );
      }
      break;
    }
  }
};
