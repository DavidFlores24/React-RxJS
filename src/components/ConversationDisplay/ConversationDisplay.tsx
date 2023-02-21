import {useObservable} from "../../hooks/useObservable";
import {currentConversation$} from "../../observables/currentConversation";
import {MessageItem} from "./MessageItem";
import {Message} from "../../models/Message";
import {useCallback, useEffect, useState} from "react";
import {LastUpdatedOrder} from "../../enums/LastUpdatedOrder";
import {sortMessages} from "../../utils/sortMessages";
import {currentMessage$} from "../../observables/currentMessage";
import './styles.css';

export function ConversationDisplay(): JSX.Element {
    const currentConversation = useObservable(currentConversation$, null);
    const currentMessage = useObservable(currentMessage$, null);

    const [sortedMessages, setSortedMessages] = useState<Message[]>([]);

    useEffect(() => {
        if(currentConversation) {
            setSortedMessages(sortMessages(currentConversation.messages, LastUpdatedOrder.OLDEST_FIRST));
        }
    }, [currentConversation]);

    const isCurrentMessageActive = useCallback((messageId: string )=> (
        currentMessage?.id === messageId
    ), [currentMessage]);


    if(sortedMessages.length > 0) {
        return (
            <div className={"conversations-container"}>
                {sortedMessages.map((message, index) => (
                    <MessageItem
                        key={index}
                        message={message}
                        active={isCurrentMessageActive(message.id)}
                    />)
                )}
            </div>
        )
    }

    return <></>
}
