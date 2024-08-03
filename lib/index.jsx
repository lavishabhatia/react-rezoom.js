import React, { useRef, useEffect } from "react"
import "./ImageZoom.css"

/**
 * 
 * @param {Object} ImageZoomProps
 * @param {"left" | "right" | "top" | "bottom"} ImageZoomProps.previewPosition
 * @param {string} ImageZoomProps.src
 * @param {React.CSSProperties} ImageZoomProps.indicatorStyles
 * @returns 
 */
export default function ImageZoom({ src, previewPosition = "right", indicatorStyles }) {
    const hoverItemRef = useRef(null)
    const indicatorRef = useRef(null)
    const imageContainerRef = useRef(null)

    const position = {
        left: "left-negative-120",
        right: "right-positive-120 top-0",
        top: "top-negative-120",
        bottom: "bottom-negative-120"
    }

    useEffect(() => {
        const hoverItem = hoverItemRef.current
        const indicator = indicatorRef.current
        const imageContainer = imageContainerRef.current

        if (!hoverItem || !indicator || !imageContainer) return

        const zoomFactor = 2

        imageContainer.style.width = `${hoverItem.clientWidth}px`
        imageContainer.style.height = `${hoverItem.clientHeight}px`
        imageContainer.style.backgroundImage = `url(${src})`
        imageContainer.style.backgroundRepeat = "no-repeat"

        const handleMouseMove = event => {
            const hoverRect = hoverItem.getBoundingClientRect()
            const indicatorRect = indicator.getBoundingClientRect()

            let adjustedClientX = Math.min(
                Math.max(event.clientX - hoverRect.left, 0),
                hoverRect.width - indicatorRect.width
            )
            let adjustedClientY = Math.min(
                Math.max(event.clientY - hoverRect.top, 0),
                hoverRect.height - indicatorRect.height
            )
            indicator.style.transform = `translate(${adjustedClientX}px, ${adjustedClientY}px)`


            let relativeX = (adjustedClientX / hoverRect.width) * 100
            let relativeY = (adjustedClientY / hoverRect.height) * 100

            imageContainer.style.backgroundPosition = `${relativeX}% ${relativeY}%`
            imageContainer.style.backgroundSize = `${zoomFactor * 100}% ${zoomFactor *
                100}%`
        }

        hoverItem.addEventListener("mousemove", handleMouseMove)

        return () => {
            hoverItem.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

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
    )
}