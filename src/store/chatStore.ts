import { Chat, UserInfo } from "..";
import { create } from "zustand";
import { getChatList } from "../api/chat";

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
  currentUser: UserInfo | null;
  chatList: Chat[];
  setCurrentUser: (user: UserInfo) => void;
  addMessage: (message: Message) => void;
  setUsers: (users: string[]) => void;
  setConnectionStatus: (status: "connected" | "disconnected") => void;
  queryChat: () => void;
  setChatList: (chatList: Chat[]) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chatList: [],
  currentUser: null,
  messages: [],
  users: [],
  connectionStatus: "disconnected",

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setUsers: (users) => set({ users }),

  setCurrentUser: (user) => set({ currentUser: user }),

  setConnectionStatus: (status) => set({ connectionStatus: status }),

  setChatList: (chatList: Chat[]) => set({ chatList }),

  queryChat: async () => {
    const data = await getChatList();
    console.log("chat list:", data);
    set({ chatList: data });
  },
}));
