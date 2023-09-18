import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import * as fs from 'fs';
import to from 'await-to-js';
import axios from 'axios';
import * as path from 'path';

const global = require('global');

@Injectable()
export class GlobalService {
  constructor() {
    global.runJobUploadVideo = { processing: 0, processing_converted: 0 };
    global.system = {
      freeMem: 0,
      totalMem: 0,
      freeDisk: 0,
      totalDisk: 0,
    };
    global.uploads = {};
    global.UploadVideo = { count: 0, count_converted: 0 };
    global.server = {
      SERVER_URL: process.env.SERVER_URL,
      SERVER_REDIRECT_URL: process.env.SERVER_REDIRECT_URL,
    };
    global.CreateFolder = { count: 0 };
    global.runJobCreateFolder = { processing: 0 };
  }

  getServer = (): { SERVER_URL: string; SERVER_REDIRECT_URL: string } => {
    return _.cloneDeep(global.server);
  };

  setServer = (value: {
    SERVER_URL?: string;
    SERVER_REDIRECT_URL?: string;
  }) => {
    global.server = { ...global.server, ...value };
  };

  getUploadVideo = (): { count: number; count_converted: number } => {
    return _.cloneDeep(global.UploadVideo);
  };

  setUploadVideo = (value: { count?: number; count_converted?: number }) => {
    global.UploadVideo = { ...global.UploadVideo, ...value };
  };

  setUploadsById = (
    id: string,
    values?: { bytesReceived?: number; updatedAt?: number },
  ) => {
    if (values.hasOwnProperty('bytesReceived'))
      global.uploads[id] = { ...values, updatedAt: moment().valueOf() };
    else global.uploads[id] = values;
  };

  deleteUploadsById = (id) => {
    delete global.uploads[id];
  };

  getUploads = (): {
    [id: string]: { bytesReceived: number; updatedAt: number };
  } => {
    return _.cloneDeep(global.uploads);
  };

  getRunJobUploadVideo = (): {
    processing?: number;
    processing_converted?: number;
  } => {
    return _.cloneDeep(global.runJobUploadVideo);
  };

  setRunJobUploadVideo = (value: {
    processing?: number;
    processing_converted?: number;
  }) => {
    global.runJobUploadVideo = { ...global.runJobUploadVideo, ...value };
  };

  addProcessUploadVideo = (value: {
    processing?: number;
    processing_converted?: number;
  }) => {
    global.runJobUploadVideo.processing = global.runJobUploadVideo.processing + (value?.processing || 0);
    global.runJobUploadVideo.processing_converted = global.runJobUploadVideo.processing_converted + (value?.processing_converted || 0);
  };

  minusProcessUploadVideo = (value: {
    processing?: number;
    processing_converted?: number;
  }) => {
    global.runJobUploadVideo.processing = global.runJobUploadVideo.processing - (value?.processing || 0);
    global.runJobUploadVideo.processing_converted = global.runJobUploadVideo.processing_converted - (value?.processing_converted || 0);
  };

  getCreateFolder = (): { count: number } => {
    return _.cloneDeep(global.CreateFolder);
  };

  setCreateFolder = (value: { count?: number }) => {
    global.CreateFolder = { ...global.CreateFolder, ...value };
  };

  getRunJobCreateFolder = (): { processing: number } => {
    return _.cloneDeep(global.runJobCreateFolder);
  };

  setRunJobCreateFolder = (value: { processing?: number }) => {
    global.runJobCreateFolder = { ...global.runJobCreateFolder, ...value };
  };

  addProcessCreateFolder = (value: { processing?: number }) => {
    global.runJobCreateFolder.processing = global.runJobCreateFolder.processing + (value.processing || 0);
  };

  minusProcessCreateFolder = (value: { processing?: number }) => {
    global.runJobCreateFolder.processing = global.runJobCreateFolder.processing - (value.processing || 0);
  };

  setSystem = (value: { freeMem; totalMem; freeDisk; totalDisk }) => {
    global.system = value;
  };

  getSystem = () => {
    return _.cloneDeep(global.system);
  };

  readFileAsSync = async (pathFile: string): Promise<Buffer> => {
    return await new Promise((resolve, reject)=>{
      fs.readFile(pathFile, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  createFolderOneDrive = async (
    folder: string,
    fileName: string,
    token: string,
  ) => {
    let err, res;

    do {
      [err, res] = await axios.post(
        `https://graph.microsoft.com/v1.0/me/drive/root:/${folder}:/children`,
        {
          name: fileName,
          folder: {},
          '@microsoft.graph.conflictBehavior': 'replace',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } while (err);
  };

  uploadSmallFileOneDrive = async (
    pathFolder: string,
    pathFile: string,
    token: string,
  ) => {
    let err, res;

    do {
      [err, res] = await to(
        axios.put(
          `https://graph.microsoft.com/v1.0/me/drive/root:/${pathFolder}:/content`,
          await fs.promises.readFile(pathFile),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );
    } while (err || !res?.data?.webUrl);

    return res?.data?.webUrl;
  };

  uploadLargeFileOneDrive = async (
    pathFolder: string,
    pathFile: string,
    token: string,
  ) => {
    const uploadUrl = await this.createUploadSessionOneDrive(pathFolder, token);
    const totalSize = (await fs.promises.stat(pathFile)).size;

    let start = 0;
    let end = 0;
    let err_1 = null;
    let res_1 = null;
    do {
      const [err, res] = await to(axios.get(uploadUrl));
      if (err) continue;

      const nextExpectedRanges = res.data?.nextExpectedRanges?.[0]?.split('-');
      start = +(nextExpectedRanges?.[0] || 0);
      end = Math.min(+(nextExpectedRanges?.[1] || 0) || (start + 4000000), totalSize - 1);

      [err_1, res_1] = await to(
        axios.put(uploadUrl, fs.createReadStream(pathFile, { start, end }), {
          headers: {
            'Content-Range': `bytes ${start}-${end}/${totalSize}`,
            'Content-Length': `${end - start + 1}`,
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }),
      );
    } while (res_1?.status !== 201 && res_1?.status !== 200);
  };

  createUploadSessionOneDrive = async (pathFolder: string, token: string) => {
    let err, res;

    do {
      [err, res] = await to(
        axios.post(
          `https://graph.microsoft.com/v1.0/me/drive/root:/${pathFolder}:/createUploadSession`,
          {
            item: {
              '@microsoft.graph.conflictBehavior': 'replace',
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );
    } while (err || !res?.data?.uploadUrl);

    return res?.data?.uploadUrl;
  };

  shareLinkOneDrive = async (pathFolder: string, token: string) => {
    let err, res;

    do {
      [err, res] = await to(
        axios.post(
          `https://graph.microsoft.com/v1.0/me/drive/root:/${pathFolder}:/createLink`,
          {
            type: 'view',
            scope: 'anonymous',
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );
    } while (err || !res?.data?.link?.webUrl);

    return res?.data?.link?.webUrl;
  };

  deleteSessionOneDrive = async (url: string, token: string) => {
    let err, res;

    do {
      [err, res] = await axios.delete(url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } while (err);
  };

  deleteFileOneDrive = async (pathFolder: string, token: string) => {
    let err, res;

    do {
      [err, res] = await axios.delete(
        `https://graph.microsoft.com/v1.0/me/drive/root:/${pathFolder}:/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } while (err);
  };

  deleteFile = async (path = '', fileNames: string[] = []) => {
    try {
      if (path) await fs.promises.unlink(path);

      for (const it of fileNames) {
        await fs.promises.unlink(it);
      }
    } catch (err) {}
  };
}
