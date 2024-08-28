import { EventEmitter } from '@angular/core';

export class Emitters {
  static authEmitter = new EventEmitter<{ authenticated: boolean; role: string }>();
}
