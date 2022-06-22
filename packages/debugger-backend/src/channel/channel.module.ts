import {Module} from '@nestjs/common';
import {ChannelService} from './channel.service';
import {ChannelController} from './channel.controller';
import {PrismaService} from "../common/service/prisma.service";
import {MessageService} from "../message/message.service";
import {TagService} from "../tag/tag.service";

@Module({
  providers: [ChannelService, TagService, PrismaService, MessageService],
  controllers: [ChannelController]
})
export class ChannelModule {}
