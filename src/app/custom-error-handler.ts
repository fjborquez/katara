import { LogWriterService } from './services/log-writer.service';
import { ErrorHandler, Injectable, isDevMode } from '@angular/core';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor(
    private logWriterService: LogWriterService
  ) { }

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
