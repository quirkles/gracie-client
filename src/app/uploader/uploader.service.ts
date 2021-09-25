import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Apollo} from 'apollo-angular';
import {GetUploadSignedUrlGQL} from '../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class UploaderService {
  constructor(
    private http: HttpClient,
    private apollo: Apollo,
    private getSignedUrlQuery: GetUploadSignedUrlGQL,

  ) {}

  uploadFile(folderName: string, file:File): void {
    this.getSignedUrlQuery.fetch({input: {
      bucketName: folderName,
      fileName: file.name,
    }}).subscribe((result) => {
      console.log('result') //eslint-disable-line
      console.log(result) //eslint-disable-line
    });
  }
}
