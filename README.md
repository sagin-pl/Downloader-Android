# Downloader-Android
[![Release](https://img.shields.io/badge/beta-Beta--v0.9.2-blue)](https://github.com/sagin-pl/Downloader-Android/releases/tag/Beta-v0.9.2)
[![Project](https://img.shields.io/badge/project-SAGIN--PL-green)](https://github.com/sagin-pl)

Downloader to aplikacja na różne platformy umożliwiająca pobieranie zdjęć i filmów z popularnych platform takich jak Instagram, TikTok, Youtube.

#### SPIS TREŚCI
- [Wymagania](https://github.com/sagin-pl/Downloader-Android/tree/Release-v1.0.0?readme=1#wymagania)
- [Funkcje](https://github.com/sagin-pl/Downloader-Android/new/Release-v1.0.0?readme=1#funkcje)
- [Instalacja](https://github.com/sagin-pl/Downloader-Android/new/Release-v1.0.0?readme=1#instalacja)
- [Screenshots](https://github.com/sagin-pl/Downloader-Android/new/Release-v1.0.0?readme=1#screenshots)
- [Changelog](https://github.com/sagin-pl/Downloader-Android/new/Release-v1.0.0?readme=1#changelog)

#### WYMAGANIA
- Android 5.0+
- Stałe połączenie z internetem

#### FUNKCJE
- Pobieranie filmu lub zdjęcia
- Podgląd przed pobraniem pliku (v0.9.2+)
- Możliwość udostępnienia filmu bez pobierania (v0.9.2+) </br>

#### INSTALACJA
Aby zainstalować aplikację najpierw trzeba pobrać plik .apk z zakładki [RELEASE](https://github.com/sagin-pl/Downloader-Android/releases). Po pobraniu należy plik otworzyć i włączyć opcję Nieznane Źródła jeżeli system o to poprosi. Po zainstalowaniu może pojawić się komunikat Play Protect, który będzie chciał odinstalować aplikację, jest to spowodowane niskim budżetem projektu, więc nie dodaliśmy naszej aplikacji do sklepu Google Play. Aplikacja jest jak najbardziej bezpieczna, należy kliknąć "ZAINSTALUJ MIMO TO" lub "INSTALL ANYWAY"

# Screenshots
#### ALPHA
<img src='https://imgur.com/byFWZbB.jpg' height='480' width='240'/>  <img src='https://imgur.com/XqjTsLv.jpg' height='480' width='240'/>

#### BETA
<img src='https://imgur.com/CGI5MIk.jpg' height='480' width='240'/>  <img src='https://imgur.com/ImJBxKA.jpg' height='480' width='240'/>

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
- 14.04.2022 - **FATALNY BŁĄÐ, PODCZAS POBIERANIA Z SERWERÓW POSTAWIONYCH NA NGINX (W TYM NASZYM) JEST BŁĄD 416**
- 15.04.2022 - Usunięcie progressbara pobierania pliku na urządzenie, dodany komunikat na początku i końcu pobierania
- 15.04.2022 - Wypuszczenie wersji Beta-v0.9.2
