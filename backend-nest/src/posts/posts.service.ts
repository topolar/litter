import { Injectable } from '@nestjs/common';
import { Post, PostInput } from '../graphql';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  create(postInput: PostInput): Promise<Post> {
    return this.prisma.post.create({ data: postInput });
  }

  findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({ orderBy: [{ createdAt: 'desc' }] });
  }

  findOne(id: string): Promise<Post> {
    return this.prisma.post.findUnique({ where: { id } });
  }

  update(id: string, postInput: PostInput) {
    return this.prisma.post.update({ where: { id }, data: postInput });
  }

  remove(id: string) {
    return this.prisma.post.delete({ where: { id } });
  }
}
