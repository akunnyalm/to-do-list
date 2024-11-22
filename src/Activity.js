import './Activity.css';
import './App.css';
import React, { useState } from 'react'
import { Avatar, Box, Modal, List, ListItem, ListItemText, IconButton, Input, InputLabel, TextField, Button } from '@mui/material'
import { doc, deleteDoc, setDoc } from 'firebase/firestore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import FIREBASE_DB from './firebaseConfig';

function Activity(props) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleUpdate = () => {
        try {
            setDoc(doc(FIREBASE_DB, 'activity', props.todo.id), {
                todo: input,
                date: date,
                time: time,
            }, {merge: true});

            setOpen(false);

            setInput('');
            setDate('');
            setTime('');

            console.log('Updating activity:', input, date, time);
        } catch (error) {
            console.error("Unable to update activity: ", error);
        }
    }

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(FIREBASE_DB, 'activity', props.todo.id));
            console.log("Activity successfully deleted");
        } catch (error) {
            console.errror("Unable to removing activity: ", error);
        }
    }

    
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="activity-modal">
                    <InputLabel className='update-label'
                    >update activity</InputLabel>
                    {/* update activity */}
                    <Input 
                        placeholder={props.todo.todo}
                        className='update-input' 
                        value={input} 
                        onChange={event => setInput(event.target.value)}
                    />
                    {/* update date */}
                    <div className='input-label'>select date</div>
                    <TextField
                        type="date"
                        className='update-input'
                        value={date}
                        onChange={event => setDate(event.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {/* update time */}
                    <div className='input-label'>select time</div>
                    <TextField
                        type="time"
                        className='update-input'
                        value={time}
                        onChange={event => setTime(event.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    
                    <Button disabled={!input || !date || !time } className='update-button' onClick={handleUpdate}>Update</Button>
                </Box>  
            </Modal>

            <Box className="activity-list">
                <List>
                <ListItem sx={{justifyContent: 'center'}}>
                    <ListItemText 
                        className='todo-text'
                        primary={props.todo.todo}
                        secondary={
                            <div className='deadline-text'>
                                {props.todo.date ? (
                                    <>
                                        <div>{new Date(props.todo.date).toLocaleDateString()}</div>
                                        <div>{props.todo.time || 'no time'}</div>
                                    </>
                                ) : (
                                    'no deadline'
                                )}
                            </div>
                        } // display date and time
                    
                        sx={{
                            '& .MuiListItemText-primary': {
                                fontSize: '1.5rem', 
                                fontWeight: 'bold', 
                            },
                        }}
                    />              
                </ListItem>
                <IconButton onClick={handleOpen}>
                    <Avatar className='avatar-button'>
                        <EditIcon />
                    </Avatar>
                </IconButton>
                <IconButton onClick={handleDelete}>
                    <Avatar className='avatar-button'>
                        <DeleteForeverIcon />
                    </Avatar>
                </IconButton>
                </List>
            </Box>
        </>
        
    )
}

export default Activity;