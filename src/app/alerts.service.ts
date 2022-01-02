import {Injectable} from '@angular/core';
import {v4} from 'uuid';


type AlertType = 'secondary' | 'primary' | 'success' | 'warning' | 'alert'
export class Alert {
  body: string
  type: AlertType = 'primary'
  timeout: number = 4000
  id: string;
  constructor(body: string, type?: AlertType, timeout?: number) {
    this.body = body;
    this.type = type || this.type;
    this.timeout = timeout || this.timeout;
    this.id = v4();
  }
}

export type Subscription = (alert: Alert) => any
export type Unsubscribe = () => void

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  private subscriptions: {
    [subId: string]: Subscription
  } = {}

  constructor() { }

  subscribe(subscription: Subscription): Unsubscribe {
    const subId = v4();
    this.subscriptions[subId] = subscription;
    const self = this;
    return () => self.unsubscribe(subId);
  }

  unsubscribe(subId: string): void {
    delete this.subscriptions[subId];
  }

  alert(alert: Alert): void {
    Object.values(this.subscriptions).forEach((sub) => sub.call(null, alert));
  }
}
