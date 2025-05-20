document.getElementById('rsvpForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const presence = document.querySelector('input[name="presence"]:checked');
    const familyName = document.getElementById('familyName').value.trim();
    const adultsCount = document.getElementById('adultsCount').value;
    const childrenCount = document.getElementById('childrenCount').value;
    const responseMessage = document.getElementById('responseMessage');

    if (!presence) {
        responseMessage.textContent = "Te rugăm să selectezi prezența.";
        responseMessage.className = "error";
        return;
    }

    if (familyName === '') {
        responseMessage.textContent = "Te rugăm să completezi numele și prenumele.";
        responseMessage.className = "error";
        return;
    }

    // Construim datele pentru trimitere
    const formData = new FormData();
    formData.append("presence", presence.value);
    formData.append("familyName", familyName);
    formData.append("adultsCount", adultsCount);
    formData.append("childrenCount", childrenCount);

    fetch("https://script.google.com/macros/s/AKfycbx8TOg6NgYuYG8JkIL2daL40vxpuoFu1WgYv4auFzz7sZ0Is8J5Zb-4ifOAJtvSVoXA9g/exec", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        responseMessage.textContent = "Mulțumim pentru confirmare, " + familyName + "!";
        responseMessage.className = "success";
        // Resetăm formularul
        document.getElementById('rsvpForm').reset();
    })
    .catch(error => {
        responseMessage.textContent = "A apărut o eroare. Te rugăm să încerci din nou.";
        responseMessage.className = "error";
        console.error("Eroare la trimitere:", error);
    });
});
