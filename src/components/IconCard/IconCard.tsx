import { FC } from 'react';
import * as FeatherIcons from 'react-feather';
import "./IconCard.css";

type Icons = keyof typeof FeatherIcons;

type IconCardProps = {
  icon: Icons;
  text: string;
  description: string;
}

export const IconCard: FC<IconCardProps> = ({ icon, text, description }) => {
  const IconComponent = FeatherIcons[icon];

  return (
    <div className="icon-card">
      <div className='icon-card__icon'>
        <IconComponent />
      </div>

      <h3>{text}</h3>
      <p>{description}</p>
    </div>
  )
}
