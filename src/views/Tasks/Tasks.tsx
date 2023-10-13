import { styled } from "@mui/material";
import OneTask from "./OneTask";
import React from "react";
import { TasksContext } from "../../providers/TaskProvider";

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    p: 1,
    m: 1,
  }));

export default function Tasks(state: {state: string, data: any}) {
    const { getAllTasksForUser, createTask } = React.useContext(TasksContext);
    
    function addTask () {
        createTask(state.state);
        getAllTasksForUser();
    }

  return (
    <div>
        <Div>
            <span style={{marginLeft: "65px"}}>{state.state}</span>
            <span style={{marginLeft: "80px", fontSize: "30px", border: "1px solid grey", borderRadius: "25px", padding: "0 8px"}} onClick={addTask}>+</span>
        </Div>
        {state.data && state.data.length > 0 && state.data.map((value: any, index: number) => 
            <div key={index}><OneTask task={value} ></OneTask></div>
        )}
    </div>
  )
}