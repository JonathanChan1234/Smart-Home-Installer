import { Room } from './room';

export interface Floor {
  id: string;
  name: string;
  homeId: string;
  rooms: Room[];
}
