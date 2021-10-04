// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

async function getBucketMetadata() {
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */

  // The ID of your GCS bucket
  const bucketName = 'gracie_images';

  // Get Bucket Metadata
  const [metadata] = await storage.bucket(bucketName).getMetadata();

  console.log('cors', metadata.cors) //eslint-disable-line

  // for (const [key, value] of Object.entries(metadata)) {
  //   console.log(`${key}: ${value}`);
  // }
}

getBucketMetadata().catch((err) => console.log(err.message));
