document.addEventListener("DOMContentLoaded", function () {
    // Referensi ke elemen
    const textElement = document.getElementById('typing-text');
    const text = "Info Owner";
    const commandInputContainer = document.getElementById('command-input-container');
    const commandInput = document.getElementById('command-input');
    const submitCommand = document.getElementById('submit-command');
    const cancelCommand = document.getElementById('cancel-command');
    const settingsIcon = document.getElementById('settings-icon');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    let index = 0;
    let displayText = "";

    function type() {
        if (index < text.length) {
            displayText += text.charAt(index);
            textElement.innerText = displayText + '|';
            index++;
            setTimeout(type, 100);
        } else {
            textElement.innerText = displayText; // Hapus garis vertikal setelah selesai mengetik
        }
    }

    type();

    // Fungsi untuk menangani pembukaan command input saat settings-icon diklik
    settingsIcon.addEventListener("click", () => {
        commandInputContainer.style.display = commandInputContainer.style.display === 'block' ? 'none' : 'block';
        commandInput.focus(); // Otomatis fokus pada input saat container ditampilkan
    });

    // Fungsi untuk menangani pengiriman command
    submitCommand.addEventListener("click", () => {
        const command = commandInput.value.trim().toLowerCase();
        if (command === "back to home") {
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to navigate to home page?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, go to home page!',
                cancelButtonText: 'No, Stay Here'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            });
        } else if (command === "to page 1") {
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to navigate to page 1?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, go to page 1!',
                cancelButtonText: 'No, Stay Here'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "cards1.html";
                }
            });
        } else if (command === "to page 2") {
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to navigate to page 2?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, go to page 2!',
                cancelButtonText: 'No, Stay Here'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "cards2.html";
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid command',
                text: 'Please enter a valid command.'
            });
        }
        commandInput.value = "";
        commandInputContainer.style.display = 'none'; // Sembunyikan container setelah perintah dikirim
    });

    // Handle command cancel
    cancelCommand.addEventListener("click", () => {
        commandInput.value = "";
        commandInputContainer.style.display = 'none'; // Sembunyikan container saat batal
    });

    // Event listener untuk toggle tema
    themeIcon.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const newTheme = body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
        setTheme(newTheme);
        themeIcon.classList.toggle('bi-moon-fill');
        themeIcon.classList.toggle('bi-brightness-high-fill');
    });

    // Fungsi untuk mengatur tema dan menyimpan di localStorage
    function setTheme(theme) {
        body.classList.remove('light-theme', 'dark-theme');
        body.classList.add(theme);
        localStorage.setItem('theme', theme);
    }

    // Ambil tema dari localStorage saat halaman dimuat
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    setTheme(savedTheme);

    // Sesuaikan ikon berdasarkan tema yang disimpan
    if (savedTheme === 'dark-theme') {
        themeIcon.classList.replace('bi-brightness-high-fill', 'bi-moon-fill');
    } else {
        themeIcon.classList.replace('bi-moon-fill', 'bi-brightness-high-fill');
    }

    // Tambahkan video sebagai background
    const videoBackground = document.createElement('video');
    videoBackground.src = 'https://f.top4top.io/m_3156sdx3h0.mp4';
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
});
