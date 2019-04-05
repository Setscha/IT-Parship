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
import {FormsModule} from '@angular/forms';
import { EditProjektDialogComponent } from './components/lehrer/edit-projekt-dialog/edit-projekt-dialog.component';
import { DeleteProjektDialogComponent } from './components/lehrer/delete-projekt-dialog/delete-projekt-dialog.component';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatSelectModule,
  MatSidenavModule, MatSnackBarModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';

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
    DeleteProjektDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    HttpClientModule,
    MatExpansionModule,
    MatSelectModule,
    MatSnackBarModule,
    FormsModule,
    MatDialogModule,
    MatTooltipModule
  ],
  entryComponents: [
    EditProjektDialogComponent,
    DeleteProjektDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
