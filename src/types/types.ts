
type Status = 'pending' | 'sent' |'delivered' | 'read'
export type Type = 'message'|  'connect' | 'leave' | 'write_message' | 'get_chats'

export enum TypesResponse {
    NEW_MESSAGE = 'new_message',
    INITIAL_MESSAGE = 'initial_message',
    UPDATED_CHATS = 'updated_chats',
    INITIAL_CHATS = 'initial_chats',
    TYPING = 'typing',
    STOP_TYPING = 'stop_typing'
}

export interface IUser {
    name: string
    email: string;
    password: string;
}

export interface IMessages {
    id: string;
    message: string;
    status: Status
    user_id: string;
    chat_id: string;
    createdAt: string;
}

export interface Chat {
    chat_id: string;
    usersInChat: string[];
    type: TypesResponse
    messages: IMessages[],
    users: IUser[]
}
export interface IChatConnection extends Chat {
    users: IUser[]
}

interface InitialChats extends Chat {
  users: IUser[]
}
export interface Initial_chats {
    chat: InitialChats[];
    type: TypesResponse
}

export interface Initial_message {
    chat: Chat;
    type: TypesResponse
}

export interface New_message {
    message: IMessages;
}