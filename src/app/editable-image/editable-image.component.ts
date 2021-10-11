import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Media} from '../../generated/graphql';

@Component({
  selector: 'app-editable-image',
  templateUrl: './editable-image.component.html',
  styleUrls: ['./editable-image.component.scss'],
})
export class EditableImageComponent implements OnInit {
  @Input() mediaItem!: Media
  @Output() mediaChange:EventEmitter<Media> = new EventEmitter()
  constructor() {
  }

  ngOnInit(): void {
  }

  handleTitleChange(title: string) {
    this.mediaChange.emit({
      ...this.mediaItem,
      title,
    });
  }
  handleCaptionChange(caption: string) {
    this.mediaChange.emit({
      ...this.mediaItem,
      caption,
    });
  }
}
