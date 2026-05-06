    document.getElementById("btn-create-account").addEventListener("click",rejestracjaUzytkownika);


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
        }
    }