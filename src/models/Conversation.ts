import {Message} from "./Message";

export type Conversation = {
    id: string;
    name: string;
    last_updated: string;
    messages: Message[];
};
