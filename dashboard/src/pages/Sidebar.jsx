import React from 'react';
import { List, ListItem, ListItemText, Drawer, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Sidebar() {
  const drawerWidth = 240; // Width of the sidebar

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'black', // Set background to black
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          p: 2,
          color: 'white', // Text color to contrast with black background
          textAlign: 'left', // Align text to the left
        }}
      >
        Navigation
      </Typography>
      <List
        sx={{
          padding: 0,
        }}
      >
        <ListItem button component={RouterLink} to="/home" sx={{ justifyContent: 'flex-start' }}>
          <ListItemText primary="Home" primaryTypographyProps={{ style: { color: 'white', textAlign: 'left' } }} />
        </ListItem>
        <ListItem button component={RouterLink} to="/students" sx={{ justifyContent: 'flex-start' }}>
          <ListItemText primary="Students" primaryTypographyProps={{ style: { color: 'white', textAlign: 'left' } }} />
        </ListItem>
        <ListItem button component={RouterLink} to="/car" sx={{ justifyContent: 'flex-start' }}>
          <ListItemText primary="Car" primaryTypographyProps={{ style: { color: 'white', textAlign: 'left' } }} />
        </ListItem>
        <ListItem button component={RouterLink} to="/add-user" sx={{ justifyContent: 'flex-start' }}>
          <ListItemText primary="Add User" primaryTypographyProps={{ style: { color: 'white', textAlign: 'left' } }} />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;