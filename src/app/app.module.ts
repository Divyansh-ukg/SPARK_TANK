import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginsuccessComponent } from './loginsuccess/loginsuccess.component';
import { RegistrationsuccessComponent } from './registrationsuccess/registrationsuccess.component';
import { FooterComponent } from './footer/footer.component';
import { AddingdonorComponent } from './addingdonor/addingdonor.component';
import { DonorlistComponent } from './donorlist/donorlist.component';
import { BloodstockComponent } from './bloodstock/bloodstock.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { RequesthistoryComponent } from './requesthistory/requesthistory.component';
import { RequestbloodComponent } from './requestblood/requestblood.component';
import { UserasdonorComponent } from './userasdonor/userasdonor.component';
import { RequesthistoryfromuserComponent } from './requesthistoryfromuser/requesthistoryfromuser.component';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    LoginsuccessComponent,
    RegistrationsuccessComponent,
    FooterComponent,
    AddingdonorComponent,
    DonorlistComponent,
    BloodstockComponent,
    UserdashboardComponent,
    UserlistComponent,
    UserprofileComponent,
    RequesthistoryComponent,
    RequestbloodComponent,
    UserasdonorComponent,
    RequesthistoryfromuserComponent,
    SearchresultComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent, LoginComponent]
})
export class AppModule { }
