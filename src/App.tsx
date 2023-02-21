import React, {useCallback} from 'react';
import {Sidebar} from "./components/Sidebar/Sidebar";
import {ConversationDisplay} from "./components/ConversationDisplay/ConversationDisplay";
import {NewMessage} from "./components/NewMessage/NewMessage";
import './App.css';
import {setCurrentMessage} from "./observables/currentMessage";

function App() {
    // Setting this here to reset the current message
    // and allow users to send new message again
    const handlePress = useCallback(() => {
        setCurrentMessage(null);
    }, []);

  return (
    <div className="App" onClick={handlePress}>
      <Sidebar/>
        <div className="chat-display">
            <ConversationDisplay />
            <NewMessage />
        </div>
    </div>
  );
}

export default App;
