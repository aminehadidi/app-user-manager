import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, AbstractControl, FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../core/models/user.model';
import { CodeStatus } from '../../../shared/enums/code-status';
import { UsersService } from '../../../core/services/users.service';
import Utils from '../../../shared/functions/utils';
@Component({
  selector: 'app-modif-user',
  standalone: true,
  imports: [CommonModule, SharedModule,ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  templateUrl: './modif-user.component.html',
  styleUrl: './modif-user.component.scss'
})
export class ModifUserComponent implements OnInit {
  idUser: number;
  firstName: string;
  lastName: string;
  email: string;
  form: FormGroup;
  firstNameCtrl:FormControl;
  lastNameCtrl:FormControl;
  constructor( private dialogRef: MatDialogRef<ModifUserComponent>,
    private fb: FormBuilder,
    private usersService: UsersService) {

  }

  ngOnInit(): void {
    this.firstNameCtrl=new FormControl(this.firstName, [Validators.required]);
    this.lastNameCtrl=new FormControl(this.lastName, [Validators.required]);
    this.form = this.fb.group({
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl
    });
  }
  getFormControlErrorText(ctrl: AbstractControl):string {
    return Utils.getFormControlErrorText(ctrl);
  }
  close(): void {
    this.dialogRef.close(true);

  }

  saveModifUser(): void {
    let user : User ={
      id:this.idUser,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.email
    }

    this.usersService.updateUser(user).subscribe({
      next: (res) => {
        if (res === CodeStatus.S_OK) {
          this.dialogRef.close(this.form.value);          
          window.location.reload();
        } else {
          console.error(
            `La modification de l'utilisateur a échoué `
          );
        }
      },
      error: (err) => {
        console.error(`La modification de l'utilisateur a échoué: ${err}`);
      },
    })
  }

  }



export function openModifUserDialog(dialog: MatDialog, user: User)  :  MatDialogRef<ModifUserComponent, any>{

  const config = new MatDialogConfig();

  config.disableClose = true;
  config.autoFocus = true;
  config.panelClass = "modal-panel";
  config.backdropClass = "backdrop-modal-panel";

  config.data = {
    ...user
  };

  const dialogRef = dialog.open(ModifUserComponent, config);
  dialogRef.componentInstance.idUser=user.id;
  dialogRef.componentInstance.firstName=user.firstName;
  dialogRef.componentInstance.lastName=user.lastName;
  dialogRef.componentInstance.email=user.email;
  return dialogRef;
}