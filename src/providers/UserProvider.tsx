import React from "react";
import { User } from "../Types/UserTypes";
import { useNavigate } from "react-router-dom";

export const UsersContext = React.createContext<any>([]);

export default function UsersProvider ({children}: {children: React.ReactNode}){
    const navigate = useNavigate();
    const [user, setUser] = React.useState<User | undefined>();

    const getUser = () => {
        if (user) return navigate('/list');
        const userInStorage = localStorage.getItem('user');
        if (userInStorage) {

            try {
                fetch(`http://localhost:8000/api/users/${userInStorage}`, {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then(response => response.json())
                .then(data => {                    
                    if (data) {
                        setUser(data);           
                        return navigate('/list');
                    }
                    alert("User not found")
                    return navigate('/auth');
                });
            } catch {
                alert("User not found")
                return navigate('/auth');
            }
        }

        return navigate('/auth');
    }

    // !!! TODO : For security reasons, login will have to sent password to back because it will be hashed in DB !!!
    const login = (username: string, password: string) => {        
        try {
            fetch('http://localhost:8000/api/users/login', {
                method: "POST",
                body: JSON.stringify({
                    username
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data && data.password === password) {
                    setUser(data);
                    localStorage.setItem('user', data.id.toString())
                    return navigate('/list')
                }
                if (user && user.password !== password) return alert("Wrong password")
                return alert("User not found")
            });
        } catch {
            return alert("User not found")
        }
    } 

    // !!! TODO : For security reasons, register will have to send password to back for hash before creating user in DB !!!
    const register = (username: string, password: string) => {
        try {
            fetch('http://localhost:8000/api/users/', {
                method: "POST",
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        } catch {
            return alert("User not found")
        }               
    } 

    const logout = () => {
        setUser(undefined);
        localStorage.removeItem('user');
        return navigate('/');
    } 

    return (
        <UsersContext.Provider value={{ user, getUser, login, register, logout }}>
            {children}
        </UsersContext.Provider>
    )
}