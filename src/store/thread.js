import { create } from "zustand";
import axiosInstance from "../../utils/api";
import { handleFormErrors } from "../../utils/errorHandling";
import { toast } from "react-toastify";

const useThreadStore = create((set) => ({
  loading: false,
  error: null,
  threads: [],
  myThreads: [],
  myLikes: [],
  thread: null,
  comments: [],
  loadingComment: false,
  currentPage: 1,
  totalCount: 0,
  totalPages: 0,

  resetThread: () => {
    set({ thread: null });
  },

  setCurrentPage: (page) => set({ currentPage: page }),

  fetchThread: async (page) => {
    set({ loading: true, error: null });
    try {
      const { data: response } = await axiosInstance.get(
        `threads?page=${page}`,
      );
      const { data: result } = response;
      const { data: threads, currentPage, totalCount, totalPages } = result;
      set({ threads, currentPage, totalCount, totalPages });
    } catch (error) {
      handleFormErrors(error);
    } finally {
      set({ loading: false });
    }
  },

  fetchMyThread: async (page) => {
    set({ loading: true, error: null });
    try {
      const { data: response } = await axiosInstance.get(
        `threads/me?page=${page}`,
      );
      const { data: result } = response;
      const { data: myThreads, currentPage, totalCount, totalPages } = result;
      set({ myThreads, currentPage, totalCount, totalPages });
    } catch (error) {
      handleFormErrors(error);
    } finally {
      set({ loading: false });
    }
  },

  fetchMyLikes: async (page) => {
    set({ loading: true, error: null });
    try {
      const { data: response } = await axiosInstance.get(
        `threads/likes?page=${page}`,
      );
      const { data: result } = response;
      const { data: myLikes, currentPage, totalCount, totalPages } = result;
      set({ myLikes, currentPage, totalCount, totalPages });
    } catch (error) {
      handleFormErrors(error);
    } finally {
      set({ loading: false });
    }
  },

  likeThread: async (id) => {
    try {
      const { data: response } = await axiosInstance.post(`likes/${id}`);
      const { data: result } = response;
      const { like_count, liked, thread_id } = result;

      set((state) => ({
        thread:
          state.thread && state.thread.id === thread_id
            ? { ...state.thread, like_count, liked }
            : state.thread,

        threads: state.threads.map((thread) =>
          thread.id === thread_id ? { ...thread, like_count, liked } : thread,
        ),

        myThreads: state.myThreads.map((thread) =>
          thread.id === thread_id ? { ...thread, like_count, liked } : thread,
        ),

        myLikes: liked
          ? [
              ...state.myLikes,
              state.threads.find((thread) => thread.id === thread_id),
            ]
          : state.myLikes.filter((thread) => thread.id !== thread_id),
      }));
    } catch (error) {
      handleFormErrors(error);
    }
  },

  addThread: async (data, setError, reset, setNotifId) => {
    set({ loading: true, error: null });
    try {
      const { data: response } = await axiosInstance.post("threads", data);
      const { data: thread } = response;
      reset("");
      setNotifId(thread.slug);
    } catch (error) {
      handleFormErrors(error, setError);
    } finally {
      set({ loading: false });
    }
  },

  updateThread: async (id, data, setError, router, slug) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.put(`threads/${id}`, data);
      router.push(`/thread/${slug}`);
    } catch (error) {
      handleFormErrors(error, setError);
    } finally {
      set({ loading: false });
    }
  },

  deleteThread: async (id, router) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`threads/${id}`);
      router.back();
    } catch (error) {
      handleFormErrors(error);
    } finally {
      set({ loading: false });
    }
  },

  addComment: async (threadId, data, setError, reset) => {
    set({ loadingComment: true, error: null });
    try {
      const { data: response } = await axiosInstance.post(
        `comments/${threadId}`,
        data,
      );
      const { data: comments } = response;
      set({ comments });
      reset("");
      toast.success("komentar berhasil dikirim");
    } catch (error) {
      handleFormErrors(error, setError);
    } finally {
      set({ loadingComment: false });
    }
  },

  deleteComment: async (threadId, commentId) => {
    set({ loadingComment: true, error: null });
    try {
      const { data: response } = await axiosInstance.delete(
        `comments/${threadId}/${commentId}`,
      );
      const { data: comments } = response;
      set({ comments });
      toast.success("komentar berhasil dihapus");
    } catch (error) {
      handleFormErrors(error);
    } finally {
      set({ loadingComment: false });
    }
  },

  getThreadBySlug: async (slug) => {
    set({ loading: true, error: null });
    try {
      const { data: response } = await axiosInstance.get(`threads/${slug}`);
      const { data: thread } = response;
      set({ thread, comments: thread.comments });
    } catch (error) {
      handleFormErrors(error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useThreadStore;
