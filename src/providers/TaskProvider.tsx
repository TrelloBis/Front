import React from "react";
import { UsersContext } from "./UserProvider";
import { Task } from "../Types/TaskTypes";

export const TasksContext = React.createContext<any>([]);

export default function TasksProvider ({children}: {children: React.ReactNode}){
    const { user } = React.useContext(UsersContext);
    const [tasks, setTasks] = React.useState<Task[] | undefined>();

    const getAllTasksForUser = () => { 
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
                getAllTasksForUser()
            });
        } catch {
            return alert("An error occured")
        }                
    } 

    const updateTask = (id: string, taskToUpdate: any) => {
        try {
            fetch(`http://localhost:8000/api/tasks/${id}`, {
                method: "PUT",
                body: JSON.stringify(taskToUpdate),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then(response => response.json())
            .then(data => {
                getAllTasksForUser()
            });
        } catch {
            return alert("An error occured")
        }                
    } 

    const deleteTask = (id: string) => {
        try {
            fetch(`http://localhost:8000/api/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then(response => response.json())
            .then(data => {
                getAllTasksForUser()
            });
        } catch {
            return alert("An error occured")
        }                
    } 

    return (
        <TasksContext.Provider value={{ tasks, getAllTasksForUser, createTask, deleteTask, updateTask }}>
            {children}
        </TasksContext.Provider>
    )
}