import { Injectable } from '@nestjs/common';
import { UserInput } from '../graphql';
import { PrismaService } from '../prisma.service';
import { UserModel } from './users.model';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(userInput: UserInput) {
    return this.prisma.user.create({ data: userInput });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByUid(uid: string) {
    return this.prisma.user.findUnique({ where: { uid } });
  }

  update(id: string, userInput: UserInput) {
    return this.prisma.user.update({ where: { id }, data: userInput });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
