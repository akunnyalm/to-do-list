import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#6A5ACD' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ textAlign: 'left', flexGrow: 1 }}>
                    What To Do
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;