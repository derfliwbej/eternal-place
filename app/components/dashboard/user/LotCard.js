import { Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material';

const LotCard = ({ name, block, section, lot }) => {
    return (
        <Card sx={{ width: 345 }}>
            <CardMedia sx={{ height: 140 }}
                       image="/pantheon.jpg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{name}</Typography>
                <Typography variant="body2">Block: {block}</Typography>
                <Typography variant="body2">Section: {section}</Typography>
                <Typography variant="body2">Lot: {lot}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small">View More Details</Button>
            </CardActions>
        </Card>
    );
};

export default LotCard;