import React, {useCallback} from 'react';
import {Sidebar} from "./components/Sidebar/Sidebar";
import {ConversationDisplay} from "./components/ConversationDisplay/ConversationDisplay";
import {NewMessage} from "./components/NewMessage/NewMessage";
import './App.css';

function App() {
  return (
    <div className="App">
      <Sidebar/>
        <div className="chat-display">
            <ConversationDisplay />
            <NewMessage />
        </div>
    </div>
  );
}

export default App;
