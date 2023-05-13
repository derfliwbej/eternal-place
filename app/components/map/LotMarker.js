import Leaflet from 'leaflet';
import { Marker } from 'react-leaflet';

const getLotDisplay = (hasLight) => {
    if (hasLight) return '<div class="tomb-marker--hasLight"></div>';
    else return '<div class="tomb-marker"></div>'
};

const getMausoleumDisplay = (hasLight) => {
    if (hasLight) return '<div class="mausoleum-marker--hasLight"></div>';
    else return '<div class="mausoleum-marker"></div>';
};

const LotMarker = ({ lotID, position, type, hasLight, children }) => {
    return (
        <Marker position={position}
                icon={Leaflet.divIcon({ 
                    className: type !== 'mausoleum' ? 'tomb-marker-container' : 'mausoleum-marker-container',
                    html: type !== 'mausoleum' ? getLotDisplay(hasLight) : getMausoleumDisplay(hasLight)
                })}
                eventHandlers={{
                    click: (e) => {
                        console.log(lotID);
                    }
                }}>
            {children}
        </Marker>
    );
};

export default LotMarker;