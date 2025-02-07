# Jak aktualizować stronę

Tutorial podzielony jest na dwie sekcje - pierwsza opisuje proces zmiany i zapisywania pliku z danymi, druga sam format pliku i jego zasady.
Starałem się tu zamieścić jak najwięcej informacji, więc przepraszam jeśli są przytłaczające. Nie bój się próbować i eksperymentować, bo zmiany
można zawsze cofnąć i jest ich historia, której nie da się usunąć.

## Zapisywanie zmian

1. Otwórz stronę główną repozytorium - https://github.com/ehhhahah/karolinakrol-vite
   <img width="678" alt="Screenshot 2025-02-07 at 20 40 48" src="https://github.com/user-attachments/assets/d06e5778-ea47-4680-8f27-f6bd7b1a1e54" />

3. Wejdź w folder `Public` -> `Data`, otwórz plik [artworkData.json](public/data/artworkData.json).

   W tym miejscu możesz też zawsze zobaczyć aktualny stan pliku, jego historię, ostatnią edycję.

4. Kliknij ikonkę ołówka "Edit"
   <img width="281" alt="Screenshot 2025-02-07 at 20 42 59" src="https://github.com/user-attachments/assets/06ac2e0f-8f96-4acc-9f27-225599c889ab" />

5. Po edycji, kliknij "Commit changes...". Opis zmian jest opcjonalny.
   <img width="576" alt="Screenshot 2025-02-07 at 20 45 51" src="https://github.com/user-attachments/assets/120fec7f-455d-4b17-853c-fc11f273e9e9" />

6. Po zapisaniu zmiany zobaczysz żółtą kropkę w prawym górnym rogu - oznacza to, że zmiana jest zapisywana. Możesz ją kliknąć, aby wyświetlić szczegóły.
   <img width="971" alt="Screenshot 2025-02-07 at 20 46 39" src="https://github.com/user-attachments/assets/9f55554e-891a-4918-b7d7-100c277b170a" />

7. Po kilku sekundach kropka powinna zmienić się w zielony znak, co oznacza że strona została zaktualizowana i zmiana jest widoczna dla wszystkich po odświeżeniu.

   Czasami trzeba zrobić ["hard refresh" (CMD + Shift + R)](https://www.howtogeek.com/672607/how-to-hard-refresh-your-web-browser-to-bypass-your-cache/) aby zobaczyć zmiany u siebie.
   <img width="1063" alt="Screenshot 2025-02-07 at 20 47 57" src="https://github.com/user-attachments/assets/3e65a7d9-9540-493c-b234-8e92efbc2c03" />

8. Po edycji możesz otworzyć stronę https://karolinakrol-vite.pages.dev/works (link do niej nie jest nigdzie wyświetlony), aby sprawdzić poprawność danych w widoku listy.

## Struktura pliku

### Wstęp

Sam plik jest formatu JSON. Jest to standardowy format, możesz o nim poczytać w sieci, na przykład [tutaj](https://www.digitalocean.com/community/tutorials/an-introduction-to-json) lub gdziekolwiek indziej. 
ChatGPT i inne narzędzia AI też na pewno mogą być pomocne w zrozumieniu formatu i ewentualnych błędów.

Ważne - jeśli plik będzie nieprawidłowo sformatowany, na stronie nie wyświetlą się żadne dane! 
Zawsze możesz przywrócić poprzednią wersję pliku z historii (choćby kopiując jego zawartość ręcznie) jeśli coś pójdzie nie tak. 
Cała historia zmian zawsze będzie dostępna na GitHubie.

### Ogólna struktura

- Plik musi rozpoczynać się znakiem `[` i kończyć znakiem `]`.
- Wewnątrz znaków `[` i `]` (co oznacza "tablicę", czyli serię obiektów) muszą znajdować się **obiekty**, które otwierasz znakiem `{` i zaymkasz znakiem `}`.
- Obiekty muszą być oddzielone przecinkami, ale ostatni obiekt nie może mieć przecinka przed znakiem `]`.
- Każdy obiekt musi być poprawnie zadeklarowany - jeśli jeden będzie niepoprawny, cały plik zostanie błędnie odczytany.

### Struktura pojedynczych obiektów

Każdy obiekt musi deklarować następujące **pola** (zwane też kluczami, *keys*) z odpowiednim **typem** (rodzajem) informacji:
-  "src", otwierający tablicę (serię) linków do obrazków.

Np. `"src": ["https://i.ibb.co/hm1L21Q/baba-2.jpg"]` dla pojedynczego obrazka
lub `"src": ["https://i.ibb.co/hm1L21Q/baba-1.jpg", "https://i.ibb.co/hm1L21Q/baba-2.jpg"]` dla dwóch obrazków. Mogą to być formaty `jpg`, `png` i inne obrazkowe, ale nie `pdf`.

Kolejność ma znaczenie - pierwszy link będzie miniaturką pracy na stronie głównej. W widoku przesuwania prace będą w takiej samej kolejności jak w tej tablicy.
- "alt", tytuł danej pracy.
- "category", kategoria pracy (jedna z dostępnych).

Ważne aby kategoria była zapisana bez błędów i małymi literami (np. `"posters"` jest OK, ale `"poster"`, `"Posters"` już nie).
- "description", czyli opis pracy.

Trzy ostatnie pola muszą respektować zasady formatu JSON. W dużym skrócie, jedyne dwa znaki których nie możesz użyć bezpośrednio to `"` i `\`. 

Aby użyć `"`, musisz dodać `\` wcześniej, czyli `\"` zamiast `"`. 

Aby użyć `\` musisz dodać `\` (podwójnie go wpisać), czyli `\\` zamiast `\`. 

Przykład: `"description": "Słowo\\obraz\\terytoria. \"Tytuł\". Coś dalej"` zostanie sformatowane do `Słowo\obraz\terytoria. "Tytuł". Coś dalej`.

Cały tekst musi być w jednej lini oraz zaczynać i kończyć się znakiem `"`.

GitHub podświetli tekst na biało, jeśli o tym zapomnisz.

Poza tym zawsze możesz skopiować cały plik lub pojedynczy obiekt na stronę typu https://jsonlint.com/ i sprawdzić poprawność pliku. Widzę że na dole też wytłumaczony jest format JSON, możesz tam też poczytać.

### Hosting grafik

Ta strona nie przechowuje sama Twoich grafik, lecz wyświetla do nich linki. Grafiki możesz wrzucić gdziekolwiek, gdzie będą publicznie dostępne i wkleić tu tylko do nich linki 
(muszą kończyć się rozszerzeniem pliku, np `jpg` lub `png`). Ja polecam https://imgbb.com/, ale są inne alternatywy. Możesz też rozważyć wykupienie jakiegoś hostingu.

Ważne jest to, żebyś miała gdzieś kopie zapasowe tych prac. ImgBB jest darmowy, ale jednocześnie nie masz kontroli nad tym, czy Twoje zdjęcia nie zostaną usunięte po jakimś czasie, gdy serwis na przykład
zawiesi działalność lub zmieni cennik. Strona jest tak skonstruowana, że wystarczy że podmienisz link i dalej będzie działać, ale musisz mieć te zdjęcia pod ręką.
