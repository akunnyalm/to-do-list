import './Activity.css';
import './App.css';
import React, { useState } from 'react'
import { Box, Modal, List, ListItem, ListItemText, Input, InputLabel, Button } from '@mui/material'
import { doc, deleteDoc, setDoc } from 'firebase/firestore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import FIREBASE_DB from './firebaseConfig';

function Activity(props) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleUpdate = () => {
        try {
            setDoc(doc(FIREBASE_DB, 'activity', props.todo.id), {
                todo: input
            }, {merge: true});
            setOpen(false);

            setInput('');
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
                    <h1>update activity</h1>
                    <InputLabel className='form-label'>update activity</InputLabel>
                    <Input 
                        placeholder={props.todo.todo}
                        className='update-input' 
                        value={input} 
                        onChange={event => setInput(event.target.value)}
                    />
                    
                    <Button className='update-button' onClick={handleUpdate}>Update</Button>
                </Box>  
            </Modal>
            <Box className="activity-list">
                <List>
                <ListItem sx={{justifyContent: 'center'}}>
                    <ListItemText 
                        className='todo-text'
                        primary={props.todo.todo}
                        secondary={<span className='deadline-text'>deadline</span>}
                        sx={{
                            fontSize: 32,
                            fontFamily: "Outfit, sans-serif !important",
                            color: "#fff",
                            textAlign: "center",
                        }}
                    />              
                </ListItem>

                <Button 
                    onClick={handleOpen} 
                    variant="contained"
                    //className='activity-button'
                >
                    <EditIcon />
                </Button>
                <Button 
                    onClick={handleDelete} 
                    variant="contained"
                    //className='activity-button'
                >
                    <DeleteForeverIcon />
                </Button>
                </List>
            </Box>
        </>
        
    )
}

export default Activity;