'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { Toolbar, IconButton, Typography, Drawer, Divider, 
         List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: 0,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
      }),
    }),
  );

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgb(14, 39, 69)',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const DashboardLayout = ({ children, navigations }) => {
    const router = useRouter();

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <AppBar position="static" open={open}>
                <Toolbar>
                    <IconButton color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{ mr: 2, ...(open && { display: 'none' }) }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Welcome, User
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            backgroundColor: '#0E2745'
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
            >
                <DrawerHeader>
                    <IconButton color="foreground" onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider sx={{ borderColor: '#677984' }}/>
                <List>
                    {navigations.map((nav, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => router.push(nav.route) }>
                                <nav.icon sx={{ marginRight: 2, color: 'white'  }} />
                                <ListItemText sx={{ color: 'white' }} primary={nav.text} />
                            </ListItemButton>
                        </ListItem>  
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                {children}
            </Main>
        </>
        
    );
};

export default DashboardLayout;