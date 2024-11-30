import { create } from "zustand";

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
}

interface ChatStore {
  messages: Message[];
  users: string[];
  connectionStatus: "connected" | "disconnected";
  addMessage: (message: Message) => void;
  setUsers: (users: string[]) => void;
  setConnectionStatus: (status: "connected" | "disconnected") => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  users: [],
  connectionStatus: "disconnected",

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setUsers: (users) => set({ users }),

  setConnectionStatus: (status) => set({ connectionStatus: status }),
}));
