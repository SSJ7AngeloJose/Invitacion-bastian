// Referencias a elementos
const enterBtn = document.getElementById('enterbtn');
const welcomeScreen = document.getElementById('welcomescreen');
const mainContent = document.getElementById('mainContent');
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const progressBar = document.getElementById('musicProgressBar');

let isMusicPlaying = false; // Asumimos que la música se reproduce al cargar, pero el navegador puede bloquearlo

// --- FUNCIÓN PARA REPRODUCIR EN LA PANTALLA DE BIENVENIDA ---
function iniciarMusica() {
    if (!isMusicPlaying) {
        bgMusic.play()
            .then(() => {
                isMusicPlaying = true;
                // Sincroniza el ícono del botón de música por si acaso
                musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                musicBtn.classList.remove('muted');
            })
            .catch(error => {
                // El navegador bloqueó el autoplay, se queda esperando el clic silenciosamente
                console.log('Esperando interacción para reproducir audio...');
            });
    }
}

// 1. Intentar reproducir de inmediato al cargar la página
iniciarMusica();

// 2. TRUCO CLAVE: Si tocan cualquier parte de la pantalla de bienvenida, la música arranca
welcomeScreen.addEventListener('click', iniciarMusica);


// Evento click en botón "Ingresar"
enterBtn.addEventListener('click', (e) => {
    // Evita que el clic se duplique al welcomeScreen
    e.stopPropagation(); 

    // Ocultar pantalla de bienvenida
    welcomeScreen.classList.add('hidden');

    // Mostrar contenido principal
    mainContent.classList.remove('hidden');

    // Asegura que la música siga sonando al cambiar de pantalla
    iniciarMusica();
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