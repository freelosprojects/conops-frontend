import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IColor } from '@core/models/color.model';
import { IResponseList } from '@core/models/response.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ColorService } from '../services/color.service';
import { ToastService } from 'app/main/components/toasts/toasts.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ColorListComponent implements OnInit, OnDestroy {
  public color: FormControl;
  public ColumnMode = ColumnMode;
  public selectedOption: FormControl;

  public colorList: IResponseList<IColor> = {} as IResponseList<IColor>;
  public itemSelected: IColor | null;

  public colorSubject$: Subject<void> = new Subject();
  public subscription$: Subscription = new Subscription();

  message: string;

  @ViewChild('toast') toast: TemplateRef<any> | null;

  constructor(private _colorService: ColorService, private _toastService: ToastService) {
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

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  getColorList(): void {
    this.subscription$.add(
      this.colorSubject$
        .pipe(switchMap(() => this._colorService.getColorList()))
        .subscribe((res) => (this.colorList = res))
    );
    this.colorSubject$.next();
  }

  submitForm(): void {
    if (this.colorIsInvalid) return;

    if (!this.itemSelected) {
      this._colorService.createColor({ color: this.color.value }).subscribe({
        next: (response) => {
          this.message = response.message;
          this.itemSelected = null;
          this.color.reset();
          this._toastService.showSuccess(this.toast, 'Operación exitosa');
          this.colorSubject$.next();
        },
      });
    } else {
      this._colorService.putColor({ color: this.color.value }, this.itemSelected.idColor).subscribe({
        next: (response) => {
          this.message = response.message;
          this.itemSelected = null;
          this.color.reset();
          this._toastService.showSuccess(this.toast, 'Operación exitosa');
          this.colorSubject$.next();
        },
      });
    }
  }

  edit(item: IColor) {
    this.itemSelected = item;
    this.color.setValue(item.color);
  }

  delete(id: number) {
    this._colorService.deleteColor(id).subscribe({
      next: (response) => {
        this.message = response.message;
        this.itemSelected = null;
        this._toastService.showSuccess(this.toast, 'Operación exitosa');
        this.colorSubject$.next();
      },
      error: (response) => {
        this.message = response.error.message;
        this._toastService.showError(this.toast, 'Ocurrio un problema');
      },
    });
  }
}
