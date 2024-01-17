import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { CodeStatus } from '../enums/code-status';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  /**
   * Handle error response from API
   * @param error
   * @returns
   */
  handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.error && error.error.status && error.error.error) {
      errorMessage = `${error.error.status} : ${error.error.error}`;
    } else {
      errorMessage = `${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Retrieve message error from code error
   * @param code
   * @returns
   */
  getMessageCodeError(code: string): string {
    if (Object.keys(CodeStatus).includes(code)) {
      return CodeStatus[code as keyof typeof CodeStatus];
    }
    return 'unknown error';
  }
}
