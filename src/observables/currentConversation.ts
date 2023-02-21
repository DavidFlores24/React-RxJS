import {BehaviorSubject, distinctUntilChanged} from "rxjs";
import {Conversation} from "../models/Conversation";
import {Message} from "../models/Message";

const currentConversationBehavior$ = new BehaviorSubject<Conversation | null>(null);

export function setCurrentConversation(newConversation: Conversation): void {
    currentConversationBehavior$.next(newConversation);
}

export function comparator(previous: Conversation | null, next: Conversation | Message | null): boolean {
    return previous?.id === next?.id
        && previous?.last_updated === next?.last_updated
}

export const currentConversation$ = currentConversationBehavior$.pipe(
    distinctUntilChanged(comparator)
)
