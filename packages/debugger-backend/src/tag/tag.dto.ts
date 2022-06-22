import {IsString, MaxLength} from "class-validator";

export class CreateTagDto {
    @MaxLength(60, {message: 'Message ID cannot be longer than 60 characters.'})
    @IsString({message: 'Message ID must be a string.'})
    messageId: string;

    @MaxLength(60, {message: 'Message ID cannot be longer than 60 characters.'})
    @IsString({message: 'Message ID must be a string.'})
    channelId: string;

    @MaxLength(32, {message: 'Title cannot be longer than 32 characters.'})
    @MaxLength(3, {message: 'Title cannot be shorter than 3 characters.'})
    @IsString({message: 'Title must be a string.'})
    title: string;
}