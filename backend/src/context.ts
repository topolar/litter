import { PrismaClient } from '@prisma/client';

export type UserContext = {
    uid:string
    name:string
    image:string
    email:string
}

export interface MyContext {
    prisma: PrismaClient;
    user: UserContext;
}