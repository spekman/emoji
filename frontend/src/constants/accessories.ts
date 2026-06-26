import { DimensionValue } from 'react-native';
import { iconNames } from 'react-native-ico-noto-emojis';

export interface AccessoryConfig {
    id: iconNames;
    label: string;

    top: DimensionValue;
    left: DimensionValue;
    sizeRatio: number;
}

export const ACCESSORIES_CATALOG: Record<string, AccessoryConfig> = {
    top_hat: {
        id: 'top-hat',
        label: 'Cartola',
        top: '-55%',
        left: '0%',
        sizeRatio: 1,
    },
    sunglasses: {
        id: 'sunglasses',
        label: 'Óculos Escuros',
        top: '-5%',
        left: '0%',
        sizeRatio: 1,
    },
    cigarette: {
        id: 'cigarette',
        label: 'Cigarro',
        top: '30%',
        left: '50%',
        sizeRatio: 0.5,
    }
};