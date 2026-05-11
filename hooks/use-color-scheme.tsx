import { useColorScheme as _useColorScheme } from 'react-native';

export function useColorScheme() {
  // Retorna 'light' (claro) ou 'dark' (escuro) dependendo do sistema do usuário
  return _useColorScheme() ?? 'light';
}