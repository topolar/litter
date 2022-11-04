import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";
import {schema} from "./schema";
import * as dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client';
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

const prisma = new PrismaClient({log: ['query']});

prisma.$use(async (params, next) => {
    const before = Date.now()
    const result = await next(params)
    const after = Date.now()
    console.log(`Query ${params.model}.${params.action} took ${after - before}ms`)
    return result
})

const MONGODB_URI=process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error('Please add your MONGODB_URI to .env')
}

const startApolloServer = async(app, httpServer) => {
    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        introspection:true,
        context: async () => {
            await prisma.$connect();
            console.log('🎉 connected to database successfully');
            return { prisma }
        },
    });
    await server.start();
    server.applyMiddleware({ app , path:'/'});
}

startApolloServer(app, httpServer).then();

export default httpServer;