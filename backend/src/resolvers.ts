import {Resolvers} from './__generated__/graphql';

async function mutationHandler(name,exec:()=>any) {
    try {
        console.log('execute mutation for '+name)
        return {success: true, [name]:await exec()};
    } catch (e) {
        console.log('Error!',e.meta);
        return {success: false, message:e.meta.message || e.meta.query_validation_error || e.message}
    }
}

export const resolvers: Resolvers = {
    Query: {
        posts: (_,__,{prisma}) => prisma.post.findMany({orderBy:[{ createdAt : 'desc' }]}),
        post: (_,{id},{prisma})=> prisma.post.findUnique({where:{id:id}}),

        users:(_,__,{prisma}) => prisma.user.findMany(),
        user:(_, {id},{prisma}) => prisma.user.findUnique({where:{id:id}}),
    },
    Mutation: {
        // POST mutations
        addPost:(_, {input}, {prisma})=>mutationHandler('post',
            ()=>
                prisma.post.create({ data: {
                    text:input.text,
                    image:input.image??undefined,
                    userId:input.userId??undefined
                }})
        ),
        updatePost:async(_,{id,input}, {prisma})=>mutationHandler('post',
           ()=>
               prisma.post.update({ where:{id},data:{ text:input.text,image:input.image,userId:input.userId}})
        ),
        deletePost:async(_,{id}, {prisma})=>mutationHandler('post',
            ()=>
                prisma.post.delete({ where:{id}})
        ),

        // USER mutations
        addUser:(_,{input},{prisma})=>mutationHandler('user',
            ()=>
                prisma.user.create({data:{
                    name:input.name,
                    image:input.image??undefined,
                    email:input.email??undefined,
                }})
            )
    },
    Post: {
        user:(post,__,{prisma}) => post.userId?prisma.user.findUnique({where:{id:post.userId}}):null
    }
}