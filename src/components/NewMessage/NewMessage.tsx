import {useObservable} from "../../hooks/useObservable";
import {currentConversation$} from "../../observables/currentConversation";
import {useCallback, useEffect, useRef, useState} from "react";
import {addMessageToConversation} from "../../utils/addMessageToConversation";
import {currentMessage$, updateMessage} from "../../observables/currentMessage";
import './styles.css';

export function NewMessage(): JSX.Element {
    const currentConversation = useObservable(currentConversation$, null);
    const currentMessage = useObservable(currentMessage$, null);

    const [newMessage, setNewMessage] = useState<string | undefined>();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const sendText = useCallback(() => {
        if (!newMessage || newMessage === "") {
            return;
        }

        if(currentConversation) {
            if(currentMessage) {
                updateMessage(currentConversation, currentMessage, newMessage);
            } else {
                addMessageToConversation(currentConversation, newMessage);
            }
        }

        setNewMessage(undefined);

        if(inputRef.current) {
            inputRef.current.value = "";
        }

    }, [newMessage, currentConversation, currentMessage]);

    const handlePress = useCallback((evt: React.MouseEvent) => {
        evt.stopPropagation();
    }, []);

    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.value = currentMessage ? currentMessage.text : ""
        }
    }, [currentMessage])


    return (
        <div className={"new-message"}>
            <input
                className={"new-message-input"}
                ref={inputRef}
                placeholder={"type a new message"}
                onChange={(evt) => setNewMessage(evt.target.value)}
                onClick={handlePress}
            />
            <button onClick={sendText} className={"new-message-button"}>
                {currentMessage ? "Edit" : "Send"}
            </button>
        </div>
    )
}
