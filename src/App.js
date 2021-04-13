import React, { useState, useEffect, useRef } from 'react'
import { messageService } from './services/MessageService'
import MessageForm from './cmps/MessageForm/MessageForm'
import MessageList from './cmps/MessageList/MessageList'
import './App.scss'
import './scss/global.scss'

export default function App() {

  const [messages, setMessages] = useState([])
  const inputRef = useRef();
  let timeOutId = null;

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async (searchTerm) => {
    const messagesList = await messageService.getMessages(searchTerm)
    setMessages(messagesList)
  }

  const handleFilterChange = () => {
    const value = inputRef.current.value.trim();
    if (timeOutId) clearTimeout(timeOutId) // debounce load messages
    timeOutId = setTimeout(() => {
      loadMessages(value)
    }, 1000)
  }

  return (
    <div className="App flex column align-center">
      <MessageForm loadMessages={loadMessages}></MessageForm>
      <input
        className="filter-input"
        placeholder="Search..."
        type="search" ref={inputRef}
        spellCheck="false"
        onInput={handleFilterChange} >
      </input>
      {messages.length > 0 && <MessageList messages={messages}></MessageList>}
    </div>
  );
}


