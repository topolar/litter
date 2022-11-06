import {createContext, ReactNode, useEffect, useState} from "react";
import {User} from "@firebase/auth";
import {getFirebaseUserToken, onAuthStateChangedListener, signOutWithGoogle} from "../utils/firebase.utils";
import jwt from 'jwt-decode'
import {usePersistedState} from "../hooks/usePersistentState";
import {setApolloClientBearer} from "../utils/apollo.utils";

type LoggedUser={
	uid:string;
	name:string;
	email:string;
	image:string;

}

interface AppContextInterface {
	setFirebaseUser: (user:User|null)=>void,
	user:LoggedUser|null;
}

export const UserContext = createContext<AppContextInterface | null>(null);

export const  UserProvider: React.FC<{ children:ReactNode }> = ({children}) => {
	const [userData,setUserData]=usePersistedState('userdata','');
	const [user,setUser]=useState<LoggedUser|null>(null);

	const setFirebaseUser = async(firebaseUser:User|null) => {
		if(firebaseUser===null) {
			if(user===null) return;
			// Delete user data
			await signOutWithGoogle();
			setUser(null);
			setUserData('');
			setApolloClientBearer('');
		} else {
			if(user && firebaseUser.uid===user.uid && firebaseUser.email===user.email && firebaseUser.photoURL===user.image) {
				return;
			}
			// Login new user
			try {
				const tokenId=await getFirebaseUserToken();
				const response=await fetch('/api/login-user',{method:'POST', body: JSON.stringify( { token:tokenId})});
				const json=await response.json();
				setUserData(JSON.stringify(json.jwt));
				setApolloClientBearer(json.jwt)
			} catch(error) {
				console.error(error);
			}
		}
	}

	useEffect(() => {
		return onAuthStateChangedListener((user) => {
			setFirebaseUser(user).then();
		});
	}, []);

	// Apply new userData
	useEffect(()=>{
		try {
			if(!userData) return;
			const json: any = jwt(userData);
			setUser({...json.data});
		} catch (e) {
			console.error(e);
			setUser(null);
		}
	},[userData]);

	const value = { user,setFirebaseUser };
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

