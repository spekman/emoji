import { ACCESSORIES_CATALOG } from '@/constants/accessories';
import { theme } from '@/constants/theme';
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon, { iconNames } from 'react-native-ico-noto-emojis';

interface ShopModalProps {
  visible: boolean;
  onClose: () => void;
  currentAccessoryId?: string;
  onSelectAccessory: (id: string | undefined) => void;
}

export function ShopModal({ visible, onClose, currentAccessoryId, onSelectAccessory }: ShopModalProps) {
  const shopItems = Object.keys(ACCESSORIES_CATALOG).map(key => ({
    ...ACCESSORIES_CATALOG[key],
    dbId: key
  }));

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>

        <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
          <View style={styles.header}>
            <Text style={styles.title}>Loja de Acessórios</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.itemRow, !currentAccessoryId && styles.selectedItem]}
            onPress={() => {
              onSelectAccessory(undefined);
              onClose();
            }}
          >
            <View style={styles.emptyIconBox}>
              <Text style={styles.emptyText}>❌</Text>
            </View>
            <Text style={styles.itemLabel}>Remover Acessório</Text>
          </TouchableOpacity>

          <FlatList
            data={shopItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isEquipped = currentAccessoryId === item.dbId;
              return (
                <TouchableOpacity
                  style={[styles.itemRow, isEquipped && styles.selectedItem]}
                  onPress={() => {
                    onSelectAccessory(item.dbId);
                    onClose();
                  }}
                >
                  <View style={styles.iconBox}>
                    <Icon name={item.id as iconNames} height={36} width={36} />
                  </View>
                  <Text style={styles.itemLabel}>{item.label}</Text>
                  {isEquipped && <Text style={styles.equippedBadge}>Equipado</Text>}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Pressable>
    </Modal>
  );
}
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(5, 7, 28, 0.65)', // Escurecimento espacial translúcido
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.surface, // Vidro escuro tecnológico
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderCurve: 'continuous',
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 40,
    maxHeight: '65%',
    borderWidth: 1.5,
    borderColor: 'rgba(99, 102, 241, 0.25)', // Leve borda iluminada superior
    
    // Sombra Neon sutil flutuante
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    letterSpacing: 0.5,
  },
  closeButton: {
    padding: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
  },
  closeButtonText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    backgroundColor: 'rgba(15, 20, 60, 0.6)', // Fundo de caixa combinando com Inputs
    borderWidth: 1.5,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  selectedItem: {
    borderColor: theme.colors.emojiSelectedBorder, // Contorno Ciano Neon ativo
    backgroundColor: theme.colors.emojiSelected,   // Brilho interno do ciano
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  iconBox: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  emptyIconBox: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 0, 85, 0.15)', // Vermelho/Rosa Neon fosco de exclusão
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  emptyText: {
    fontSize: 18,
  },
  itemLabel: {
    fontSize: 16,
    marginLeft: 14,
    color: theme.colors.textPrimary,
    fontWeight: '500',
    flex: 1,
  },
  equippedBadge: {
    fontSize: 12,
    color: theme.colors.accent, // Etiqueta Ciano Neon de destaque
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});