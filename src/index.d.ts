export interface RegisterInputs {
  fullname: string
  email: string
  password: string
  workspace: string
}

export interface LoginInputs {
  email: string
  password: string
}

export interface UserInfo {
  id: number
  fullname: string
  email: string
  workspace: string
  created_at: string
  ws_id: number
}

export enum ChatType {
  Single = 'single',
  Group = 'group',
  PrivateChannel = 'private_channel',
  PublicChannel = 'public_channel',
}

export interface Chat {
  id: number
  ws_id: number
  name: string
  type: ChatType
  members: number[]
  created_at: string
}

export interface Message {
  id?: number
  chat_id: number
  sender_id: number
  content: string
  created_at: string
  _sending?: boolean
}

export interface CreateChat {
  name: string
  public: bool
  members: number[]
}

export interface PostMessage {
  chatId: number
  content: string
  senderId: number
}
