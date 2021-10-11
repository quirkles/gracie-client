import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FileUploaderService} from '../file-uploader.service';
import {CreatePostGQL, Media, MediaType} from '../../generated/graphql';
import moment from 'moment';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  postTitle: string = 'Our fun day!'
  postBody: string = 'These are all the fun things we did...'
  date: FormControl = new FormControl(moment(new Date()))
  canSave = false
  media: Media[] = []

  constructor(
    private fileUploaderService: FileUploaderService,
    private createPostMutation: CreatePostGQL,
  ) { }

  ngOnInit(): void {
  }

  handleDateChange() {
    this.canSave = true;
  }

  handleTitleChange(newTitle: string): void {
    this.postTitle = newTitle;
    this.canSave = true;
  }

  handleBodyChange(newTitle: string): void {
    this.postTitle = newTitle;
    this.canSave = true;
  }

  handleMediaChange(media: Media):void {
    this.media = this.media.map((existing) => {
      if (existing.url === media.url) {
        return media;
      }
      return existing;
    });
    console.log(this.media) //eslint-disable-line
  }

  addMediaItem(url: string) {
    this.media.push({
      url,
      title: '',
      caption: '',
      type: MediaType.Image,
    });
    this.canSave = true;
  }

  handleFileChange(files: File[]) {
    for (const file of files) {
      this.fileUploaderService.uploadFile('test', file).then((url) => {
        this.addMediaItem(url);
      });
    }
    console.log(files) //eslint-disable-line
  }

  savePost(): void {
    const post = {
      body: this.postBody,
      title: this.postTitle,
      date: this.date.value.toDate(),
      media: this.media as Media[],
    };
    this.createPostMutation.mutate({input: post}).subscribe((result) => {
      console.log(result) //eslint-disable-line
    });
  }
}
