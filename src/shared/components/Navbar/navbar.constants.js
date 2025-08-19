// Fichero: src/shared/components/Navbar/navbar.constants.js

import { ArmarioIcon } from '../Icons/ArmarioIcon';
import { CalendarioIcon } from '../Icons/CalendarioIcon';
import { ComunidadIcon } from '../Icons/ComunidadIcon';
import { PerfilIcon } from '../Icons/PerfilIcon';
import { PlusIcon } from '../Icons/PlusIcon';
import { RobotIcon } from '../Icons/RobotIcon';

export const NAV_ITEMS = [
  {
    to: "/comunidad",
    Icon: ComunidadIcon, 
  },
  {
    to: "/calendario",
    Icon: CalendarioIcon, 
  },
  {
    to: "/agregar-prenda",
    Icon: ArmarioIcon,    
    ActiveIcon: PlusIcon, 
  },
  {
    to: "/asistente",
    Icon: RobotIcon,      
  },
  {
    to: "/perfil",
    Icon: PerfilIcon,      
  }
];