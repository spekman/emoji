import { iconNames } from 'react-native-ico-noto-emojis';

export interface PetStatus {
  hunger: number;      // 0 a 100
  happiness: number; // 0 a 100
  energy: number;    // 0 a 100
  cleanliness: number; // 0 a 100
}

export interface Pet {
  id: string;
  name: string;
  baseEmoji: string; // emoji do perfil/header
  currentEmoji: iconNames; // emoji do pet
  status: PetStatus;
  equippedAccessoryId?: iconNames | undefined;
}

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: 'user' | 'pet'; 
}

export type InteractionTypes = 'petting' | 'feeding' | 'showering' | 'sleeping';