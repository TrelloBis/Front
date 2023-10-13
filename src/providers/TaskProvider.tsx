import React from "react";
import { db } from "../data/db";
import { UsersContext } from "./UserProvider";
import { Task } from "../Types/TaskTypes";

export const TasksContext = React.createContext<any>([]);

export default function TasksProvider ({children}: {children: React.ReactNode}){
    const { user } = React.useContext(UsersContext);
    const [tasks, setTasks] = React.useState<Task[] | undefined>();

    const getAllTasksForUser = () => { 
        console.log("geting tasks");
        
        setTasks(undefined);
        if (!user?.id) return alert("An error occured")
        try {
            fetch(`http://localhost:8000/api/tasks/`, {
                method: "POST",
                body: JSON.stringify({
                    userId: user.id
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then(response => response.json())
            .then(data => {
                setTasks(data);
                return data
            });
        } catch {
            return alert("An error occured")
        }
    } 

    const createTask = (state: string) => {
        const newTask = {
            title: "Titre",
            description: "Description",
            priority: "Low",
            state: state,
            userId: user.id
        }
        try {
            fetch(`http://localhost:8000/api/tasks/create`, {
                method: "POST",
                body: JSON.stringify(newTask),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                getAllTasksForUser()
            });
        } catch {
            return alert("An error occured")
        }                
    } 

    return (
        <TasksContext.Provider value={{ tasks, getAllTasksForUser, createTask }}>
            {children}
        </TasksContext.Provider>
    )
}