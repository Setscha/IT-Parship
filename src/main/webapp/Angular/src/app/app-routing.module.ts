import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjekteLehrerComponent} from './components/lehrer/projekte-lehrer/projekte-lehrer.component';
import {SettingsLehrerComponent} from './components/lehrer/settings-lehrer/settings-lehrer.component';
import {KlassenAdminComponent} from './components/admin/klassen-admin/klassen-admin.component';
import {ProjekteAdminComponent} from './components/admin/projekte-admin/projekte-admin.component';
import {SettingsAdminComponent} from './components/admin/settings-admin/settings-admin.component';
import {ProfilLehrerComponent} from './components/lehrer/profil-lehrer/profil-lehrer.component';
import {SchuelerAdminComponent} from './components/admin/schueler-admin/schueler-admin.component';
import {ProjekteSchuelerComponent} from './components/schueler/projekte-schueler/projekte-schueler.component';
import {KompetenzenSchuelerComponent} from './components/schueler/kompetenzen-schueler/kompetenzen-schueler.component';
import {SettingsSchuelerComponent} from './components/schueler/settings-schueler/settings-schueler.component';
import {KompetenzenComponent} from "./components/lehrer/kompetenzen/kompetenzen.component";

const routes: Routes = [
    {path: 'projekteLehrer', component: ProjekteLehrerComponent},
    {path: 'settingsLehrer', component: SettingsLehrerComponent},
    {path: 'profilLehrer', component: ProfilLehrerComponent},
    {path: 'projekteAdmin', component: ProjekteAdminComponent},
    {path: 'klassenAdmin', component: KlassenAdminComponent},
    {path: 'settingsAdmin', component: SettingsAdminComponent},
    {path: 'schuelerAdmin', component: SchuelerAdminComponent},
    {path: 'projekteSchueler', component: ProjekteSchuelerComponent},
    {path: 'kompetenzenSchueler', component: KompetenzenSchuelerComponent},
    {path: 'settingsSchueler', component: SettingsSchuelerComponent},
    {path: 'kompetenzen', component: KompetenzenComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ProjekteLehrerComponent, SettingsLehrerComponent, ProfilLehrerComponent,
                                    KlassenAdminComponent, ProjekteAdminComponent, SettingsAdminComponent,
                                    SchuelerAdminComponent, ProjekteSchuelerComponent, SettingsSchuelerComponent,
                                    KompetenzenSchuelerComponent];
