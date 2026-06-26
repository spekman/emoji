import { PetStatus } from "@/types";
import { iconNames } from "react-native-ico-noto-emojis";

export function getEmoji(status: PetStatus, isSleeping: boolean = false): iconNames {
    if (isSleeping) return 'sleeping-face';

    if (status.hunger <= 15) return 'drooling-face';
    if (status.cleanliness <= 20) return 'nauseated-face';
    if (status.energy <= 15) return 'face-exhaling';
    if (status.happiness <= 20) return 'loudly-crying-face';

    if (status.hunger <= 45) return 'pleading-face';
    if (status.cleanliness <= 40) return 'face-with-rolling-eyes';
    if (status.happiness <= 45) return 'frowning-face';
    if (status.energy <= 40) return 'yawning-face';

    if (status.happiness >= 60) return 'smiling-face';

    return 'neutral-face';
}