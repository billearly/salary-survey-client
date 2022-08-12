import { FC, ReactNode } from "react";
import classNames from "classnames";
import "./Section.css";

export enum BackgroundColor {
  DEFAULT,
  ALT
}

export enum Direction {
  VERTICAL,
  HORIZONTAL
}

export enum Padding {
  DEFAULT,
  NONE,
}

type SectionProps = {
  children: ReactNode;
  backgroundColor?: BackgroundColor; 
  paddingTop?: Padding;
  paddingBottom?: Padding;
  direction?: Direction;
}

export const Section: FC<SectionProps> = ({
  children,
  backgroundColor,
  paddingTop,
  paddingBottom,
  direction
}) => {
  const sectionClasses = classNames({
    "background--alt": backgroundColor === BackgroundColor.ALT
  });

  const contentClasses = classNames("content", {
    "padding__top--none": paddingTop === Padding.NONE,
    "padding__top--default": paddingTop === Padding.DEFAULT,
    "padding__bottom--none": paddingBottom === Padding.NONE,
    "padding__bottom--default": paddingBottom === Padding.DEFAULT,
    "direction--vertical": direction === Direction.VERTICAL,
    "direction--horizontal": direction === Direction.HORIZONTAL,
    "background--alt": backgroundColor === BackgroundColor.ALT
  });

  return (
    <section className={sectionClasses}>
      <div className={contentClasses}>
        {children}
      </div>
    </section>
  )
}
