import { create } from "zustand";

const useChatStore = create((set) => ({
  chatHistory: [],
  setChatHistory: (ai, msg) => 
    set((state) => ({
      chatHistory: [...state.chatHistory, { ai, msg }],
    })),
}));

export default useChatStore;
