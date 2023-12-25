export interface Shade {
  id: string;
  name: string;
  roomId: string;
  homeId: string;
  mainCategory: number;
  subCategory: number;
  properties: {
    level: number | null;
  };
  capabilities: {
    hasLevel: boolean;
  };
  onlineStatus: boolean;
  statusLastUpdatedAt: string;
}
