import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {FileSelectorComponent} from './file-selector/file-selector.component';
import {GraphQLModule} from './gql/graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {CreatePostComponent} from './create-post/create-post.component';
import {EditableTextComponent} from './editable-text/editable-text.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {EditableImageComponent} from './editable-image/editable-image.component';
import {AlertsComponent} from './alerts/alerts.component';
import {PostsComponent} from './posts/posts.component';
import { SplashComponent } from './splash/splash.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TimelineItemComponent } from './timeline/timeline-item/timeline-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FileSelectorComponent,
    CreatePostComponent,
    EditableTextComponent,
    EditableImageComponent,
    AlertsComponent,
    PostsComponent,
    SplashComponent,
    TimelineComponent,
    TimelineItemComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMomentDateModule,
    // Material
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
