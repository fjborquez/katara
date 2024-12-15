import { ErrorHandler, Injectable, isDevMode } from '@angular/core';
import { Logging } from '@google-cloud/logging';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (isDevMode()) {
      console.error(error);
    } else {
      logToGoogle(error, 'avatar-419000').catch(console.error);
    }
  }
}

async function logToGoogle(error: any, projectId: string, logName = 'katara-log') {
  const logging = new Logging({projectId});
  const log = logging.log(logName);
  const metadata = {
    resource: {
      type: 'global'
    },
    severity: 'ERROR'
  };
  const entry = log.entry(metadata, error);
  await log.write(entry);
}
