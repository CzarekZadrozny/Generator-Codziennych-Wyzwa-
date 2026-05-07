const wyzwania = [
    { nazwa: "Zrób 15 pompek", kategoria: "fitness", poziom: "łatwy" },
    { nazwa: "Napisz komuś miły komentarz lub wiadomość", kategoria: "social", poziom: "średni" },
    { nazwa: "Spędź godzinę bez telefonu i komputera", kategoria: "wellness", poziom: "trudny" },
    { nazwa: "Wypij dziś 2 litry wody", kategoria: "health", poziom: "łatwy" },
    { nazwa: "Przeczytaj 10 stron książki", kategoria: "learning", poziom: "średni" },
    { nazwa: "Idź na 20-minutowy spacer", kategoria: "fitness", poziom: "łatwy" },
    { nazwa: "Naucz się 5 nowych słówek w obcym języku", kategoria: "learning", poziom: "średni" },
    { nazwa: "Zjedz dziś przynajmniej jedno warzywo do każdego posiłku", kategoria: "health", poziom: "łatwy" },
    { nazwa: "Uporządkuj jedną szufladę lub biurko", kategoria: "wellness", poziom: "średni" },
    { nazwa: "Medytuj lub siedź w ciszy przez 5 minut", kategoria: "wellness", poziom: "średni" },
    { nazwa: "Zrób listę 3 rzeczy, za które jesteś dziś wdzięczny", kategoria: "social", poziom: "średni" },
    { nazwa: "Rozciągaj się przez 10 minut", kategoria: "fitness", poziom: "łatwy" },
    { nazwa: "Nie jedz dziś słodyczy", kategoria: "health", poziom: "łatwy" },
    { nazwa: "Posłuchaj nowego gatunku muzycznego", kategoria: "social", poziom: "średni" },
    { nazwa: "Zrób porządny backup swoich zdjęć", kategoria: "wellness", poziom: "średni" },
    { nazwa: "Uśmiechnij się do nieznajomej osoby", kategoria: "social", poziom: "średni" },
    { nazwa: "Przygotuj zdrowy posiłek od podstaw", kategoria: "health", poziom: "średni" },
    { nazwa: "Zadzwoń do kogoś bliskiego, z kim dawno nie rozmawiałeś", kategoria: "social", poziom: "średni" },
    { nazwa: "Zaplanuj jutrzejszy dzień wieczorem", kategoria: "wellness", poziom: "średni" },
    { nazwa: "Poćwicz uważne oddychanie przez 3 minuty", kategoria: "wellness", poziom: "średni" }
];

 document.addEventListener("DOMContentLoaded", function() {
    if (window.location.href.includes("index.html")) {
        console.log("Strona załadowana");
        sprawdzenieDnia();
        sprawdzCzyZalogowany();
    }
});
    

    //funkcja odpowiedzialna za losowanie wyzwania i dodanie go do localStorage
    function losujWyzwanie() {
        const randomIndex = Math.floor(Math.random() * wyzwania.length);
        const wyzwanie = wyzwania[randomIndex];
        document.getElementById("challenge-text").textContent = wyzwanie.nazwa;
        document.getElementById("challenge-category").textContent = wyzwanie.kategoria;
        document.getElementById("challenge-difficulty").textContent = wyzwanie.poziom;
        document.getElementById("challenge-display").classList.remove("hidden");

        document.getElementById("challenge-text").classList.remove("completed-text");
        document.getElementById("congrats-msg").classList.add("hidden");

        const dzisiaj = new Date().toLocaleDateString();
        localStorage.setItem("ostatnieLosowanie", dzisiaj);

        document.getElementById("draw-btn").disabled = true;

        localStorage.setItem("aktualneWyzwanie", JSON.stringify(wyzwanie));    
    }

    //funkcja odpowiedzialna za oznaczenie wyzwania jako wykonanego, dodanie go do historii i zapisanie w localStorage
    function ukonczWyzwanie() {
        document.getElementById("challenge-text").classList.add("completed-text");
        document.getElementById("congrats-msg").classList.remove("hidden");

        const aktualne = JSON.parse(localStorage.getItem("aktualneWyzwanie"));
    if (aktualne) {
        const historia = JSON.parse(localStorage.getItem("historiaWyzwan")) || [];
        
        const wpis = {
            data: new Date().toLocaleDateString(),
            nazwa: aktualne.nazwa,
            kategoria: aktualne.kategoria,
            poziom: aktualne.poziom
        }
        
        historia.push(wpis);
        localStorage.setItem("historiaWyzwan", JSON.stringify(historia));

        document.getElementById("complete-btn").disabled = true;

        localStorage.setItem("czyUkonczoneDzisiaj", new Date().toLocaleDateString());
        localStorage.removeItem("aktualneWyzwanie");
    }
    }

    //funkcja sprawdzająca, czy użytkownik już wylosował wyzwanie na dziś i odpowiednio blokująca przyciski
function sprawdzenieDnia() {
    const dzisiaj = new Date().toLocaleDateString();
    const dataOstatniegoLosowania = localStorage.getItem("ostatnieLosowanie");
    const dataOstatniegoUkonczenia = localStorage.getItem("czyUkonczoneDzisiaj");

    // Jeśli wylosowano dzisiaj - zablokuj losowanie
    if (dataOstatniegoLosowania === dzisiaj) {
        document.getElementById("draw-btn").disabled = true;
    }

    // Jeśli ukończono dzisiaj - zablokuj przycisk ukończenia
    if (dataOstatniegoUkonczenia === dzisiaj) {
        document.getElementById("complete-btn").disabled = true;
        document.getElementById("timer").textContent = "Wylosowano juz dzisiaj zadanie! Wróc jutro.";
    }
}

    //funkcja odpowiedzialna za pokazywanie i ukrywanie historii wyzwań oraz załadowanie jej z localStorage
    var clickCount = 1;
    function pokazHistorie() {
        clickCount++;
        if (clickCount % 2 === 1) {
            document.getElementById("history-list-container").classList.add("hidden");
        } else {
            document.getElementById("history-list-container").classList.remove("hidden");

            document.getElementById("history-list").innerHTML = "";
        
            const historia = JSON.parse(localStorage.getItem("historiaWyzwan")) || [];

            historia.forEach(wyzwanie => {
                const li = document.createElement("li");
                li.innerHTML = `<p>${wyzwanie.data}: ${wyzwanie.nazwa}</p><p>kategoria: ${wyzwanie.kategoria}, trudność: ${wyzwanie.poziom}</p>`;
                document.getElementById("history-list").appendChild(li);
            });
        }
    }

    function toggleLogin() {
        document.getElementById("register-view").style.display = "none";
        document.getElementById("login-view").style.display = "block";
    }
    function toggleRegister() {
        document.getElementById("login-view").style.display = "none";
        document.getElementById("register-view").style.display = "block";
    }
        function showPassword() {
       x = document.getElementById("password");
       if (x.type === "password") {
        x.type = "text";
       } else {
        x.type = "password";
       }
       y = document.getElementById("confirm-password");
       if (y.type === "password") {
        y.type = "text";
       } else {
        y.type = "password";
       }
    }

    function rejestracjaUzytkownika() {
        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("Hasła nie są takie same!");
            return;
        }
        else {
            const userData = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password
            };
            localStorage.setItem("uzytkownik", JSON.stringify(userData));
            alert("Konto zostało utworzone pomyślnie!");
            toggleLogin();
        }
    }
    function zaloguj() {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        const storedUser = JSON.parse(localStorage.getItem("uzytkownik"));

        if (storedUser && storedUser.email === email && storedUser.password === password) {
            alert("Zalogowano pomyślnie!");
            window.location.href = "index.html";
            let czyZalogowany = true;
            localStorage.setItem("czyZalogowany", czyZalogowany);
        } else {
            alert("Nieprawidłowy email lub hasło!");
        }
    }

    function sprawdzCzyZalogowany() {
        const czyZalogowany = JSON.parse(localStorage.getItem("czyZalogowany"));
        if (czyZalogowany) {
            document.getElementById("SignInBtn").innerHTML = "<a href='index.html' onclick='wyloguj()'>Sign Out</a>";
        }
    }

    function wyloguj() {
        alert("Wylogowano pomyślnie!");
        localStorage.removeItem("czyZalogowany");
    }

    function wyczyscHistorie() {
        if (confirm("Czy na pewno chcesz wyczyścić historię?")) {
            localStorage.removeItem("historiaWyzwan");
            document.getElementById("history-list").innerHTML = "";
        }
    }