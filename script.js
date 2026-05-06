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
        document.getElementById("challenge-text").textContent = wyzwanie;
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
        
        const wpis = `${new Date().toLocaleDateString()}: ${aktualne}`;
        
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
                li.textContent = wyzwanie;
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