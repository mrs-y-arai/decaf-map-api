export type Place = {
  id: string;
  name: string;
  description?: string;
  position: {
    latitude: number;
    longitude: number;
  };
  createdAt: Date;
};
