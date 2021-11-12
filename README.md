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
const filePath = path.join(__dirname, 'logo.png');

const destFileName = 'logo.png';
const bucketName = '<bucket-name>';
const gcpProjectId = '<gcp-project-id>';

// assuming gcp.json configuration file is present in your root directory
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
const filePath = path.join(__dirname, 'logo.png');

const destFileName = 'logo.png';
const bucketName = '<bucket-name>';
const accessKeyId = '<access-key-id>';
const secretAccessKey = '<secret-access-key>'
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
const filePath = path.join(__dirname, 'logo.png');

const destFileName = 'logo.png';
const containerName = '<container-name>';
const accountKey = '<account-key>'
const accountName = '<account-name>'

AzureFileHelper.uploadFile({filePath, destFileName, containerName, accountName, accountKey}).then(response => {
    console.log(response);
}).catch(error => {
    console.log(error);
});
```

Thanks for using this, Looking forward for your contributions 😎 .
