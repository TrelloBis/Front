import { Box } from "@mui/material";
import Tasks from "../Tasks/Tasks";
import React from "react";
import { TasksContext } from "../../providers/TaskProvider";
import { Task } from "../../Types/TaskTypes";
import { statesList } from "../../data/db";

export default function List() {
    const { tasks, getAllTasksForUser } = React.useContext(TasksContext);
    const [allTasksForUser, setAllTasksForUser] = React.useState<Task[] | undefined>();
    
    React.useEffect(() => {
        if (!tasks || tasks !== allTasksForUser) {
            const newTasks = getAllTasksForUser();
            setAllTasksForUser(newTasks)
        }
      }, [tasks]);

    return (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }} className='feed-card'>
                {statesList.map((value, index) => 
                        <Box
                            key={index}
                            component="div"
                            sx={{
                            width: '300px',
                            p: 1,
                            m: 1,
                            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                            color: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                            border: '1px solid',
                            borderColor: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                            borderRadius: 2,
                            fontSize: '0.875rem',
                            fontWeight: '700',
                            }}
                        >
                            {tasks && 
                                <Tasks state={value} data={tasks.filter((task: Task) => task.state === value)}></Tasks>}
                        </Box>
                )}
        </div>
    )
  }