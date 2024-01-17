import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { Validators, FormGroup, FormControl, ReactiveFormsModule, AbstractControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../core/models/user.model';
import { UsersService } from '../../../core/services/users.service';
import { CodeStatus } from '../../../shared/enums/code-status';
import Utils from '../../../shared/functions/utils';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  form: FormGroup;
  firstNameCtrl: FormControl;
  lastNameCtrl: FormControl;
  emailCtrl: FormControl;
  emailChecked: string;

  constructor(
    private dialogRef: MatDialogRef<NewUserComponent>,
    private usersService: UsersService) {

  }

  ngOnInit(): void {
    this.firstNameCtrl = new FormControl(this.firstName, [Validators.required]);
    this.lastNameCtrl = new FormControl(this.lastName, [Validators.required]);
    this.emailCtrl = new FormControl(this.email, [Validators.required, Validators.email]);
    this.form = new FormGroup({
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl,
      email: this.emailCtrl
    });
  }

  close(): void {

    this.dialogRef.close(true);

  }

  saveAddUser(): void {

    let user: User = {
      id: 0,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email
    }

    this.usersService.addUser(user).subscribe({
      next: (res) => {
        if (res === CodeStatus.S_OK) {
          this.dialogRef.close(this.form.value);
          window.location.reload();
        } else {
          console.error(
            `La création de l'utilisateur a échoué `
          );
        }
      },
      error: (err) => {
        console.error(`La création de l'utilisateur a échoué: ${err}`);
      },
    })


  }

  getFormControlErrorText(ctrl: AbstractControl): string {

    if (ctrl === this.emailCtrl && ctrl.valid) {
      if (Utils.isEmail(ctrl.value)) {
        if (this.emailCtrl.value !== this.emailChecked) {
          this.emailChecked = this.emailCtrl.value;
          this.usersService.getUserByEmail(ctrl.value).subscribe(
            (user) => {
              if (user?.email === ctrl.value) {
                this.emailCtrl.setErrors({ 'emailUsed': true });
              }
            }
          );
        }
      } else {
        this.emailCtrl.setErrors({ 'email': true });
      }
    }

    return Utils.getFormControlErrorText(ctrl);

  }
}


export function openNewUserDialog(dialog: MatDialog): MatDialogRef<NewUserComponent, any> {

  const config = new MatDialogConfig();

  config.disableClose = true;
  config.autoFocus = true;
  config.panelClass = "modal-panel";
  config.backdropClass = "backdrop-modal-panel";

  return dialog.open(NewUserComponent, config);
}