
type Status = 'pending' | 'sent' |'delivered' | 'read'
type Type = 'connect' | 'message'

export interface IUser {
    name: string
    email: string;
    password: string;
}

export interface Chat {
    chat_id: string;
    usersInChat: string[];
}

export interface IMessages {
    id: string;
    message: string;
    status: Status
    type: Type
    user_id: string;
    chat_id: string;
}

export interface IChatMessage extends Chat{
    messages: IMessages[];
}

export interface IChatConnection extends IChatMessage {
    type: 'initial_message' | 'new_message' | 'write_message' | 'stop_write_message'
}