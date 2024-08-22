document.addEventListener('DOMContentLoaded', () => {
    const settingsIcon = document.getElementById("settings-icon");
    const commandInputContainer = document.getElementById("command-input-container");
    const commandInput = document.getElementById("command-input");
    const submitCommand = document.getElementById("submit-command");
    const cancelCommand = document.getElementById("cancel-command");

    settingsIcon.addEventListener("click", () => {
        commandInputContainer.classList.toggle("hidden");
    });

    submitCommand.addEventListener("click", () => {
        let command = commandInput.value.trim().toUpperCase(); // Convert to uppercase

        switch (command) {
            case "BACK TO HOME":
                navigateWithConfirmation("home page", "index.html");
                break;
            case "TO PAGE 1":
                navigateWithConfirmation("page 1", "cards1.html");
                break;
            case "TO PAGE 3":
                navigateWithConfirmation("page 3", "cards3.html");
                break;
                case "TO HOME":
                navigateWithConfirmation("home page", "index.html");
                break;
            case "PAGE 1":
                navigateWithConfirmation("page 1", "cards1.html");
                break;
            case "PAGE 3":
                navigateWithConfirmation("page 3", "cards3.html");
                break;
            default:
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid command',
                    text: 'Please enter a valid command. Example: • TO HOME, • PAGE 1, • PAGE 3'
                });
                break;
        }
        commandInput.value = "";
        commandInputContainer.classList.add("hidden");
    });

    cancelCommand.addEventListener("click", () => {
        commandInput.value = "";
        commandInputContainer.classList.add("hidden");
    });

    function navigateWithConfirmation(pageName, url) {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to navigate to ${pageName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, go to ${pageName}!`,
            cancelButtonText: 'No, Stay Here'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = url;
            }
        });
    }
});
