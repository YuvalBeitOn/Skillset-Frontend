
import React, { Fragment, useState } from 'react'
import './MessagePreview.scss'

export default function MessagePreview({ message, modalIsOpen }) {

    const [isModalShowen, setModal] = useState(false)


    const openMessageModal = () => {
        if (modalIsOpen) return; // If it'd already open, not open again
        setModal((isModalShowen) => {
            return !isModalShowen;
        });
    }

    const closeMessageModal = () => {
        setModal(false)
    }

    const MessageModal = () => {
        return (
            <div className="message-modal flex column justify-center" >
                <MessagePreview message={message} modalIsOpen={true}></MessagePreview>
                <button className="cls-btn" onClick={closeMessageModal}><i className="fas fa-times"></i></button>
            </div >
        )
    }

    return (
        <Fragment>
            <li className="message-preview flex align-center">
                <img className="message-img" src={message.userImgUrl} alt="message-img" onClick={openMessageModal} />
                <div className="content flex column space-evenly">
                    <h4 className="msg-email">{message.userEmail}</h4>
                    <p className="msg-content">{message.content}</p>
                </div>
                <span className="msg-time">{message.createdAt}</span>
            </li>
            {isModalShowen && <MessageModal></MessageModal>}
            {isModalShowen && <div className="back-drop-layer" onClick={closeMessageModal}></div>}
        </Fragment>
    )
}

