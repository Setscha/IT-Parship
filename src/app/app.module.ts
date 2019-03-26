import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as mat from '@angular/material';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './components/lehrer/main-nav-lehrer/main-nav.component';
import { MainNavAdminComponent } from './components/admin/main-nav-admin/main-nav-admin.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MainNavSchuelerComponent } from './components/schueler/main-nav-schueler/main-nav-schueler.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SkillpointsComponent } from './components/skillpoints/skillpoints.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MainNavAdminComponent,
    routingComponents,
    MainNavSchuelerComponent,
    LoginComponent,
    SkillpointsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    mat.MatSidenavModule,
    mat.MatToolbarModule,
    LayoutModule,
    mat.MatToolbarModule,
    mat.MatButtonModule,
    mat.MatSidenavModule,
    mat.MatIconModule,
    mat.MatListModule,
    mat.MatCardModule,
    mat.MatFormFieldModule,
    mat.MatInputModule,
    mat.MatButtonModule,
    mat.MatDividerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
