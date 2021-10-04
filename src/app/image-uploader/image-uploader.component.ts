import {Component, OnInit} from '@angular/core';
import {FileUploaderService} from '../file-uploader.service';


@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit {
  acceptedFiletypes = ['.jpg', '.jpeg', '.png']
  files: File[] = []
  constructor(private fileUploaderService: FileUploaderService) { }

  ngOnInit(): void {
  }

  onFileSelected(files:File[]) {
    for (const file of files) {
      this.fileUploaderService.uploadFile('test', file);
    }
  }
}
