import './ChatSession.scss';
import React, {useEffect, useState, useRef} from 'react';
import {uuidV4} from '../../utils/utils';

export interface ChatSessionProps {

}

export interface User {
    name: string,
    color: string,
}

export type Message = {
    id: string,
    body: string,
    user: User,
}

const randomColor = (): string => {
    const colors = ['blue', 'red', 'yellow', 'gray', 'green', 'green', 'green', 'green', 'green', 'green'];
    const randomIndex = Math.floor(Math.random() * 10);
    return colors[randomIndex];
}

export const ChatSession: React.FC<ChatSessionProps> = (props) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const lastRef = useRef<HTMLLIElement | null>(null);

    const handleScrollToLast = () => {
        if (lastRef) {
            // checking issue in WebStorm
            // @ts-ignore
            lastRef.current?.scrollIntoView(true);
        }
    }

    useEffect(() => {
        console.log('loaded');

        const intervalId = setInterval(() => {
            const newMessage: Message = {
                id: uuidV4(),
                body: `This is a message ${uuidV4()}`,
                user: {
                    name: uuidV4(),
                    color: randomColor(),
                }
            };
            if (messages.length < 100) setMessages((m) => [...m, newMessage]);
            else clearInterval(intervalId);
        }, 2000);

        return () => clearInterval(intervalId);

    }, []);

    return <section className={`chat-session`}>
        <ul className={`messages`}>
            {
                messages.map((message) => {
                    const {id, body, user: {name, color}} = message;
                    return <li key={id} ref={lastRef} className={`message`}>
                        <span style={{color}}>{name}</span><span>{body}</span>
                    </li>
                })
            }
        </ul>
        <button className={`btn-to-last`} onClick={handleScrollToLast}>Scroll</button>
    </section>
}