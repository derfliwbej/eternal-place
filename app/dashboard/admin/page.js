'use client';
import DashboardLayout from '@/app/components/layouts/DashboardLayout';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';

import Map from '@/app/components/map/Map';

const zoomOptions = {
    doubleClickZoom: false,
    zoomSnap: false,
    zoomDelta: false,
    trackResize: false,
    touchZoom: false,
    scrollWheelZoom: false,
    zoomControl: false
};

const AdminDashboard = () => {
    return (
        <>
            <DashboardLayout userType="admin">
                <Map center={[0, 0]} zoom={2} {...zoomOptions}>
                    {({ TileLayer, Marker, Popup }, Leaflet) => (
                        <>
                            <TileLayer
                            noWrap
                            maxZoom={4}
                            minZoom={2}
                            url="../../../MapTiles/{z}/{x}/{y}.png"
                            />

                            {/* Block 1 - Section A */}
                            {
                                ...Array(20).fill(0).map( (_, i) => (
                                    <Marker position={[68, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 1 - Section B */}
                            {
                                ...Array(20).fill(0).map( (_, i) => (
                                    <Marker position={[65, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 2 - Section A */}
                            {
                                ...Array(20).fill(0).map( (_, i) => (
                                    <Marker position={[65, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }
                            
                            {/* Block 2 - Section A */}
                            {
                                ...Array(20).fill(0).map( (_, i) => (
                                    <Marker position={[61, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 2 - Section B */}
                            {
                                ...Array(20).fill(0).map( (_, i) => (
                                    <Marker position={[57, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 3 - Section A */}
                            {
                                ...Array(21).fill(0).map( (_, i) => (
                                    <Marker position={[51, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 3 - Section A */}
                            {
                                ...Array(21).fill(0).map( (_, i) => (
                                    <Marker position={[46, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 4 - Section A */}
                            {
                                ...Array(22).fill(0).map( (_, i) => (
                                    <Marker position={[39, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 4 - Section B */}
                            {
                                ...Array(22).fill(0).map( (_, i) => (
                                    <Marker position={[33, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 5 - Section A */}
                            {
                                ...Array(22).fill(0).map( (_, i) => (
                                    <Marker position={[25, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 5 - Section B */}
                            {
                                ...Array(22).fill(0).map( (_, i) => (
                                    <Marker position={[18, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 6 - Section A */}
                            {
                                ...Array(22).fill(0).map( (_, i) => (
                                    <Marker position={[9, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 6 - Section B */}
                            {
                                ...Array(22).fill(0).map( (_, i) => (
                                    <Marker position={[1, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 7 - Section A */}
                            {
                                ...Array(23).fill(0).map( (_, i) => (
                                    <Marker position={[-8, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 7 - Section B */}
                            {
                                ...Array(23).fill(0).map( (_, i) => (
                                    <Marker position={[-16, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 8 - Section A */}
                            {
                                ...Array(23).fill(0).map( (_, i) => (
                                    <Marker position={[-25, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 8 - Section B */}
                            {
                                ...Array(23).fill(0).map( (_, i) => (
                                    <Marker position={[-32, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 9 - Section A */}
                            {
                                ...Array(23).fill(0).map( (_, i) => (
                                    <Marker position={[-40, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 9 - Section B */}
                            {
                                ...Array(23).fill(0).map( (_, i) => (
                                    <Marker position={[-46, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 10 - Section A */}
                            {
                                ...Array(23).fill(0).map( (_, i) => (
                                    <Marker position={[-52, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 10 - Section B */}
                            {
                                ...Array(23).fill(0).map( (_, i) => (
                                    <Marker position={[-57, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 11 - Section A */}
                            {
                                ...Array(23).fill(0).map( (_, i) => (
                                    <Marker position={[-62, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Block 11 - Section B */}
                            {
                                ...Array(23).fill(0).map( (_, i) => (
                                    <Marker position={[-65, -62 + (i * 4)]} icon={Leaflet.divIcon({
                                        className: "tomb-marker-container",
                                        html: '<div class="tomb-marker"></div>'
                                    })}></Marker>
                                ))
                            }

                            {/* Mausoleums - Left Wing */}
                            <Marker position={[68, -83]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[62, -83]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[55, -83]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[47, -83]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[37, -83]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[26, -83]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[14, -83]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[1, -83]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[-12, -83]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[-24, -83]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[-35, -83]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[-45, -83]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>
                            
                            <Marker position={[-54, -83]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[-61, -83]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            {/* Mausoleums - Right Wing */}
                            <Marker position={[68, 25]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[62, 31]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[55, 34]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[55, 34]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[46, 39]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[36, 43]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[24, 46]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[11, 50]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[-2, 50]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[-15, 50]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[-27, 50]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[-38, 50]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>

                            <Marker position={[-48, 50]} icon={Leaflet.divIcon({
                                className: "mausoleum-marker-container",
                                html: '<div class="mausoleum-marker"></div>'
                            })}></Marker>
                            
                        </>
                    )}
                </Map>
            </DashboardLayout>
        </>
    );
};

export default AdminDashboard;