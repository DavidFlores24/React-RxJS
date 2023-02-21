import {BehaviorSubject} from "rxjs";
import {Conversation} from "../models/Conversation";
import data from '../data.json';

export const conversations$ = new BehaviorSubject<Conversation[]>(data);

function setConversations(updatedConversations: Conversation[]) {
    conversations$.next(updatedConversations);
}

// @TODO this could be done better so that we don't have to pass the array again
// by subscribing in a HOC, but for time sake leaving as is
export function saveConversation(newConversation: Conversation, allConversations: Conversation[]) {
    const oldConversation = allConversations.find(conversation => conversation.id === newConversation.id);

    if (oldConversation) {
        const updatedConversations = allConversations;
        const index = allConversations.indexOf(oldConversation);
        updatedConversations.splice(index, 1, newConversation);

        setConversations(updatedConversations);
    }
}
