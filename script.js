// Controle de áudio para as tracks
let currentlyPlaying = null;

document.querySelectorAll('.track-card').forEach(track => {
    const playButton = track.querySelector('.play-button');
    const audio = track.querySelector('audio');
    const progressBar = track.querySelector('.progress-bar div');
    const timeDisplay = track.querySelector('.time');
    const playIcon = track.querySelector('i');

    // Reseta o display de tempo para 0:00 inicialmente
    timeDisplay.textContent = '0:00';

    // Tratamento de erro para carregamento do áudio
    audio.addEventListener('error', (e) => {
        console.error('Erro ao carregar o áudio:', e);
        alert('Erro ao carregar o áudio. Verifique se o arquivo existe.');
    });

    // Quando o áudio está pronto para tocar
    audio.addEventListener('loadedmetadata', () => {
        // Formata e exibe a duração total
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    });

    // Atualiza a barra de progresso e o tempo
    audio.addEventListener('timeupdate', () => {
        if (!isNaN(audio.duration)) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progress}%`;
            
            // Atualiza o display de tempo
            const minutes = Math.floor(audio.currentTime / 60);
            const seconds = Math.floor(audio.currentTime % 60);
            timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    });

    // Quando a música termina
    audio.addEventListener('ended', () => {
        playIcon.classList.remove('ri-pause-fill');
        playIcon.classList.add('ri-play-fill');
        progressBar.style.width = '0%';
        
        // Restaura o tempo total ao invés de 0:00
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        currentlyPlaying = null;
    });

    // Click no botão de play
    playButton.addEventListener('click', () => {
        if (currentlyPlaying && currentlyPlaying !== audio) {
            // Para a música atual se houver alguma tocando
            currentlyPlaying.pause();
            currentlyPlaying.currentTime = 0;
            const oldPlayButton = currentlyPlaying.parentElement.querySelector('.play-button i');
            oldPlayButton.classList.remove('ri-pause-fill');
            oldPlayButton.classList.add('ri-play-fill');
        }

        if (audio.paused) {
            // Tenta tocar o áudio
            audio.play().catch(error => {
                console.error('Erro ao tocar o áudio:', error);
                alert('Erro ao tocar o áudio. Verifique se o arquivo existe.');
            });
            playIcon.classList.remove('ri-play-fill');
            playIcon.classList.add('ri-pause-fill');
            currentlyPlaying = audio;
        } else {
            audio.pause();
            playIcon.classList.remove('ri-pause-fill');
            playIcon.classList.add('ri-play-fill');
            currentlyPlaying = null;
        }
    });

    // Click na barra de progresso para mudar a posição da música
    progressBar.parentElement.addEventListener('click', (e) => {
        if (!isNaN(audio.duration)) {
            const rect = progressBar.parentElement.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            audio.currentTime = pos * audio.duration;
        }
    });
});

// Mantém o código existente das partículas
function createParticles(num) {
    for (let i = 0; i < num; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 15 + 5) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 5) + 's';
        document.querySelector('.w-[375px]').appendChild(particle);
    }
}

createParticles(10); 