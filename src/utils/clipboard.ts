export const copyToClipboard = (content: string) => {
  if (window.navigator) {
    window.navigator.clipboard.writeText(content);
  }
};