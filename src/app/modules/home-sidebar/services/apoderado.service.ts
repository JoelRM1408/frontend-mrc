import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apoderado } from '../../../core/models/apoderado.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApoderadoService {

  private apiUrl = 'http://52.203.90.123:8080';

    constructor(private http: HttpClient) { }

    crearApoderado(apoderado: Apoderado): Observable<Apoderado> {
      return this.http.post<Apoderado>(`${this.apiUrl}/apoderado`, apoderado);
    }
}
