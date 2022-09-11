import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Client, ClientResponse } from '../../models/adapters/driver.class';
import { ClientService } from '../services/client.service';
import { ToastService } from '../../../components/toasts/toasts.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
})
export class ClientEditComponent implements OnInit, OnDestroy {
  public title: string = 'Editar';
  public isCreate: boolean = false;
  public client: Client = {} as Client;
  public subscription$: Subscription = new Subscription();

  message: string;

  @ViewChild('toast') toast: TemplateRef<any> | null;

  constructor(
    private _route: ActivatedRoute,
    private _clientService: ClientService,
    private _toastService: ToastService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getClientListById();
  }

  getClientListById(): void {
    this.subscription$.add(
      this._route.params
        .pipe(
          switchMap((params) => {
            if (!params['id']) {
              this.title = 'Añadir';
              this.isCreate = true;

              return EMPTY;
            }

            return this._clientService.getClientListById(params['id']);
          })
        )
        .subscribe((client) => (this.client = client))
    );
  }

  submit(form) {
    if (form.valid) {
      const clientForm = form.value;
      const client: ClientResponse = {
        nombre: clientForm.name,
        ruc: clientForm.ruc,
        razon_social: clientForm.businessName,
      };

      if (this.isCreate) {
        this.subscription$.add(
          this._clientService.createClient(client).subscribe({
            next: (response) => {
              this.message = response.message;
              this._toastService.showSuccess(this.toast, 'Operación exitosa');
              this._router.navigateByUrl('/apps/client/client-list');
            },
            error: ({ error }) => {
              this.message = 'No se pudo registrar';
              this._toastService.showError(this.toast, 'Ocurrio un error');
            },
          })
        );
      } else {
        this.subscription$.add(
          this._clientService.updateClient(client, this.client.idClient).subscribe({
            next: (response) => {
              this.message = response.message;
              this._toastService.showSuccess(this.toast, 'Operación exitosa');
              this._router.navigateByUrl('/apps/client/client-list');
            },
            error: (response) => {
              this.message = response.error.message;
              this._toastService.showError(this.toast, 'Ocurrio un error');
            },
          })
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
