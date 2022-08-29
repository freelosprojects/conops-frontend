import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IBrand } from '@core/models/brand.model';
import { IResponseList } from '@core/models/response.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BrandService } from '../services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BrandListComponent implements OnInit, OnDestroy {

  public brand: FormControl;
  public ColumnMode = ColumnMode;
  public selectedOption: FormControl;

  public brandList: IResponseList<IBrand> = {} as IResponseList<IBrand>;
  public itemSelected: IBrand | null;

  public brandSubject$: Subject<void> = new Subject();
  public subscription$: Subscription = new Subscription();

  constructor(private _brandService: BrandService) {
    this.brand = new FormControl(null, Validators.required);
    this.selectedOption = new FormControl(5);
  }

  get colorIsValid(): boolean {
    return !this.brand.invalid && this.brand.touched;
  }

  get colorIsInvalid(): boolean {
    return this.brand.invalid && this.brand.touched;
  }

  ngOnInit(): void {
    this.getBrandList();
  }

  getBrandList(): void {
    this.subscription$.add(
      this.brandSubject$.pipe(
        switchMap(() => this._brandService.getBrandList())
      ).subscribe(res => this.brandList = res)
    );
    this.brandSubject$.next();
  }

  submitForm(): void {
    if (this.colorIsInvalid) return;

    this._brandService.createColor({ marca: this.brand.value }).subscribe({
      next: () => this.brandSubject$.next()
    });
  }

  edit(item: IBrand) {
    this.itemSelected = item;
    this.brand.setValue(item.brand);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
