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
import { LehrerProjektComponent } from './components/lehrer/lehrer-projekt/lehrer-projekt.component';
import { ProjektListeComponent } from './components/lehrer/projekt-liste/projekt-liste.component';
import { AnforderungComponent } from './components/lehrer/anforderung/anforderung.component';
import { EditProjektDialogComponent } from './components/lehrer/edit-projekt-dialog/edit-projekt-dialog.component';
import { DeleteProjektDialogComponent } from './components/lehrer/delete-projekt-dialog/delete-projekt-dialog.component';
import {
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSliderModule, MatProgressSpinnerModule
} from '@angular/material';
import { QualifikationComponent } from './components/schueler/qualifikation/qualifikation.component';
import { FormsModule } from '@angular/forms';
import { CookieService } from "ngx-cookie-service";
import { KompetenzenComponent } from './components/lehrer/kompetenzen/kompetenzen.component';
import { KompetenzComponent } from './components/lehrer/kompetenz/kompetenz.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MainNavAdminComponent,
    routingComponents,
    MainNavSchuelerComponent,
    LoginComponent,
    LehrerProjektComponent,
    ProjektListeComponent,
    AnforderungComponent,
    EditProjektDialogComponent,
    DeleteProjektDialogComponent,
    QualifikationComponent,
    KompetenzenComponent,
    KompetenzComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    HttpClientModule,
    MatExpansionModule,
    MatSelectModule,
    MatSnackBarModule,
    FormsModule,
    MatSliderModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    EditProjektDialogComponent,
    DeleteProjektDialogComponent
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
