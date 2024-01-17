import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorService } from '../../shared/services/error.service';
import { EnvConfigurationService } from '../config/env-configuration.service';
import { User } from '../models/user.model';
import { UserElement } from '../models/user-element.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly defaultHttpHeaders = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  };
  private readonly optionsHeaders ={
    ...this.defaultHttpHeaders, 
    responseType: "text"
  };
  constructor(
    private envConf: EnvConfigurationService,
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  /**
   * Ajouter un utilisateur
   * @param User
   * @returns
   */
  addUser(
    reqUser: User
  ): Observable<string> {
    const url: string = `${this.envConf.configuration.settings.userManagementUrl}`;

    return this.httpClient
      .post(url, reqUser,{...this.defaultHttpHeaders, responseType: "text"})
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }

  /**
  * Mettre à jour un utilisateur
  * @param User
  * @returns
  */
  updateUser(
    reqUser: User
  ): Observable<string> {
    const url: string = `${this.envConf.configuration.settings.userManagementUrl}/${reqUser.id}`;

    return this.httpClient
      .put(url, reqUser,{...this.defaultHttpHeaders, responseType: "text"})
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }

  
  /**
   * Rechercher les utilisateurs
   * @returns
   */
  getUsers(): Observable<UserElement[]> {
    const url: string = `${this.envConf.configuration.settings.userManagementUrl}`;     
    return this.httpClient.get<User[]>(url, this.defaultHttpHeaders)
    .pipe(map(users=>users.map( user =>{ return {...user , action:(user.id ?user.id:0) };})) );
  
  }
/**
   * Rechercher un utilisateur en fonction d'email
   * @param email
   * @returns
   */
getUserByEmail(email:string): Observable<User> {
  const url: string = `${this.envConf.configuration.settings.userManagementUrl}/${email}`;     
  return this.httpClient.get<User>(url, this.defaultHttpHeaders)
  .pipe(catchError((err) => this.errorService.handleError(err)) );

}

  

  /**
  * Supprimer un utilisateur
  * @param User
  * @returns
  */
  deleteUser(
    idUser: number
  ): Observable<string> {
    const url: string = `${this.envConf.configuration.settings.userManagementUrl}/${idUser}`;

    return this.httpClient
      .delete(url,{...this.defaultHttpHeaders, responseType: "text"})
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }
}
