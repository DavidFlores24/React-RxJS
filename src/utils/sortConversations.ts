import {Conversation} from "../models/Conversation";
import {LastUpdatedOrder} from "../enums/LastUpdatedOrder";

export function sortConversations(conversations: Conversation[], order: LastUpdatedOrder) {
    if (order === LastUpdatedOrder.NEWEST_FIRST) {
        return conversations.sort((a, b) => (
            new Date(a.last_updated).getTime() - new Date(b.last_updated).getTime()
        ));
    }

    return conversations.sort((a, b) => (
        new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime()
    ))
}
