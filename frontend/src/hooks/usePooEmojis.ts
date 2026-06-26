import { FOOTER_PILL_HEIGHT, PET_SIZE, PET_TOP_RATIO } from '@/constants/theme';
import { useCallback, useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface PooEmoji {
  id: string;
  x: number;
  y: number;
}

export function usePooEmojis(cleanliness: number) {
  const [pooEmojis, setPooEmojis] = useState<PooEmoji[]>([]);

  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const targetPooCount = Math.ceil((100 - cleanliness) / 10);

  useEffect(() => {
    setPooEmojis(prev => {
      const currentCount = prev.length;

      if (currentCount < targetPooCount) {
        const newPoos = [...prev];

        const petBottom = height * PET_TOP_RATIO + PET_SIZE / 2;
        const chatTop = petBottom;
        const chatBottom = FOOTER_PILL_HEIGHT + insets.bottom + 20;

        const availableHeight = height - chatTop - chatBottom;

        for (let i = currentCount; i < targetPooCount; i++) {
          const randomX = Math.random() * (width - 60);

          const randomY = chatTop + (Math.random() * (availableHeight - 60));

          newPoos.push({
            id: `poo-${cleanliness}-${i}-${Date.now()}-${Math.random()}`,
            x: randomX,
            y: randomY,
          });
        }
        return newPoos;
      }

      if (currentCount > targetPooCount) {
        return prev.slice(0, targetPooCount);
      }

      return prev;
    });
  }, [cleanliness, width, height, targetPooCount, insets.bottom]);

  const removePoo = useCallback((id: string) => {
    setPooEmojis(prev => prev.filter(poo => poo.id !== id));
  }, []);

  return { pooEmojis, removePoo };
}