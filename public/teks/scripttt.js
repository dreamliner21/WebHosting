document.addEventListener("DOMContentLoaded", function() {
    const settingsIcon = document.getElementById("settings-icon");
    const commandInputContainer = document.getElementById("command-input-container");
    const commandInput = document.getElementById("command-input");
    const submitCommand = document.getElementById("submit-command");
    const cancelCommand = document.getElementById("cancel-command");

    // Fungsi untuk menampilkan atau menyembunyikan container input command
    settingsIcon.addEventListener("click", () => {
        commandInputContainer.classList.toggle("hidden");
        commandInput.focus(); // Fokuskan ke input saat ditampilkan
    });

    // Fungsi untuk menangani pengiriman command
    submitCommand.addEventListener("click", handleCommand);

    // Fungsi untuk menangani pembatalan command
    cancelCommand.addEventListener("click", () => {
        clearCommandInput();
    });

    // Fungsi untuk memproses command yang dimasukkan
    function handleCommand() {
        const command = commandInput.value.trim().toLowerCase();

        const pages = {
            "back to home": "index.html",
            "to page 1": "cards1.html",
            "to page 2": "cards2.html"
        };

        if (pages[command]) {
            Swal.fire({
                title: 'Are you sure?',
                text: `Do you want to navigate to ${command.replace("to ", "")}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: `Yes, go to ${command.replace("to ", "")}!`,
                cancelButtonText: 'No, Stay Here'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = pages[command];
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid command',
                text: 'Please enter a valid command.'
            });
        }

        clearCommandInput();
    }

    // Fungsi untuk membersihkan input command dan menyembunyikan container
    function clearCommandInput() {
        commandInput.value = "";
        commandInputContainer.classList.add("hidden");
    }

    // Countdown timer script
    const countdownDate = new Date('2024-08-22T00:00:00Z').getTime();

    // Variabel countdownInterval dideklarasikan di luar fungsi untuk mencegah error
    let countdownInterval;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = formatTime(days);
        document.getElementById('hours').innerText = formatTime(hours);
        document.getElementById('minutes').innerText = formatTime(minutes);
        document.getElementById('seconds').innerText = formatTime(seconds);

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerText = "Countdown Finished";
            // Atur apa yang terjadi setelah countdown selesai, misalnya menampilkan konten baru
            showMainContent();
        }
    }

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    // Panggilan awal untuk memperbarui countdown segera
    updateCountdown();

    // Perbarui countdown setiap detik
    countdownInterval = setInterval(updateCountdown, 1000);

    // Fungsi untuk menampilkan konten utama setelah countdown selesai
    function showMainContent() {
    const countdownElement = document.getElementById('countdown-container');
    const mainContent = document.getElementById('main-content');

    // Sembunyikan elemen countdown
    if (countdownElement) countdownElement.style.display = "none";

    // Tampilkan konten utama
    if (mainContent) mainContent.style.display = "block";

    // Tambahkan video sebagai background
    const videoBackground = document.createElement('video');
    videoBackground.src = 'https://f.top4top.io/m_3156sdx3h0.mp4'; // Ganti dengan URL video Anda
    videoBackground.autoplay = true;
    videoBackground.loop = true;
    videoBackground.muted = true; // Optional: Mematikan suara video

    // Gaya untuk video agar menjadi background
    videoBackground.style.position = 'fixed';
    videoBackground.style.top = '0';
    videoBackground.style.left = '0';
    videoBackground.style.width = '100%';
    videoBackground.style.height = '100%';
    videoBackground.style.objectFit = 'cover';
    videoBackground.style.zIndex = '-1'; // Pastikan video berada di belakang konten

    // Tambahkan video ke dalam body
    document.body.appendChild(videoBackground);
}
});
