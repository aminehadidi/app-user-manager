import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import {  openNewUserDialog } from '../dialogs/new-user/new-user.component';
import {  openModifUserDialog } from '../dialogs/modif-user/modif-user.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModule } from '../../shared/shared.module';
import { UsersService } from '../../core/services/users.service';
import { UserElement } from '../../core/models/user-element.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { openDeleteUserDialog } from '../dialogs/delete-user/delete-user.component';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [HeaderComponent,  SharedModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent implements AfterViewInit {

  
  listUsers: UserElement[];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'action'];
  dataSrce: MatTableDataSource<UserElement>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private usersService: UsersService,  private dialog: MatDialog) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(data => this.listUsers = data);
    this.dataSrce = new MatTableDataSource<UserElement>(this.listUsers);
  }

 

  ngAfterViewInit(): void  {
    this.dataSrce.paginator = this.paginator;
  }
  applyFilter(event: Event): void  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSrce.filter = filterValue.trim().toLowerCase();
  }
  addUser(): void  {      

    const dialogRef = openNewUserDialog(this.dialog);
    
  }

  modifUser(id: number): void  {
    const userElem: any = this.listUsers.filter(data => (data.id == id))[0];   
    delete userElem.action;
    const dialogRef = openModifUserDialog(this.dialog,userElem);
    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog closed:", data)
    );
  }
  removeUser(idUser: number) : void {
    const dialogRef = openDeleteUserDialog(this.dialog,idUser);
   

  }
}