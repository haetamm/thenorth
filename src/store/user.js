import Cookies from "js-cookie";
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../utils/api";
import { handleFormErrors } from "../../utils/errorHandling";
import { toast } from "react-toastify";

const token = Cookies.get("token");
let role = "";

if (token) {
  try {
    const decodeToken = jwtDecode(token);
    const roles = decodeToken ? decodeToken.user.roles : "";
    role = roles[0];
  } catch (e) {
    console.error("Invalid token", e);
  }
}

const useUserStore = create((set) => ({
  role,
  token: token || "",
  loading: false,
  username: "",
  guest: false,
  loadingUpdate: false,
  error: null,
  loadingFetch: false,

  setGuest: (guest) => {
    set({ guest });
  },

  loginUser: async (data, setError, router) => {
    set({ loading: true, error: null });
    try {
      const { data: response } = await axiosInstance.post("auth", data);
      const { token } = response;
      Cookies.set("token", token, { expires: 7 });
      set({ token });
      toast.success(`Selamat datang ${data.username}`);
      router.push("/home");
    } catch (error) {
      handleFormErrors(error, setError);
    } finally {
      set({ loading: false });
    }
  },

  updateUser: async (data, setError) => {
    set({ loadingUpdate: true, error: null });
    try {
      const { data: response } = await axiosInstance.put("users", data);
      const { data: result } = response;
      set({ username: data.username });
      toast.success(result);
    } catch (error) {
      handleFormErrors(error, setError);
    } finally {
      set({ loadingUpdate: false });
    }
  },

  logoutUser: async (router) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete("auth");
      Cookies.remove("token");
      set({
        role: null,
        token: "",
        username: "",
      });
      router.push("/guest/login");
    } catch (error) {
      handleFormErrors(error);
    } finally {
      set({ loading: false });
    }
  },

  fetchUser: async () => {
    set({ loadingFetch: true, error: null });
    try {
      const { data: response } = await axiosInstance.get("users/me");
      const { data: user } = response;
      set({ role: user.roles[0], username: user.username });
    } catch (error) {
      handleFormErrors(error);
    } finally {
      set({ loadingFetch: false });
    }
  },
}));

export default useUserStore;
