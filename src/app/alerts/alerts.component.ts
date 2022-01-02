import {Component, OnDestroy, OnInit} from '@angular/core';
import {Alert, AlertsService, Unsubscribe} from '../alerts.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent implements OnInit, OnDestroy {
  alerts: Alert[] = []
  unsubScribe: Unsubscribe = () => null
  constructor(private alertsService: AlertsService) { }

  ngOnInit() {
    this.unsubScribe = this.alertsService.subscribe(this.handleAlert.bind(this));
  }

  ngOnDestroy() {
    this.unsubScribe();
  }

  removeAlert(id: string) {
    this.alerts = this.alerts.filter((alert) => alert.id !== id);
  }

  handleAlert(alert: Alert) {
    const {id, timeout} = alert;
    this.alerts.push(alert);
    const self = this;
    setTimeout(() => this.removeAlert.call(self, id), timeout);
  }
}
