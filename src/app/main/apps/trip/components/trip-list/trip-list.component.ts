import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IResponseList } from '@core/models/response.model';
import { ITrip } from '../../models/trip.model';
import { IActionList } from './action-list.model';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TripListComponent implements OnInit {
  selectedOption: FormControl;

  @Input() nameButton: string;
  @Input() linkButton: string | null;
  @Input() nameList: string;
  @Input() data: IResponseList<ITrip> | null;
  @Input() actions: IActionList[];

  constructor() {
    this.nameButton = '';
    this.linkButton = null;
    this.nameList = '';
    this.data = null;
    this.actions = [];
  }

  ngOnInit(): void {
    this.selectedOption = new FormControl(5);
  }
}
