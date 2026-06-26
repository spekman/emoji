import type { DragItem } from '@/hooks/useDragInteraction';
import { PooEmoji } from '@/hooks/usePooEmojis';
import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-ico-noto-emojis';

interface PooEmojiContainerProps {
  pooEmojis: PooEmoji[];
  onShowerPoo: (id: string) => void;
  dragItem?: DragItem | null;
}

export function PooEmojiContainer({ pooEmojis, onShowerPoo, dragItem }: PooEmojiContainerProps) {
  const cleaningRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const activeIds = new Set(pooEmojis.map(p => p.id));
    Object.keys(cleaningRef.current).forEach(id => {
      if (!activeIds.has(id)) {
        delete cleaningRef.current[id];
      }
    });
  }, [pooEmojis]);

  useEffect(() => {
    if (!dragItem || dragItem.type !== 'showering') return;

    pooEmojis.forEach(poo => {
      if (cleaningRef.current[poo.id]) return;

      const dx = dragItem.x - (poo.x + 30);
      const dy = dragItem.y - (poo.y + 30);
      const distSq = dx * dx + dy * dy;
      const radius = 30;

      if (distSq <= radius * radius) {
        cleaningRef.current[poo.id] = true;
        onShowerPoo(poo.id);
      }
    });
  }, [dragItem, pooEmojis, onShowerPoo]);

  return (

    <View style={styles.container} pointerEvents="box-none">
      {pooEmojis.map(poo => (
        <View
          key={poo.id}
          style={[
            styles.pooEmoji,
            {
              left: poo.x,
              top: poo.y,
            }
          ]}
          pointerEvents="none"
        >
          <Icon name='pile-of-poo' height={60} width={60}/>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    zIndex: 99,
  },
  pooEmoji: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});