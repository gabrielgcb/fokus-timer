const html = document.querySelector('html');
const tituloPag = document.querySelector('.app__title');
const banner = document.querySelector('.app__image');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.getElementById('alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioIniciou = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizou = new Audio('/sons/beep.mp3');
const startPauseBt = document.getElementById('start-pause');
const iconePlayer = document.querySelector('.app__card-primary-butto-icon');
const iniciarOuPausarBt = document.querySelector('span');
const tempoNaTela = document.getElementById('timer');

musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

mostrarTempo();

 musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
 })

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach((contexto) => {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            tituloPag.innerHTML = 'Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>';
            focoBt.classList.add('active');
            curtoBt.classList.remove('active');
            longoBt.classList.remove('active');
            break;
        case "descanso-curto":
            tituloPag.innerHTML = 'Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!.</strong>';
            focoBt.classList.remove('active');
            curtoBt.classList.add('active');
            longoBt.classList.remove('active');
            break;    
        case "descanso-longo":
            tituloPag.innerHTML = 'Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>';
            focoBt.classList.remove('active');
            curtoBt.classList.remove('active');
            longoBt.classList.add('active');
            break;    
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizou.play();
        alert('Tempo finalizado.');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId) {
        audioPausa.play();
        zerar();
        return;
    }
    audioIniciou.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iconePlayer.setAttribute('src', '/imagens/pause.png');
    iniciarOuPausarBt.textContent = "Pausar";
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
    iconePlayer.setAttribute('src', '/imagens/play_arrow.png');
    iniciarOuPausarBt.textContent = "Começar";
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}
