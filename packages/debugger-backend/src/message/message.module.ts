import {Module} from '@nestjs/common';
import {MessageService} from './message.service';
import {ChannelService} from "../channel/channel.service";
import {PrismaService} from "../common/service/prisma.service";
import {TagService} from "../tag/tag.service";

@Module({
  controllers: [],
  providers: [MessageService, PrismaService, ChannelService, TagService]
})
export class MessageModule {}
