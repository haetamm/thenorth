import { create } from "zustand";
import axiosInstance from "../../utils/api";
import { handleFormErrors } from "../../utils/errorHandling";

const useAdminStore = create((set) => ({
  loading: false,
  error: null,
  users: [],
  currentPage: 1,
  totalCount: 0,
  totalPages: 0,
  loadingActivation: false,

  setCurrentPage: (page) => set({ currentPage: page }),

  fetchUsers: async (page) => {
    set({ loading: true, error: null });
    try {
      const { data: response } = await axiosInstance.get(`users?page=${page}`);
      const { data: result } = response;
      const { data: users, currentPage, totalCount, totalPages } = result;
      set({ users, currentPage, totalCount, totalPages });
    } catch (error) {
      handleFormErrors(error);
    } finally {
      set({ loading: false });
    }
  },

  deleteUser: async (id) => {
    set({ loadingActivation: true, error: null });
    try {
      await axiosInstance.delete(`users/${id}`);
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id
            ? { ...user, deleted_at: new Date().toLocaleString() }
            : user,
        ),
      }));
    } catch (error) {
      handleFormErrors(error);
    } finally {
      set({ loadingActivation: false });
    }
  },

  activeUser: async (username) => {
    set({ loadingActivation: true, error: null });
    try {
      await axiosInstance.post(`users/${username}/active`);
      set((state) => ({
        users: state.users.map((user) =>
          user.username === username ? { ...user, deleted_at: null } : user,
        ),
      }));
    } catch (error) {
      handleFormErrors(error);
    } finally {
      set({ loadingActivation: false });
    }
  },
}));

export default useAdminStore;
