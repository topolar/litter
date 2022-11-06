import {Resolvers} from './__generated__/graphql';
import {MyContext} from "./context";
import {User} from "./__generated__/graphql";
import {GraphQLError} from "graphql";

/**
 * Returns User object according to data in Context. If canCreate is true, then new User will be stored automatically
 * @param context
 * @param canCreate
 */
export async function getUser(context:MyContext,canCreate:boolean=true):Promise<User|null> {
  if(!context.user) {
    return null;
  }
  const {uid} = context.user;
  if(!uid) {
    return null;
  }

  const user=await context.prisma.user.findUnique({where: {uid}});
  if(!user) {
    if(!canCreate) {
      return null;
    }
    // If user not exists, then create one
    return context.prisma.user.create({data:{...context.user}});
  }
  return user;
}

/**
 * Check required role for actual context. Throws error if no signed user or user has not required roles.
 * @param context
 * @param role
 */
export async function requireRole(context:MyContext,role:string):Promise<void> {
  const user=await getUser(context);
  if(!user) {
    throw new GraphQLError('Uživatel musí být přihlášen', {extensions: {code: 'UNAUTHENTICATED', http: {status: 401},},});
  }

  if(!user.roles.find((userRole)=>userRole===role)) {
    throw new GraphQLError('Přístup odepřen', {extensions: { code: 'FORBIDDEN', http: { status: 403 },},});
  }
}

/**
 * Check if actual user can modify post defined by id
 * @param context
 * @param id
 */
export async function checkPostAccessById(context:MyContext,id:string) {
  const post=await context.prisma.post.findUnique({where:{id}});
  if(!post) {
    error404();
  }
  // Check access to Post. Post can be deleted if:
  // 1) post is anonymous
  // 2) post is created by same user
  // 3) user has admin role
  if(post.userId) {
    const user=await getUser(context);
    if(user?.id!==post.userId) {
      await requireRole(context,'admin');
    }
  }
}

/**
 * Handling results of mutations
 * @param name
 * @param exec
 */
export async function mutationHandler(name:string,exec:()=>any) {
  try {
    return {success: true, [name]:await exec()};
  } catch (e) {
    console.log('Error!',e.meta);
    return {success: false, message:e.meta.message || e.meta.query_validation_error || e.message}
  }
}

export function error404() {
  throw new GraphQLError('Item not found', {extensions: { code: 'NOT_FOUND', http: { status: 404 },},});
}


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