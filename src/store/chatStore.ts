import { Chat, Message, UserInfo } from "..";
import { create } from "zustand";
import { getChatMsgs } from "../api/chat";
import { getAccessToken } from "@/utils/token";
import { jwtDecode } from "jwt-decode";

type ChatStore = {
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
  setMessages: (messages: Message[]) => void;
};

function getInitCurrentUser() {
  const token = getAccessToken();
  if (!token) {
    return null;
  }
  const decoded: UserInfo = jwtDecode(token);
  return decoded;
}

export const useChatStore = create<ChatStore>((set, get) => ({
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
  setMessages: (messages) => set({ messages }),
  setUsers: (users) => set({ users }),
  setCurrentUser: (user) => set({ currentUser: user }),
  setConnectionStatus: (status) => set({ connectionStatus: status }),
  setChatList: (chatList: Chat[]) => set({ chatList }),
  setCurrentChat: (chat: Chat) => {
    const preId = get().currentChat?.id;
    if (preId && preId === chat.id) {
      return;
    }
    getChatMsgs(chat.id).then((data) => {
      console.log(data);
      set({ messages: data });
    });
    set({ currentChat: chat });
  },
}));
