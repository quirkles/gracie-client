import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';


@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss'],
})
export class FileSelectorComponent implements OnInit {
  constructor() { }
  @Input() isClickable: boolean = true; // decorate the property with @Input()
  @Input() isDroppable: boolean = true; // decorate the property with @Input()
  @Input() acceptedFiletypes: string[] = []; // decorate the property with @Input()

  @Output() files = new EventEmitter<File[]>();

  @ViewChild('fileInput') fileInput: ElementRef | null = null;
  ngOnInit(): void {
  }

  onClick():void {
    this.fileInput?.nativeElement?.click();
  }

  onDrop(ev: DragEvent):void {
    ev.preventDefault();
    const files = Array.from(ev.dataTransfer?.files || []);
    this.files.emit(
        files.filter(
            (file) => this.acceptedFiletypes.includes(file.name.slice(file.name.lastIndexOf('.'))),
        ),
    );
  }
  onDragEnter(ev: Event):void {
    ev.preventDefault();
  }
  onDragOver(ev: Event):void {
    ev.preventDefault();
  }
  onFileChange(ev: Event):void {
    ev.preventDefault();
    this.files.emit(Array.from((ev?.target as HTMLInputElement)?.files || []));
  }
}
