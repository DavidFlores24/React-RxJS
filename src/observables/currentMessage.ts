import {BehaviorSubject, distinctUntilChanged} from "rxjs";
import {Message} from "../models/Message";
import {Conversation} from "../models/Conversation";
import {setCurrentConversation} from "./currentConversation";

const currentMessageBehavior$ = new BehaviorSubject<Message | null>(null);

export function setCurrentMessage(newMessage: Message | null): void {
    currentMessageBehavior$.next(newMessage);
}

export function comparator(previous: Message | null, next: Conversation | Message | null): boolean {
    return previous?.id === next?.id
        && previous?.last_updated === next?.last_updated
}

export const currentMessage$ = currentMessageBehavior$.pipe(
    distinctUntilChanged(comparator)
);

/**
 * Updates the passed message and the conversation with the added text
 * @param conversation
 * @param messageToUpdate
 * @param updatedText
 */
export function updateMessage(conversation: Conversation, messageToUpdate: Message, updatedText: string) {
    const { messages } = conversation;

    const oldMessage = messages.find(message => message.id === messageToUpdate.id);

    if(oldMessage) {
        const updatedAt = new Date().toString();

        // if a message has never been updated then use that value to set it was created then
        // otherwise persist the created value
        // this ensures the order in the array
        const updatedMessage = {
            id: messageToUpdate.id,
            created: messageToUpdate.created || messageToUpdate.last_updated,
            text: updatedText,
            last_updated: updatedAt
        };

        const index = messages.indexOf(oldMessage);

        messages.splice(index, 1, updatedMessage);

        const newConversation = {
            ...conversation,
            last_updated: updatedAt,
            messages
        };

        setCurrentConversation(newConversation);

        // reset the currentMessage observable
        setCurrentMessage(null);
    }
}
