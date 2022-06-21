import {IsNotEmptyObject, IsObject} from "class-validator";

export class CreateMessageDto {
    @IsObject({message: 'Content must be in JSON format.'})
    @IsNotEmptyObject({nullable: false}, {message: 'Content cannot be empty.'})
    content: object;
}