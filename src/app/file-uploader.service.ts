import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import axios from 'axios';
import {Apollo} from 'apollo-angular';
import {v4} from 'uuid';

import {GetUploadSignedUrlGQL} from '../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class FileUploaderService {
  constructor(
    private http: HttpClient,
    private apollo: Apollo,
    private getSignedUrlQuery: GetUploadSignedUrlGQL,
  ) {}

  uploadFile(folderName: string, file:File): Promise<string> {
    const fileName = v4();
    let url: string;
    return new Promise((resolve, reject) => {
      this.getSignedUrlQuery.fetch({input: {
        fileName: `${folderName}/${fileName}`,
      }}).subscribe(async (result) => {
        try {
          await axios.put(result.data.getUploadSignedUrl, file, {
            headers: {
              'Content-Type': 'application/octet-stream',
            },
          });
          url = result.data.getUploadSignedUrl.split('?')[0];
          resolve(url);
        } catch (err) {
          console.log(err) //eslint-disable-line
          reject(err);
        }
      });
    });
  }
}
