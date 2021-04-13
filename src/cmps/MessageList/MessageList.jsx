
import React from 'react'
import './MessageList.scss'
import MessagePreview from '../MessagePreview/MessagePreview'

export default function MessageList({ messages }) {


    return (
        <ul className="message-list clean-list">
            {messages.map((message) => {
                return (
                    <MessagePreview key={message._id} message={message}></MessagePreview>
                )
            })}
        </ul>
    )
}

