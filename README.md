# Files-Cloud-Storage
This package exports the methods to upload file in GCP, AWS S3 and AZURE

## PreRequisite
You must have all type of required credentials of AWS/GCP/AZURE cloud storage while calling upload methods

## Installation

```
npm i files-cloud-storage
```

## Usage Google Cloud Storage

```
const { GcpFileHelper } = require('files-cloud-storage');
const path = require('path');

// assuming logo.png is present in your root directory
const filePath = path.join(__dirname, 'logo.png'); // Stored file path - pass absolute path.

const destFileName = 'logo.png'; // fileName to be saved in google cloud
const bucketName = '<bucket-name>'; // google cloud storage bucket in which file gets saved
const gcpProjectId = '<gcp-project-id>'; // google cloud storage project id - Get from gcp console

// assuming gcp.json is present in your root directory
// google cloud storage json configuration file - pass absolute path
// download file from manage storage api key section in gcp console
const gcpJsonFilePath = path.join(__dirname, 'gcp.json');

GcpFileHelper.uploadFile({filePath, destFileName, bucketName, gcpProjectId, gcpJsonFilePath}).then(response => {
    console.log(response);
}).catch(err => {
    console.log(error);
});
```

## Usage Amazon Web Service S3 storage

```
const { AwsFileHelper } = require('files-cloud-storage');

// assuming logo.png is present in your root directory
const filePath = path.join(__dirname, 'logo.png'); // Stored file path - pass absolute path.

const destFileName = 'logo.png'; // fileName to be saved in aws s3 bucket
const bucketName = '<bucket-name>'; // aws s3 bucket in which file gets saved
const accessKeyId = '<access-key-id>'; // aws s3 access key id - Get from aws console
const secretAccessKey = '<secret-access-key>' // aws s3 secret access key - Get from aws console

// aws region where bucket will be located for fastest delivery of resources - Get bucket-region from aws s3 console
const bucketRegion = '<bucket-region>'

AwsFileHelper.uploadFile({filePath, destFileName, bucketName, accessKeyId, secretAccessKey, bucketRegion}).then(response => {
    console.log(response);
}).catch(error => {
    console.log(error);
});
```

## Usage Azure Storage

```
const { AzureFileHelper } = require('files-cloud-storage');

// assuming logo.png is present in your root directory
const filePath = path.join(__dirname, 'logo.png'); // Stored file path - pass absolute path.

const destFileName = 'logo.png'; // fileName to be saved in azure container
const containerName = '<container-name>'; // container in which file gets saved
const accountKey = '<account-key>' // account name of azure storage - get from storage console
const accountName = '<account-name>' // account key of azure storage - get from storage console 

AzureFileHelper.uploadFile({filePath, destFileName, containerName, accountName, accountKey}).then(response => {
    console.log(response);
}).catch(error => {
    console.log(error);
});
```

Thanks for using this, Looking forward for your contributions 😎 .
