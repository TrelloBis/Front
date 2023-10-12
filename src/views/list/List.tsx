import { Box, styled } from "@mui/material";
import Tasks from "../Tasks/Tasks";

export const statesList = ["To Do", "In Progress", "Done"]

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    p: 1,
    m: 1,
  }));

export default function List() {
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
                            <Div>{value}</Div>
                            <Tasks state={value}></Tasks>
                        </Box>
                )}
        </div>
    )
  }