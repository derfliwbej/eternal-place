import Image from "next/image";
import { useState } from "react";

const LotImage = ({ path, alt, size }) => {
    const [ratio, setRatio] = useState(16 / 9);

    return (
        <Image src={path ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/lot_images/${path}` : '/placeholder.png'} alt={alt} width={size} height={size / ratio} fixed="true" onLoadingComplete={({ naturalWidth, naturalHeight }) => {
            setRatio(naturalWidth / naturalHeight);
        }} />
    );
};

export default LotImage;