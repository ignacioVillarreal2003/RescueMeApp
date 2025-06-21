import {effect, Injectable, signal, WritableSignal} from '@angular/core';
import {SessionData} from '../../models/session-data';

const STORAGE_KEY = 'session-data';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly _session: WritableSignal<SessionData | undefined> = signal(this.readFromStorage());

  readonly session: WritableSignal<SessionData | undefined> = this._session;

  constructor() {
    effect((): void => {
      const value: SessionData | undefined = this._session();
      if (value === undefined) {
        sessionStorage.removeItem(STORAGE_KEY);
      } else {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      }
    });
  }

  private readFromStorage(): SessionData | undefined {
    const raw: string | null = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return undefined;
    }
    try {
      return JSON.parse(raw) as SessionData;
    } catch {
      return undefined;
    }
  }

  setData(data: SessionData): void {
    this._session.set(data);
  }

  clearData(): void {
    this._session.set(undefined);
    localStorage.clear();
  }
}
