import React from "react";
import { User } from "../Types/UserTypes";
import { db } from "../data/db";
import { UsersContext } from "./UserProvider";
import { Task } from "../Types/TaskTypes";

export const TasksContext = React.createContext<any>([]);

export default function TasksProvider ({children}: {children: React.ReactNode}){
    const { user } = React.useContext(UsersContext);
    const [task, setTask] = React.useState<Task | undefined>();
    const [tasks, setTasks] = React.useState<Task[] | []>();

    const getAllTasksForUser = () => {              
        const userTasks = db.tasks.filter((task) => task.userId === user.id);                
        setTasks(userTasks)
        return userTasks;
    } 

    return (
        <TasksContext.Provider value={{ task, tasks, getAllTasksForUser }}>
            {children}
        </TasksContext.Provider>
    )
}