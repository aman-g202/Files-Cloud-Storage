'use strict';

const fs = require('fs');

const S3 = require('aws-sdk/clients/s3');

module.exports = class AwsS3FileHelper {

    /**
       * Upload file to AWS 
       * @method
       * @name uploadFile - Required all parameters*
       * @param  {filePath} filePath - Stored file path - absolute path.
       * @param  {string} destFileName - fileName to be saved in aws s3 bucket
       * @param  {string} bucketName - aws s3 bucket in which file gets saved
       * @param  {string} accessKeyId - aws s3 access key id
       * @param  {string} secretAccessKey - aws s3 secret access key
       * @param  {string} bucketRegion - aws region where bucket will be located
       * @returns {Promise<JSON>} Uploaded json result.
       * @see accessKeyId - Get from aws console
       * @see secretAccessKey - Get from aws console
       * @see bucketRegion - Get from aws s3 console
     */
    static async uploadFile({filePath, destFileName, bucketName, accessKeyId, secretAccessKey, bucketRegion}) {

        if (!filePath) {
            const error = new Error('filePath is not passed in parameter');
            error.code = 500;
            throw error;
        }

        if (typeof filePath !== 'string') {
            const error = new Error('expected filepath as string');
            error.code = 500;
            throw error;
        }

        if (!destFileName) {
            const error = new Error('destFileName is not passed in parameter');
            error.code = 500;
            throw error;
        }

        if (!bucketName) {
            const error = new Error('bucketName is not passed in parameter');
            error.code = 500;
            throw error;
        }

        if (!accessKeyId) {
            const error = new Error('accessKeyId is not passed in parameter');
            error.code = 500;
            throw error;
        }

        if (!secretAccessKey) {
            const error = new Error('secretAccessKey is not passed in parameter');
            error.code = 500;
            throw error;
        }

        if (!bucketRegion) {
            const error = new Error('bucketRegion is not passed in parameter');
            error.code = 500;
            throw error;
        }

        /* Instantiate s3 cloud storage class */
        const s3 = new S3({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            signatureVersion: 'v4',
            region: bucketRegion
        });

        // Read content from the file as buffer
        const fileContent = fs.readFileSync(filePath);

        try {
            const uploadedFile = await s3.upload({
                Bucket: bucketName,
                Key: destFileName,
                Body: fileContent
            }).promise();
            return uploadedFile;
        } catch (error) {
            throw error;
        }

    }

}