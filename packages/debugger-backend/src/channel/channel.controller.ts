import {Body, Controller, Get, HttpException, Param, Post, Query, Sse} from '@nestjs/common';
import {CreateChannelDto, GenerateSlugQueryDto} from "./channel.dto";
import {Channel, Message} from "@prisma/client";
import {ChannelService} from "./channel.service";
import {map, merge, interval, Observable} from "rxjs";
import {ServerEvent} from "../common/types/server-event.type";
import {CreateMessageDto} from "../message/message.dto";
import {MessageService} from "../message/message.service";

@Controller('channel')
export class ChannelController {
    constructor(
        private channelService: ChannelService,
        private messageService: MessageService,
    ) {
    }

    @Post()
    async createChannel(@Body() data: CreateChannelDto): Promise<Channel> {
        return await this.channelService.createChannel(data);
    }

    @Post(':slug/message')
    async createMessage(@Param('slug') slug: string, @Body() data: CreateMessageDto): Promise<Message> {
        const channel = await this.channelService.findChannel(slug);
        if (!channel) throw new HttpException('This channel does not exist.', 404);
        return await this.messageService.createMessage(channel.id, data);
    }

    @Get('generate-slug')
    async generateSlug(@Query() query: GenerateSlugQueryDto): Promise<{ slug: string }> {
        return {
            slug: await this.channelService.generateSlug(query.title)
        };
    }

    @Sse(':slug')
    async messageEvent(@Param('slug') slug: string): Promise<Observable<ServerEvent<Message | string>>> {
        const channel = await this.channelService.findChannel(slug);
        if (!channel) throw new HttpException('This channel does not exist.', 404);
        
        return merge(
            this.channelService.observeMessages(channel.id).pipe(map((message) => ({
                data: message
            }))),
            interval(5000).pipe(map(_) => ({data: 'ok'}))
        );
    }
}
