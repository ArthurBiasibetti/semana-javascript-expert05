import {
  describe,
  test,
  expect,
  jest
} from '@jest/globals';
import fs from 'fs';
import FileHelper from '../../src/fileHelper.js';

import Routes from '../../src/routes.js';

describe('#FileHelper', () => {
  describe('#getFileStatus', () => {
    test('it should return files statuses in correct format', async () => {
      const statMock = {
        dev: 2067,
        mode: 33204,
        nlink: 1,
        uid: 1000,
        gid: 1000,
        rdev: 0,
        blksize: 4096,
        ino: 5636123,
        size: 518690,
        blocks: 1016,
        atimeMs: 1631125656289.6013,
        mtimeMs: 1631125656257.6018,
        ctimeMs: 1631125656257.6018,
        birthtimeMs: 1631125656257.6018,
        atime: '2021-09-08T18:27:36.290Z',
        mtime: '2021-09-08T18:27:36.258Z',
        ctime: '2021-09-08T18:27:36.258Z',
        birthtime: '2021-09-08T18:27:36.258Z'
      }

      const mockUser = 'arthur';
      process.env.USER = mockUser;

      const filename = 'file.pdf'
      jest.spyOn(fs.promises, fs.promises.readdir.name).mockResolvedValue([filename]);
      jest.spyOn(fs.promises, fs.promises.stat.name).mockResolvedValue(statMock);

      const result = await FileHelper.getFilesStatus("/tmp");

      const expectedResult = [{
        size: '519 kB',
        lastModified: statMock.birthtime,
        owner: mockUser,
        file: filename
      }];

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`);
      expect(result).toMatchObject(expectedResult);
    });
  });
});