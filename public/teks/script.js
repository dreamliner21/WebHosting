document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.getElementById('typing-text');
    const text = "Follow Us, For Any Information".split('');
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.querySelector("#theme-toggle i");
    const musicControl = document.getElementById('music-control');
    const backgroundMusic = document.getElementById('background-music');
    const notification = document.getElementById("notification");
    const settingsIcon = document.getElementById("settings-icon");
    const commandInputContainer = document.getElementById("command-input-container");
    const commandInput = document.getElementById("command-input");
    const submitCommand = document.getElementById("submit-command");
    const cancelCommand = document.getElementById("cancel-command");
    let displayText = new Array(text.length).fill('');
    let indices = Array.from(text.keys());
    let index = 0;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    indices = shuffleArray(indices);

    function type() {
        if (index < text.length) {
            displayText[indices[index]] = text[indices[index]];
            textElement.textContent = displayText.join('');
            index++;
            setTimeout(type, 100); // Adjust typing speed here
        } else {
            setTimeout(() => {
                index = 0;
                displayText = new Array(text.length).fill('');
                indices = shuffleArray(Array.from(text.keys()));
                type();
            }, 5000); // Adjust delay before retyping
        }
    }

    type();

    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    if (savedTheme === "dark") {
        themeIcon.classList.remove("bi-moon");
        themeIcon.classList.add("bi-brightness-alt-high");
    } else {
        themeIcon.classList.remove("bi-moon");
        themeIcon.classList.add("bi-brightness-alt-high");
    }
    
    musicControl.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicControl.innerHTML = '<i class="bi bi-pause"></i>';
        } else {
            backgroundMusic.pause();
            musicControl.innerHTML = '<i class="bi bi-play"></i>';
        }
        backgroundMusic.volume = 0.5
    });
    // Show notification
    const showNotification = (message) => {
        notification.textContent = message;
        notification.classList.add("show");
        setTimeout(() => {
            notification.classList.remove("show");
        }, 5000);
    };

    // Toggle theme
    themeToggle.addEventListener("click", () => {
        if (document.documentElement.getAttribute("data-theme") === "dark") {
            document.documentElement.setAttribute("data-theme", "light");
            themeIcon.classList.remove("bi-brightness-alt-high");
            themeIcon.classList.add("bi-moon");
            localStorage.setItem("theme", "light");
            showNotification("Light theme activated");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            themeIcon.classList.remove("bi-moon");
            themeIcon.classList.add("bi-brightness-alt-high");
            localStorage.setItem("theme", "dark");
            showNotification("Dark theme activated");
        }
    });

    // Toggle command input container
    settingsIcon.addEventListener("click", () => {
        commandInputContainer.classList.toggle("hidden");
    });

    // Handle command submission
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
        } else if (command === "to page 3") {
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to navigate to page 3?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, go to page 3!',
                cancelButtonText: 'No, Stay Here'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "cards3.html";
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid command',
                text: 'Please enter a valid command. Example: • Back To home,• To Page 2,• To page 3'
            });
        }
        commandInput.value = "";
        commandInputContainer.classList.add("hidden");
    });

    // Handle command cancel
    cancelCommand.addEventListener("click", () => {
        commandInput.value = "";
        commandInputContainer.classList.add("hidden");
    });
});