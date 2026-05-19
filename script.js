// Referencias a elementos
const enterBtn = document.getElementById('enterbtn');
const welcomeScreen = document.getElementById('welcomescreen');
const mainContent = document.getElementById('mainContent');
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const progressBar = document.getElementById('musicProgressBar');

let isMusicPlaying = false;

// Evento click en botón "Ingresar"
enterBtn.addEventListener('click', () => {
    // Ocultar pantalla de bienvenida
    welcomeScreen.classList.add('hidden');

    // Mostrar contenido principal
    mainContent.classList.remove('hidden');

    // Reproducir música automáticamente
    bgMusic.play()
        .then(() => {
            isMusicPlaying = true;
        })
        .catch(error => {
            console.log('Error al reproducir música:', error);
        });
});

// Control de música (play/pause)
musicBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        musicBtn.classList.add('muted');
        isMusicPlaying = false;
    } else {
        bgMusic.play();
        musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        musicBtn.classList.remove('muted');
        isMusicPlaying = true;
    }
});

bgMusic.addEventListener('timeupdate', () => {
    if (bgMusic.duration) {
        const progress = (bgMusic.currentTime / bgMusic.duration) * 100;
        progressBar.style.width = progress + '%';
    }
});

/* para hacer click cuando yo quiero 
document.querySelector('.music-progress').addEventListener('click', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * bgMusic.duration;
    bgMusic.currentTime = newTime;
});*/ 




// Evento click en botón "Enviar"

function abrirModal() {
    document.getElementById("modalMensaje").style.display = "block";
}

function cerrarModal() {
    document.getElementById("modalMensaje").style.display = "none";
}


(function () {
    emailjs.init("oqCFv4X5HVnzENL2U");
})();

function enviarMensaje() {
    const nombre = document.getElementById("nombre").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !mensaje) {
        alert("Por favor completa los campos obligatorios");
        return;
    }

    emailjs.send("service_nw4nkkg", "template_cfwvslt", {
        nombre: nombre,
        mensaje: mensaje
    }).then(() => {
        alert("💌 Tu mensaje fue enviado con éxito");
        document.getElementById("nombre").value = "";
        document.getElementById("mensaje").value = "";
        cerrarModal();
    }).catch((error) => {
        console.error(error);
        alert("❌ Error al enviar el mensaje");
    });
}