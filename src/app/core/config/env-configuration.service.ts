import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';



/**
 * La configuration
 */
interface Configuration {
  debug: boolean;
  settings: {
    env: string;
    displayVersion: boolean;
    baseUrl: string;
    userManagementUrl: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class EnvConfigurationService {
  private readonly configPath: string = './assets/config/config.json';
  private config: Configuration;

  constructor(private http: HttpClient) {}

  /**
   * Charge les variables de configuration
   * @returns
   */
  load(): Promise<void> {
    return lastValueFrom(this.http.get<Configuration>(this.configPath)).then(
      
      (data: Configuration | undefined) => {
        if (data) {         
          this.config = data;
        }
      }
    );
  }

  get configuration() {
    return this.config;
  }
}
