const wyzwania = [
    "Zrób 15 pompek",
    "Napisz komuś miły komentarz lub wiadomość",
    "Spędź godzinę bez telefonu i komputera",
    "Wypij dziś 2 litry wody",
    "Przeczytaj 10 stron książki",
    "Idź na 20-minutowy spacer",
    "Naucz się 5 nowych słówek w obcym języku",
    "Zjedz dziś przynajmniej jedno warzywo do każdego posiłku",
    "Uporządkuj jedną szufladę lub biurko",
    "Medytuj lub siedź w ciszy przez 5 minut",
    "Zrób listę 3 rzeczy, za które jesteś dziś wdzięczny",
    "Rozciągaj się przez 10 minut",
    "Nie jedz dziś słodyczy",
    "Posłuchaj nowego gatunku muzycznego",
    "Zrób porządny backup swoich zdjęć",
    "Uśmiechnij się do nieznajomej osoby",
    "Przygotuj zdrowy posiłek od podstaw",
    "Zadzwoń do kogoś bliskiego, z kim dawno nie rozmawiałeś",
    "Zaplanuj jutrzejszy dzień wieczorem",
    "Poćwicz uważne oddychanie przez 3 minuty"
    ];

    sprawdzenieDnia();

    document.getElementById("draw-btn").addEventListener("click",losujWyzwanie);
    document.getElementById("complete-btn").addEventListener("click",ukonczWyzwanie);
    document.getElementById("toggle-history").addEventListener("click",pokazHistorie);

    function losujWyzwanie() {
        const randomIndex = Math.floor(Math.random() * wyzwania.length);
        const wyzwanie = wyzwania[randomIndex];
        document.getElementById("challenge-text").textContent = wyzwanie;
        document.getElementById("challenge-display").classList.remove("hidden");

        document.getElementById("challenge-text").classList.remove("completed-text");
        document.getElementById("congrats-msg").classList.add("hidden");

        const dzisiaj = new Date().toLocaleDateString();
        localStorage.setItem("ostatnieLosowanie", dzisiaj);

        document.getElementById("draw-btn").disabled = true;

        localStorage.setItem("aktualneWyzwanie", JSON.stringify(wyzwanie));    
    }

    function ukonczWyzwanie() {
        document.getElementById("challenge-text").classList.add("completed-text");
        document.getElementById("congrats-msg").classList.remove("hidden");

        const aktualne = JSON.parse(localStorage.getItem("aktualneWyzwanie"));
    if (aktualne) {
        const historia = JSON.parse(localStorage.getItem("historiaWyzwan")) || [];
        
        const wpis = `${new Date().toLocaleDateString()}: ${aktualne}`;
        
        historia.push(wpis);
        localStorage.setItem("historiaWyzwan", JSON.stringify(historia));

        document.getElementById("complete-btn").disabled = true;
    }
    }

    function sprawdzenieDnia() {
        const dzisiaj = new Date().toLocaleDateString();
        const dataOstatniegoLosowania = localStorage.getItem("ostatnieLosowanie");

        if (dataOstatniegoLosowania === dzisiaj) {
            document.getElementById("draw-btn").disabled = true;
            document.getElementById("complete-btn").disabled = true;
            document.getElementById("timer").textContent = "Wyzwanie już wylosowane na dziś!";
            alert("Już wylosowałeś wyzwanie na dziś!");
        } else {
            document.getElementById("draw-btn").disabled = false;
            document.getElementById("complete-btn").disabled = false;
        }
    }

    var clickCount = 1;
    function pokazHistorie() {
        clickCount++;
        if (clickCount % 2 === 1) {
            document.getElementById("history-list-container").classList.add("hidden");
        } else {
            document.getElementById("history-list-container").classList.remove("hidden");
        
            const historia = JSON.parse(localStorage.getItem("historiaWyzwan")) || [];

            historia.forEach(wyzwanie => {
                const li = document.createElement("li");
                li.textContent = wyzwanie;
                document.getElementById("history-list").appendChild(li);
            });
        }
    }