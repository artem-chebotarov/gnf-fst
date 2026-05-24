# Gnf-fst — Navigation für Fernseher

**Gianna Navigation Focus for Samsung Tizen TV (gnf-fst)** ist eine kleine JavaScript-Klasse mit weniger als 3 KB Größe, die die Navigation in TV-Anwendungen über die Fernbedienung vereinfacht.

Die Bibliothek besitzt keine Abhängigkeiten und kümmert sich ausschließlich um die Navigation. Styling, Rahmen, Schriftarten oder Animationen werden nicht verwaltet.

Das Projekt wurde unter Berücksichtigung der Barrierefreiheit entwickelt, insbesondere für blinde Nutzer. Sie müssen keine `aria-*` Attribute manuell hinzufügen, da die Bibliothek diese automatisch erstellt.

> ⚠️ Hinweis: Die Bibliothek wurde speziell für Samsung Tizen TV entwickelt.  
> Möglicherweise funktioniert sie auch auf LG-Fernsehern. Android TV wird nur in PWA-Anwendungen unterstützt.

---

# Struktur des Markups

Für eine korrekte Navigation ist die Struktur des Interfaces wichtig.

Die Struktur besteht aus:

- Container
- Zeilen
- Spalten

Selbst bei einer einfachen vertikalen Liste muss jede Zeile mindestens eine Spalte enthalten.

## HTML-Beispiel

```html
<div id="container">

    <div>
        <div>Erste Spalte</div>
        <div>Zweite Spalte</div>
    </div>

    <div>
        <div>Erste Spalte</div>
        <div>Zweite Spalte</div>
    </div>

</div>
```

Es können beliebige HTML-Elemente verwendet werden, nicht nur `div`.

---

# Methoden

## init()

Initialisiert einen Container und fügt die notwendigen Attribute hinzu.

### Beispiel

```js
const gnf = new Gnffst();

gnf.init("#container");
```

Mehrere Container können gleichzeitig initialisiert werden.

```js
gnf.init("#container, #menu, #settings");
```

---

## switch()

Aktiviert einen Container für die Navigation.

Sollte normalerweise direkt nach `init()` aufgerufen werden.

### Beispiel

```js
gnf.switch("#container");
```

---

## go()

Bewegt den Fokus innerhalb des Containers.

Unterstützte Richtungen:

- `up`
- `down`
- `left`
- `right`

### Beispiel

```js
gnf.go("down");
gnf.go("up");
gnf.go("left");
gnf.go("right");
```

Die Methode sollte idealerweise in `keydown`- oder `keyup`-Events verwendet werden.

---

## addCallbacks()

Fügt Callback-Funktionen für die Grenzen des Containers hinzu.

Die Funktionen werden ausgelöst, wenn der Benutzer versucht, den Container zu verlassen.

### Beispiel

```js
gnf.addCallbacks("#container", {
    left: () => console.log("left edge"),
    right: () => console.log("right edge"),
    up: () => console.log("top edge"),
    down: () => console.log("bottom edge"),
});
```

Der Callback erhält die aktuelle Klasseninstanz.

### Beispiel

```js
gnf.addCallbacks("#container", {
    up: (t) => console.log(t.focus.id)
});
```

---

# Funktionsweise

Die Bibliothek wurde in reinem JavaScript geschrieben und benötigt keine externen Abhängigkeiten.

Ihre Hauptaufgabe besteht darin, eine einfache Navigation in TV-Oberflächen bereitzustellen.

Wenn ein Container aus dem DOM entfernt wird, werden die zugehörigen Callback-Funktionen dank `WeakMap` automatisch entfernt.

---

# Barrierefreiheit

Die Bibliothek fügt automatisch folgende Attribute hinzu:

- `tabindex`
- `aria-label`
- `aria-posinset`
- `aria-setsize`

Dadurch wird die Unterstützung für Screenreader verbessert.

---

# Abschluss

Gnf-fst hilft dabei, schnell barrierefreie TV-Oberflächen mit Fernbedienungsnavigation zu erstellen.

Mit freundlichen Grüßen  
Artem Chebotarov