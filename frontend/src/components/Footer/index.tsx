import { theme } from '@/constants/theme';
import { InteractionTypes } from '@/types';
import { PanResponderInstance, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon, { iconNames } from 'react-native-ico-noto-emojis';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import type { DragItem } from '@/hooks/useDragInteraction';

type Props = {
    startDrag: (type: InteractionTypes, icon: iconNames, pageX: number, pageY: number) => void;
    dragItem: DragItem;
    panResponder: PanResponderInstance;
}

const EMOJI_OPTIONS: Record<InteractionTypes, iconNames> = {
    petting: 'raised-back-of-hand',
    feeding: 'pizza',
    showering: 'shower',
    sleeping: 'zzz'
};

export function Footer({ startDrag, dragItem, panResponder }: Props) {
    const insets = useSafeAreaInsets();
    const ICON_SIZE = 35;

    return (
        <SafeAreaView style={styles.safe} pointerEvents="box-none" {...panResponder.panHandlers}>
            <View style={[styles.pill, { bottom: 12 + insets.bottom }]} pointerEvents="box-none">
                <TouchableOpacity style={styles.iconButton} onPressIn={(evt) => startDrag('petting', EMOJI_OPTIONS.petting, evt.nativeEvent.pageX, evt.nativeEvent.pageY)}>
                    <View style={styles.iconCircle}><Icon name="raised-back-of-hand" width={ICON_SIZE} height={ICON_SIZE} /></View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPressIn={(evt) => startDrag('feeding', EMOJI_OPTIONS.feeding, evt.nativeEvent.pageX, evt.nativeEvent.pageY)}>
                    <View style={styles.iconCircle}><Icon name="pizza" width={ICON_SIZE} height={ICON_SIZE} /></View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPressIn={(evt) => startDrag('showering', EMOJI_OPTIONS.showering, evt.nativeEvent.pageX, evt.nativeEvent.pageY)}>
                    <View style={styles.iconCircle}><Icon name="shower" width={ICON_SIZE} height={ICON_SIZE} /></View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPressIn={(evt) => startDrag('sleeping', EMOJI_OPTIONS.sleeping, evt.nativeEvent.pageX, evt.nativeEvent.pageY)}>
                    <View style={styles.iconCircle}><Icon name="zzz" width={ICON_SIZE} height={ICON_SIZE} /></View>
                </TouchableOpacity>
            </View>

            <View style={[styles.dragOverlay, { pointerEvents: dragItem ? 'auto' : 'none' }]} {...panResponder.panHandlers}>
                {dragItem ? (
                    <View
                        style={[styles.dragPreview, { left: dragItem.x - 24, top: dragItem.y - 24 }]}
                    >
                        <Icon name={dragItem.icon} width={ICON_SIZE * 1.6} height={ICON_SIZE * 1.6} />
                    </View>
                ) : null}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  safe: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    zIndex: 50,
    pointerEvents: 'box-none', // Permite arrastar os elementos por trás
  },
  pill: {
    position: 'absolute',
    bottom: 16, // Um pouco mais alto para dar respiro visual
    width: '92%',
    backgroundColor: theme.colors.footerPill, // Fundo ultra dark fosco
    borderRadius: 32,
    borderCurve: 'continuous',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(22, 23, 106, 0.3)', // Contorno estético roxo cibernético
    
    // Sombreamento robusto e flutuante para Mobile
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 12,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.footerButton, // Azul/Roxo elétrico translúcido
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    
    // Efeito leve de glow no botão de ação rápida
    shadowColor: theme.colors.textMuted,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  dragOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  dragPreview: {
    position: 'absolute',
    zIndex: 1001,
    // Brilho de destaque sob o emoji que está flutuando/sendo arrastado
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 15,
  }
});