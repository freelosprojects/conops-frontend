import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { Client } from '../../models/adapters/driver.class';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientListComponent implements OnInit, OnDestroy {

  public rows: Client[];
  public selectedOption = 5;
  public ColumnMode = ColumnMode;
  public subscription$: Subscription = new Subscription();

  constructor(private _clientService: ClientService) { }

  ngOnInit(): void {
    // this.createPostData();
    this.getClientList();
  }

  getClientList(): void {
    this.subscription$.add(
      this._clientService.getClientList().subscribe(dataClient => {
        console.log(dataClient);
        this.rows = dataClient.data;
      })
    );
  }

  deleteClient(idClient: number): void {
    this.subscription$.add(
      this._clientService.deleteClient(idClient).subscribe(res => console.log(res))
    );
  }

  createPostData(): void {
    const vehicles = {
      placa: 'A35579',
      pasajeros: 20,
      id_marca: 2,
      id_modelo: 2,
      id_color: 2,
      id_tipo_vehiculo: 1,
      id_brevete_categoria: 1,
      id_tipo_combustible: 2
    }

    this.subscription$.add(
      this._clientService.createPostData(vehicles).subscribe(res => console.log(res))
    );
  }

  createClient(): void {
    const client = {
      ruc: '10724917947',
      nombre: 'Devonmalone',
      razon_social: 'Testing'
    }
    this.subscription$.add(
      this._clientService.createClient(client).subscribe(res => console.log(res))
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
