const nombreInput = document.querySelector('#nombre');
const formulario = document.querySelector('#formulario');
const participantesLista = document.querySelector('#lista');
const btnSortear = document.querySelector('#btnSortear');
const spiner = document.querySelector('#spiner');


formulario.addEventListener('submit', enviarFormulario);
nombreInput.addEventListener('change', validar);
btnSortear.addEventListener('click', sortear);

const participanteObj = {
    nombre: ''
}

class Participante {
    constructor() {
        this.participantes = [];
    }

    agregar(objeto) {
        this.participantes = [...this.participantes, objeto];
    }

    getParticipantes() {
        return this.participantes;
    }

    sortear() {
        const indice = Math.floor(Math.random() * this.participantes.length);
        return this.participantes[indice];
    }

}

class UI {
    constructor() {

    }

    mostrarParticipantes(participantesArray) {

        while (participantesLista.firstChild) {
            participantesLista.removeChild(participantesLista.firstChild);
        }

        participantesArray.forEach(participanteIterado => {

            const item = document.createElement('li');
            item.textContent = `${participanteIterado.nombre}`;

            participantesLista.appendChild(item);


        });
    }

    mostrarGanador(ganador) {
        const divPrevio = document.querySelector('.ganadores');
        divPrevio?.remove();
        const ganadorDiv = document.createElement('section');

        ganadorDiv.classList.add('ganadores');
        ganadorDiv.innerHTML = `
            <h2>Ganador</h2>
            <p>El ganador es <span>${ganador.nombre}</span></p>
        `;

        spiner.classList.remove('hidden');
        spiner.classList.add('spiner');

        setTimeout(() => {
            spiner.classList.remove('spiner');
            spiner.classList.add('hidden');

            document.querySelector('body').appendChild(ganadorDiv);

            setTimeout(() => {
                ganadorDiv.remove();
            }, 4000);
            

        }, 4000);

        // document.querySelector('body').appendChild(ganadorDiv);

        // setTimeout(() => {
        //     ganadorDiv.remove();
        // }, 4000);
    }

    mostrarAlerta(mensaje) {
        const alertaPrevia = document.querySelector('.alerta');
        alertaPrevia?.remove();
        const alertaDiv = document.createElement('div');
        alertaDiv.classList.add('alerta', 'alerta-danger');
        alertaDiv.textContent = mensaje;

        formulario.insertBefore(alertaDiv, nombreInput);

        setTimeout(() => {
            alertaDiv.remove();
        }, 3000);
    }
}

let ui = new UI();
let participante = new Participante();

validarBoton();

function enviarFormulario(e) {
    e.preventDefault();

    if (Object.values(participanteObj).includes('')) {
        ui.mostrarAlerta('Agrega un participante');
        return
    }

    participante.agregar({ ...participanteObj });
    const { participantes } = participante;

    ui.mostrarParticipantes(participantes);

    validarBoton();

    formulario.reset();

    reiniciarObjeto();
}

function validar(e) {

    if (e.target.value.trim() === '') {
        console.log('Completa este campo');
        return;
    }

    participanteObj[e.target.name] = e.target.value;
}

function reiniciarObjeto() {
    Object.assign(participanteObj, {
        nombre: ''
    })
}

function sortear() {
    const ganador = participante.sortear();
    ui.mostrarGanador(ganador);
}

function validarBoton() {
    const { participantes } = participante;

    if (participantes.length === 0) {
        btnSortear.classList.add('desactivado');
        btnSortear.disabled = true;
        return;
    }

    btnSortear.classList.add('boton-sorteo');
    btnSortear.classList.remove('desactivado');
    btnSortear.disabled = false;


}