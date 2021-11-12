'use strict';

const { BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions, StorageSharedKeyCredential } = require('@azure/storage-blob');

module.exports = class AzureFileHelper {

    /**
       * Upload file to AWS 
       * @method
       * @name uploadFile - Required all parameters*
       * @param  {filePath} filePath - Stored file path - absolute path.
       * @param  {string} destFileName - fileName to be saved in azure container
       * @param  {string} containerName - container in which file gets saved
       * @param  {string} accountName - account name of azure storage 
       * @param  {string} accountKey - account key of azure storage 
       * @returns {Promise<JSON>} Uploaded json result.
       * @see accountName - Get from azure storage console
       * @see accountKey - Get from azure storage console
     */
    static async uploadFile({filePath, destFileName, containerName, accountName, accountKey}) {

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

        if (!containerName) {
            const error = new Error('containerName is not passed in parameter');
            error.code = 500;
            throw error;
        }

        if (!accountName) {
            const error = new Error('accountName is not passed in parameter');
            error.code = 500;
            throw error;
        }

        if (!accountKey) {
            const error = new Error('accountKey is not passed in parameter');
            error.code = 500;
            throw error;
        }

        /* Instantiate storage credentials */
        const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

        // Create the BlobServiceClient object which will be used to create a container client
        const blobServiceClient = new BlobServiceClient( // The storage account used via blobServiceClient
            `https://${accountName}.blob.core.windows.net`,
            sharedKeyCredential
        );

        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobName = destFileName;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        try {
            const uploadBlobResponse = await blockBlobClient.uploadFile(filePath);
            uploadBlobResponse.accessUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${destFileName}`;
            uploadBlobResponse.containerName = containerName;
            uploadBlobResponse.accountName = accountName;
            return uploadBlobResponse;
        } catch (error) {
            throw error;
        }

    }

}