import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { IUser, IUserPost } from '../../../../../@core/models/users.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectService } from 'app/config/service/ng-select.service';
import { INgSelect } from '../../../../../@core/models/ng-select.model';
import { ToastService } from '../../../components/toasts/toasts.service';

@Component({
  selector: 'app-user-regedit',
  templateUrl: 'user-regedit.component.html'
})

export class UserRegeditComponent implements OnInit, OnDestroy {

  public message: string;
  public userForm: FormGroup;
  public title: string = 'Editar';
  public isCreate: boolean = false;
  public user: IUser = {} as IUser;
  public ngSelectRol$: Observable<INgSelect[]> = new Observable();
  public subscription$: Subscription = new Subscription();

  @ViewChild('added') added: TemplateRef<any> | null;

  @ViewChild('error') error: TemplateRef<any> | null;

  constructor(
    private _form: FormBuilder,
    private _route: ActivatedRoute,
    private _userService: UsersService,
    private _toastService: ToastService,
    private _ngSelectService: NgSelectService,
  ) {
    this.initForm();
    this.initNgSelect();
  }

  get isNameInvalid() {
    return this.userForm.get('name')?.invalid && this.userForm.get('name')?.touched;
  }

  get isEmailInvalid() {
    return this.userForm.get('email')?.invalid && this.userForm.get('email')?.touched;
  }

  ngOnInit() {
    this.getUserByID();
  }

  initNgSelect(): void {
    this.ngSelectRol$ = this._ngSelectService.getSelectRoles();
  }

  initForm(): void {
    this.userForm = this._form.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      role: [null, Validators.required]
    });
  }

  getUserByID(): void {
    this.subscription$.add(
      this._route.params.pipe(
        switchMap(params => {
          if (!params['id']) {
            this.title = 'Añadir';
            this.isCreate = true;

            return EMPTY;
          }

          return this._userService.getUserByID(params['id']);
        })
      ).subscribe({
        next: user => {
          this.user = user;
          this.setForm();
        },
      })
    );
  }

  setForm(): void {
    this.userForm.patchValue({
      name: this.user.name,
      email: this.user.email,
      role: this.user.rol.rol
    })
  }

  submit(): void {
    if (this.userForm.valid) {
      const user: IUserPost = {
        nombre: this.userForm.get('name')?.value,
        correo: this.userForm.get('email')?.value,
        id_rol: this.userForm.get('role')?.value.value
      };

      if (this.isCreate) {
        this.subscription$.add(
          this._userService.createUser(user).subscribe({
            next: (response) => {
              this.message = response.message;
              this._toastService.showSuccess(this.added, 'Operación correcta');
            },
            error: () => this._toastService.showError(this.error, 'Ocurrio un problema')
          })
        );
      } else {
        this.subscription$.add(
          this._userService.updateUser(user, this.user.idUser).subscribe({
            next: (response) => {
              this.message = response.message;
              this._toastService.showSuccess(this.added, 'Operación correcta');
            },
            error: () => this._toastService.showError(this.error, 'Ocurrio un problema')
          })
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}