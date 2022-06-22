import {Tag} from "./tag";

export type Message = {
    id: string;
    content: string;
    channelId: string;
    createdAt: string;
    updatedAt: string;
    tags: {
        tag: Tag
    }[]
};