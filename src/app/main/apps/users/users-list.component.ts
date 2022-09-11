import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { IUser } from '@core/models/users.model';
import { FormControl } from '@angular/forms';
import { UsersService } from './services/users.service';
import { IResponseList } from '@core/models/response.model';
import { ToastService } from '../../components/toasts/toasts.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class UsersListComponent implements OnInit, OnDestroy {

  public message: string;
  public rows: IResponseList<IUser> = {} as IResponseList<IUser>;
  public searchValue: FormControl;
  public selectedRole: FormControl;
  public selectedStatus: FormControl;
  public selectedOption: FormControl;
  public ColumnMode = ColumnMode;
  public subscription$: Subscription = new Subscription();

  public userSelected: IUser;

  public selectRole: any = [
    { name: 'All', value: '' },
    { name: 'Admin', value: 'Admin' },
    { name: 'Author', value: 'Author' },
    { name: 'Editor', value: 'Editor' },
    { name: 'Maintainer', value: 'Maintainer' },
    { name: 'Subscriber', value: 'Subscriber' }
  ];

  public selectStatus: any = [
    { name: 'All', value: '' },
    { name: 'Pending', value: 'Pending' },
    { name: 'Active', value: 'Active' },
    { name: 'Inactive', value: 'Inactive' }
  ];

  private _changeList$: Subject<void>;

  constructor(
    private _userService: UsersService,
    private _toastService: ToastService
  ) {
    this.searchValue = new FormControl('');
    this.selectedRole = new FormControl([]);
    this.selectedOption = new FormControl(10);
    this.selectedStatus = new FormControl([]);
    this._changeList$ = new Subject();
  }

  @ViewChild('added') added: TemplateRef<any> | null;

  @ViewChild('error') error: TemplateRef<any> | null;

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.subscription$.add(
      this._changeList$.pipe(
        switchMap(() => this._userService.getUsers())
      ).subscribe(res => this.rows = res)
    );
    this._changeList$.next();
  }

  filterUpdate(event): void { }

  filterByRole(event): void { }

  filterByStatus(event): void { }

  deleteUser(id: number): void {
    this._userService.deleteUser(id).subscribe({
      next: (response) => {
        this.message = response.message;
        this.userSelected = null;
        this._toastService.showSuccess(this.added, 'Operación correcta');
        this._changeList$.next();
      },
      error: () => this._toastService.showError(this.error, 'Ocurrio un problema'),
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}