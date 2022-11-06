import {MyContext} from "./context";
import {User} from "./__generated__/graphql";
import {GraphQLError} from "graphql";

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

export async function requireRole(context:MyContext,role:string):Promise<void> {
	const user=await getUser(context);
	if(!user) {
		throw new GraphQLError('Uživatel musí být přihlášen', {extensions: {code: 'UNAUTHENTICATED', http: {status: 401},},});
	}

	if(!user.roles.find((userRole)=>userRole===role)) {
		throw new GraphQLError('Přístup odepřen', {extensions: { code: 'FORBIDDEN', http: { status: 403 },},});
	}
}

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
