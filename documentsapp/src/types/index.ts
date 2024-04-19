export type User = {
  firstName: string;
  lastName: string;
};
export interface StatItemProps {
  value: number;
  label: string;
}
export interface StatStackProps {
  stats: StatItemProps[];
}
