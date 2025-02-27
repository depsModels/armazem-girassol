// Atualizando os caminhos para a nova localização
import { formatText } from '../utils/formatText';

export function capitalizeWords(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
