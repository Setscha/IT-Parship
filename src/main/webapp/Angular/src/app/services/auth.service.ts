import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import {catchError, map} from "rxjs/internal/operators";
import {Observable, of} from "rxjs/index";

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

  /**
   * Setzt die Authentifizierungsdaten für einen Benutzer oder löscht sie,
   * wenn kein Argumente angegeben sind.
   */
  authentifizieren(user_, token) {
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
      .toPromise()
      .then(response => {
        //$log.debug("AuthService.logout(): OK");
        return Promise.resolve(response);
      })
      .catch(response => {
        //$log.error("AuthService.logout(): Fehler", response);
        return Promise.reject(response);
      })
      .finally(() => {
        this.authentifizieren(undefined, undefined);
      });
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
      //$log.debug("AuthService.istAngemeldet(), user:", user);
      return of(this.user);

    } else {
      let token = this.cookies.get(this.SESSION_COOKIE);

      if (token) {
        //$log.debug("AuthService.istAngemeldet(), token:", token);

        this.authentifizieren(undefined, token);
        return this.http
          .get(this.ME, this.OPTIONS)
          .pipe(
            catchError((e => {
            //$log.debug("AuthService.istAngemeldet(), kein user");

            this.authentifizieren(undefined, undefined);
            return of(null);
          })),
            map(response => {
            console.log(response);
            this.authentifizieren(response, token);
            return this.user;
          }));

      } else {
        //$log.debug("AuthService.istAngemeldet(), kein user");

        return of(null);
      }
    }
  };

}
