export const downloadFile = (blob: Blob) => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'container.zip';
  link.click();
};
