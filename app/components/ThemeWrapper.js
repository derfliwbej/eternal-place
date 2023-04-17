"use client";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: { main: '#183C67'},
        secondary: { main: '#ECBC3E'}
    }
});

const ThemeWrapper = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};

export default ThemeWrapper;