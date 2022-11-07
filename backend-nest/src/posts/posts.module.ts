import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  providers: [PostsResolver, PostsService, PrismaService, UsersService],
})
export class PostsModule {}
