import React from "react";
import "./ImageZoom.css";
interface ImageZoomProps {
    src: string;
    previewPosition?: "left" | "right" | "top" | "bottom";
    indicatorStyles?: React.CSSProperties;
}
export default function ImageZoom({ src, previewPosition, }: ImageZoomProps): import("react/jsx-runtime").JSX.Element;
export {};
