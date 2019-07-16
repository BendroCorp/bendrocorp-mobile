
// globals.ts
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Platform } from '@ionic/angular';

@Injectable()
export class Globals {

  constructor(private platform: Platform) { }

  // cause if we are running on device even with the DevApp we must use https
  baseUrlRoot: string = (environment.production || this.platform.is("ios")) ? 'https://api.bendrocorp.com/' : 'http://localhost:3000/';
  baseUrl: string = this.baseUrlRoot + 'api/';
  wssUri: string = (environment.production || this.platform.is("ios")) ? 'wss://api.bendrocorp.com/cable' : 'ws://localhost:3000/cable';
}