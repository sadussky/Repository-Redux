/*
 * Copyright (c) 1992-2010 by SaduAlbert.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * Created by Sadu.Stephen on 2017/5/15.
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */


import * as Base64 from './Base64';
var RNFSManager = require('react-native').NativeModules.RNFSManager;
const RNFS = require('react-native-fs');
export const MainBundlePath = RNFSManager.RNFSMainBundlePath;
export const CachesDirectoryPath = RNFSManager.RNFSCachesDirectoryPath;
export const DocumentDirectoryPath = RNFSManager.RNFSDocumentDirectoryPath;
export const ExternalDirectoryPath = RNFSManager.RNFSExternalDirectoryPath;
export const ExternalStorageDirectoryPath = RNFSManager.RNFSExternalStorageDirectoryPath;
export const RNFSExternalDirectoryPath = RNFSManager.RNFSExternalDirectoryPath;
export const TemporaryDirectoryPath = RNFSManager.RNFSTemporaryDirectoryPath;
export const LibraryDirectoryPath = RNFSManager.RNFSLibraryDirectoryPath;
export const PicturesDirectoryPath = RNFSManager.RNFSPicturesDirectoryPath;
export const LOCAL_LOG_PATH = `${RNFS.ExternalDirectoryPath}/log.txt`;
export const LOG_TAG = 'TEST##FileUtils';

export function writeFile(filepath, content) {
    return new Promise((resolve, reject) => {
        RNFSManager.writeFile(filepath, Base64.base64encode(content))
            .then(
                (resovleRes) => {
                    resolve(resovleRes);
                }, (rejectRes) => {
                    reject(rejectRes);
                });

    })
}

export function appendFile(filepath, content) {
    return new Promise((resolve, reject) => {
        RNFSManager.appendFile(filepath, Base64.base64encode(content))
            .then(
                (resovleRes) => {
                    resolve(resovleRes);
                }, (rejectRes) => {
                    reject(rejectRes);
                });

    })
}

export function moveFile(filepath, destPath,) {
    return new Promise((resolve, reject) => {
        RNFSManager.moveFile(filepath, destPath)
            .then(
                (resovleRes) => {
                    console.log(LOG_TAG, `moveFile resolve= ${resovleRes}`);
                    resolve(resovleRes);
                }, (rejectRes) => {
                    console.log(LOG_TAG, `moveFile resolve= ${rejectRes}`);
                    reject(rejectRes);
                });
    })
}


export function copyFile(filepath, destPath,) {
    return new Promise((resolve, reject) => {
        RNFSManager.copyFile(filepath, destPath)
            .then(
                (resovleRes) => {
                    console.log(LOG_TAG, `copyFile resolve= ${resovleRes}`);
                    resolve(resovleRes);
                }, (rejectRes) => {
                    console.log(LOG_TAG, `copyFile resolve= ${rejectRes}`);
                    reject(rejectRes);
                });
    })
}