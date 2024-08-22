document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("welcomePopup");
    const greetingText = document.getElementById("greetingText");
    const closeButton = document.querySelector(".close-button");

    // Fungsi untuk menampilkan popup
    function showPopup() {
        popup.style.display = "block";
        popup.style.animation = "slideIn 0.1s forwards";
    }

    // Fungsi untuk menutup popup
    function closePopup() {
        popup.style.animation = "slideOut 0.1s forwards";
        setTimeout(() => {
            popup.style.display = "none";
        }, 100); // Waktu sesuai dengan durasi animasi slideOut
    }

    // Fungsi untuk mendapatkan teks sapaan berdasarkan waktu saat ini
    function getGreeting() {
        const now = new Date();
        const hours = now.getHours();
        let greeting;

        if (hours >= 0 && hours < 4) {
            greeting = "Selamat Pagi!";
        } else if (hours >= 4 && hours < 18) {
            greeting = "Selamat Siang!";
        } else if (hours >= 18 && hours < 19) {
            greeting = "Selamat Sore!";
        } else {
            greeting = "Selamat Malam!";
        }

        greetingText.textContent = greeting;
    }

    // Tampilkan popup saat halaman dimuat
    getGreeting();
    showPopup();

    // Event listener untuk menutup popup
    closeButton.addEventListener("click", closePopup);
});
