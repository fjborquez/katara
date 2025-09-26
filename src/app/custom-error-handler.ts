import { ErrorHandler, Injectable, inject, isDevMode } from '@angular/core';

import { LogWriterService } from './services/log-writer.service';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  private logWriterService = inject(LogWriterService);


  handleError(error: any): void {
    if (isDevMode()) {
      console.error(error);
    } else {
      this.logWriterService.add({
        message: JSON.stringify({
          message: error.message,
          stack: error.stack
        })
      }).subscribe();
    }
  }
}
