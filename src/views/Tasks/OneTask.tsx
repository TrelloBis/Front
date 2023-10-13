import { Box, Card, CardActions, CardContent, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { statesList } from "../list/List";
import React from "react";
import { Task } from "../../Types/TaskTypes";
import { db } from "../../data/db";
import Textarea from '@mui/joy/Textarea';
import { TasksContext } from "../../providers/TaskProvider";

const priorityList = [
        "Low",
        "Medium",
        "High"
]

export default function OneTask(state: {task: Task}) {
    const activeTask = state.task;
    const { getAllTasksForUser } = React.useContext(TasksContext);
    const [priority, setPriority] = React.useState(activeTask.priority);
    const [title, setTitle] = React.useState(activeTask.title);
    const [description, setDescription] = React.useState(activeTask.description);

    function changePriority(event: SelectChangeEvent) {
        setPriority(event.target.value);
        db.tasks.find((task) => {
            if (task.id === activeTask.id) task.priority = event.target.value;
        })
    }

    function changeState(event: SelectChangeEvent) {
        db.tasks.find((task) => {
            if (task.id === activeTask.id) {
                task.state = event.target.value;
                getAllTasksForUser();
            }
        })
    }

    function changeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
        db.tasks.find((task) => {
            if (task.id === activeTask.id) task.title = event.target.value;
        })
    }

    function changeDescription(event: any) {
        setDescription(event.target.value);
        db.tasks.find((task) => {
            if (task.id === activeTask.id) task.description = event.target.value;
        })
    }

    function deleteTask() {
        const newDbTask = db.tasks.filter((task) => {
            return task.id !== activeTask.id
        })        
        db.tasks = newDbTask;
        getAllTasksForUser();
    }

    return (
        <Card sx={{ maxWidth: 345, margin: '5px', border: "1px solid grey" }}>
            <CardContent>
            <TextField
            id="outlined-size-normal" onChange={changeTitle} value={title} />
            <IconButton aria-label="delete" sx={{border: "1px solid grey", padding: '0 6px', marginLeft: "20px"}} onClick={deleteTask}>
                X
            </IconButton>
            <Textarea
                sx={{
                      background: "white",
                  }}
                defaultValue={description}
                minRows={2}
                maxRows={4}
                onChange={changeDescription}
            />
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
                            value={activeTask.state}
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