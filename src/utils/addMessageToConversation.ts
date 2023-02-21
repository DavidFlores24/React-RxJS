import {Conversation} from "../models/Conversation";
import {Message} from "../models/Message";
import {v4 as uuidv4} from 'uuid';
import {setCurrentConversation} from "../observables/currentConversation";

/**
 * Creates a new message with the passed text and
 * adds it to the passed conversation
 * @param conversation
 * @param text
 */
export function addMessageToConversation(conversation: Conversation, text: string) {
    const updatedAt = new Date().toString();

    const newMessage: Message = {
        text,
        created: updatedAt,
        last_updated: updatedAt,
        id: uuidv4()
    }

    const newConversation = {
        ...conversation,
        last_updated: updatedAt,
        messages: [...conversation.messages, newMessage]
    };

    setCurrentConversation(newConversation);
}
