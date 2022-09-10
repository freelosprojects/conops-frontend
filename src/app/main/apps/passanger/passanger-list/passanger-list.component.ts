import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IResponseList } from '@core/models/response.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastService } from 'app/main/components/toasts/toasts.service';
import { Observable, Subject } from 'rxjs';
import { IPassanger } from '../models/passanger.model';
import { PassangerService } from '../services/passanger.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-passanger-list',
  templateUrl: './passanger-list.component.html',
  styleUrls: ['./passanger-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PassangerListComponent implements OnInit {
  selectedOption: FormControl;

  public ColumnMode = ColumnMode;

  formPasajero: FormGroup;

  passangerSelected: IPassanger;

  passangers$: Observable<IResponseList<IPassanger>>;

  @ViewChild('added') added: TemplateRef<any> | null;

  @ViewChild('error') error: TemplateRef<any> | null;

  message: string;

  private _changeList$: Subject<void>;

  constructor(
    private _fb: FormBuilder,
    private _passangerService: PassangerService,
    private _toastService: ToastService
  ) {
    this.formPasajero = this._fb.group({
      dni: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
    });
    this.selectedOption = new FormControl(5);
    this._changeList$ = new Subject();
    this.message = '';
  }

  get dniIsInvalid(): boolean {
    const dni = this.formPasajero.get('dni');
    return dni.invalid && dni.touched;
  }

  get firstNameIsInvalid(): boolean {
    const dni = this.formPasajero.get('firstName');
    return dni.invalid && dni.touched;
  }

  get lastNameIsInvalid(): boolean {
    const dni = this.formPasajero.get('lastName');
    return dni.invalid && dni.touched;
  }

  ngOnInit(): void {
    this.passangers$ = this._changeList$.pipe(switchMap(() => this._passangerService.getPassangers()));
  }

  ngAfterViewInit(): void {
    this._changeList$.next();
  }

  submitForm(): void {
    if (this.formPasajero.invalid) return;

    const { dni, firstName, lastName } = this.formPasajero.value;

    if (!this.passangerSelected) {
      this._passangerService
        .postPassanger({
          apellidos: lastName,
          dni,
          nombres: firstName,
        })
        .subscribe({
          next: (response) => {
            this.message = response.message;
            this.passangerSelected = null;
            this.formPasajero.reset();
            this._toastService.showSuccess(this.added, 'Pasajero agregado');
            this._changeList$.next();
          },
          error: () => this._toastService.showError(this.error, 'Ocurrio un problema'),
        });
    } else {
      this._passangerService
        .putPassanger({
          apellidos: lastName,
          dni,
          nombres: firstName,
        })
        .subscribe({
          next: (response) => {
            this.message = response.message;
            this.passangerSelected = null;
            this.formPasajero.reset();
            this._toastService.showSuccess(this.added, 'Pasajero actualizado');
            this._changeList$.next();
          },
          error: () => this._toastService.showError(this.error, 'Ocurrio un problema'),
        });
    }
  }

  edit(passanger: IPassanger): void {
    this.formPasajero.reset();

    this.passangerSelected = passanger;

    this.formPasajero.patchValue({
      dni: passanger.dni,
      firstName: passanger.firstName,
      lastName: passanger.lastName,
    });
  }

  deleteDriver(dni: string): void {
    this._passangerService.deletePassanger(dni).subscribe({
      next: (response) => {
        this.message = response.message;
        this.passangerSelected = null;
        this.formPasajero.reset();
        this._toastService.showSuccess(this.added, 'Operación correcta');
        this._changeList$.next();
      },
      error: () => this._toastService.showError(this.error, 'Ocurrio un problema'),
    });
  }
}
