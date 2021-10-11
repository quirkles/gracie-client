import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.scss'],
})
export class EditableTextComponent implements OnInit {
  @Input() value: string = ''
  @Input() inputType: 'text' | 'textarea' = 'text'
  @Output() valueChange = new EventEmitter<string>();
  @ViewChild('form') form!: HTMLFormElement
  localValue = new FormControl('')

  editing = false

  constructor() { }

  ngOnInit(): void {
    this.localValue.setValue(this.value);
  }

  onSubmit(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    ((ev.target as HTMLFormElement)?.firstElementChild as HTMLInputElement | HTMLTextAreaElement)?.blur();
  }

  startEditing(): void {
    this.editing = true;
    setTimeout(() => {
      this.form.nativeElement.firstElementChild.focus();
    }, 0);
  }

  stopEditing(): void {
    this.editing = false;
    this.valueChange.emit(this.localValue.value);
  }
}
