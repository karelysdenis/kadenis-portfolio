import {
  FaReact,
  FaNodeJs,
  FaWordpress,
  FaServer
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiJavascript,
  SiExpress,
  SiMysql
} from 'react-icons/si';

export const iconMap = {
  FaWordpress,
  FaReact,
  FaNodeJs,
  FaServer,
  SiTailwindcss,
  SiJavascript,
  SiExpress,
  SiMysql
};

export const getIcon = (iconName) => {
  return iconMap[iconName] || null;
};
