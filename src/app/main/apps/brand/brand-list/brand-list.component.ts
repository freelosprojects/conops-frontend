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

  get brandIsValid(): boolean {
    return !this.brand.invalid && this.brand.touched;
  }

  get brandIsInvalid(): boolean {
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
    if (this.brandIsInvalid) return;

    this._brandService.createBrand({ marca: this.brand.value }).subscribe({
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
