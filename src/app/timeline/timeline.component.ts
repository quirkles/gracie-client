import {Component, OnInit} from '@angular/core';
import {GetPaginatedPostsGQL, Post} from '../../generated/graphql';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  posts: Partial<Post>[] = []

  constructor(private getPaginatedPosts: GetPaginatedPostsGQL) { }

  ngOnInit(): void {
    this.getPaginatedPosts
        .fetch({paginationArguments: {first: 10}, sortArguments: {sortBy: 'date'}})
        .subscribe((results) => {
          switch (results.data.getPosts.__typename) {
            case 'PostConnection':
              this.posts = [
                ...this.posts,
                ...results.data.getPosts.edges
                    .map((edge) => edge?.node as Partial<Post>)
                    .filter(Boolean),
              ];
              break;
            case 'BadInput':
              break;
          }
        });
  }
}
