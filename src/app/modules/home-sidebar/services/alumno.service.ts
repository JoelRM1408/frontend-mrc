import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../../../core/models/alumno.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private apiUrl = 'http://52.203.90.123:8080';

  constructor(private http: HttpClient) { }

  crearAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(`${this.apiUrl}/alumno`, alumno);
  }
}
