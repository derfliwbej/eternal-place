import { Typography } from "@mui/material";

const ErrorText = ({ children }) => {
    return (
        <Typography color="error">{children}</Typography>
    );
};

export default ErrorText;