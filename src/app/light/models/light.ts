export interface Light {
  id: string;
  name: string;
  roomId: string;
  homeId: string;
  mainCategory: number;
  subCategory: number;
  properties: {
    brightness: number | null;
    colorTemperature: number | null;
  };
  capabilities: {
    dimmable: boolean;
    hasColorTemperature: boolean;
  };
  onlineStatus: boolean;
  statusLastUpdatedAt: string;
}
