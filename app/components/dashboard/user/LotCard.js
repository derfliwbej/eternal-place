import { Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const LotCard = ({ lot }) => {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push(`/view/lot/${lot.id}`)
    };

    return (
        <Card sx={{ width: 345, display: 'flex', flexDirection: 'column' }}>
            <CardMedia sx={{ height: 140 }}
                       image={lot.image_path ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/lot_images/${lot.image_path}` : '/placeholder.png'}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">Lot #{lot.id}</Typography>
                {lot.is_mausoleum ? (
                    <Typography variant="body2">Mausoleum {lot.lot_num}</Typography>
                ) : (
                    <>
                    <Typography variant="body2">Block {lot.block}</Typography>
                    <Typography variant="body2">Section {lot.section}</Typography>
                    <Typography variant="body2">Lot {lot.lot_num}</Typography>
                    </>
                )}
                <Typography variant="body2">{lot.has_light ? 'This lot currently has a light.' : 'This lot currently has no light.' }</Typography>
            </CardContent>
            <CardActions sx={{ marginTop: 'auto' }}>
                <Button size="small" onClick={handleButtonClick}>View More Details</Button>
            </CardActions>
        </Card>
    );
};

export default LotCard;