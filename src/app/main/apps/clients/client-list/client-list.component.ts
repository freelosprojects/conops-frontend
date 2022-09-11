import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastService } from 'app/main/components/toasts/toasts.service';
import { Subscription, Subject, Observable } from 'rxjs';
import { Client, IGenericList } from '../../models/adapters/driver.class';
import { ClientService } from '../services/client.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClientListComponent implements OnInit, AfterViewInit, OnDestroy {
  public rows: Client[];
  public selectedOption = 5;
  public ColumnMode = ColumnMode;
  public subscription$: Subscription = new Subscription();
  clients$: Observable<IGenericList<Client>>;

  private _changeList$: Subject<void>;

  message: string;

  @ViewChild('toast') toast: TemplateRef<any> | null;

  constructor(private _clientService: ClientService, private _toastService: ToastService) {
    this._changeList$ = new Subject();
    this.clients$ = new Observable();
  }

  ngOnInit(): void {
    this.getClientList();
  }

  ngAfterViewInit(): void {
    this._changeList$.next();
  }

  getClientList(): void {
    this.clients$ = this._changeList$.pipe(switchMap(() => this._clientService.getClientList()));
  }

  deleteClient(idClient: number): void {
    this.subscription$.add(
      this._clientService.deleteClient(idClient).subscribe({
        next: (response) => {
          this.message = response.message;
          this._changeList$.next();
          this._toastService.showSuccess(this.toast, 'Operación exitosa');
        },
        error: (response) => {
          this.message = response.error.message;
          this._toastService.showError(this.toast, 'Ocurrio un error');
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
