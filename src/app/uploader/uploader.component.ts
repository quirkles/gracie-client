import {Component, Input, OnInit} from '@angular/core';
import {UploaderService} from './uploader.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit {
  constructor(private uploaderService: UploaderService) { }
  @Input() isClickable: boolean = true; // decorate the property with @Input()
  @Input() isDroppable: boolean = true; // decorate the property with @Input()
  ngOnInit(): void {
    const file = new File(['hello'], 'filename');
    this.uploaderService.uploadFile('folderName', file);
  }

  onClick():void {
    console.log('clicked') //eslint-disable-line
  }

  onDrop(ev: Event):void {
    ev.preventDefault();
    console.log('dropped') //eslint-disable-line
  }
  onDragEnter(ev: Event):void {
    ev.preventDefault();
  }
  onDragOver(ev: Event):void {
    ev.preventDefault();
  }
}
