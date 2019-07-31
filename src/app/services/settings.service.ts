import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private authService: AuthService) { }

  enableTouchId() {
    localStorage.setItem('useTouchId', 'true');
  }

  disableTouchId(): boolean {
    localStorage.setItem('useTouchId', 'false');
    return true;
  }

  touchIdEnabled(): boolean {
    const tId = localStorage.getItem('useTouchId');
    return (tId && tId === 'true') ? true : false;
  }
}
