# LittleSearchApp

## Autor
**Robin Lassak**

## O aplikaci
LittleSearchApp je webová aplikace vytvořená jako vstupní test pro společnost **INIZIO Internet Media s.r.o.** Aplikace umožňuje uživatelům vyhledávat na první stránce Google vyhledávače pomocí klíčových slov a stahovat výsledky v různých formátech na jejich počítač.

## Funkcionalita

### Hlavní funkce
- **Vyhledávání na Google**: Aplikace využívá Google Custom Search API pro vyhledávání na první stránce Google
- **Export výsledků**: Uživatelé mohou stáhnout výsledky ve třech formátech:
  - **CSV** - pro tabulkové zpracování
  - **JSON** - pro programové zpracování
  - **XML** - pro strukturované datové formáty
- **Responzivní design**: Aplikace je plně responzivní a funguje na všech zařízeních

### Technické detaily
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: PHP 7.4+
- **Styling**: Bootstrap 5.3.6
- **API**: Google Custom Search API
- **Architektura**: RESTful API komunikace mezi frontendem a backendem

## Struktura projektu

```
LittleSearchApp/
├── index.html          # Hlavní HTML stránka s uživatelským rozhraním
├── script.js           # JavaScript logika pro frontend
├── search.php          # PHP backend pro komunikaci s Google API
├── login.php           # Konfigurační soubor s API klíči
├── test_api.php        # Testovací skript pro ověření funkčnosti API
├── index.css           # Vlastní CSS styly
├── package.json        # Node.js konfigurace a závislosti
├── API_KEY.txt         # Dokumentace API klíčů
└── Funkčnost mé aplikace 📱.mp4  # Demonstrační video
```

## Jak aplikace funguje

### 1. Uživatelské rozhraní
- Uživatel zadá klíčové slovo do textového pole
- Vybere požadovaný formát exportu (CSV, JSON, XML)
- Klikne na tlačítko "Download"

### 2. Frontend zpracování (script.js)
- Validace vstupních dat
- Odeslání požadavku na backend pomocí Fetch API
- Zpracování odpovědi a generování souboru v požadovaném formátu
- Automatické stažení souboru do počítače uživatele

### 3. Backend zpracování (search.php)
- Příjem JSON požadavku z frontendu
- Komunikace s Google Custom Search API
- Zpracování a filtrování výsledků
- Vrácení strukturovaných dat ve formátu JSON

### 4. Formátování dat
- **CSV**: Tabulkový formát s hlavičkou (Title, Link, Snippet)
- **JSON**: Strukturovaný JSON objekt s poli title, link, snippet
- **XML**: XML dokument s elementy pro každý výsledek

## Nasazení a spuštění

### Automatické nasazení na hosting

Projekt využívá **GitHub Actions** pro automatické nasazení na hosting Endora. Při každém push do `master` větve se aplikace automaticky nasadí na server.

#### Konfigurace GitHub Secrets
Pro správné fungování automatického nasazení je potřeba nastavit následující secrets v GitHub repozitáři:
- `FTP_SERVER` - FTP server adresa
- `FTP_USERNAME` - FTP uživatelské jméno  
- `FTP_PASSWORD` - FTP heslo
- `FTP_DIR` - Cesta na serveru

#### Nasazení
1. Push změn do `master` větve
2. GitHub Actions automaticky spustí deploy workflow
3. Aplikace se nasadí na Endora hosting

### Lokální vývoj

#### Požadavky
- PHP 7.4 nebo vyšší
- Webový server (Apache, Nginx, nebo PHP built-in server)
- Google Custom Search API klíč
- Google Custom Search Engine ID

#### Kroky instalace pro lokální vývoj

1. **Stažení projektu**
   ```bash
   git clone https://github.com/RobinLassak/LittleSearchApp.git
   cd LittleSearchApp
   ```

2. **Konfigurace API klíčů**
   - Vytvořte Google Custom Search Engine na https://cse.google.com/
   - Získejte API klíč z Google Cloud Console
   - Upravte soubor `login.php` s vašimi klíči:
   ```php
   return [
       "apiKey" => "VÁŠ_API_KLÍČ",
       "cseId" => "VAŠE_CSE_ID"
   ];
   ```

3. **Spuštění aplikace**
   ```bash
   # Pomocí PHP built-in serveru
   php -S localhost:8000
   
   # Nebo umístěte soubory do vašeho webového serveru
   ```

4. **Testování**
   - Otevřete `test_api.php` v prohlížeči pro ověření funkčnosti API
   - Nebo navštivte `http://localhost:8000` pro použití aplikace

## API Dokumentace

### Endpoint: search.php
- **Metoda**: POST
- **Content-Type**: application/json
- **Vstupní data**:
  ```json
  {
    "keyword": "hledané klíčové slovo"
  }
  ```
- **Výstupní data**:
  ```json
  [
    {
      "title": "Název výsledku",
      "link": "https://example.com",
      "snippet": "Popis výsledku..."
    }
  ]
  ```

## Bezpečnostní opatření

- **CORS**: Aplikace podporuje cross-origin requests
- **Validace vstupů**: Kontrola prázdných klíčových slov
- **Error handling**: Komplexní zpracování chyb z Google API
- **XSS ochrana**: Escapování speciálních znaků v XML výstupu

## Testování

Aplikace obsahuje testovací skript `test_api.php`, který ověřuje:
- Funkčnost API endpointu
- Správné zpracování chyb
- Validitu vrácených dat

## Technologie a knihovny

- **Bootstrap 5.3.6**: Responzivní UI framework
- **Google Custom Search API**: Vyhledávací engine
- **PHP cURL**: HTTP komunikace
- **Fetch API**: Asynchronní komunikace na frontendu
- **Jest**: Testovací framework (v package.json)

## CI/CD Pipeline

- **GitHub Actions**: Automatické nasazení na hosting
- **FTP Deploy Action**: Nasazení na Endora server
- **Automatické spouštění**: Při push do master větve
- **Bezpečnost**: Citlivé údaje uloženy v GitHub Secrets

## Licence
© 2025 Robin Lassak. Všechna práva vyhrazena.

## Kontakt
- **Autor**: Robin Lassak
- **Portfolio**: https://robin-lassak.cz/
- **GitHub**: https://github.com/RobinLassak/LittleSearchApp

---

*Tato aplikace byla vytvořena jako vstupní test pro společnost INIZIO Internet Media s.r.o.*
