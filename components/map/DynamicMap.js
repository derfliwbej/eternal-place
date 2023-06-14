import { useEffect } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import LotMarker from './LotMarker';
import 'leaflet/dist/leaflet.css';
import { useMapEvents } from 'react-leaflet';

import styles from '@/app/styles/Map.module.css';

const { MapContainer } = ReactLeaflet;

const ZoomListener = (props) => {
  const zoomLevel = props.zoomLevel;
  const setZoomLevel = props.setZoomLevel;

  const mapEvents = useMapEvents({
      zoomend: () => {
          setZoomLevel(mapEvents.getZoom());
      }
  });

  return null;
};

const Map = ({ children, className, width, height, ...rest }) => {
  let mapClassName = styles.map;

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
        iconUrl: 'leaflet/images/marker-icon.png',
        shadowUrl: 'leaflet/images/marker-shadow.png',
      });
    })();
  }, []);

  return (
    <MapContainer className={mapClassName} {...rest}>
      {children(ReactLeaflet, LotMarker, ZoomListener)}
    </MapContainer>
  )
}

export default Map;