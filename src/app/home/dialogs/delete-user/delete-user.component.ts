import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, OnInit, inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../core/services/users.service';
import { CodeStatus } from '../../../shared/enums/code-status';
@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent  {

  idUser: number;

  constructor(
      private dialogRef: MatDialogRef<DeleteUserComponent>,
      private usersService: UsersService) {

  }


  close() :void {
    this.dialogRef.close(true);

  }

  deleteUser():void {
   
    this.usersService.deleteUser(this.idUser).subscribe({
      next: (res) => {
        if (res === CodeStatus.S_OK) {           
          this.dialogRef.close(true);
          window.location.reload();
        } else {
          console.error(
            `La suppression de l'utilisateur ${this.idUser} `
          );
        }
      },
      error: (err) => {
        console.error(`La suppression de l'utilisateur ${this.idUser} a échoué: ${err}`);
      },
    })  

  }
}


export function openDeleteUserDialog(dialog: MatDialog, userId: number) :  MatDialogRef<DeleteUserComponent, any>{

  const config = new MatDialogConfig();

  config.disableClose = true;
  config.autoFocus = true;
  config.panelClass = "modal-panel";
  config.backdropClass = "backdrop-modal-panel";

  config.data =  userId;

  const dialogRef = dialog.open(DeleteUserComponent, config);
  dialogRef.componentInstance.idUser=userId;
  return dialogRef;
}