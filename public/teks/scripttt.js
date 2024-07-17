const settingsIcon = document.getElementById("settings-icon");
    const commandInputContainer = document.getElementById("command-input-container");
    const commandInput = document.getElementById("command-input");
    const submitCommand = document.getElementById("submit-command");
    const cancelCommand = document.getElementById("cancel-command");
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
        commandInputContainer.classList.add("hidden");
    });

    // Handle command cancel
    cancelCommand.addEventListener("click", () => {
        commandInput.value = "";
        commandInputContainer.classList.add("hidden");
    });

// Countdown timer script
const countdownDate = new Date('2024-07-21T00:00:00Z').getTime();

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
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Initial call to update countdown immediately
updateCountdown();

// Update countdown every second
setInterval(updateCountdown, 1000);