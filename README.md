# Downloader-Android
[![Release](https://img.shields.io/github/v/release/sagin-pl/Downloader-Android)](https://github.com/sagin-pl/Downloader-Android/releases)
[![Project](https://img.shields.io/badge/project-SAGIN--PL-green)](https://github.com/sagin-pl)

Downloader to aplikacja na różne platformy umożliwiająca pobieranie zdjęć i filmów z popularnych platform takich jak Instagram, TikTok, Youtube.

#### SPIS TREŚCI
- [Wymagania](#wymagania)
- [Funkcje](#funkcje)
- [Instalacja](#instalacja)
- [Screenshots](#screenshots)
- [Changelog](#changelog)
- [Autorzy](#autorzy)

#### WYMAGANIA
- Android 5.0+
- Stałe połączenie z internetem

#### FUNKCJE
- Pobieranie filmu lub zdjęcia
- Podgląd przed pobraniem pliku (v0.9.2+)
- Możliwość udostępnienia filmu bez pobierania (v0.9.2+) </br>

#### INSTALACJA
Aby zainstalować aplikację najpierw trzeba pobrać plik .apk z zakładki [RELEASE](https://github.com/sagin-pl/Downloader-Android/releases). Po pobraniu należy plik otworzyć i włączyć opcję Nieznane Źródła jeżeli system o to poprosi. Po zainstalowaniu może pojawić się komunikat Play Protect, który będzie chciał odinstalować aplikację, jest to spowodowane niskim budżetem projektu, więc nie dodaliśmy naszej aplikacji do sklepu Google Play. Aplikacja jest jak najbardziej bezpieczna <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Trollface_non-free.png/220px-Trollface_non-free.png" width="auto" height="30px">, należy kliknąć "ZAINSTALUJ MIMO TO" lub "INSTALL ANYWAY"

# Screenshots
#### ALPHA
<img src='https://imgur.com/byFWZbB.jpg' height='480' width='240'/>  <img src='https://imgur.com/XqjTsLv.jpg' height='480' width='240'/>

#### BETA
<img src='https://imgur.com/CGI5MIk.jpg' height='480' width='240'/>  <img src='https://imgur.com/ImJBxKA.jpg' height='480' width='240'/>

#### RELEASE
<img src='https://imgur.com/CGI5MIk.jpg' height='480' width='240'/>  <img src='https://imgur.com/G2ToLFR.jpg' height='480' width='240'/>

# Changelog
#### ALPHA
- 02.02.2022 - Ekran ładowania
- 03.02.2022 - Pierwsze elementy GUI, Sprawdzanie czy API jest dostępne
- 04.02.2022 - Podgląd filmu przed pobraniem, przyciski do pobrania samego dźwięku i dźwięku z filmem
- 06.02.2022 - Przyciski nawigacji do przechodzenia między ekranem pobierania, a ekranem przycinania filmu
- 23.02.2022 - Rozpoznawanie platformy z linku, wysyłanie linku do API
- 16.03.2022 - Wstępna mechanika pobierania, pierwszy pobrany TikTok
- 20.03.2022 - Nowy odtwarzacz podglądu, dodane czyszczenie formularza
- 24.03.2022 - Rework aplikacji, zrobione wstępne skalowanie, alert gdy API nie jest dostępne, podstawowe animacje
- 29.03.2022 - Dopracowane pobieranie, animacja progress bara, optymalizacja kodu
- 30.03.2022 - Dodany przycisk do automatycznego wklejenia linku, rezygnacja z przycinania filmu, usunięcie nawigacji
- 30.03.2022 - Wypuszczenie wersji Alpha-v0.3.3

#### BETA
- 31.03.2022 - Rework aplikacji, zmiana całego wyglądu aplikacji
- 08.04.2022 - Poprawione skalowanie pod różne urządzenia, dodane wsparcie dla telefonów Android 5.0+, dodana opcja wyeksportowania linku (Skopiowanie, Otwarcie w przeglądarce), nowe animacje, poprawione pobieranie, rozpoczęcie pracy nad progress barem, dodane wsparcie dla postów z instagrama z więcej niż jednym zdjęciem, nowa mechanika alertów, czyszczenie formularza
- 13.04.2022 - Dokończony progressbar z przyciskami (Start, Pause, Stop) kontrolującymi pobieranie
- 14.04.2022 - **<span style="color: red;">FATALNY BŁĄÐ, PODCZAS POBIERANIA Z SERWERÓW POSTAWIONYCH NA NGINX (W TYM NASZYM) JEST BŁĄD 416</span>**
- 15.04.2022 - Usunięcie progressbara pobierania pliku na urządzenie, dodany komunikat na początku i końcu pobierania
- 15.04.2022 - Wypuszczenie wersji Beta-v0.9.2

#### RELEASE
- 16.04.2022 - Przywrócenie progressbara pobierania pliku, tym razem nie korzysta on z gotowej biblioteki, tylko progress jest obliczany ręcznie (Wielkość pliku na serwerze / Wielkość zapisanego pliku)
- 17.04.2022 - Dodano galerię do podglądu zdjęć z Instagrama, dodano opcję udostępniania linku, dodano ikonę
- 18.04.2022 - **FATALNY BŁĄD, PODCZAS POBIERANIA ZE SŁABYM ŁĄCZEM INTERNETOWYM MOŻE WYSTĄPIĆ PROBLEM Z PROGRESSBAREM POBIERANIA PLIKU NA URZĄDZENIE, POWÓD: POBIERANIE PLIKU ZACZYNA SIĘ SZYBCIEJ NIŻ APLIKACJA POBIERZE WIELKOŚĆ PLIKU Z SERWERA**
- 19.04.2022 - **PRÓBA NAPRAWIENIA BŁĘDU NIE POWIODŁA SIĘ, ROZPOCZĘCIE POBIERANIA DOPIERO PO POBRANIU WIELKOŚCI PLIKU Z SERWERA W 3/10 PRZYPADKÓW APLIKACJA NIE ROZPOCZYNA POBIERANIA**
- 20.04.2022 - **OCZEKIWANIE NA AKTUALIZACJĘ API, ABY ZMIEJSZYĆ CZAS OCZEKIWANIA NA POBRANIE WIELKOŚCI PLIKU, ROZMIAR BĘDZIE ZWRACANY RAZEM Z LINKIEM**
- 20.04.2022 - Wypuszczenie wersji Release-v1.0.0
- 21.04.2022 - Hotfix 1: Naprawione nakładanie się na siebie podglądów, w efekcie nie można było odtworzyć podglądu
- 22.04.2022 - Hotfix 2: Poprawiona wydajność animacji podczas wyświetlania galerii jako podglądu, ale dalej nie jest idealnie
- 23.04.2022 - Hotfix 3: Zmiana splash screena na lepszą jakość

# Autorzy
- [@onhq11](https://github.com/onhq11)
	- Discord: onhq#8799
