import { Chat, UserInfo } from "..";
import { create } from "zustand";
import { getChatList } from "../api/chat";
import { getAccessToken } from "@/utils/token";
import { jwtDecode } from "jwt-decode";

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
}

interface ChatStore {
  messages: Message[];
  users: UserInfo[];
  connectionStatus: "connected" | "disconnected";
  currentUser: UserInfo | null;
  chatList: Chat[];
  currentChat: Chat | null;
  setCurrentUser: (user: UserInfo) => void;
  addMessage: (message: Message) => void;
  setUsers: (users: UserInfo[]) => void;
  setConnectionStatus: (status: "connected" | "disconnected") => void;
  setChatList: (chatList: Chat[]) => void;
  setCurrentChat: (chat: Chat) => void;
}

function getInitCurrentUser() {
  const token = getAccessToken();
  if (!token) {
    return null;
  }
  const decoded: UserInfo = jwtDecode(token);
  return decoded;
}

export const useChatStore = create<ChatStore>((set) => ({
  chatList: [],
  currentChat: null,
  currentUser: getInitCurrentUser(),
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
  setCurrentChat: (chat: Chat) => set({ currentChat: chat }),
}));
