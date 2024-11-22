import './App.css';
import Activity from './Activity.js';
import Header from './Header.js';
import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Input, TextField } from '@mui/material';
import { collection, onSnapshot , addDoc, query, serverTimestamp, orderBy } from 'firebase/firestore';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

import FIREBASE_DB from './firebaseConfig.js';
import styled from '@emotion/styled';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#A594F9',
  borderRadius:'20px',
  padding: '16px',
  textAlign: 'center',
  color: '#FFFFFF',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '250px',
  height: '250px',
  boxShadow: 'none'
}))


function App() {
  const [activities, setActivities] = useState([]);
  const [input, setInput] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  console.log(input);

  useEffect(() => {
      const activityQuery = query(collection(FIREBASE_DB, 'activity'), orderBy('date'));

      const addActivity = onSnapshot(activityQuery, (snapshot) => {
      setActivities(snapshot.docs.map(doc => ({
        id: doc.id, 
        todo: doc.data().todo,
        date: doc.data().date,
        time: doc.data().time,
      })));
    });

    return () => addActivity();  }, []); 

  const addList = async (event) => {
    event.preventDefault(); // stops refresh
    console.log('Adding activity:', input, date, time);
    
    await addDoc(collection(FIREBASE_DB, 'activity'), { 
      todo: input, 
      date: date,
      time: time,
      timestamp: serverTimestamp()
    });

    setInput(''); // clears input after clicking button
    setDate(''); // clears date after clicking button
    setTime(''); // clears time after clicking button
  }

  return (
    <div className="App">
    <Header />
      <h1 className='centered'>Hey there, welcome to WhatTodo! 🎯</h1>
      <h4 className='centered'>Add your tasks and keep track of your deadlines with ease.</h4>
      <FormControl>
        <InputLabel>add an activity</InputLabel>
        <Input 
          className='input-field' 
          value={input} 
          onChange={event => setInput(event.target.value)}
        />
          <div className='text-label'>select deadline date</div>
          <TextField
          type="date"
          value={date}
          onChange={event => setDate(event.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: '#fff', 
              color: '#000000', 
            },
            '& .MuiInputBase-root:hover': {
              backgroundColor: '#F5EFFF', 
            },
            '& .MuiInputBase-root:focus': {
              backgroundColor: '#F5EFFF', 
            },
          }}
        />
        <div className='text-label'>select deadline time</div>
        <TextField
          type="time"
          value={time}
          onChange={event => setTime(event.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: '#fff', 
              color: '#000000', 
            },
            '& .MuiInputBase-root:hover': {
              backgroundColor: '#F5EFFF', 
            },
            '& .MuiInputBase-root:focus': {
              backgroundColor: '#F5EFFF', 
            },
          }}
        />

        <Button 
          className='form-button'
          disabled={!input || !date || !time } 
          type="submit" 
          onClick={addList} 
          variant="contained"
          >Add</Button>
      </FormControl>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5} alignItems={"stretch"} justifyContent="center">
          {activities.map(todo => (
            <Grid item xs={12} sm={6} md={2} key={todo.id}>
              <Item>
                <Activity todo={todo} date={todo.date} />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default App;
