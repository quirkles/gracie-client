import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../generated/graphql';

@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss'],
})
export class TimelineItemComponent implements OnInit {
  @Input() post: Partial<Post> = {}
  @Input() alignment: string = 'right'
  constructor() { }

  ngOnInit(): void {
    console.log(this.post) //eslint-disable-line
  }
}
