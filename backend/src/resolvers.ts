import {Resolvers} from './__generated__/graphql';
import {checkPostAccessById, getUser, mutationHandler, requireRole} from "./resolvers-utils";

export const resolvers: Resolvers = {
    Query: {
        posts: (_,__,{prisma}) => prisma.post.findMany({orderBy:[{ createdAt : 'desc' }]}),
        post: (_,{id},{prisma})=> prisma.post.findUnique({where:{id}}),

        users:async(_,__,context) => { await requireRole(context,'admin');return context.prisma.user.findMany()},
        user:(_, {id},{prisma}) => prisma.user.findUnique({where:{id}}),
    },
    Mutation: {
        // POST mutations
        addPost:async(_, {input}, context)=>{
          const user=await getUser(context);
          return mutationHandler('post', ()=>context.prisma.post.create({data: {...input,userId:user?.id}}));
        },
        updatePost:async(_,{id,input}, context)=>{
          await checkPostAccessById(context,id);
          return mutationHandler('post', ()=> context.prisma.post.update({ where:{id},data:{...input}}))
        },
        deletePost:async(_,{id}, context)=>{
          await checkPostAccessById(context,id);
          return mutationHandler('post', ()=> context.prisma.post.delete({ where:{id}}));
        },

        // USER mutations
        addUser:async(_,{input},context)=>{
          await requireRole(context,'admin');
          return mutationHandler('user', ()=>
              context.prisma.user.create({data:{...input}})
          )
        }
    },
    Post: {
        user:(post,__,{prisma}) => post.userId?prisma.user.findUnique({where:{id:post.userId}}):null
    }
}