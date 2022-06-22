import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ChannelModule } from './channel/channel.module';
import { MessageModule } from './message/message.module';
import {TagModule} from "./tag/tag.module";

@Module({
  imports: [ChannelModule, MessageModule, TagModule, EventEmitterModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
