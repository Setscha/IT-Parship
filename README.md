# Spring Boot+AngularJS-Projektvorlage für den SEW-Unterricht in MEDT an der HTL3R

Basiert auf der [Spring Boot-Konfiguration für den SEW-Unterricht](https://github.com/undecaf/sew-medt#spring-boot-konfiguration-f%C3%BCr-den-sew-unterricht-in-medt-an-der-htl3r)
und enthält zusätzliche Features:

## Spring Boot
+ <code>Main</code>-Klasse, macht das das Projekt lauffähig
+ Serverseitige Paketstruktur <code>server.models</code> und <code>server.repositories</code>
+ H2-Datenbank <code>db/datenbank</code>, wird bei jedem Start neu erzeugt und neu von <code>data.sql</code>
initialisiert
+ REST-API auf Pfad <code>http://127.0.0.1:8080/api</code>
+ Skelett für Server-Test

## AngularJS
+ Clientseitige Verzeichnisstruktur für Komponenten, Services, Factories und Filter
+ AngularJS, UI-Router, Angular Material mit Icons und Fonts und Moment.js lokal verfügbar
+ Vordefinierte Komponenten, Services und Factories
+ AngularJS-Musterprojekt, das einen Hinweistext ausliefert
