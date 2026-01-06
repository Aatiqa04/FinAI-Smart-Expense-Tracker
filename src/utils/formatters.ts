/**
 * Replace **text** with <strong>text</strong> for markdown-style bold
 */
export const formatBold = (text: string): string => {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
};
