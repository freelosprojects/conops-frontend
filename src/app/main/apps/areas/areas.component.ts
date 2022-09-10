import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IResponseList } from '@core/models/response.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Observable, Subject } from 'rxjs';
import { ToastService } from 'app/main/components/toasts/toasts.service';
import { switchMap } from 'rxjs/operators';
import { IArea } from './models/area.models';
import { AreasService } from './services/areas.service';
import { SelectEntityService } from '../../services/select-entity.service';
import { ISelectEntity } from '../../models/select-entity.model';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AreasComponent implements OnInit {
  selectedOption: FormControl;

  ColumnMode = ColumnMode;

  areaSelected: IArea;

  message: string;

  @ViewChild('toast') toast: TemplateRef<any> | null;

  areas$: Observable<IResponseList<IArea>>;

  clients$: Observable<ISelectEntity[]>;

  formArea: FormGroup;

  private _changeList$: Subject<void>;

  constructor(
    private _areaService: AreasService,
    private _toastService: ToastService,
    private _selectService: SelectEntityService,
    private _fb: FormBuilder
  ) {
    this.selectedOption = new FormControl(5);
    this.message = '';
    this._changeList$ = new Subject();
    this.formArea = this._fb.group({
      idClient: new FormControl(null, Validators.required),
      area: new FormControl(null, Validators.required),
    });
  }

  get isClientInvalid() {
    const control = this.formArea.get('idClient');
    return control.invalid && control.touched;
  }

  get areIsInvalid() {
    const control = this.formArea.get('area');
    return control.invalid && control.touched;
  }

  ngOnInit(): void {
    this.areas$ = this._changeList$.pipe(switchMap(() => this._areaService.getAreas()));
    this.clients$ = this._selectService.getClientSelect();
  }

  ngAfterViewInit(): void {
    this._changeList$.next();
  }

  submitForm(): void {
    this.formArea.markAllAsTouched();

    if (this.formArea.invalid) return;

    const { idClient, area } = this.formArea.value;

    if (!this.areaSelected) {
      this._areaService
        .postArea({
          area,
          id_cliente: idClient,
        })
        .subscribe({
          next: (response) => {
            this.message = response.message;
            this.areaSelected = null;
            this.formArea.reset();
            this._toastService.showSuccess(this.toast, 'Operación exitosa');
            this._changeList$.next();
          },
          error: (response) => {
            this.message = response.error.message;
            this._toastService.showError(this.toast, 'Ocurrio un problema');
          },
        });
    } else {
      this._areaService
        .putArea(
          {
            area,
            id_cliente: idClient,
          },
          this.areaSelected.idArea
        )
        .subscribe({
          next: (response) => {
            this.message = response.message;
            this.areaSelected = null;
            this.formArea.reset();
            this._toastService.showSuccess(this.toast, 'Operación exitosa');
            this._changeList$.next();
          },
          error: (response) => {
            this.message = response.error.message;
            this._toastService.showError(this.toast, 'Ocurrio un problema');
          },
        });
    }
  }

  edit(area: IArea): void {
    this.formArea.reset();

    this.areaSelected = area;

    this.formArea.patchValue({
      idClient: this.areaSelected.cliente.idCliente,
      area: this.areaSelected.area,
    });
  }

  deleteDriver(id: number): void {
    this._areaService.deleteArea(id).subscribe({
      next: (response) => {
        this.message = response.message;
        this.areaSelected = null;
        this.formArea.reset();
        this._toastService.showSuccess(this.toast, 'Operación correcta');
        this._changeList$.next();
      },
      error: (response) => {
        this.message = response.error.message;
        this._toastService.showError(this.toast, 'Ocurrio un problema');
      },
    });
  }
}
