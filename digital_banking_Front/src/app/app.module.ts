import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { LoginComponent } from './login/login.component';
import { appHttpInterceptor } from './interceptors/app-http.interceptor';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dash/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomersComponent,
    AccountsComponent,
    NewCustomerComponent,
    CustomerAccountsComponent,
    AdminTemplateComponent,
    DashboardComponent
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   HttpClientModule,
   CommonModule,
   ReactiveFormsModule,
   LoginComponent,
   NgChartsModule,
   NgChartsModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([appHttpInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
