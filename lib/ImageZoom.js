"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImageZoom;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
require("./ImageZoom.css"); // Make sure to create and import your CSS file
function ImageZoom(_a) {
    var src = _a.src, _b = _a.previewPosition, previewPosition = _b === void 0 ? "right" : _b;
    var hoverItemRef = (0, react_1.useRef)(null);
    var indicatorRef = (0, react_1.useRef)(null);
    var imageContainerRef = (0, react_1.useRef)(null);
    var position = {
        left: "left-negative-120",
        right: "right-positive-120 top-0",
        top: "top-negative-120",
        bottom: "bottom-negative-120",
    };
    (0, react_1.useEffect)(function () {
        var hoverItem = hoverItemRef.current;
        var indicator = indicatorRef.current;
        var imageContainer = imageContainerRef.current;
        if (!hoverItem || !indicator || !imageContainer)
            return;
        var zoomFactor = 2;
        imageContainer.style.width = "".concat(hoverItem.clientWidth, "px");
        imageContainer.style.height = "".concat(hoverItem.clientHeight, "px");
        imageContainer.style.backgroundImage = "url(".concat(src, ")");
        imageContainer.style.backgroundRepeat = "no-repeat";
        var handleMouseMove = function (event) {
            var hoverRect = hoverItem.getBoundingClientRect();
            var indicatorRect = indicator.getBoundingClientRect();
            var adjustedClientX = Math.min(Math.max(event.clientX - hoverRect.left, 0), hoverRect.width - indicatorRect.width);
            var adjustedClientY = Math.min(Math.max(event.clientY - hoverRect.top, 0), hoverRect.height - indicatorRect.height);
            indicator.style.transform = "translate(".concat(adjustedClientX, "px, ").concat(adjustedClientY, "px)");
            // Calculate relative position
            var relativeX = (adjustedClientX / hoverRect.width) * 100;
            var relativeY = (adjustedClientY / hoverRect.height) * 100;
            // Set background position and size (optional zoom)
            imageContainer.style.backgroundPosition = "".concat(relativeX, "% ").concat(relativeY, "%");
            imageContainer.style.backgroundSize = "".concat(zoomFactor * 100, "% ").concat(zoomFactor * 100, "%");
        };
        hoverItem.addEventListener("mousemove", handleMouseMove);
        return function () {
            hoverItem.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "image-zoom-container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "hover-item", ref: hoverItemRef, id: "hover", children: [(0, jsx_runtime_1.jsx)("img", { src: src, alt: "Image Description" }), (0, jsx_runtime_1.jsx)("div", { id: "indicator", className: "indicator", ref: indicatorRef })] }), (0, jsx_runtime_1.jsx)("div", { className: "image-preview ".concat(position[previewPosition]), children: (0, jsx_runtime_1.jsx)("div", { id: "image-container", className: "image-container", ref: imageContainerRef }) })] }));
}
