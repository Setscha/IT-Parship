import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { MatSnackBar } from "@angular/material";
import { Seite } from "../models/seite";
import { isArray } from "rxjs/internal/util/isArray";
import { isObject } from "rxjs/internal/util/isObject";
import { catchError, map } from "rxjs/internal/operators";
import { of } from "rxjs/index";

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
      .pipe(
        catchError(error => this.fehlerBehandeln(error)),
        map(response => {
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
      }));
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
          data = this.embeddedAufloesen(data);
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
    if (entity['_links'] && entity['_links']['self']) {
      let url = entity['_links']['self']['href'];
      if(url.includes('{?projection}')){
        url = url.replace('{?projection}', '');
      }
      let headers = new HttpHeaders({'If-Match': '0'});
      return this.http
        .delete(url, { headers })
        .pipe(catchError(error => this.fehlerBehandeln(error)));
    } else {
      // Entity stammt nicht vom Server und kann dort nicht gelöscht werden
      this.fehlerBehandeln({ status: 404, statusText: "Not found", data: {} });
      return of(null);
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
    let etag = 0;
    if(entity.etag !== undefined){
      etag = entity.etag;
    }



    console.log(entity.kompetenz);
    // Stammt die Entity vom Server, oder wurde sie lokal erzeugt?
    if (entity['_links'] && entity['_links']['self']) {
      // Entity wurde schon einmal vom Server geladen, aktualisieren
      //$log.debug("RestService.speichern(): update", entity);

      let headers = new HttpHeaders({'If-Match': etag});
      console.log(this.entitiesVerlinken(entity));
      console.log(entity);
      return this.http
        .patch(
          entity['_links']['self']['href'].replace(/\{.*\}$/, ""),
          this.entitiesVerlinken(entity),{ headers: headers })
        .pipe(
          catchError(error => this.fehlerBehandeln(error)),
          map(response => {
            //$log.debug("RestService.speichern(): update OK", response);
            response = this.embeddedAufloesen(response);
            // Aktualisierten Satz in eine Entity umwandeln
            return new entity.constructor(response);
          })
        );

    } else {
      // Entity wurde noch nie auf dem Server gespeichert, erzeugen
      //$log.debug("RestService.speichern(): insert", entity);

      return this.http
        .post(`${this.API_PFAD}${entity.constructor.path}`, entity)
        .pipe(
          map(response => {
            //$log.debug("RestService.speichern(): insert OK", response);
            response = this.embeddedAufloesen(response);
            // Neuen Satz in eine Entity umwandeln
            return new entity.constructor(response);
          }),
          catchError(error => this.fehlerBehandeln(error))
        );
    }
  };


  /**
   * Zeigt den Fehlercode in einem Toast und liefert ein
   * zurückgewiesenes Promise.
   */
  fehlerBehandeln(response) {
    this.snackbar.open(`Fehler: ${response.statusText}`, null, {duration: 2000});
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
      obj.forEach(e => this.embeddedAufloesen(e));

    } else if (isObject(obj) && (embedded = obj['_embedded'])) {
      // Inhalte von _embedded in diesem Objekt platzieren
      Object.keys(embedded).forEach(k => {
        obj[k] = embedded[k];
        this.embeddedAufloesen(obj[k]);
      });
      delete obj['_embedded'];
    }

    return obj;
  }


  /**
   * Ersetzt in den Request-Daten alle Entity-Objekte durch ihre self-Links.
   */
  entitiesVerlinken(obj, rekursiv) {
    //console.log(obj);
    if(obj !== undefined){
      if (obj._links && obj._links.self && rekursiv) {
        // Objekt durch Link ersetzen und Templates aus Link entfernen
        return obj._links.self.href.replace(/\{.*\}$/, "");

      } else if (isArray(obj)) {
        // Arrayelemente ersetzen
        obj.forEach((e, i) => obj[i] = this.entitiesVerlinken(e, true));

      } else if (isObject(obj)) {
        // Properties ersetzen
        Object.keys(obj).forEach(k => obj[k] = this.entitiesVerlinken(obj[k], true));
      }
    }
    return obj;

  }

}
