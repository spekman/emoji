import { InteractionTypes } from '@/types';
import { useMemo, useRef, useState } from 'react';
import { LayoutRectangle, PanResponder, View } from 'react-native';
import { iconNames } from 'react-native-ico-noto-emojis';

export type DragItem = {
  type: InteractionTypes;
  icon: iconNames;
  x: number;
  y: number;
} | null;

export function useDragInteraction(
  onDrop: (type: InteractionTypes) => void,
  onHover?: (type: InteractionTypes) => void,
  onRelease?: () => void,
  isSleeping: boolean = false
) {
  const [dragItem, setDragItem] = useState<DragItem>(null);
  const dragItemRef = useRef<DragItem>(null);
  const dropZoneRef = useRef<View | null>(null);
  const dropZoneLayout = useRef<LayoutRectangle | null>(null);
  const hoverTimestamp = useRef<number>(0);

  const updateDropZone = () => {
    if (!dropZoneRef.current || typeof dropZoneRef.current.measureInWindow !== 'function') {
      return;
    }

    dropZoneRef.current.measureInWindow((x, y, width, height) => {
      dropZoneLayout.current = { x, y, width, height };
    });
  };

  const startDrag = (type: InteractionTypes, icon: iconNames, pageX: number, pageY: number) => {
    if (isSleeping) return;
    const newItem: DragItem = { type, icon, x: pageX, y: pageY };
    dragItemRef.current = newItem;
    setDragItem(newItem);
  };

  const resetDrag = () => {
    dragItemRef.current = null;
    setDragItem(null);
  };

  const isInsideDropZone = (pageX: number, pageY: number) => {
    const layout = dropZoneLayout.current;
    if (!layout) return false;
    return (
      pageX >= layout.x &&
      pageX <= layout.x + layout.width &&
      pageY >= layout.y &&
      pageY <= layout.y + layout.height
    );
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !!dragItemRef.current,
        onStartShouldSetPanResponderCapture: () => !!dragItemRef.current,
        onMoveShouldSetPanResponder: () => !!dragItemRef.current,
        onMoveShouldSetPanResponderCapture: () => !!dragItemRef.current,
        onPanResponderMove: (evt) => {
          if (!dragItemRef.current) {
            return;
          }

          const { pageX, pageY } = evt.nativeEvent;
          const item = { ...dragItemRef.current, x: pageX, y: pageY };
          dragItemRef.current = item;
          setDragItem(item);

          if (isInsideDropZone(pageX, pageY) && item.type === 'petting') {
            const now = Date.now();
            if (now - hoverTimestamp.current > 260) {
              hoverTimestamp.current = now;
              onHover?.(item.type);
            }
          }
        },
        onPanResponderRelease: (evt) => {
          if (dragItemRef.current) {
            const { pageX, pageY } = evt.nativeEvent;
            if (isInsideDropZone(pageX, pageY)) {
              onDrop(dragItemRef.current.type);
            }
          }
          resetDrag();
          onRelease?.();
        },
        onPanResponderTerminate: () => {
          resetDrag();
          onRelease?.();
        },
        onPanResponderTerminationRequest: () => true,
        onShouldBlockNativeResponder: () => false,
      }),
    [onDrop, onHover, onRelease, isSleeping]
  );

  /*
    - `dropZoneRef` e `dropZoneLayout` medem a área alvo onde
      um item arrastado pode ser "dropado". não depende de valores fixos
      de layout para suportar diferentes tamanhos de tela.
    - `dragItemRef` é usado além do state porque durante o `PanResponder` é
      preferível manipular uma referência mutável (evita closures desatualizadas
      e re-renders desnecessários no movimento contínuo do dedo).
    - há uma pequena lógica de throttle (`hoverTimestamp`) para o evento de
      hover, impedindo que callbacks sejam disparados excessivamente enquanto o
      utilizador move o dedo dentro da zona alvo.
    - `PanResponder` foi escolhido por compatibilidade ampla com gestos simples
      e por ser suficiente ao caso de uso (drag + drop leve). Em casos mais
      avançados talvez `react-native-gesture-handler` seja melhor.
  */

  return {
    dragItem,
    panResponder,
    dropZoneRef,
    updateDropZone,
    startDrag,
  };
}
