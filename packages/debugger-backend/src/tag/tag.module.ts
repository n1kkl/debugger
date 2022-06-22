import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import {PrismaService} from "../common/service/prisma.service";

@Module({
  providers: [TagService, PrismaService]
})
export class TagModule {}
