import {useCallback, useEffect, useState} from "react";
import {Conversation} from "../../models/Conversation";
import {useObservable} from "../../hooks/useObservable";
import {conversations$, saveConversation} from "../../observables/conversations";
import {sortConversations} from "../../utils/sortConversations";
import {LastUpdatedOrder} from "../../enums/LastUpdatedOrder";
import {currentConversation$, setCurrentConversation} from "../../observables/currentConversation";
import {SidebarItem} from "./SidebarItem";
import "./styles.css";

export function Sidebar(): JSX.Element {
    const conversations = useObservable<Conversation[]>(conversations$, []);
    const currentConversation = useObservable(currentConversation$, null);

    const [sortedConversations, setSortedConversations] = useState<Conversation[]>(conversations);

    useEffect(() => {
        setSortedConversations(sortConversations(conversations, LastUpdatedOrder.OLDEST_FIRST));
    }, [conversations])

    const selectConversation = useCallback((conversationID: string) => {
        const newConversation = conversations.find(conversation => conversation.id === conversationID);

        if (newConversation) {
            if(currentConversation) {
                // ensure that any changes to the current conversation are saved globally
                // before opening a new conversation
                saveConversation(currentConversation, conversations);
            }

            setCurrentConversation(newConversation);
        }
    }, [conversations, currentConversation]);

    const isCurrentItemActive = useCallback((conversationId: string) => (
        currentConversation?.id === conversationId
    ), [currentConversation])


    return (
        <div className={"sidebar"}>
            <div>
                <h1>Chats</h1>
            </div>
            <ul className={"conversations-list"}>
            {sortedConversations.map((conversation, index) => (
                <SidebarItem
                    key={index}
                    title={conversation.name}
                    handlePress={() => selectConversation(conversation.id)}
                    active={isCurrentItemActive(conversation.id)}
                />
            ))}
            </ul>
        </div>
    )
}
