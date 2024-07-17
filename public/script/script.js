document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("welcomePopup");
    const greetingText = document.getElementById("greetingText");

    function showPopup() {
        popup.style.display = "block";
        popup.style.animation = "slideIn 0.5s forwards";
    }

    function closePopup() {
        popup.style.animation = "slideOut 0.5s forwards";
        setTimeout(() => {
            popup.style.display = "none";
        }, 500);
    }

    function getGreeting() {
        const now = new Date();
        const hours = now.getHours();
        let greeting;

        if (hours < 4) {
            greeting = "Selamat Pagi!";
        } else if (hours < 18) {
            greeting = "Selamat Siang!";
        } else if (hours < 19) {
            greeting = "Selamat Sore!";
        } else if (hours > 1) {
            greeting = "Selamat Malam!";
        } else {
          greeting = "Sudah Tengah Malam, Jangab Begadang!";
        }

        greetingText.textContent = greeting;
    }

    // Tampilkan popup saat halaman dimuat
    getGreeting();
    showPopup();

    // Fungsi untuk menutup popup
    document.querySelector(".close-button").addEventListener("click", closePopup);
});
