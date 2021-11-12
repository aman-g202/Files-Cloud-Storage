'use strict';

const { Storage } = require('@google-cloud/storage');

module.exports = class GcpFileHelper {

    /**
      * Upload file to GCP 
      * @method
      * @name uploadFile - Required all parameters*
      * @param  {filePath} filePath - Stored file path - absolute path.
      * @param  {string} destFileName - fileName to be saved in google cloud
      * @param  {string} bucketName - google cloud storage bucket in which file gets saved
      * @param  {string} gcpProjectId - google cloud storage project id
      * @param  {string} gcpJsonFilePath - google cloud storage json configuration file absolute path for connectivity
      * @returns {Promise<JSON>} Uploaded json result.
      * @see gcpProjectId - Get from gcp console
      * @see gcpJsonFilePath - Download file from manage storage api key session
    */
    static async uploadFile({ filePath, destFileName, bucketName, gcpProjectId, gcpJsonFilePath }) {

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

        if (!gcpProjectId) {
            const error = new Error('gcpProjectId is not passed in parameter');
            error.code = 500;
            throw error;
        }

        if (!gcpJsonFilePath) {
            const error = new Error('gcpJsonFilePath is not passed in parameter');
            error.code = 500;
            throw error;
        }

        if (typeof gcpJsonFilePath !== 'string') {
            const error = new Error('expected gcpJsonFilePath as string');
            error.code = 500;
            throw error;
        }

        /* Instantiate cloud storage class */
        const storage = new Storage({
            projectId: gcpProjectId,
            keyFilename: gcpJsonFilePath
        });
        
        try {
            /* connected to bucket and uploaded file */
            const uploadedFile = await storage.bucket(bucketName).upload(filePath, {
                destination: destFileName,
                metadata: {}
            });
            uploadedFile[0].metadata.accessUrl = `https://storage.googleapis.com/${uploadedFile[0].metadata.bucket}/${uploadedFile[0].metadata.name}`;
            return uploadedFile[0].metadata;
        } catch (error) {
            throw error;
        }

    }
}