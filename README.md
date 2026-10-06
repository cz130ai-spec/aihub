# AIHub

AIHub ist ein responsives Webprojekt für eine Sammlung alltagstauglicher KI-Werkzeuge. Version 1 enthält eine Landingpage, eine durchsuchbare Toolbox, Tool-Detailansichten und eine Preisseite. Die Werkzeuge zeigen bewusst den Stand einer **lokalen Demo**: Es werden keine externen KI-Dienste, Konten oder Zahlungen vorgetäuscht.

## Lokal starten

Voraussetzung: Node.js 20.19+ oder 22.12+ sowie pnpm 10+.

```bash
pnpm install
pnpm dev
```

Die von Vite angezeigte lokale Adresse im Browser öffnen. Einen Produktions-Build erzeugst du mit `pnpm build`; lokal ansehen kannst du ihn danach mit `pnpm preview`.

## Was in V1 funktioniert

- Responsive Startseite, Navigation, mobile Menüansicht und Preisseite.
- Toolbox mit Suche, Kategorien und acht einzelnen Tool-Ansichten.
- **Text verbessern:** einfacher lokaler Formatierungsvorschlag, kein KI-Modell.
- **Zusammenfassen:** verwendet den Anfang der Eingabe als sichtbaren Demo-Platzhalter.
- **Übersetzen:** zeigt die Eingabe mit deutlichem Hinweis, dass keine Übersetzung stattfindet.
- **E-Mail-Generator:** erstellt eine lokale Vorlage mit Betreff und Platzhaltern.
- **Quizgenerator:** stellt allgemeine Lernfragen als Ausgangspunkt bereit.
- **Datei-Zusammenfassung:** liest TXT- und MD-Dateien lokal; PDF-Textextraktion ist noch nicht integriert.
- **Bild-zu-Text:** Upload-Auswahl ist vorbereitet; OCR ist noch nicht integriert.
- **Lebenslauf-Helfer:** formatiert Eingaben als Vorschlag mit Hinweisen zur Ergänzung.
- Ergebnis kopieren, Tastenkürzel `Ctrl/Cmd + K` für die Toolbox und Eingabeprüfung.

## Architektur

- `index.html`: Einstiegspunkt, Metadaten und Schriftarten.
- `src/main.js`: Tool-Katalog, Hash-Routing, Ansichten, Interaktionen und klar abgegrenzte Demo-Logik.
- `src/style.css`: Designsystem und responsive Layouts.
- `package.json`: Vite-Entwicklungsserver und Build-Skripte.
- `public/aihub-avatar.png`: quadratisches Profilbild für Social-Media-Konten.
- GitHub Pages ist noch nicht konfiguriert; dieses Repository enthält zunächst nur Quellcode und Dokumentation.
- `marketing/LAUNCH_PLAN.md`: transparent gekennzeichnete Social-Media-Entwürfe und Launch-Checkliste.
- `marketing/PROFILE_COPY.md`: vorbereitete Kurz-Bios für TikTok, Instagram und YouTube.

## Veröffentlichungsvorbereitung

Erzeuge den Produktions-Build lokal mit `pnpm build`. Eine öffentliche Hosting-Verbindung ist noch nicht eingerichtet. Vor einer Veröffentlichung müssen Betreiber-/Datenschutzangaben, Hosting und die öffentliche URL geklärt und geprüft werden. Erst danach sollte ein GitHub-Pages- oder anderer Hosting-Workflow ergänzt werden.

Die lokale Vorschau enthält keine echte KI, Anmeldung oder Zahlungen. Die Website ist noch nicht öffentlich gehostet. Als Kontaktadresse ist `cz130.ai@gmail.com` eingetragen. Vor dem öffentlichen Launch fehlen noch vollständige und geprüfte Betreiber-/Datenschutzangaben, eine bestätigte Domain und Tests auf der echten Hosting-URL. Der Preis eines möglichen Plus-Angebots ist absichtlich offen.

Das CSS wird lokal ausgeliefert; externe Schrift-CDNs sind nicht erforderlich. Die lokale App setzt weder Cookies noch Analyse-Tracking ein. Der spätere Hosting-Anbieter kann eigene Verbindungsdaten verarbeiten; prüfe dessen Einstellungen und ergänze die Datenschutzhinweise entsprechend.

Die Tool-Beschreibungen und Metadaten liegen zentral im `tools`-Array. Ein Tool hat eine eigene URL unter `#/tool/<id>` und eine zentrale Demo-Verarbeitung in `mockResult` beziehungsweise `runTool`. Diese Stellen bilden den Übergang zu späteren Diensten. Für den nächsten Architektur-Schritt empfiehlt sich eine getrennte `services/aiClient.js`-Schnittstelle, damit UI und Anbieter austauschbar bleiben.

## Klare Grenzen der Demo

Die lokalen Ergebnisse sind **keine echte KI-Ausgabe**. Vor Veröffentlichung als KI-Produkt müssen UI und Website den jeweiligen Funktionsumfang und die verwendeten Anbieter ehrlich angeben. Hochgeladene TXT-/MD-Inhalte werden lokal im Browser gelesen; PDFs werden derzeit nicht verarbeitet.

## Nächste Schritte

1. **GitHub:** Das öffentliche Repository enthält die Projektdateien. Zugangsdaten gehören nicht in Git.
2. **Echte AI-API:** API-Anbieter und Modell auswählen; Schlüssel nur serverseitig als Umgebungsvariable speichern. Einen Server-Endpunkt mit Eingabevalidierung, Kostenlimits, Datenschutztext und Fehlerbehandlung ergänzen. Die Demo-Hinweise erst anpassen, wenn eine Funktion tatsächlich angeschlossen und geprüft ist.
3. **Authentifizierung:** Anbieter auswählen, Sitzungen und geschützte Bereiche serverseitig implementieren; Datenschutz, Löschung und Zugriffsschutz berücksichtigen.
4. **Stripe:** erst nach Einrichtung eines verlässlichen Backends Checkout-Sitzungen erzeugen. Abos serverseitig über verifizierte Webhooks synchronisieren; niemals geheime Stripe-Schlüssel im Browser hinterlegen.
5. **Dokumente und Bilder:** PDF-Textauslese und OCR mit Größen-/Formatlimits, transparenter Verarbeitung, Lade-/Fehlerzuständen und Tests ergänzen.
6. **Produktionsreife:** Datenschutz- und Nutzungsseiten, echtes Kontaktziel, Barrierefreiheit, Monitoring und passende Tests ergänzen. Preise, Kontingente und Anbieterkommunikation vor dem Launch verifizieren.

## Veröffentlichung

Vite kann den statischen Frontend-Build auf einem statischen Host ausliefern. Echte KI-Aufrufe, sichere Authentifizierung und Stripe benötigen zusätzlich ein Backend oder serverlose Funktionen. Zugangsdaten und Zahlungsschlüssel niemals in `src/` oder im Browser-Bundle speichern.

