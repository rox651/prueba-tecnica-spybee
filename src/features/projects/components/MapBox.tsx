import { useRef, useEffect, useState } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import type { Project as ProjectType } from "../types/projects";

const INITIAL_ZOOM = 8;

interface MapBoxProps {
   mapRef: React.RefObject<mapboxgl.Map | null>;
   defaultPoints: LngLatLike;
   accessToken: string;
   projects: ProjectType[];
   className?: string;
}

export const MapBox = ({
   accessToken,
   className = "",
   mapRef,
   projects,
   defaultPoints,
}: MapBoxProps) => {
   const mapContainerRef = useRef<HTMLDivElement | null>(null);
   const [zoom, setZoom] = useState(INITIAL_ZOOM);
   const [center, setCenter] = useState<LngLatLike>(defaultPoints);

   useEffect(() => {
      if (!mapContainerRef.current) return;

      mapboxgl.accessToken = accessToken;
      mapRef.current = new mapboxgl.Map({
         container: mapContainerRef.current,
         center: center,
         zoom: zoom,
         style: "mapbox://styles/mapbox/standard-satellite",
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl());

      mapRef.current.on("move", () => {
         if (!mapRef.current) return;

         const mapCenter = mapRef.current.getCenter();
         const mapZoom = mapRef.current.getZoom();

         setCenter([mapCenter.lng, mapCenter.lat]);
         setZoom(mapZoom);
      });

      projects.forEach(project => {
         if (!mapRef.current) return;
         const { lng, lat } = project.position;

         const popup = new mapboxgl.Popup({ offset: [0, -15] }).setHTML(`
            <h3 class="map-title-popup">${project.title}</h3>
         `);

         new mapboxgl.Marker({
            color: "#cd9a03",
         })
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(mapRef.current);
      });

      return () => {
         mapRef.current?.remove();
      };
   }, [accessToken]);

   return (
      <div className={`relative w-full h-full ${className}`}>
         <div ref={mapContainerRef} />
      </div>
   );
};
