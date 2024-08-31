import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

const bucket = import.meta.env.VITE_S3_BUCKET;

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: import.meta.env.VITE_AWS_REGION },
    identityPoolId: import.meta.env.VITE_POOL_ID_S3_DEV,
  }),
});

export const uploadToS3 = async ({
  blobURL,
  key,
}: {
  blobURL: Blob;
  key: string;
}) => {
  try {
    const uploadItem = await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        ContentType: 'application/zip',
        Body: blobURL,
      }),
    );
    return uploadItem.$metadata;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};

export const downloadFromS3 = async (key: string) => {
  try {
    const downloadItem = await s3Client.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );

    if (downloadItem.Body) {
      const stream = await downloadItem.Body.transformToByteArray();
      const arrayBuffer = await new Response(stream).arrayBuffer();
      const blob = new Blob([new Uint8Array(arrayBuffer)], {
        type: 'application/zip',
      });

      return blob;
    }
  } catch (error) {
    console.error('Error downloading from S3:', error);
    throw error;
  }
};

export const deleteFromS3 = async (key: string) => {
  try {
    const deleteItem = await s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );

    return deleteItem.$metadata.httpStatusCode;
  } catch (error) {
    console.error('Error deleting from S3:', error);
    throw error;
  }
};
