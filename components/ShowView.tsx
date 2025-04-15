import { ReactNode } from "react";

interface IShowViewProps {
  children: ReactNode;
  when: boolean;
}

export const ShowView = ({ when, children }: IShowViewProps) => {
  return when ? <>{children}</> : null;
};
export { ShowView as default };
