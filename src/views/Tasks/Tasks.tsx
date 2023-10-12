import React from "react";
import { TasksContext } from "../../providers/TaskProvider";
import { Task } from "../../Types/TaskTypes";
import OneTask from "./OneTask";

export default function Tasks(state: {state: string}) {
    const { getAllTasksForUser } = React.useContext(TasksContext);
    const [tasksForState, setTasksForState] = React.useState<Task[] | undefined>();

    React.useEffect(() => {
        const allTasksForUser = getAllTasksForUser();        
        const correctTasks = allTasksForUser.filter((task: Task) => task.state === state.state)        
        setTasksForState(correctTasks)
      }, []);

  return (
    <div>
        {tasksForState && tasksForState.length > 0 && tasksForState.map((value, index) => 
        <div key={index}><OneTask task={value} ></OneTask></div>
        
            
        )}
    </div>
  )
}