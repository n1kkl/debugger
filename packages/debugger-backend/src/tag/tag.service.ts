import { Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';
import {CreateTagDto} from "./tag.dto";
import {PrismaService} from "../common/service/prisma.service";

@Injectable()
export class TagService {
    constructor(
        private prismaService: PrismaService
    ) {
    }

    public async createOrUpdateTag(data: CreateTagDto): Promise<Tag> {
        if (await this.prismaService.tag.findUnique({where: {title: data.title.trim()}})) {
            return await this.prismaService.tag.update({
                where: {title: data.title.trim()},
                data: {
                    title: data.title.trim(),
                    channelId: data.channelId,
                    messages: {
                        create: {
                            messageId: data.messageId
                        }
                    }
                }
            });
        }
        return await this.prismaService.tag.create({
            data: {
                title: data.title.trim(),
                channelId: data.channelId,
                messages: {
                    create: {
                        messageId: data.messageId
                    }
                }
            }
        });
    }
}
