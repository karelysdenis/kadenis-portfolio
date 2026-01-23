import {
  FaReact,
  FaNodeJs,
  FaWordpress,
  FaGitAlt,
  FaServer
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiJavascript,
  SiExpress,
  SiBootstrap,
  SiMysql
} from 'react-icons/si';

export const iconMap = {
  FaWordpress,
  FaReact,
  FaNodeJs,
  FaServer,
  FaGitAlt,
  SiTailwindcss,
  SiJavascript,
  SiExpress,
  SiBootstrap,
  SiMysql
};

export const getIcon = (iconName) => {
  return iconMap[iconName] || null;
};
