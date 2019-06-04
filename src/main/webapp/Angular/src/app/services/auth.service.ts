import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import {catchError, finalize, map} from "rxjs/internal/operators";
import {Observable, of} from "rxjs/index";
import {isObject} from "rxjs/internal/util/isObject";
import {isArray} from "rxjs/internal/util/isArray";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  LOGIN = "login";
  LOGOUT = "logout";
  ME = "api/me";
  TOKEN_HEADER = "x-auth-token";
  SESSION_COOKIE = "SESSION";
  OPTIONS;

  constructor(private http: HttpClient,
              private cookies: CookieService) { }

  /**
   * Entity der angemeldeten Benutzerin, oder undefined, wenn niemand angemeldet ist.
   */
  private user;

  getUser() {
    return this.user
  };

  refreshUser() {
    return this.http
      .get("http://localhost:8081/api/me",  this.OPTIONS)
      .pipe(map(v => {
        this.user = v;
      }));
  }

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
   * Setzt die Authentifizierungsdaten für einen Benutzer oder löscht sie,
   * wenn kein Argumente angegeben sind.
   */
  authentifizieren(user_, token) {
    user_ = this.embeddedAufloesen(user_);
    this.user = user_;
    this.OPTIONS = {
      headers: new HttpHeaders({
        [this.TOKEN_HEADER]: token
      })
    };
  };

  /**
   * Versucht den angegebenen Benutzer am Server anzumelden und liefert
   * ein Promise auf das Response-Objekt.
   */
  login(username, password) {
    return this.http
      .post(this.LOGIN, {}, Object.assign({ params: { username: username, password: password } }, this.OPTIONS))
      .toPromise()
      .then(response => {
        //$log.debug(`AuthService.login("${username}"): OK`, response.data, response.headers(TOKEN_HEADER));

        console.log(response);
        this.authentifizieren(response['data'], response['headers'](this.TOKEN_HEADER));
        return Promise.resolve(response);
      })
      .catch(response => {
        //$log.error("AuthService.login(): Fehler", response);

        this.authentifizieren(undefined, undefined);
        return Promise.reject(response);
      });
  };


  /**
   * Meldet den gerade angemeldeten Benutzer wieder vom Server ab und
   * ein Promise auf das Response-Objekt.
   */
  logout() {
    return this.http
      .post(this.LOGOUT, {})
      .pipe(
        catchError(() => {
          return of(null);
        }),
        map(() => {
          return of(true);
        }),
        finalize(() => {
          this.authentifizieren(undefined, undefined);
        })
      );
  };


  /**
   * Liefert ein Promise auf ein Objekt mit den wichtigsten Informationen
   * zum angemeldeten Benutzer.
   *
   * Wenn ein Session-Cookie vorhanden ist, wird vorher versucht, sich damit
   * zu authentifizieren.
   */
  istAngemeldet(): Observable<any> {
    if (this.user) {
      return of(this.user);
    } else {
      let token = this.cookies.get(this.SESSION_COOKIE);

      if (token) {
        this.authentifizieren(undefined, token);
        return this.http
          .get(this.ME, this.OPTIONS)
          .pipe(
            catchError((e => {
              this.authentifizieren(undefined, undefined);
              return of(null);
          })),
            map(response => {
              this.authentifizieren(response, token);
              return this.user;
          }));

      } else {
        return of(null);
      }
    }
  };

}
