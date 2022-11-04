import {makeExecutableSchema} from "@graphql-tools/schema";
import {resolvers} from "./resolvers";
import {readFileSync} from "fs";

const typeDefs = readFileSync(__dirname+'/../schema.graphql', { encoding: 'utf-8' });

export const schema=makeExecutableSchema({
    typeDefs,resolvers
});