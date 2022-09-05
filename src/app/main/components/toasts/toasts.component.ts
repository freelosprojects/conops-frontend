import { Component, OnInit } from '@angular/core';

import { ToastService } from 'app/main/components/toasts/toasts.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastsComponent implements OnInit {
  // public
  public contentHeader: object;
  public hideValue: boolean = true;
  public toastStyle: object = {};

  // snippet code variables

  constructor(public toastService: ToastService) {}

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  toastBasic(data, delayTime) {
    // this.toastService.show(data, {
    //   delay: delayTime,
    //   autohide: true,
    // });
  }

  toastAutoHide() {
    this.hideValue = !this.hideValue;
  }

  // toastStacking() {
  //   this.toastService.show('Heads up, toasts will stack automatically', {
  //     autohide: this.hideValue,
  //   });
  // }

  // toastPlacement() {
  //   this.toastService.show('Heads up, toasts will stack automatically', {
  //     autohide: true,
  //   });
  //   this.toastStyle = { left: 0, right: 'unset' };
  // }

  /**
   * On init
   */
  ngOnInit(): void {}
}
