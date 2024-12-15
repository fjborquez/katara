import { ErrorHandler, Injectable, isDevMode } from '@angular/core';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (!isDevMode()) {
      console.log('WE ARE IN PROD MODE');
    }

    console.error(error);
  }
}
