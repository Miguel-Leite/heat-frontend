import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import styles from './styles.module.scss';

import logoImg from '../../assets/logo.svg';
import { api } from '../../services/api';
import { TMessage } from '../../types/TMessage';

const messageQueue: TMessage[] = [];

const socket = io('http://localhost:4000');

socket.on('new_message', (newMessage: TMessage) => {
  messageQueue.push(newMessage)
});

export function MessageList () {
    const [messages, setMessages] = useState<TMessage[]>([])

    useEffect(()=>{
      const timer = setInterval(()=>{
        if (messageQueue.length > 0) {
          setMessages(prevState =>[
            messageQueue[0],
            prevState[0],
            prevState[1], 
          ].filter(Boolean))

          messageQueue.shift();
        }
      },3000);
    },[])

    useEffect(()=>{
        api.get<TMessage[]>('messages/last3').then(response => {
            setMessages(response.data)
        })
    },[])

    console.log(messages)

    return (
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="Dowhile 2022" />
            <ul className={styles.messageList}>
                { messages.map(message => (
                    <li className={styles.message} key={message.id}>
                        <p className={styles.messageContent}>{message.text}</p>
                        <div className={styles.messageUser}>
                            <div className={styles.userImage}>
                                <img src={message.user.avatar_url} alt={message.user.name} />
                            </div>
                            <span>{message.user.name}</span>
                        </div>
                    </li>
                )) }
            </ul>
        </div>
    )
}