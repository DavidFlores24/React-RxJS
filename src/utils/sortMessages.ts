import {LastUpdatedOrder} from "../enums/LastUpdatedOrder";
import {Message} from "../models/Message";

export function sortMessages(messages: Message[], order: LastUpdatedOrder) {
    if (order === LastUpdatedOrder.NEWEST_FIRST) {
        return messages.sort((a, b) => {
            const timeA = a.created || a.last_updated;
            const timeB = b.created || b.last_updated;

            return new Date(timeB).getTime() - new Date(timeA).getTime();
        });
    }

    return messages.sort((a, b) => {
        const timeA = a.created || a.last_updated;
        const timeB = b.created || b.last_updated;

        return new Date(timeA).getTime() - new Date(timeB).getTime();
    })
}
