import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IColor } from '@core/models/color.model';
import { IResponseList } from '@core/models/response.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColorListComponent implements OnInit, OnDestroy {

  public color: FormControl;
  public ColumnMode = ColumnMode;
  public selectedOption: FormControl;

  public colorList: IResponseList<IColor> = {} as IResponseList<IColor>;
  public itemSelected: IColor | null;

  public colorsubject$: Subject<void> = new Subject();
  public subscription$: Subscription = new Subscription();

  constructor(private _colorService: ColorService) {
    this.color = new FormControl(null, Validators.required);
    this.selectedOption = new FormControl(5);
  }

  get colorIsValid(): boolean {
    return !this.color.invalid && this.color.touched;
  }

  get colorIsInvalid(): boolean {
    return this.color.invalid && this.color.touched;
  }

  ngOnInit(): void {
    this.getColorList();
  }

  getColorList(): void {
    this.subscription$.add(
      this.colorsubject$.pipe(
        switchMap(() => this._colorService.getColorList())
      ).subscribe(res => this.colorList = res)
    );
    this.colorsubject$.next();
  }

  submitForm(): void {
    if (this.colorIsInvalid) return;

    this._colorService.createColor({ color: this.color.value }).subscribe({
      next: () => this.colorsubject$.next()
    });
  }

  edit(item: IColor) {
    this.itemSelected = item;
    this.color.setValue(item.color);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
