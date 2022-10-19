import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

import logoImg from '../../assets/logo.svg';
import { api } from '../../services/api';
import { TMessage } from '../../types/Message';

export function MessageList () {
    const [messages, setMessages] = useState<TMessage[]>([])

    useEffect(()=>{
        api.get<TMessage[]>('messages/last3').then(response => {
            setMessages(response.data)
        })
    },[])

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