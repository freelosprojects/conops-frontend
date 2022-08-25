import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Client, ClientResponse } from '../../models/adapters/driver.class';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
})
export class ClientEditComponent implements OnInit, OnDestroy {

  public title: string = 'Editar';
  public isCreate: boolean = false;
  public client: Client = {} as Client;
  public subscription$: Subscription = new Subscription();

  constructor(
    private _route: ActivatedRoute,
    private _clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.getDriverListById();
  }

  getDriverListById(): void {
    this.subscription$.add(
      this._route.params.pipe(
        switchMap(params => {
          if (!params['id']) {
            this.title = 'Añadir';
            this.isCreate = true;

            return EMPTY;
          }

          return this._clientService.getClientListById(params['id']);
        })
      ).subscribe(client => this.client = client)
    );
  }

  submit(form) {
    if (form.valid) {
      const clientForm = form.value;
      const client: ClientResponse = {
        nombre: clientForm.name,
        ruc: clientForm.ruc,
        razon_social: clientForm.businessName
      };

      console.log(client);

      if (this.isCreate) {
        this.subscription$.add(
          this._clientService.createClient(client).subscribe(res => console.log(res))
        );
      } else {
        this.subscription$.add(
          this._clientService.updateClient(client, this.client.idClient).subscribe(res => console.log(res))
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
