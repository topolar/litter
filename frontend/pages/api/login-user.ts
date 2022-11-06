import type { NextApiRequest, NextApiResponse } from 'next'
import {verifyFirebaseUserTokenAndMakeJWT} from "../../utils/firebase-admin.utils";

type ResponseData = {
	jwt: string
}

/*
	Verify Firebase token and create user's JWT
	 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	console.log('login-user');
	const body=JSON.parse(req.body);
	const jwt=await verifyFirebaseUserTokenAndMakeJWT(body.token);

	if(jwt) {
		res.status(200).json({ jwt:jwt })
	} else {
		res.status(403).json({ jwt:'' })
	}
}