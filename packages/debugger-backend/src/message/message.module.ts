import {Module} from '@nestjs/common';
import {MessageService} from './message.service';
import {ChannelService} from "../channel/channel.service";
import {PrismaService} from "../common/service/prisma.service";

@Module({
  controllers: [],
  providers: [MessageService, PrismaService, ChannelService]
})
export class MessageModule {}
