'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { Toolbar, IconButton, Typography, Drawer, Divider, 
         List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

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

const userNavigations = [
    { text: 'Home', route: '/dashboard/user', icon: HomeIcon },
    { text: 'Make transaction', route: '/transaction', icon: AttachMoneyIcon },
    { text: 'View transaction history', route: '/history', icon: ReceiptLongIcon },
    { text: 'Edit profile', route: '/profile',  icon: ModeEditIcon }
];

const adminNavigations = [
    { text: 'Home', route: '/dashboard/admin', icon: HomeIcon },
    { text: 'Manage all users', route: '/manage/users', icon: ManageAccountsIcon },
    { text: 'Manage all transactions', route: '/manage/transactions', icon: ReceiptIcon },
    { text: 'Tomb search', route: '/search', icon: SearchIcon },
    { text: 'Edit profile', route: '/profile',  icon: ModeEditIcon },
];

const DashboardLayout = ({ children, userType }) => {
    const router = useRouter();

    // Get type of user from cookie, but for now, type of user is passed as props to DashboardLayout

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
                    { userType === "admin" ? adminNavigations.map((nav, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => router.push(nav.route) }>
                                <nav.icon sx={{ marginRight: 2, color: 'white'  }} />
                                <ListItemText sx={{ color: 'white' }} primary={nav.text} />
                            </ListItemButton>
                        </ListItem>  
                    )) : userNavigations.map((nav, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => router.push(nav.route) }>
                                <nav.icon sx={{ marginRight: 2, color: 'white'  }} />
                                <ListItemText sx={{ color: 'white' }} primary={nav.text} />
                            </ListItemButton>
                        </ListItem>
                    )) }
                </List>
            </Drawer>
            <Main open={open}>
                {children}
            </Main>
        </>
        
    );
};

export default DashboardLayout;