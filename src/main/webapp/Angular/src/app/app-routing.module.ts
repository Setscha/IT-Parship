import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjekteLehrerComponent} from './components/lehrer/projekte-lehrer/projekte-lehrer.component';
import {KlassenAdminComponent} from './components/admin/klassen-admin/klassen-admin.component';
import {ProjekteAdminComponent} from './components/admin/projekte-admin/projekte-admin.component';
import {SettingsAdminComponent} from './components/admin/settings-admin/settings-admin.component';
import {SchuelerAdminComponent} from './components/admin/schueler-admin/schueler-admin.component';
import {ProjekteSchuelerComponent} from './components/schueler/projekte-schueler/projekte-schueler.component';
import {KompetenzenSchuelerComponent} from './components/schueler/kompetenzen-schueler/kompetenzen-schueler.component';
import {KompetenzenComponent} from "./components/lehrer/kompetenzen/kompetenzen.component";
import {MatchComponent} from "./components/lehrer/match/match.component";

const routes: Routes = [
    {path: 'projekteLehrer', component: ProjekteLehrerComponent},
    // {path: 'projekteAdmin', component: ProjekteAdminComponent},
    // {path: 'klassenAdmin', component: KlassenAdminComponent},
    // {path: 'settingsAdmin', component: SettingsAdminComponent},
    // {path: 'schuelerAdmin', component: SchuelerAdminComponent},
    {path: 'projekteSchueler', component: ProjekteSchuelerComponent},
    {path: 'qualifikationen', component: KompetenzenSchuelerComponent},
    {path: 'kompetenzen', component: KompetenzenComponent},
    {path: 'match', component: MatchComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ProjekteLehrerComponent,
                                    KlassenAdminComponent, ProjekteAdminComponent, SettingsAdminComponent,
                                    SchuelerAdminComponent, ProjekteSchuelerComponent,
                                    KompetenzenSchuelerComponent];
