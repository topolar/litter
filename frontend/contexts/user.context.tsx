import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
import {User} from "@firebase/auth";
import {onAuthStateChangedListener} from "../utils/firebase.utils";

interface AppContextInterface {
	setCurrentUser: Dispatch<SetStateAction<User|null>>
	currentUser: User|null,
}

export const UserContext = createContext<AppContextInterface | null>(null);

export const  UserProvider: React.FC<{ children:ReactNode }> = ({children}) => {
	const [currentUser, setCurrentUser] = useState<User|null>(null);
	const value = { currentUser, setCurrentUser };
	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};