export const theme = {
  colors: {
    gradientTop: '#1244FF',       // Azul elétrico ultra vivo
    gradientMid: '#7B2CBF',       // Roxo neon saturado
    gradientBottom: '#e44bdc',    // Rosa choque/Magenta brilhante

    // 🔮 Superfícies translúcidas recalibradas para alto contraste sobre o fundo vivo
    surface: 'rgba(10, 11, 40, 0.82)',       // Vidro escuro denso para a Loja/Modais se destacarem
    surfaceLight: 'rgba(255, 255, 255, 0.15)', // Brilho branco/azul sutil para dar profundidade

    // 🔤 Tipografia ciber-digital de alta legibilidade
    textPrimary: '#FFFFFF',
    textSecondary: '#E0E7FF',     // Azul índigo bem claro e brilhante para subtítulos
    textMuted: '#A5B4FC',         // Roxo elétrico claro para placeholders/textos secundários

    // ✨ Destaques e Acessórios
    star: '#FFD700',              // Dourado para moedas
    accent: '#00F5D4',            // Ciano Neon Elétrico (Destaque absoluto)
    accentDeep: '#9B5DE5',        // Roxo místico acentuado

    // 💬 Balões de Chat Estilo Filme Virtual (Ajustados para contrastar com o fundo)
    petBubble: 'rgba(15, 12, 50, 0.88)',     // Balão do pet escuro bem definido
    petBubbleText: '#FFFFFF',
    userBubble: 'rgba(0, 245, 212, 0.25)',   // Balão do usuário com brilho ciano sutil
    userBubbleText: '#00F5D4',               // Texto em ciano neon para destacar as falas do usuário

    // 🎛️ Componentes do App (Header e Footer)
    headerBg: 'rgba(10, 11, 40, 0.5)',       // Header levemente escura translúcida no topo
    footerPill: 'rgba(10, 11, 40, 0.85)',   // Footer bem robusta e escura para destacar os botões
    footerButton: 'rgba(99, 102, 241, 0.35)', // Botões roxos/azuis elétricos translúcidos

    // 📥 Input de Texto Modernizado
    inputBg: 'rgba(15, 20, 60, 0.9)',
    inputBorder: '#6366F1',       // Borda roxa brilhante
    error: '#FF0055',             // Rosa neon de alerta

    // 🛍️ Grade da Loja e Seleção
    emojiSelected: 'rgba(0, 245, 212, 0.25)', // Brilho interno ao selecionar item
    emojiSelectedBorder: '#00F5D4',           // Borda ciano neon ao selecionar item
  },

  // 🔘 Usado em botões de ação, submissão ou destaques da loja
  buttonGradient: ['#00F5D4', '#00BBF9'] as [string, string, ...string[]], // Ciano para Azul Claro Neon
  // Gráficos e Status do Pet com gradientes neon agressivos
  statusGradients: {
    Fome: ['#FF0055', '#FF5000'],       // Rosa choque para Laranja Elétrico
    Felicidade: ['#00F5D4', '#00BBF9'], // Ciano elétrico para Azul
    Energia: ['#9B5DE5', '#F15BB5'],    // Roxo místico para Rosa Choque
    Limpeza: ['#00F5D4', '#7B2CBF'],    // Ciano para Roxo
  } as Record<string, [string, string, ...string[]]>,

  statusFallback: {
    Fome: '#FF0055',
    Felicidade: '#00F5D4',
    Energia: '#9B5DE5',
    Limpeza: '#00F5D4',
  } as Record<string, string>,


  statusIcons: {
    Fome: '🍕',
    Felicidade: '❤️',
    Energia: '⚡',
    Limpeza: '💧',
  } as Record<string, string>,
};

export const PET_SIZE = 230;
export const PET_TOP_RATIO = 0.34;
export const FOOTER_PILL_HEIGHT = 72;

export function emojiAvatarStyle(size: number) {
  return {
    fontSize: size * 0.92,
    lineHeight: size,
    width: size,
    height: size,
    textAlign: 'center' as const,
    includeFontPadding: false,
    textAlignVertical: 'center' as const,
  };
}