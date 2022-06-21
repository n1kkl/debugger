import {IsNotEmptyObject, IsObject} from "class-validator";

export class CreateMessageDto {
    @IsObject({message: 'Content must be in JSON format.'})
    @IsNotEmptyObject({nullable: false}, {message: 'The JSON object cannot be empty.'})
    content: object;
}