import Leaflet from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

import { useRouter } from 'next/navigation';

const getClassName = (type) => {
    if (type === 'mausoleum') return 'mausoleum-marker-container';
    else return 'tomb-marker-container';
};

const getHTML = (type, hasLight, ownerCount, zoom) => {
    if(!ownerCount && type !== 'mausoleum') return `<div class="tomb-marker--vacant-${zoom}"></div>`;
    else if(!ownerCount && type === 'mausoleum') return `<div class="mausoleum-marker--vacant-${zoom}"></div>`;
    else if (type !== 'mausoleum' && hasLight) return `<div class="tomb-marker--hasLight-${zoom}"></div>`;
    else if (type === 'mausoleum' && hasLight) return `<div class="mausoleum-marker--hasLight-${zoom}"></div>`;
    else if (type !== 'mausoleum' && !hasLight) return `<div class="tomb-marker-${zoom}"></div>`;
    else if (type === 'mausoleum' && !hasLight) return `<div class="mausoleum-marker-${zoom}"></div>`;
};

const LotMarker = ({ lotID, position, type, block, section, lot_num, hasLight, ownerCount, zoom, children }) => {
    const router = useRouter();

    return (
        <Marker position={position}
                icon={Leaflet.divIcon({ 
                    className: getClassName(type),
                    html: getHTML(type, hasLight, ownerCount, zoom)
                })}
                eventHandlers={{
                    click: (e) => {
                        router.push(`/edit/lot/${lotID}`);
                    },
                    mouseover: (e) => e.target.openPopup(),
                    mouseout: (e) => e.target.closePopup()
                }}>
            {children}
            <Popup>{ type === 'mausoleum' ? `Mausoleum ${lot_num}` : `Block ${block}, Section ${section}, Lot ${lot_num}`}</Popup>
        </Marker>
    );
};

export default LotMarker;