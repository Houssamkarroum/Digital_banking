import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardDTO } from '../model/dashboard.model'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8085/dashboard'; // Modifier selon votre back

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<DashboardDTO> {
    return this.http.get<DashboardDTO>(this.apiUrl);
  }
}
