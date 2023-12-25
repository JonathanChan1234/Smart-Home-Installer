export interface CreateShadeDto {
  roomId: string;
  name: string;
  subCategory: number;
  capabilities: {
    hasLevel: boolean;
  };
}
