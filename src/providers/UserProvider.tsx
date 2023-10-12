import React from "react";
import { User } from "../Types/UserTypes";
import { useNavigate } from "react-router-dom";
import { db } from "../data/db";

export const UsersContext = React.createContext<any>([]);

export default function UsersProvider ({children}: {children: React.ReactNode}){
    const navigate = useNavigate();
    const [user, setUser] = React.useState<User | undefined>(db.users[0]);

    const getUser = () => {
        if (user) return navigate('/list');
        return navigate('/auth');
    }

    const login = (username: string, password: string) => {
        const user = db.users.find((user) => user.username === username)
        if (user && user.password === password) {
            setUser(user);
            return navigate('/list')
        }
        if (user && user.password !== password) return alert("Wrong password")
        return alert("User not found")
    } 

    const register = (username: string, password: string) => {
        const user = db.users.find((user) => user.username === username)
        if (user) return alert('User already exists')
        const length = db.users.length;
        const lastUserId = db.users[length - 1].id
        const newUser = {
            id: lastUserId + 1,
            username,
            password
        }
        db.users.push(newUser) 
        console.log(db.users);
                
    } 

    return (
        <UsersContext.Provider value={{ user, getUser, login, register }}>
            {children}
        </UsersContext.Provider>
    )
}