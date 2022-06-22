import {FC, ReactElement, useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useEventSource, useEventSourceListener} from "@react-nano/use-event-source";
import {useApiUrl} from "../hooks/use-api-url";
import {toast} from "react-toastify";
import {Message} from "../types/message";
import stc from 'string-to-color';
// @ts-ignore
import ReactJson from 'react-json-view';
import {Tag} from "../types/tag";

export const ShowChannelPage: FC = (): ReactElement => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const eventSourceUrl = useApiUrl('/channel/' + (id ?? '0'));
    const [eventSource, eventSourceStatus] = useEventSource(eventSourceUrl);
    const [messages, setMessages] = useState<Message[]>([]);
    const [channelTags, setChannelTags] = useState<{[id: string]: Tag}>({});
    const postUrl = useMemo(() => {
        return process.env.REACT_APP_API_URL + '/channel/' + id + '/message' ;
    }, [window.location, id]);

    useEventSourceListener(eventSource, ['message'], (event) => {
        const message: Message = JSON.parse(event.data);
        setMessages([message, ...messages]);

        const oldChannelTags = Object.assign({}, channelTags);
        for (const tag of message.tags.map((tag) => tag.tag)) {
            if (!channelTags[tag.id]) {
                oldChannelTags[tag.id] = tag;
            }
        }
        setChannelTags(oldChannelTags);
    }, [messages]);

    useEffect(() => {
        if (eventSourceStatus === 'error') {
            navigate('/');
            toast.error('This channel does not exist.');
        }
    }, [eventSourceStatus]);

    useEffect(() => {
        console.log(channelTags);
    }, [channelTags]);

    return (
        <div className="flex flex-col gap-5">
            {messages.length === 0 ?
                <div className="bg-white rounded-md shadow-sm p-4 flex flex-col relative">
                    <b>Post Message:</b> <em><code>{'curl -X POST -H "Content-Type: application/json" -d "{\\"content\\": {\\"message\\": \\"Hi!\\"}}" ' + postUrl}</code></em>
                </div>
                :
                null
            }
            {messages.length ?
                <>
                    <div className="bg-white rounded-md shadow-sm p-4 flex flex-wrap gap-1">
                        <b className="mr-2">Tags:</b>
                        {Object.keys(channelTags).map((id) => channelTags[id]).map((tag) => (
                            <small key={tag.id} className="border-2 rounded-xl px-3" style={{backgroundColor: stc(tag.title) + '55', borderColor: stc(tag.title)}}>{tag.title} {}</small>
                        ))}
                    </div>
                    {messages.reverse().map((message) => (
                        <div key={message.id} className="bg-white rounded-md shadow-sm p-4 flex flex-col">
                            <ReactJson src={JSON.parse(message.content)} name={null} groupArraysAfterLength={10} enableClipboard={false} displayDataTypes={false}/>
                            <div className="flex gap-2 mt-2">
                                <div className="flex flex-wrap gap-1">
                                    {message.tags.map((tag) => tag.tag).map((tag) => (
                                        <small key={tag.id} className="border-2 rounded-xl px-3" style={{backgroundColor: stc(tag.title) + '55', borderColor: stc(tag.title)}}>{tag.title} {}</small>
                                    ))}
                                </div>
                                <div className="ml-auto text-gray-400">
                                    <small>{new Date(message.createdAt).toLocaleDateString()}, </small>
                                    <small>{new Date(message.createdAt).toLocaleTimeString()}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
                :
                null
            }
        </div>
    );
};
