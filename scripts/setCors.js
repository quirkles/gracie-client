// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();
// The ID of your GCS bucket
const bucketName = 'gracie_images';

const method = ['PUT'];
const origin = ['*'];
const responseHeader = ['*'];

async function configureBucketCors() {
  await storage.bucket(bucketName).setCorsConfiguration([
    {
      origin,
      responseHeader,
      method,
      maxAgeSeconds: 3600,
    },
  ]);

  console.log(`Bucket ${bucketName} was updated with a CORS config
      to allow ${method} requests from ${origin} sharing
      ${responseHeader} responses across origins`);
}

configureBucketCors().catch(console.error);
