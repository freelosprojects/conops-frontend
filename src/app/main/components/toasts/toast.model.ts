import { TemplateRef } from '@angular/core';

export interface IToast {
  autohide: boolean;
  class: 'success' | 'error' | 'warning';
  delay: number;
  title: string;
  template: TemplateRef<any>;
}
