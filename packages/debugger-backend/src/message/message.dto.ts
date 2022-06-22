import {IsArray, IsNotEmptyObject, IsObject, IsOptional, IsString} from "class-validator";

export class CreateMessageDto {
    @IsNotEmptyObject({nullable: false}, {message: 'Content cannot be empty.'})
    @IsObject({message: 'Content must be in JSON format.'})
    content: object;

    @IsString({message: 'Tag must be a string.', each: true})
    @IsArray({message: 'Tags must be in an array.'})
    @IsOptional()
    tags?: string[];
}