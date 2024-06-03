
type Status = 'pending' | 'sent' |'delivered' | 'read'
export type TypeConnection = 'initial_message' | 'new_message' | 'write_message' | 'stop_write_message' | 'get_last_messages'

export interface IUser {
    name: string
    email: string;
    password: string;
}

export interface Chat {
    chat_id: string;
    usersInChat: string[];
    type: TypeConnection
}

export interface IMessages {
    id: string;
    message: string;
    status: Status
    user_id: string;
    chat_id: string;
    createdAt: string;
}

export interface INewMessage extends IMessages {
    type: TypeConnection
}

export interface IChatMessage extends Chat{
    messages: IMessages[];
}

export interface IChatConnection extends IChatMessage {
    users: IUser[]
}

export interface IGetChats extends IChatConnection {
    chats: IChatConnection[];
    type: TypeConnection
}

