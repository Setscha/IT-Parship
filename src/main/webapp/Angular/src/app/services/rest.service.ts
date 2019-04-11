import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";
import { Seite } from "../models/seite";
import { isArray } from "rxjs/internal/util/isArray";
import { isObject } from "rxjs/internal/util/isObject";
import {catchError, map} from "rxjs/internal/operators";
import {of} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  API_PFAD = "http://localhost:8081/api/";

  constructor(private http: HttpClient,
              private snackbar: MatSnackBar) { }

  /**
   * Liefert ein Promise auf eine Seite von Entities der
   * angegebenen Type. Existiert die Seite nicht, so wird
   * die letzte vorhandene Seite geliefert.
   *
   * Alle _embedded-Objekte werden durch ihre Inhalte ersetzt.
   *
   * Argumente (optional, wenn nicht anders angegeben):
   *   konstruktor   (erforderlich) Factoryfunktion für geladene
   *                 Objekte, liefert auch ihren Pfad im REST-API
   *   seitenNr      (erforderlich) Nummer der zu ladenden Seite
   *                 (erste Seite === 0)
   *   parameter     Namen und Werte der Request-Parameter als
   *                 Objekt
   *   query         Name der serverseitigen Query-Methode, falls
   *                 eine solche verwendet werden soll
   */
  seiteLaden(konstruktor, seitenNr, parameter, query) {
    //$log.debug(`RestService.seiteLaden("${konstruktor.path}", ${seitenNr}, ${parameter})`);

    // REST-Pfad und Query-Parameter vorbereiten
    let pfad = query
      ? `${this.API_PFAD}${konstruktor.path}/search/${query}`
      : `${this.API_PFAD}${konstruktor.path}`,
      params = Object.assign({ page: seitenNr }, parameter);

    return this.http
      .get(pfad, { params: params })
      .toPromise()
      .then(response => {
        response = this.embeddedAufloesen(response);
        //$log.debug("RestService.seiteLaden() OK", response);
        // Seitennummer im zulässigen Bereich, oder keine Seiten?
        if (response['page']['number'] < response['page']['totalPages'] || !response['page']['totalElements']) {
          // OK, Seite erzeugen und zurückgeben
          return new Seite(konstruktor, response);

        } else {
          // Letzte vorhandene Seite ausliefern
          return this.seiteLaden(
            konstruktor,
            response['page']['totalPages']-1,
            params,
            query);
        }
      })
      .catch(error => this.fehlerBehandeln(error));
  };

  /**
   * Lädt über das REST-API vom Server eine einzelne Entity der
   * angegebenen Type und liefert ein Promise auf das geladene Objekt.
   *
   * Argumente (optional, wenn nicht anders angegeben):
   *   konstruktor   (erforderlich) Factoryfunktion für geladene
   *                 Objekte, liefert auch ihren Pfad im REST-API
   *   url           (erforderlich) Link zur Entity
   *   parameter     Namen und Werte der Request-Parameter als
   *                 Objekt
   */
  laden(konstruktor, url, parameter) {
    return this.http
      .get(url, { params: parameter })
      .pipe(
        catchError(error => this.fehlerBehandeln(error)),
        map(data => {
          return new konstruktor(data);
        })
      );
  };


  /**
   * Löscht die angegebene Entity von Server.
   *
   * Liefert ein Promise auf den Erfolg.
   */
  loeschen(entity) {
    //$log.debug("RestService.loeschen()", entity);

    // Stammt die Entity vom Server, oder wurde sie lokal erzeugt?
    if (entity._links && entity._links.self) {
      return this.http
        .delete(entity._links.self.href, { headers: { "If-Match": entity.etag } })
        .toPromise()
        .catch(this.fehlerBehandeln);

    } else {
      // Entity stammt nicht vom Server und kann dort nicht gelöscht werden
      this.fehlerBehandeln({ status: 404, statusText: "Not found", data: {} });
      return Promise.reject();
    }
  };


  /**
   * Aktualisiert oder erzeugt die angegebene Entity auf dem Server,
   * je nachdem, ob sie bereits vom Server stammt oder lokal erzeugt
   * wurde.
   *
   * Liefert ein Promise auf die aktuelle Version der Entity.
   */
  speichern(entity) {
    // Stammt die Entity vom Server, oder wurde sie lokal erzeugt?
    if (entity['_links'] && entity['_links']['self']) {
      // Entity wurde schon einmal vom Server geladen, aktualisieren
      //$log.debug("RestService.speichern(): update", entity);

      return this.http
        .patch(
          entity['_links']['self']['href'],
          entity,
          { headers: { "If-Match": entity.etag } })
        .toPromise()
        .then(response => {
          //$log.debug("RestService.speichern(): update OK", response);

          // Aktualisierten Satz in eine Entity umwandeln
          return new entity.constructor(response);
        })
        .catch(this.fehlerBehandeln);

    } else {
      // Entity wurde noch nie auf dem Server gespeichert, erzeugen
      //$log.debug("RestService.speichern(): insert", entity);

      return this.http
        .post(`${this.API_PFAD}${entity.constructor.path}`, entity)
        .toPromise()
        .then(response => {
          //$log.debug("RestService.speichern(): insert OK", response);

          // Neuen Satz in eine Entity umwandeln
          return new entity.constructor(response['data']);
        })
        .catch(this.fehlerBehandeln);
    }
  };


  /**
   * Zeigt den Fehlercode in einem Toast und liefert ein
   * zurückgewiesenes Promise.
   */
  fehlerBehandeln(response) {
    this.snackbar.open(`Fehler ${response.status}`);
    console.error(response);
    return of({});
  }


  /**
   * Ersetzt in den Response-Daten rekursiv alle _embedded-Objekte durch ihre Inhalte.
   */
  embeddedAufloesen(obj) {
    let embedded;

    if (isArray(obj)) {
      // Arrayelemente umstrukturieren
      obj.forEach(this.embeddedAufloesen);

    } else if (isObject(obj) && (embedded = obj._embedded)) {
      // Inhalte von _embedded in diesem Objekt platzieren
      Object.keys(embedded).forEach(k => {
        obj[k] = embedded[k];
        this.embeddedAufloesen(obj[k]);
      });
      delete obj._embedded;
    }

    return obj;
  }


  /**
   * Ersetzt in den Request-Daten alle Entity-Objekte durch ihre self-Links.
   */
  entitiesVerlinken(obj) {
    if (isArray(obj)) {
      // In Arrayelementen ersetzen
      obj.forEach(this.entitiesVerlinken);

    } else if (isObject(obj)) {
      // Verlinkte Objekte suchen und durch ihre self-Links ersetzen
      Object.keys(obj).forEach(k => {
        if (obj[k] && obj[k]._links && obj[k]._links.self) {
          // Templates aus Link entfernen
          obj[k] = obj[k]._links.self.href.replace(/\{.*\}$/, "");
        }
      });
    }

    return obj;
  }


  // embeddedAufloesen() automatisch auf jede Response anwenden, _nachdem_
  // AngularJS sie von einem JSON-String in ein Objekt umgewandelt hat
  //$http.defaults.transformResponse.push(embeddedAufloesen);

  // entitiesVerlinken() vor dem Absenden automatisch auf jeden Request anwenden,
  // _bevor_ AngularJS ihn in einen JSON-String umwandelt
  //$http.defaults.transformRequest.unshift(requestData => {
  //  return entitiesVerlinken(angular.copy(requestData));
  //});

}
