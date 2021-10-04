import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import axios from 'axios';
import {Apollo} from 'apollo-angular';
import {GetUploadSignedUrlGQL} from '../generated/graphql';
import {FILE_UPLOADER_URL} from './config';

@Injectable({
  providedIn: 'root',
})
export class FileUploaderService {
  constructor(
    private http: HttpClient,
    private apollo: Apollo,
    private getSignedUrlQuery: GetUploadSignedUrlGQL,
  ) {}

  uploadFile(folderName: string, file:File): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getSignedUrlQuery.fetch({input: {
        fileName: `${folderName}/${file.name}`,
      }}).subscribe(async (result) => {
        try {
          const response = await axios.put(result.data.getUploadSignedUrl, file, {
            headers: {
              'Content-Type': 'application/octet-stream',
            },
          });
          resolve(response.data);
        } catch (err) {
          console.log(err) //eslint-disable-line
          reject(err);
        }
      });
    });
  }
}
