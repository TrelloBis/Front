import { Box, Button } from "@mui/material";
import Tasks from "../Tasks/Tasks";
import React from "react";
import { TasksContext } from "../../providers/TaskProvider";
import { Task } from "../../Types/TaskTypes";
import { statesList } from "../../data/db";
import { UsersContext } from "../../providers/UserProvider";

export default function List() {
    const { tasks, getAllTasksForUser } = React.useContext(TasksContext);
    const { user, getUser, logout } = React.useContext(UsersContext);
    const [allTasksForUser, setAllTasksForUser] = React.useState<Task[]>([]);
    
    React.useEffect(() => {
        if (!user) getUser()
        // console.log(user && (!tasks || ((tasks.length !== 0 && allTasksForUser.length > 0) && tasks !== allTasksForUser)));
        console.log(user);
        console.log(tasks);
        // const newTasks = getAllTasksForUser();
        if (user && !tasks) {
            const newTasks = getAllTasksForUser();
            setAllTasksForUser(newTasks)
            console.log(newTasks);
        }        
      }, [user, tasks]);

      function getToLogout () {
        logout()
      }

    return (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }} className='feed-card'>
                <Button variant="outlined" size="medium" style={{position: "absolute", top: "40px", right: "50px"}} onClick={getToLogout}>Logout</Button>
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
                            {tasks ?
                                <Tasks state={value} data={tasks.filter((task: Task) => task.state === value)}></Tasks> : "no tasks"}
                        </Box>
                )}
        </div>
    )
  }