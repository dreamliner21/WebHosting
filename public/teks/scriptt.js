const settingsIcon = document.getElementById("settings-icon");
    const commandInputContainer = document.getElementById("command-input-container");
    const commandInput = document.getElementById("command-input");
    const submitCommand = document.getElementById("submit-command");
    const cancelCommand = document.getElementById("cancel-command");

    settingsIcon.addEventListener("click", () => {
        commandInputContainer.classList.toggle("hidden");
    });

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
                text: 'Please enter a valid command. Example: • Back To home, • To Page 1, • To Page 3'
            });
        }
        commandInput.value = "";
        commandInputContainer.classList.add("hidden");
    });

    cancelCommand.addEventListener("click", () => {
        commandInput.value = "";
        commandInputContainer.classList.add("hidden");
    });

    const MAX_USERS = 21;
    async function loadRedeemCodes() {
    return fetch('http://localhost:3000/redeemCodes')
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error('Error loading redeem codes:', error);
            return {"true": [], "false": []}; // Mengembalikan struktur kosong jika terjadi error
        });
}

function saveRedeemCodes(codes) {
    const jsonData = JSON.stringify(codes, null, 2);
    fetch('http://localhost:3000/redeemCodes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    }).catch(error => console.error('Error saving redeem codes:', error));
}

async function loadUsedPanels() {
    return fetch('http://localhost:3000/usedPanels')
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error('Error loading used panels:', error);
            return {}; // Mengembalikan struktur kosong jika terjadi error
        });
}

function saveUsedPanels(panels) {
    const jsonData = JSON.stringify(panels, null, 2);
    fetch('http://localhost:3000/usedPanels', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    }).catch(error => console.error('Error saving used panels:', error));
}

async function redeemCode() {
    const codes = await loadRedeemCodes();
    const usedPanels = await loadUsedPanels();
    const inputCode = document.getElementById('redeemCode').value.trim().toUpperCase();

    // Logika untuk memproses redeem code
    // Misalnya: jika code ada di "true", pindahkan ke usedPanels

    if (codes.true.includes(inputCode)) {
        // Pindahkan code dari "true" ke usedPanels
        codes.true = codes.true.filter(code => code !== inputCode);
        codes.false.push(inputCode);
        usedPanels[inputCode] = true; // Atau data apa pun yang relevan
    }

    // Simpan perubahan kembali ke file JSON
    saveRedeemCodes(codes);
    saveUsedPanels(usedPanels);
}

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomCpu(min, max) {
        const minMultiplier = Math.ceil(min / 10);
        const maxMultiplier = Math.floor(max / 10);
        return getRandomNumber(minMultiplier, maxMultiplier) * 10;
    }

    function redeemCode() {
        const codes = loadCodes();
        const usedPanels = loadUsedPanels();
        const inputCode = document.getElementById('redeemCode').value.trim().toUpperCase();
        const panelInfoDiv = document.getElementById('panelInfo');
        const ramSpan = document.getElementById('ram');
        const diskSpan = document.getElementById('disk');
        const cpuSpan = document.getElementById('cpu');
        const ctaButton = document.getElementById('ctaButton');

        const totalRedeemed = codes.false.length;

        if (codes.true.includes(inputCode)) {
            Swal.fire({
                title: 'Success!',
                text: 'Your code is valid. You have successfully redeemed a panel.',
                icon: 'success'
            });

            // Move the redeemed code from 'true' to 'false'
            codes.true = codes.true.filter(code => code !== inputCode);
            codes.false.push(inputCode);
            saveCodes(codes);

            // Generate random panel specifications
            const ram = getRandomNumber(2, 16);
            const disk = getRandomNumber(20, 100);
            const cpu = getRandomCpu(10, 100);

            ramSpan.textContent = ram;
            diskSpan.textContent = disk;
            cpuSpan.textContent = cpu;

            // Show panel info
            panelInfoDiv.classList.remove('hidden');

            // Prepare WhatsApp claim link
            ctaButton.href = `https://wa.me/your-number?text=I%20have%20redeemed%20a%20panel.%20Here%20are%20my%20specifications:%0ARAM:%20${ram}GB%0ADisk:%20${disk}GB%0ACPU:%20${cpu}%25%0AThank%20you!`;
        } else if (codes.false.includes(inputCode)) {
            Swal.fire({
                title: 'Code Used or Expired',
                text: 'This code has already been used or it is expired.',
                icon: 'warning'
            });
        } else {
            Swal.fire({
                title: 'Invalid Code',
                text: 'The code you entered is not valid. Please try again.',
                icon: 'error'
            });
        }
    }