import { Component, OnInit, ViewEncapsulation, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IResponseList } from '@core/models/response.model';

import { LicenseCategoryService } from './services/license-category.service';
import { ILicenseCategory } from './models/license-category.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastService } from 'app/main/components/toasts/toasts.service';

@Component({
  selector: 'app-license-category',
  templateUrl: './license-category.component.html',
  styleUrls: ['./license-category.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LicenseCategoryComponent implements OnInit {
  ColumnMode = ColumnMode;

  license: FormControl;

  selectedOption: FormControl;

  licenseSubject$: Subject<void>;

  licenseCategory: IResponseList<ILicenseCategory>;

  itemSelected: ILicenseCategory | null;

  message: string;

  @ViewChild('toast') toast: TemplateRef<any> | null;

  constructor(private _licenseCategoryService: LicenseCategoryService, private _toastService: ToastService) {
    this.license = new FormControl(null, Validators.required);

    this.selectedOption = new FormControl(5);

    this.licenseSubject$ = new Subject();

    this.licenseCategory = { data: [], count: 0 };

    this.itemSelected = null;
  }

  get licenseIsInvalid(): boolean {
    return this.license.invalid && this.license.touched;
  }

  get licenseIsValid(): boolean {
    return !this.license.invalid && this.license.touched;
  }

  ngOnInit(): void {
    this.licenseSubject$
      .pipe(switchMap(() => this._licenseCategoryService.getLicenseCategories()))
      .subscribe({ next: (response) => (this.licenseCategory = response) });

    this.licenseSubject$.next();
  }

  submitForm(): void {
    if (this.licenseIsInvalid) return;

    if (!this.itemSelected) {
      this._licenseCategoryService.postLicenseCategory({ breveteCategory: this.license.value }).subscribe({
        next: (response) => {
          this.message = response.message;
          this.itemSelected = null;
          this.license.reset();
          this._toastService.showSuccess(this.toast, 'Operación exitosa');
          this.licenseSubject$.next();
        },
      });
    } else {
      this._licenseCategoryService
        .putLicenseCategory({ breveteCategory: this.license.value }, this.itemSelected.idLicenseCategory)
        .subscribe({
          next: (response) => {
            this.message = response.message;
            this.itemSelected = null;
            this.license.reset();
            this._toastService.showSuccess(this.toast, 'Operación exitosa');
            this.licenseSubject$.next();
          },
        });
    }
  }

  edit(item: ILicenseCategory) {
    this.itemSelected = item;
    this.license.setValue(item.licenseCategory);
  }

  delete(id: number) {
    this._licenseCategoryService.deleteLicenseCategory(id).subscribe({
      next: (response) => {
        this.message = response.message;
        this.itemSelected = null;
        this._toastService.showSuccess(this.toast, 'Operación exitosa');
        this.licenseSubject$.next();
      },
      error: (response) => {
        this.message = response.error.message;
        this._toastService.showError(this.toast, 'Ocurrio un problema');
      },
    });
  }
}
