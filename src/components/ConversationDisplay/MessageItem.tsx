import {Message} from "../../models/Message";
import React, {useCallback} from "react";
import {setCurrentMessage} from "../../observables/currentMessage";
import "./styles.css";

type MessageItemProps = {
    message: Message,
    active: boolean
}

export function MessageItem({message, active}: MessageItemProps) {
    const { last_updated, text } = message;

    const handlePress = useCallback((evt: React.MouseEvent) => {
        setCurrentMessage(message);
        evt.stopPropagation();
    }, [message]);

    const classes = ["message-item"];

    if(active) {
        classes.push("message-item-active");
    }

    return (
        <div className={classes.join(" ")} onClick={handlePress}>
            <div className={"date"}>
                {new Date(last_updated).toLocaleDateString("en-GB")}
            </div>
            <div className={"text"}>
                {text}
            </div>
        </div>
    )
}
