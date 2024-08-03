# react-rezoom.js

## Overview

React component for desktop browsers for image zoom on mouse hover.

## Demo

[Demo]()

## Install

```
npm install react-rezoom.js
```

## Usage

```javascript
import ImageZoom from "react-rezoom.js ";

function Zoom() {
    return  <ImageZoom
        indicatorStyles={{ height: "100px", width: "100px" }}
        src="https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg?cs=srgb&dl=pexels-jeffreyreed-769749.jpg&fm=jpg"
        previewPosition={"right"}
      />
}
```

## propTypes

- **indicatorStyles** (styles) - Styles for the indicator (optional)
- **src** (string) - Source for the image (required).
- **previewPosition** ("left", "right", "top", "bottom") - Preview position for the         indicator.

