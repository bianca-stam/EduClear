import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

  asignaturaSeleccionada = signal<any>(null);
  
}
