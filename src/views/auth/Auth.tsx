import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { UsersContext } from "../../providers/UserProvider";

export default function Auth() {
    const { login, register } = React.useContext(UsersContext); 
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    function changeUsername(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function goToLogin () {
        if (username === '' || password === '') return alert('Missing username or password')
        login(username, password)
    }

    function goToRegister () {
        if (username === '' || password === '') return alert('Missing username or password')
        register(username, password)
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
                <div>
                    <TextField label="Username" id="outlined-size-normal" onChange={changeUsername} value={username} />
                    <TextField label="Password" id="outlined-size-normal" onChange={changePassword} value={password} />
                </div>
            </Box>
            <Box sx={{ '& button': { m: 1 } }}>
                <div>
                    <Button variant="outlined" size="medium" onClick={goToLogin}>Connexion</Button>
                    <Button variant="outlined" size="medium" onClick={goToRegister}>Inscription</Button>
                </div>
            </Box>
        </div>
    )
  }