import {IsString, MaxLength, MinLength} from "class-validator";

export class CreateChannelDto {
    @MaxLength(32, {message: 'Title must be shorter than 32 characters.'})
    @MinLength(4, {message: 'Title must be at least 4 characters long.'})
    @IsString({message: 'Title must be a string.'})
    title: string;
}

export class GenerateSlugQueryDto {
    @MaxLength(32, {message: 'Title must be shorter than 32 characters.'})
    @MinLength(4, {message: 'Title must be at least 4 characters long.'})
    @IsString({message: 'Title must be a string.'})
    title: string;
}