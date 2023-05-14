import { Typography } from "@mui/material";

const ErrorText = ({ children }) => {
    return (
        <Typography sx={{ color: 'green' }}>{children}</Typography>
    );
};

export default ErrorText;