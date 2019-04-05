import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './components/lehrer/main-nav-lehrer/main-nav.component';
import { MainNavAdminComponent } from './components/admin/main-nav-admin/main-nav-admin.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MainNavSchuelerComponent } from './components/schueler/main-nav-schueler/main-nav-schueler.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import {
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {MatButtonModule} from '@angular/material/typings/button';
import {MatFormFieldModule} from '@angular/material/typings/esm5/form-field';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MainNavAdminComponent,
    routingComponents,
    MainNavSchuelerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
