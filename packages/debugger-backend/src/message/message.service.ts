import {Injectable} from '@nestjs/common';
import {Message} from "@prisma/client";
import {CreateMessageDto} from "./message.dto";
import {PrismaService} from "../common/service/prisma.service";
import {EventEmitter2} from "@nestjs/event-emitter";

@Injectable()
export class MessageService {
    constructor(
        private prismaService: PrismaService,
        private eventEmitter: EventEmitter2
    ) {
    }

    public async createMessage(channelId: string, data: CreateMessageDto): Promise<Message> {
        const message = await this.prismaService.message.create({
            data: {
                content: JSON.stringify(data.content),
                channelId: channelId
            }
        });
        this.eventEmitter.emit('channel.' + channelId + '.message', message);
        return message;
    }
}
