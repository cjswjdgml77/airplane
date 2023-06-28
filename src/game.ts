import { customPos } from "./types";

export const floor = {
  floorXGeometry: 4,
  floorYGeometry: 0.3,
  floorZGeometry: 4,
  floorColor: "#609966",
  floorColor2: "#F24C3D",
  floorMaxFar: 6,
  floorMaxSpeed: 5,
  size: 10,
};
export const road = {
  endPoint: -100,
  maxWidth: 15,
};

export const eagle = {
  count: 5,
};
export const cloud = {
  maxScale: 10,
  opacity: 0.6,
};

interface iLand {
  startLand: {
    position: customPos;
  };
  aboutLand: {
    position: customPos;
  };
}

export const land: iLand = {
  startLand: {
    position: [0, -4, 0],
  },
  aboutLand: {
    position: [-8, 4, -20],
  },
};
