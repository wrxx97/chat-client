export type RegisterInputs = {
  fullname: string;
  email: string;
  password: string;
  workspace: string;
};

export type LoginInputs = {
  email: string;
  password: string;
};

export type UserInfo = {
  id: number;
  fullname: string;
  email: string;
  workspace: string;
  created_at: string;
  ws_id: number;
};

export enum ChatType {
  Single = "single",
  Group = "group",
  PrivateChannel = "private_channel",
  PublicChannel = "public_channel",
}

export type Chat = {
  id: number;
  ws_id: number;
  name: string;
  type: ChatType;
  members: number[];
  created_at: string;
};

export type Message = {
  id?: number;
  chat_id: number;
  sender_id: number;
  content: string;
  created_at: string;
  _sending?: boolean;
};

export type CreateChat = {
  name: string;
  public: bool;
  members: number[];
};

export type PostMessage = {
  chatId: number;
  content: string;
  senderId: number;
};
