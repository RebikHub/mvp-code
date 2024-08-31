import * as zip from '@zip.js/zip.js';

zip.configure({
  workerScripts: {
    inflate: ['zip-no-worker.js'], // Используем без воркера для сжатия
  },
});

// Создаем объект ZipWriter

const createZipWriter = () => {
  const writer = new zip.BlobWriter('application/zip');
  return new zip.ZipWriter(writer);
};

// Добавляем файл в архив

const addFileToZip = async (zipWriter: zip.ZipWriter<Blob>, file: File) => {
  const entryOptions = {
    bufferedWrite: true,
    // password: '123', // пока пароль архива отключен
  };
  await zipWriter.add(file.name, new zip.BlobReader(file), entryOptions);
};

// Создаем ZIP-архив из массива файлов

export const createZipArchive = async (files: File[]) => {
  const zipWriter = createZipWriter();

  try {
    for (const file of files) {
      await addFileToZip(zipWriter, file);
    }

    const blobURL = await zipWriter.close();
    return blobURL;
  } catch (error) {
    throw error ? error : 'Error creating zip archive';
  }
};
