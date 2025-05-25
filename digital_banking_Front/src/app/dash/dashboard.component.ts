import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { DashboardDTO } from '../model/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  stats!: DashboardDTO;
  objectKeys = Object.keys;

  accountChart: any;
  operationChart: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardStats().subscribe({
      next: (data: DashboardDTO) => {
        this.stats = data;

        // Répartition des comptes (par type)
        this.accountChart = {
          labels: Object.keys(data.accountTypeDistribution),
          datasets: [
            {
              data: Object.values(data.accountTypeDistribution),
              backgroundColor: ['#60a5fa', '#34d399', '#facc15', '#f87171'],
            }
          ]
        };

        // Répartition des opérations (par type)
        this.operationChart = {
          labels: Object.keys(data.operationTypeDistribution),
          datasets: [
            {
              label: 'Opérations',
              data: Object.values(data.operationTypeDistribution),
              backgroundColor: ['#4ade80', '#f87171', '#a78bfa', '#fcd34d'],
            }
          ]
        };
      },
      error: (err) => {
        console.error('Erreur lors du chargement du dashboard', err);
      }
    });
  }
}
