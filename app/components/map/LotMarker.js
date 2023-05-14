import Leaflet from 'leaflet';
import { Marker } from 'react-leaflet';

import { useRouter } from 'next/navigation';

const getClassName = (type) => {
    if (type === 'mausoleum') return 'mausoleum-marker-container';
    else return 'tomb-marker-container';
};

const getHTML = (type, hasLight, ownerCount) => {
    if(!ownerCount && type !== 'mausoleum') return '<div class="tomb-marker--vacant"></div>';
    else if(!ownerCount && type === 'mausoleum') return '<div class="mausoleum-marker--vacant"></div>';
    else if (type !== 'mausoleum' && hasLight) return '<div class="tomb-marker--hasLight"></div>';
    else if (type === 'mausoleum' && hasLight) return '<div class="mausoleum-marker--hasLight"></div>';
    else if (type !== 'mausoleum' && !hasLight) return '<div class="tomb-marker"></div>';
    else if (type === 'mausoleum' && !hasLight) return '<div class="mausoleum-marker"></div>';
};

const LotMarker = ({ lotID, position, type, hasLight, ownerCount, children }) => {
    const router = useRouter();

    return (
        <Marker position={position}
                icon={Leaflet.divIcon({ 
                    className: getClassName(type),
                    html: getHTML(type, hasLight, ownerCount)
                })}
                eventHandlers={{
                    click: (e) => {
                        router.push(`/edit/lot/${lotID}`);
                    }
                }}>
            {children}
        </Marker>
    );
};

export default LotMarker;