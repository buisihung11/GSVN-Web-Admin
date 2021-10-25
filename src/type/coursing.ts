export type TCoursing = {
  id?: number;
  title: string;
  coursingLevels: {
    id: number;
    coursingId: number;
    name: string;
  }[];
};
