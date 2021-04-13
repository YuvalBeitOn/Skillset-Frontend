
import React, { useState } from 'react'
import './MessageForm.scss'
import { messageService } from '../../services/MessageService'
import moment from 'moment'

export default function MessageForm({ loadMessages }) { 

    const [message, setMessage] = useState({
        userEmail: '',
        userImgUrl: '',
        content: '',
        createdAt: '' 
    });

    const [isModalShowen, setModal] = useState(false)


    const toggleModal = () => {
        setModal((isModalShowen) => {
            return !isModalShowen;
        });
    }

    const onEmailChange = (ev) => {
        setMessage({ ...message, userEmail: ev.target.value });
    };

    const onContentChange = (ev) => {
        setMessage({ ...message, content: ev.target.value });
    };

    const onSubmit = async (ev) => {
        ev.preventDefault();

        if (message.userEmail === '' || message.content === '') {
            toggleModal()
            return;
        }

        let { userEmail, content, userImgUrl, createdAt } = message;
        userImgUrl = messageService.getUserImg(userEmail)
        createdAt =  moment(Date.now()).format('lll');
        const newMessage = { userEmail, content, userImgUrl, createdAt };
        await messageService.addMessage(newMessage)
        loadMessages()
        cleanInputs()
    }

    const cleanInputs = () => {
        setMessage({ ...message, userEmail: '', content: '' });
    }

    const RejectModal = () => {
        return (
            <div className="reject-modal flex column align-center justify-center" >
                <p>Please fill in all the required fields</p>
                <button className="cls-btn" onClick={toggleModal}>Ok</button>
            </div >
        )
    }

    return (
        <section className="message-form-container flex justify-center">
            <form className="message-form flex column justidy-center">
                <input
                    className="email-input"
                    type="text"
                    placeholder="Email"
                    name="userEmail"
                    value={message.userEmail}
                    spellCheck="false"
                    onChange={onEmailChange}>
                </input>
                <textarea
                    className="content-box"
                    type="text"
                    placeholder="Message"
                    name="content"
                    value={message.content}
                    rows="4"
                    spellCheck="false"
                    onChange={onContentChange}>
                </textarea>
                <button className="submit-btn" type="submit"  onClick={onSubmit}>SUBMIT</button>
            </form>
            {isModalShowen && <RejectModal></RejectModal>}
            {isModalShowen && <div className="back-drop-layer"></div>}

        </section>
    )
}

