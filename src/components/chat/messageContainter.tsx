import { useEffect, useRef } from "react";
import Message from "./message"


const MessageContainer = () => {
    const messages = [{ message: "hi", date: "hoy", sentByGTP: true }, { message: "hi", date: "hoy", sentByGTP: true }, { message: "hi", date: "hoy", sentByGTP: true }, { message: "hi 22de", date: "hoy", sentByGTP: false }, { message: "hi 22de", date: "hoy", sentByGTP: false }, { message: "hi 22de", date: "hoy", sentByGTP: false }, { message: "hi", date: "hoy", sentByGTP: true }, { message: "hi 22de", date: "hoy", sentByGTP: false }, { message: "hi", date: "hoy", sentByGTP: true }, { message: "hi 22de", date: "hoy", sentByGTP: false }, { message: "hi", date: "hoy", sentByGTP: true }, { message: "hi 22de", date: "hoy", sentByGTP: false }, { message: "hi", date: "hoy", sentByGTP: true }, { message: "hi", date: "hoy", sentByGTP: true }, { message: "hi 22de", date: "hoy", sentByGTP: false }, { message: "hi", date: "hoy", sentByGTP: true }, { message: "hi 22de", date: "hoy", sentByGTP: false }, { message: "hi 22de", date: "hoy", sentByGTP: true }, { message: "hi", date: "hoy", sentByGTP: true }, { message: "hi 22de", date: "hoy", sentByGTP: false }]
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef?.current?.scrollIntoView();

    }, []);


    return (
        <>
            <div className="h-full pr-32 pl-10 pb-10 bg-gray-100 overflow-y-auto">
                <div className="font-bold text-gray-900">
                    Chat
                </div>

                <div className="text-gray-500 pb-1">
                    Chat bot for queries. Find, summarize, anilize information and more.
                </div>

                <div className="h-full mb-10 flex-col pb-10">
                    {messages.map((message, key) => (
                        <Message message={message.message} key={key} date={message.date} sentByGTP={message.sentByGTP} />
                    ))}
                </div>


            </div>
        </>
    )
}

export default MessageContainer