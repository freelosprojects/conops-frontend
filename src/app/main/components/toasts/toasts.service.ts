import { Injectable, TemplateRef } from '@angular/core';
import { IToast } from './toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: IToast[] = [];

  show(toast: IToast) {
    this.toasts = [...this.toasts, toast];
  }

  showSuccess(toast: TemplateRef<any>, title: string, delay = 2000, autoHide = true): void {
    this.toasts = [...this.toasts, { class: 'success', autohide: autoHide, title, delay, template: toast }];
  }

  showError(toast: TemplateRef<any>, title: string, delay = 2000, autoHide = true): void {
    this.toasts = [...this.toasts, { class: 'error', autohide: autoHide, title, delay, template: toast }];
  }

  remove(toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
