import { Box, Card, CardActions, CardContent, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { statesList } from "../list/List";
import React from "react";
import { Task } from "../../Types/TaskTypes";
import { db } from "../../data/db";

const priorityList = [
        "Low",
        "Medium",
        "High"
]

export default function OneTask(state: {task: Task}) {
    const activeTask = state.task;
    console.log("activeTask : ", activeTask);
    
    const [priority, setPriority] = React.useState(activeTask.priority);
    const [taskState, setTaskState] = React.useState(activeTask.state);

    function changePriority(event: SelectChangeEvent) {
        setPriority(event.target.value);
        db.tasks.find((task) => {
            if (task.id === activeTask.id) task.priority = event.target.value;
        })
        console.log(db.tasks);
        
    }

    function changeState(event: SelectChangeEvent) {
        setTaskState(event.target.value);
        db.tasks.find((task) => {
            if (task.id === activeTask.id) task.state = event.target.value;
        })
        console.log(db.tasks);
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {activeTask.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {activeTask.description}
            </Typography>
            </CardContent>
            <CardActions>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Priority
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={priority}
                            label="Priority"
                            onChange={changePriority}
                        >
                        {priorityList.map((prio, idx) => <MenuItem key={idx} value={prio}>{prio}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        State
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={taskState}
                            label="State"
                            onChange={changeState}
                        >
                        {statesList.map((selectedState: string, idx: number) => <MenuItem key={idx} value={selectedState}>{selectedState}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
            </CardActions>
        </Card>
    )
}