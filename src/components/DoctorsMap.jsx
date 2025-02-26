import React, {useEffect} from "react";
import { MAPS_KEY } from "../config/googleMaps";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { useDoctor } from "../contexts/DoctorContext";

const DoctorsMap = () => {
  const { doctors, fetchDoctors } = useDoctor();
  useEffect(() => { fetchDoctors(); }, []);
  return (
    <div className="w-full h-screen">
      <APIProvider
        apiKey={MAPS_KEY}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <Map
          defaultZoom={11}
          defaultCenter={{ lat: 52.479562034898514, lng: 13.432348924266426 }}
          mapId="DEMO_MAP_ID"
          onCameraChanged={(ev) =>
            console.log(
              "camera changed:",
              ev.detail.center,
              "zoom:",
              ev.detail.zoom
            )
          }
        >
          {doctors.map((poi) => (
            <AdvancedMarker key={poi._id} position={poi.location}>
              <Pin
                background={"#FBBC04"}
                glyphColor={"#000"}
                borderColor={"#000"}
              />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
};

export default DoctorsMap;
