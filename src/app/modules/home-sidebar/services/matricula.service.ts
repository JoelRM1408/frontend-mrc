import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matricula } from '../../../core/models/matricula.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  private apiUrl = 'http://52.203.90.123:8080';

  constructor(private http: HttpClient) { }

  crearMatricula(matricula: Matricula): Observable<Matricula> {
    return this.http.post<Matricula>(`${this.apiUrl}/matricula`, matricula);
  }
}
