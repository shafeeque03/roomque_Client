import React, { useEffect, useState, lazy, Suspense } from "react";
import UserNavbar from "../../Components/UserComponents/UserNavbar";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, faMessage, faHeart } from "@fortawesome/free-solid-svg-icons";

// Use React.lazy to lazily import the RoomDetails component
const RoomDetails = lazy(() => import("./RoomDetails"));

// Use a fallback component to display while the RoomDetails component is loading
const RoomDetailsFallback = () => <div>Loading...</div>;

const LazyLoadedRoomDetails = () => {
    const location = useLocation();
    const x = location.state;

    return (
        <div>
            <Suspense fallback={<RoomDetailsFallback />}>
                <RoomDetails x={x} />
            </Suspense>
        </div>
    );
};

export default LazyLoadedRoomDetails;
