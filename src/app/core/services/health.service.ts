import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorService } from '../../shared/services/error.service';
import { EnvConfigurationService } from '../config/env-configuration.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class HealthService {

    private router = inject(Router);
    private readonly defaultHttpHeaders = {
        headers: new HttpHeaders({
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }),
    };

    constructor(
        private envConf: EnvConfigurationService,
        private httpClient: HttpClient,
        private errorService: ErrorService
    ) { }


    /**
     * Check UP
     * @returns
     */
    isUP(): boolean {
        const url: string = `${this.envConf.configuration.settings.userManagementUrl}`;
        let isUp: boolean = false;
        this.httpClient.get<User[]>(url, this.defaultHttpHeaders).pipe(
            catchError((err) => this.errorService.handleError(err))
        ).subscribe({
            next: (result: User[]) => { isUp = (result.length >= 0 ? true : false); }
            , error: (err) => {
                this.router.navigate(['hs']);
                isUp = false;
            }
        });
        return isUp;
    }




}
