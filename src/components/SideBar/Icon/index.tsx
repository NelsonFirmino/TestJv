import { Gavel } from "@phosphor-icons/react";
import {
  ChartLine,
  Circle,
  CurrencyDollarSimple,
  File,
  Gear,
  ListBullets,
  Monitor,
  PresentationChart,
  ProjectorScreenChart,
} from "phosphor-react";

const icons = {
  4: ListBullets,
  46: File,
  6: Gavel,
  1: Monitor,
  2: CurrencyDollarSimple,
  5: Gear,
  3: PresentationChart,
  39: ProjectorScreenChart,
  359: ChartLine,
};

type IconProps = {
  menuId: number;
};

const Icon = ({ menuId }: IconProps) => {
  const IconComponent = icons[menuId];

  return IconComponent ? <IconComponent size={20} /> : <Circle size={20} />;
};

export default Icon;
