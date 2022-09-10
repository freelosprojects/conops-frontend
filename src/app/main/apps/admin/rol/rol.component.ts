import { Component, OnInit, ViewEncapsulation, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { RoleService } from '../services/role.service';
import { ToastService } from 'app/main/components/toasts/toasts.service';
import { Observable, Subject } from 'rxjs';
import { IResponseList } from '@core/models/response.model';
import { IRole } from '../models/rol.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RolComponent implements OnInit {
  selectedOption: FormControl;

  ColumnMode = ColumnMode;

  roleNameControl: FormControl;

  roleSelected: IRole;

  message: string;

  @ViewChild('added') added: TemplateRef<any> | null;

  @ViewChild('error') error: TemplateRef<any> | null;

  roles$: Observable<IResponseList<IRole>>;

  private _changeList$: Subject<void>;

  constructor(private _roleService: RoleService, private _toastService: ToastService) {
    this.selectedOption = new FormControl(5);
    this.roleNameControl = new FormControl(null, Validators.required);
    this.message = '';
    this._changeList$ = new Subject();
  }

  get isRoleInvalid() {
    return this.roleNameControl.invalid && this.roleNameControl.touched;
  }

  ngOnInit(): void {
    this.roles$ = this._changeList$.pipe(switchMap(() => this._roleService.getRoles()));
  }

  ngAfterViewInit(): void {
    this._changeList$.next();
  }

  submitForm(): void {
    if (this.roleNameControl.invalid) return;

    const role = this.roleNameControl.value;

    if (!this.roleSelected) {
      this._roleService
        .postRole({
          rol: role,
        })
        .subscribe({
          next: (response) => {
            this.message = response.message;
            this.roleSelected = null;
            this.roleNameControl.reset();
            this._toastService.showSuccess(this.added, 'Operación exitosa');
            this._changeList$.next();
          },
          error: () => this._toastService.showError(this.error, 'Ocurrio un problema'),
        });
    } else {
      this._roleService
        .putRole(
          {
            rol: role,
          },
          this.roleSelected.idRole
        )
        .subscribe({
          next: (response) => {
            this.message = response.message;
            this.roleSelected = null;
            this.roleNameControl.reset();
            this._toastService.showSuccess(this.added, 'Operación exitosa');
            this._changeList$.next();
          },
          error: () => this._toastService.showError(this.error, 'Ocurrio un problema'),
        });
    }
  }

  edit(role: IRole): void {
    this.roleNameControl.reset();

    this.roleSelected = role;

    this.roleNameControl.setValue(this.roleSelected.role);
  }

  deleteDriver(id: number): void {
    this._roleService.deleteRole(id).subscribe({
      next: (response) => {
        this.message = response.message;
        this.roleSelected = null;
        this.roleNameControl.reset();
        this._toastService.showSuccess(this.added, 'Operación correcta');
        this._changeList$.next();
      },
      error: () => this._toastService.showError(this.error, 'Ocurrio un problema'),
    });
  }
}
