export interface CreateLightDto {
  roomId: string;
  name: string;
  subCategory: number;
  capabilities: {
    dimmable: boolean;
    hasColorTemperature: boolean;
  };
}
