import {Injectable} from '@nestjs/common';
import {Message, Tag} from "@prisma/client";
import {CreateMessageDto} from "./message.dto";
import {PrismaService} from "../common/service/prisma.service";
import {EventEmitter2} from "@nestjs/event-emitter";
import {TagService} from "../tag/tag.service";

@Injectable()
export class MessageService {
    constructor(
        private prismaService: PrismaService,
        private tagService: TagService,
        private eventEmitter: EventEmitter2,
    ) {
    }

    public async createMessage(channelId: string, data: CreateMessageDto): Promise<Message> {
        let message = await this.prismaService.message.create({
            data: {
                content: JSON.stringify(data.content),
                channelId: channelId,
            }
        });
        for (const tag of data.tags ?? []) {
            await this.tagService.createOrUpdateTag({
                title: tag,
                messageId: message.id,
                channelId,
            })
        }
        message = await this.prismaService.message.findUnique({
            where: {id: message.id},
            include: {
                tags: {
                    select: {
                        tag: true
                    }
                }
            }
        });
        this.eventEmitter.emit('channel.' + channelId + '.message', message);
        return message;
    }
}
