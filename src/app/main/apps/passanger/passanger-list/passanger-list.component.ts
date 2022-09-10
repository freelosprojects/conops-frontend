import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IResponseList } from '@core/models/response.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastService } from 'app/main/components/toasts/toasts.service';
import { Observable } from 'rxjs';
import { IPassanger } from '../models/passanger.model';
import { PassangerService } from '../services/passanger.service';

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

  passangerSelected: any;

  passangers$: Observable<IResponseList<IPassanger>>;

  @ViewChild('added') added: TemplateRef<any> | null;

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
  }

  get dniIsInvalid(): boolean {
    const dni = this.formPasajero.get('dni');
    return dni.invalid && dni.touched;
  }

  ngOnInit(): void {
    this.passangers$ = this._passangerService.getPassangers();
  }

  submitForm(): void {
    if (this.formPasajero.invalid) return;

    const { dni, firstName, lastName } = this.formPasajero.value;

    this._passangerService
      .postPassanger({
        apellidos: lastName,
        dni,
        nombres: firstName,
      })
      .subscribe({
        next: (response) => {
          this.formPasajero.reset();
          this._toastService.showSuccess(this.added, 'Pasajero agregado');
        },
      });

    console.log(this.formPasajero.value);
  }
}
