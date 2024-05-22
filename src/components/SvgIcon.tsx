import { IconsType } from "@/types/icons.types";

export type SvgIconType = {
  name: IconsType;
  className?: string;
};

const SvgIcon = ({ name, className, ...rest }: SvgIconType) => {
  return (
    <svg
      className={className}
      aria-label={`${name} icon`}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <use width="100%" height="100%" href={`/svg/sprite.svg#${name}`} />
    </svg>
  );
};

export default SvgIcon;
