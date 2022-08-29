import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IResponseList } from '@core/models/response.model';

import { LicenseCategoryService } from './services/license-category.service';
import { ILicenseCategory } from './models/license-category.model';
import { ColumnMode } from '@swimlane/ngx-datatable';

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

  constructor(private _licenseCategoryService: LicenseCategoryService) {
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

    this._licenseCategoryService.postLicenseCategory({ breveteCategory: this.license.value }).subscribe({
      next: () => this.licenseSubject$.next(),
    });
  }

  edit(item: ILicenseCategory) {
    this.itemSelected = item;
    this.license.setValue(item.licenseCategory);
  }
}
