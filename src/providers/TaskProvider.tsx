import React from "react";
import { db } from "../data/db";
import { UsersContext } from "./UserProvider";
import { Task } from "../Types/TaskTypes";

export const TasksContext = React.createContext<any>([]);

export default function TasksProvider ({children}: {children: React.ReactNode}){
    const { user } = React.useContext(UsersContext);
    const [tasks, setTasks] = React.useState<Task[] | []>();

    const getAllTasksForUser = () => { 
        setTasks(undefined);
        const userTasks = db.tasks.filter((task) => task.userId === user.id);                
        setTasks(userTasks); 
        return userTasks;
    } 

    const createTask = (state: string) => {
        const length = db.tasks.length;
        const lastTaskId = db.tasks[length - 1].id
        const newTask = {
            id: lastTaskId + 1,
            title: "Titre",
            description: "Description",
            priority: "Low",
            state: state,
            userId: user.id
        }
        db.tasks.push(newTask)                 
    } 

    return (
        <TasksContext.Provider value={{ tasks, getAllTasksForUser, createTask }}>
            {children}
        </TasksContext.Provider>
    )
}