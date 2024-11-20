import './App.css';
import Activity from './Activity.js';
import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Input } from '@mui/material';
import { collection, onSnapshot , addDoc, query, serverTimestamp, orderBy } from 'firebase/firestore';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

import FIREBASE_DB from './firebaseConfig.js';

const Item = (props) => {
  return (
    <Paper className='item' {...props}>
      {props.children}
    </Paper>
  )
}


function App() {
  const [activity, setActivity] = useState([]);
  const [input, setInput] = useState('');
  console.log(input);

  useEffect(() => {
      const activityQuery = query(collection(FIREBASE_DB, 'activity'), orderBy('timestamp'));

      const addActivity = onSnapshot(activityQuery, (snapshot) => {
      setActivity(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})));
    });

    return () => addActivity();  }, []); 

  const addList = async (event) => {
    event.preventDefault(); // stops refresh
    console.log('it works');
    
    await addDoc(collection(FIREBASE_DB, 'activity'), { 
      todo: input, 
      timestamp: serverTimestamp()
    });
    setInput(''); // clears input after clicking button
  }

  return (
    <div className="App">
      <h1> Welcome to "to do" list</h1>
      
      <FormControl>
        <InputLabel className='form-label'>wanna do something?</InputLabel>
        <Input 
          className='form-input' 
          value={input} 
          onChange={event => setInput(event.target.value)}
        />

        <Button 
          disabled={!input} 
          type="submit" 
          onClick={addList} 
          variant="contained"
          >Add</Button>
      </FormControl>

      <Box sx={{ flexGrow: 1, fontFamily: 'Outfit, sans-serif' }}>
        <Grid container spacing={5} alignItems={"stretch"}>
          {activity.map(todo => (
            <Grid item xs={12} sm={6} md={2} key={todo.id}>
              <Item>
                <Activity todo={todo} />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default App;
