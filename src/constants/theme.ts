export const theme = {
  colors: {
    gradientTop: '#3940ff',
    gradientMid: '#3172dc',
    gradientMid2: '#4F46E5',
    gradientBottom: '#6032cd',
    surface: 'rgba(12, 32, 96, 0.82)',
    surfaceLight: 'rgba(37, 99, 235, 0.45)',
    textPrimary: '#FFFFFF',
    textSecondary: '#BFDBFE',
    textMuted: '#93C5FD',
    star: '#FFD54F',
    accent: '#3B82F6',
    accentDeep: '#1D4ED8',
    petBubble: '#EEF2FF',
    petBubbleText: '#0F172A',
    userBubble: 'rgba(37, 99, 235, 0.82)',
    userBubbleText: '#FFFFFF',
    footerPill: 'rgba(8, 28, 88, 0.86)',
    footerButton: 'rgba(59, 130, 246, 0.5)',
    barTrack: 'rgba(191, 219, 254, 0.2)',
    inputBg: 'rgba(15, 40, 110, 0.55)',
    inputBorder: 'rgba(147, 197, 253, 0.35)',
    error: '#FCA5A5',
    emojiSelected: 'rgba(59, 130, 246, 0.35)',
    emojiSelectedBorder: '#60A5FA',
  },
  backgroundGradient:
    'linear-gradient(to bottom, #3940ff 0%, #1441be 32%, #3B82F6 50%, #6032cd 72%, #b14dfe 100%)',
  buttonGradient:
    'linear-gradient(to bottom, #60A5FA 0%, #2563EB 55%, #1D4ED8 100%)',
  statusGradients: {
    Fome: 'linear-gradient(to right, #FF6D00 0%, #FFEA00 100%)',
    Felicidade: 'linear-gradient(to right, #00C853 0%, #00E5FF 100%)',
    Energia: 'linear-gradient(to right, #FF1744 0%, #651FFF 100%)',
    Limpeza: 'linear-gradient(to right, #FFB300 0%, #FFEA00 100%)',
  } as Record<string, string>,
  statusFallback: {
    Fome: '#FF6D00',
    Felicidade: '#00C853',
    Energia: '#FF1744',
    Limpeza: '#FFB300',
  } as Record<string, string>,
  statusIcons: {
    Fome: '🍕',
    Felicidade: '❤️',
    Energia: '⚡',
    Limpeza: '💧',
  } as Record<string, string>,
};

export const PET_SIZE = 230;
export const PET_TOP_RATIO = 0.325;
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
