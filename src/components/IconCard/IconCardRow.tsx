import { FC, ReactNode } from 'react';
import "./IconCardRow.css";

type IconCardRowProps = {
  children: ReactNode;
}

export const IconCardRow: FC<IconCardRowProps> = ({ children }) => {
  return <div className="icon-card-row">{children}</div>
}
