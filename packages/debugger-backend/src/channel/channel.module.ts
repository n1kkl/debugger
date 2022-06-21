import {Module} from '@nestjs/common';
import {ChannelService} from './channel.service';
import {ChannelController} from './channel.controller';
import {PrismaService} from "../common/service/prisma.service";
import {MessageService} from "../message/message.service";

@Module({
  providers: [ChannelService, PrismaService, MessageService],
  controllers: [ChannelController]
})
export class ChannelModule {}
