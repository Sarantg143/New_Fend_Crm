import React, { useRef, useState } from "react";
import Floorplan11 from "../ClientBookingPage/Assets/Floorplan11.jpg";

const ConstructionMap = ({ onAreaSelect, spaces = [] }) => {
  // Added default value for spaces
  const imageRef = useRef(null);
  const [highlightBox, setHighlightBox] = useState(null);

  // Space coordinates mapping
  const spaceCoordinates = {
    s1: "707,281,707,355,867,356,868,218,844,220,843,173,780,173,778,183,737,184,737,280",
    s2: "87,246,342,247,345,354,90,348,90,349,90,348",
    s3: "93,244,232,246,229,54,182,53,180,43,135,43,132,64,102,64,93,111",
    s4: "252,47,253,134,246,136,244,166,232,164,229,226,338,226,342,69,342,93,301,92,295,92,292,49",
    s5: "342,68,337,225,579,226,574,105,530,104,528,98,489,98,487,106,481,124,458,124,454,134,415,132,396,132,392,115,387,71",
    s6: "577,119,576,225,733,224,734,146,688,144,685,121",
  };

  const handleAreaClick = (e, coords, area) => {
    e.preventDefault();
    if (area.available) {
      onAreaSelect(area);
      highlightSelectedArea(coords);
    }
  };

  const highlightSelectedArea = (coordsString) => {
    const coords = coordsString.split(",").map(Number);
    const mapImg = imageRef.current;

    if (!mapImg) return;

    const scaleX = mapImg.offsetWidth / mapImg.naturalWidth;
    const scaleY = mapImg.offsetHeight / mapImg.naturalHeight;

    let minX = coords[0],
      maxX = coords[0];
    let minY = coords[1],
      maxY = coords[1];
    for (let i = 0; i < coords.length; i += 2) {
      const x = coords[i];
      const y = coords[i + 1];
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }

    const box = {
      left: minX * scaleX,
      top: minY * scaleY,
      width: (maxX - minX) * scaleX,
      height: (maxY - minY) * scaleY,
    };
    setHighlightBox(box);
  };

  return (
    <div className="relative w-full border-2 border-gray-600 rounded overflow-hidden">
      <img
        ref={imageRef}
        src={Floorplan11}
        alt="Floor Plan"
        useMap="#floorPlanMap"
        className="w-full h-auto"
      />
      <map name="floorPlanMap">
        {spaces.map((space) => (
          <area
            key={space.id}
            shape="poly"
            coords={spaceCoordinates[space.id]}
            alt={space.label}
            onClick={(e) =>
              handleAreaClick(e, spaceCoordinates[space.id], space)
            }
            style={{ cursor: space.available ? "pointer" : "not-allowed" }}
          />
        ))}
      </map>

      {highlightBox && (
        <div
          className="absolute border-4 border-amber-500 bg-amber-300 bg-opacity-20 pointer-events-none z-10"
          style={{
            left: `${highlightBox.left}px`,
            top: `${highlightBox.top}px`,
            width: `${highlightBox.width}px`,
            height: `${highlightBox.height}px`,
          }}
        />
      )}
    </div>
  );
};

ConstructionMap.defaultProps = {
  spaces: [],
  onAreaSelect: () => {},
};

export default ConstructionMap;
