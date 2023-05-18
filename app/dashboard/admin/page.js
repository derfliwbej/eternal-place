'use client';
import DashboardLayout from '@/app/components/layouts/DashboardLayout';
import { useState, useEffect } from 'react';
import fetchUtil from '@/utils/fetchUtil';

import Map from '@/app/components/map/Map';
import { CircularProgress } from '@mui/material';

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
    let lotID = 1;
    const [lots, setLots] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const fetchLots = async () => {
            try {
                const res = await fetchUtil('/lots');
                const data = await res.json();

                console.log(data);

                setLots(data);
                setLoading(false);
            } catch(error) {
                console.log(error);
            }
        };

        fetchLots();
    }, []);

    return (
        <>
            <DashboardLayout userType="admin">
                {loading ? <div style={{ height: '80vh' }} className="center"><CircularProgress /></div> : (
                <Map center={[0, 0]} zoom={2} {...zoomOptions}>
                    {({ TileLayer }, LotMarker) => (
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
                                    <LotMarker position={[68, -62 + (i * 4)]} 
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Block 1 - Section B */}
                            {
                                ...Array(20).fill(0).map( (_, i) => (
                                    <LotMarker position={[65, -62 + (i * 4)]} 
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }
                            
                            {/* Block 2 - Section A */}
                            {
                                ...Array(20).fill(0).map( (_, i) => (
                                    <LotMarker position={[61, -62 + (i * 4)]} 
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Block 2 - Section B */}
                            {
                                ...Array(20).fill(0).map( (_, i) => (
                                    <LotMarker position={[57, -62 + (i * 4)]} 
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Block 3 - Section A */}
                            {
                                ...Array(21).fill(0).map( (_, i) => (
                                    <LotMarker position={[51, -62 + (i * 4)]}
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Block 3 - Section A */}
                            {
                                ...Array(21).fill(0).map( (_, i) => (
                                    <LotMarker position={[46, -62 + (i * 4)]}
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Block 4 - Section A */}
                            {
                                ...Array(22).fill(0).map( (_, i) => (
                                    <LotMarker position={[39, -62 + (i * 4)]}
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Block 4 - Section B */}
                            {
                                ...Array(22).fill(0).map( (_, i) => (
                                    <LotMarker position={[33, -62 + (i * 4)]}
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Block 5 - Section A */}
                            {
                                ...Array(22).fill(0).map( (_, i) => (
                                    <LotMarker position={[25, -62 + (i * 4)]}
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Block 5 - Section B */}
                            {
                                ...Array(22).fill(0).map( (_, i) => (
                                    <LotMarker position={[18, -62 + (i * 4)]}
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Block 6 - Section A */}
                            {
                                ...Array(22).fill(0).map( (_, i) => (
                                    <LotMarker position={[9, -62 + (i * 4)]}
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Block 6 - Section B */}
                            {
                                ...Array(22).fill(0).map( (_, i) => (
                                    <LotMarker position={[1, -62 + (i * 4)]}
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Block 7 - Section A */}
                            {
                                ...Array(23).fill(0).map( (_, i) => (
                                    <LotMarker position={[-8, -62 + (i * 4)]}
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Block 7 - Section B */}
                            {
                                ...Array(23).fill(0).map( (_, i) => (
                                    <LotMarker position={[-16, -62 + (i * 4)]}
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Block 8 - Section A */}
                            {
                                ...Array(23).fill(0).map( (_, i) => (
                                    <LotMarker position={[-25, -62 + (i * 4)]}
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Block 8 - Section B */}
                            {
                                ...Array(23).fill(0).map( (_, i) => (
                                    <LotMarker position={[-32, -62 + (i * 4)]}
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Block 9 - Section A */}
                            {
                                ...Array(23).fill(0).map( (_, i) => (
                                    <LotMarker position={[-40, -62 + (i * 4)]}
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Block 9 - Section B */}
                            {
                                ...Array(23).fill(0).map( (_, i) => (
                                    <LotMarker position={[-46, -62 + (i * 4)]}
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Block 10 - Section A */}
                            {
                                ...Array(23).fill(0).map( (_, i) => (
                                    <LotMarker position={[-52, -62 + (i * 4)]}
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Block 10 - Section B */}
                            {
                                ...Array(23).fill(0).map( (_, i) => (
                                    <LotMarker position={[-57, -62 + (i * 4)]}
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Block 11 - Section A */}
                            {
                                ...Array(23).fill(0).map( (_, i) => (
                                    <LotMarker position={[-62, -62 + (i * 4)]}
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Block 11 - Section B */}
                            {
                                ...Array(23).fill(0).map( (_, i) => (
                                    <LotMarker position={[-65, -62 + (i * 4)]}
                                               hasLight={lots[lotID - 1]?.has_light}
                                               ownerCount={lots[lotID - 1]?.num_owners}
                                               lotID={lotID++}>
                                    </LotMarker>
                                ))
                            }

                            {/* Mausoleums - Left Wing */}
                            <LotMarker position={[68, -83]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[62, -83]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[55, -83]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[47, -83]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[37, -83]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[26, -83]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[14, -83]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[1, -83]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[-12, -83]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[-24, -83]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[-35, -83]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[-45, -83]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>
                            
                            <LotMarker position={[-54, -83]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[-61, -83]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            {/* Mausoleums - Right Wing */}
                            <LotMarker position={[68, 25]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[62, 31]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[55, 34]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[46, 39]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[36, 43]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[24, 46]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[11, 50]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[-2, 50]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[-15, 50]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[-27, 50]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[-38, 50]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>

                            <LotMarker position={[-48, 50]} 
                                       type="mausoleum"
                                       hasLight={lots[lotID - 1]?.has_light}
                                       ownerCount={lots[lotID - 1]?.num_owners}
                                       lotID={lotID++}>
                            </LotMarker>
                        </>
                    )}
                </Map>)}
            </DashboardLayout>
        </>
    );
};

export default AdminDashboard;