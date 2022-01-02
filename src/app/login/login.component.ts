import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthorizeGQL} from '../../generated/graphql';
import {Alert, AlertsService} from '../alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userName = new FormControl('')
  passWord = new FormControl('')

  constructor(
    private authorize: AuthorizeGQL,
    private alertsService: AlertsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  handleSubmit(event: Event) {
    console.log(event) //eslint-disable-line
    event.stopPropagation();
    event.preventDefault();
    this.authorize.mutate({
      name: this.userName.value,
      password: this.passWord.value,
    }).subscribe((result) => {
      if (result.data?.authorize?.__typename === 'UserWithToken') {
        if (result.data.authorize.token) {
          localStorage.setItem('gracie-gql-token', result.data.authorize.token);
          this.router.navigate(['/home']);
        }
      } else {
        this.alertsService.alert(
            new Alert(
                `Oops! Something went wrong logging in. ${(result.data?.authorize as any)?.message as string || ''}`,
                'alert',
            ),
        );
      }
    });
  }
}
