import moment from 'moment';
import {v4} from 'uuid';
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FileUploaderService} from '../file-uploader.service';
import {Media, MediaType, SavePostGQL} from '../../generated/graphql';
import {Alert, AlertsService} from '../alerts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  postTitle: string = 'Our fun day!'
  postId: string | null = v4()
  postBody: string = 'These are all the fun things we did...'
  date: FormControl = new FormControl(moment(new Date()))
  canSave = false
  media: Media[] = []

  constructor(
    private fileUploaderService: FileUploaderService,
    private savePostMutation: SavePostGQL,
    private alertsService: AlertsService,
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
  }

  addMediaItem(url: string) {
    this.media.push({
      id: v4(),
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
  }

  handleMediaDelete(mediaToDelete: Media) {
    this.media = this.media.filter((media) => media.id !== mediaToDelete.id);
  }

  savePost(): void {
    const post = {
      id: this.postId,
      body: this.postBody,
      title: this.postTitle,
      date: this.date.value.toDate(),
      media: this.media as Media[],
    };
    this.savePostMutation.mutate({input: post}).subscribe((result) => {
      if (result.data?.savePost?.__typename === 'Post') {
        this.media = result.data?.savePost?.media?.map(({__typename, ...rest}) => rest) || this.media || [];
      } else {
        this.alertsService.alert(new Alert('Oops! Something went wrong creating the post.', 'alert'));
      }
    });
  }
}
