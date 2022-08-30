import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: ` <div class="header">
    <div class="row mt-1 mb-2">
      <div class="col-12">
        <h1>{{ name }}</h1>
      </div>
    </div>
  </div>`,
})
export class HeaderComponent {
  @Input() name: string;
  constructor() {
    this.name = '';
  }
}
