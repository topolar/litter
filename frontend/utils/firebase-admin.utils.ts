import admin from 'firebase-admin';
import jwt from 'jsonwebtoken';

const FIREBASE_ADMIN=process.env.FIREBASE_ADMIN??false;
const JWT_SECRET=process.env.JWT_SECRET??'';
if(!FIREBASE_ADMIN || !JWT_SECRET)
	throw new Error('Please define FIREBASE_ADMIN and JWT_SECRET');

const cert=JSON.parse(FIREBASE_ADMIN);

if (admin.apps.length === 0) {
	admin.initializeApp({credential: admin.credential.cert(cert)}, 'app');
}
const app=admin.apps[0]!;

export const auth=app.auth();

export const verifyFirebaseUserTokenAndMakeJWT = async (token:string):Promise<string> => {
	try {
		console.log('verifyFirebaseUserToken');
		const decodedToken = await auth.verifyIdToken(token);
		const uid=decodedToken.uid;
		const user=await auth.getUser(uid);
		return jwt.sign({
			exp: Math.floor(Date.now() / 1000) + (31 * 24 * 60 * 60),
			data: {
				uid,
				name: user.displayName,
				image: user.photoURL,
				email: user.email
			}
		}, JWT_SECRET);
	} catch (e) {
		console.log(e)
	}
	return '';
}