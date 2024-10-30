export interface IMenuData {
  path: string;
  icon: ({ focus }: { focus?: boolean }) => JSX.Element;
}
