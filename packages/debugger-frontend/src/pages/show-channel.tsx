import {FC, ReactElement, useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useEventSource, useEventSourceListener} from "@react-nano/use-event-source";
import {useApiUrl} from "../hooks/use-api-url";
import {toast} from "react-toastify";
import {Message} from "../types/message";
// @ts-ignore
import ReactJson from 'react-json-view';

export const ShowChannelPage: FC = (): ReactElement => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const eventSourceUrl = useApiUrl('/channel/' + (id ?? '0'));
    const [eventSource, eventSourceStatus] = useEventSource(eventSourceUrl);
    const [messages, setMessages] = useState<Message[]>([]);
    const postUrl = useMemo(() => {
        return process.env.REACT_APP_API_URL + '/channel/' + id + '/message' ;
    }, [window.location, id]);

    useEventSourceListener(eventSource, ['message'], (event) => {
        setMessages([JSON.parse(event.data), ...messages]);
    }, [messages]);

    useEffect(() => {
        if (eventSourceStatus === 'error') {
            navigate('/');
            toast.error('This channel does not exist.');
        }
    }, [eventSourceStatus]);

    return (
        <div className="flex flex-col gap-5">
            {messages.length === 0 ?
                <div className="bg-white rounded-md shadow-sm p-4 flex flex-col relative">
                    <b>Post Message:</b> <em><code>{'curl -X POST -H "Content-Type: application/json" -d "{\\"content\\": {\\"message\\": \\"Hi!\\"}}" ' + postUrl}</code></em>
                </div>
                :
                null
            }
            {messages.reverse().map((message) => (
                <div key={message.id} className="bg-white rounded-md shadow-sm p-4 flex flex-col relative">
                    <ReactJson src={JSON.parse(message.content)} name={null} groupArraysAfterLength={10} enableClipboard={false} displayDataTypes={false}/>
                    <div className="ml-auto text-gray-400 absolute bottom-1 right-1 py-1 px-3">
                        <small>{new Date(message.createdAt).toLocaleDateString()}, </small>
                        <small>{new Date(message.createdAt).toLocaleTimeString()}</small>
                    </div>
                </div>
            ))}
        </div>
    );
};
