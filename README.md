# Places
## Idee
Die Web-App "Places" ermöglicht es zu visualisieren welche Länder man bereits besucht hat.\
Um einer Nutzerverwaltung zu implementieren, können Nutzer sich einen Account erstellen und sich bei der Anwendung anmelden. Dort ist es nun möglich Länder, die man bereits besucht hat in einer Suchleiste zu suchen und auszuwählen. Ausgewählte Länder werden auf einer Weltkarte farblich markiert.\
Außerdem lassen sich aufgrund der Eingabedaten Statistiken über die Reisen des Nutzers generieren, beispielsweise wie viele Länder der Welt der Nutzer bereits besucht hat. Diese kann der Nutzer sich anzeigen lassen\
## Mehrwert
So erhält man eine praktische visuelle Übersicht über Länder, die man bereits besucht hat. Die Statistiken können interessante Einblicke in das eigene Reiseverhalten bieten.

## Anforderungen
### Client
- Landing Page mit Screenshot der Anwendung und kurzer Beschreibung
- Login Page zur Eingabe der Benutzerdaten, Verlinkung auf Seite zur Registrierung und zum Passwort zurücksetzen
- Registrierungsseite zur Erstellung eines Accounts
- Seite zum Zurücksetzen des Passworts (Mail mit Link wird an die eingegebene E-Mail-Adresse gesendet)
- Home Page mit Weltkarte (in Globusform) und Suchleiste
- Seite mit Statistiken, z.B. wie viele Länder der Welt bereits besucht wurden
- Header / Navbar mit Login / Logout Button (je nach Zustand)

### Server
- Sendung der Nutzeranfragen zur An- / Abmeldung an Supabase zur Authentifizierung
- Speichern der besuchten Länder in der Datenbank 

## Technologien
Als Technologien werden in diesem Projekt SvelteKit, Supabase, DaisyUI und Mapbox verwendet.

### Svelte
SvelteKit ist ein Framework, das auf dem Frontend - Framework Svelte basiert. Mit SvelteKit lassen sich vollständige, robuste und performante Web - Apps bauen. Server und Client können in einem Projekt implementiert werden.\
Im ```routes``` - Ordner des Projekts werden die Routen durch die Benennung der Unterordner definiert. In jedem Ordner befindet sich eine ```+page.svelte``` - Datei, die TypeScript und Svelte - Code enthält. Svelte - Code besteht überwiegend aus HTML - Code und kann beispielsweise durch if - Verzweigungen angereichert werden.\
Der Unterordner ```api``` enthält für jede Route des Servers ebenfalls einen Unterordner, welcher immer eine ```+server.ts``` - Datei enthält. In dieser werden die ```GET/POST``` - Requests gehandelt und Zugriffe auf die Datenbank ausgeführt.

### Supabase
Supabase stellt neben einer Datenbank zusätzlich Möglichkeiten zur Nutzerauthentifizierung bereit. 

### DaisyUI
Bei DaisyUI handelt es sich um ein UI - Framework, dass auf TailwindCSS aufbaut. Der TailwindCSS - Code für verschiedene Komponenten lässt sich aus der Dokumentation kopieren und jeweils als Klasse der HTML - Datei hinzufügen. Außerdem kann man eigene TailwindCSS - Klassen hinzufügen.

### Mapbox
Um eine Weltkarte anzuzeigen wird Mapbox GL JS verwendet.

## App-Nutzung
Clone respository\
Run ``` npm install```\
Run ``` npm run dev```\
App runs on ``` http://localhost:5173```
