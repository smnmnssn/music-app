## Versionshantering med Git

Projektet använder **Git** med följande struktur för grenar:

- `main` – Stabil produktionsversion
- `development` – Aktiv utvecklingsmiljö
- `features` – Nya funktioner byggs här

---

### Arbetsflöde

1. **Utveckla en ny funktion:**
   ```bash
   git checkout -b features
   ```
2. **Utveckla funktion, spara och pusha:**
   ```bash
   git add .
   git commit -m "Lägg till ny funktion"
   git push origin features
   ```
3. **Merge feature in i development när du är klar:**
   ```bash
   git switch development
   git merge features
   git push origin development
   ```
4. **Merge development till main när det är färdigtestat:**
   ```bash
   git switch main
   git merge development
   git push origin main
   ```

## Hantera Merge-konflikter i Git

När två grenar har ändrat samma rad i samma fil kan en **merge-konflikt** uppstå. Så här löser du det:

---

### 1. Identifiera konflikten

När du försöker göra en merge och det blir konflikt, ser du detta:

```bash
CONFLICT (content): Merge conflict in filnamn.js
Automatic merge failed; fix conflicts and then commit the result.
```

### 2. Öppna filen och hitta markeringen

```bash
<<<<<<< HEAD
kod från den aktuella grenen
=========
kod från grenen du försöker merga in
>>>>>>> feature
```

### 3. Lös konflikten

Du ska manuellt välja vilken kod du vill behålla – eller kombinera det bästa från båda. Sen tar du bort konfliktmarkeringarna:

```bash
 "<<<<<<<"
 "========="
 ">>>>>>>"
```

### 4. Spara och commit:a

```bash
git add filnamn.js
git commit -m "Löst merge-konflikt i filnamn.js"

```
