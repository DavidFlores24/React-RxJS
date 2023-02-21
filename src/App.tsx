import React, {useCallback} from 'react';
import {Sidebar} from "./components/Sidebar/Sidebar";
import {ConversationDisplay} from "./components/ConversationDisplay/ConversationDisplay";
import './App.css';

function App() {
  return (
    <div className="App">
      <Sidebar/>
        <div className="chat-display">
            <ConversationDisplay />
        </div>
    </div>
  );
}

export default App;
