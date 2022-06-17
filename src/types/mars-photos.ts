export type Camera = {
  id: number;
  name: string;
  full_name: string;
};

export type Rover = {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
};

export type Photo = {
  id: number;
  sol: number;
  earth_date: string;
  img_src: string;
  camera: Camera;
  rover: Rover;
};
