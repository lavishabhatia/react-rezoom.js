import React, { useRef, useEffect } from "react";
import "./ImageZoom.css"; // Make sure to create and import your CSS file

import PropTypes from "prop-types";

interface ImageZoomProps {
  src: string;
  previewPosition?: "left" | "right" | "top" | "bottom";
  indicatorStyles?: React.CSSProperties;
}

export default function ImageZoom({
  src,
  previewPosition = "right",
}: ImageZoomProps) {
  const hoverItemRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const position = {
    left: "left-negative-120",
    right: "right-positive-120 top-0",
    top: "top-negative-120",
    bottom: "bottom-negative-120",
  };

  useEffect(() => {
    const hoverItem = hoverItemRef.current;
    const indicator = indicatorRef.current;
    const imageContainer = imageContainerRef.current;

    if (!hoverItem || !indicator || !imageContainer) return;

    const zoomFactor = 2;

    imageContainer.style.width = `${hoverItem.clientWidth}px`;
    imageContainer.style.height = `${hoverItem.clientHeight}px`;
    imageContainer.style.backgroundImage = `url(${src})`;
    imageContainer.style.backgroundRepeat = "no-repeat";

    const handleMouseMove = (event: MouseEvent) => {
      const hoverRect = hoverItem.getBoundingClientRect();
      const indicatorRect = indicator.getBoundingClientRect();

      let adjustedClientX = Math.min(
        Math.max(event.clientX - hoverRect.left, 0),
        hoverRect.width - indicatorRect.width
      );
      let adjustedClientY = Math.min(
        Math.max(event.clientY - hoverRect.top, 0),
        hoverRect.height - indicatorRect.height
      );
      indicator.style.transform = `translate(${adjustedClientX}px, ${adjustedClientY}px)`;

      // Calculate relative position
      let relativeX = (adjustedClientX / hoverRect.width) * 100;
      let relativeY = (adjustedClientY / hoverRect.height) * 100;

      // Set background position and size (optional zoom)
      imageContainer.style.backgroundPosition = `${relativeX}% ${relativeY}%`;
      imageContainer.style.backgroundSize = `${zoomFactor * 100}% ${
        zoomFactor * 100
      }%`;
    };

    hoverItem.addEventListener("mousemove", handleMouseMove);

    return () => {
      hoverItem.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="image-zoom-container">
      <div className="hover-item" ref={hoverItemRef} id="hover">
        <img src={src} alt="Image Description" />
        <div id="indicator" className="indicator" ref={indicatorRef}></div>
      </div>
      <div className={`image-preview ${position[previewPosition]}`}>
        <div
          id="image-container"
          className="image-container"
          ref={imageContainerRef}
        ></div>
      </div>
    </div>
  );
}
