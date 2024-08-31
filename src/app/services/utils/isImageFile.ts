export const isImageFile = (file: File) => {
  const isImage = file.type.startsWith('image/');
  let type = null;

  if (isImage) {
    type = file.type.split('image/')[1];
  }

  return {
    isImage,
    type,
  };
};
