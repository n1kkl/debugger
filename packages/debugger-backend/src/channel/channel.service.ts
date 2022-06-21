import {Injectable} from '@nestjs/common';
import {Channel, Message} from "@prisma/client";
import {PrismaService} from "../common/service/prisma.service";
import {CreateChannelDto} from "./channel.dto";
import * as urlSlug from 'url-slug';
import {Observable} from "rxjs";
import {EventEmitter2} from "@nestjs/event-emitter";

@Injectable()
export class ChannelService {
    constructor(
        private prismaService: PrismaService,
        private eventEmitter: EventEmitter2
    ) {
    }

    public async generateSlug(title: string): Promise<string> {
        let channel, slug;
        let slugTitle = urlSlug.convert(title);
        let slugNumber = 0;

        do {
            slug = slugTitle + (slugNumber ? '-' + slugNumber : '');
            channel = await this.prismaService.channel.findUnique({
                where: {slug}
            });
            if (channel) {
                slugNumber++;
            }
        } while (channel);

        return slug;
    }

    public async createChannel(data: CreateChannelDto): Promise<Channel> {
        return await this.prismaService.channel.create({
            data: {
                title: data.title,
                slug: await this.generateSlug(data.title)
            }
        });
    }

    public async findChannel(slugOrId: string): Promise<Channel> {
        return await this.prismaService.channel.findFirst({
            where: {
                OR: [
                    {id: slugOrId},
                    {slug: slugOrId},
                ]
            }
        });
    }

    public observeMessages(channelId: string): Observable<Message> {
        return new Observable<Message>((observer) => {
            this.eventEmitter.on('channel.' + channelId + '.message', (message: Message) => {
                observer.next(message);
            });
        });
    }
}
