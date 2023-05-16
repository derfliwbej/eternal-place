import Image from "next/image";
import { useState } from "react";

const LotImage = ({ src, alt, size }) => {
    const [ratio, setRatio] = useState(16 / 9);

    return (
        <Image src={src} alt={alt} width={size} height={size / ratio} fixed="true" onLoadingComplete={({ naturalWidth, naturalHeight }) => {
            setRatio(naturalWidth / naturalHeight);
        }} />
    );
};

export default LotImage;