//patron modulo
//funcion anonima auto invocada
(()=>{
    'use strict'
        let deck = [];
    let carta = []
    const tipos = ['C','D','H','S']
    const especiales = ['A', 'J', 'Q', 'K']

    // referencias del html
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');


    let puntosJugador = 0;
    let puntosJugador2 = 0;

    const divCartasJugador =  document.querySelector('#jugador-carta');
    const divCartasJugador2 =  document.querySelector('#computadora-carta');



    let puntosSmall = document.querySelectorAll('small');
    // crea un deck nuevo
    const crearDeck = () => {
        for(let i = 2; i <= 10; i++){
            for(let tipo of tipos){
                deck.push(i + tipo)
            }
        }
    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo)
        }
    }
        
        deck = _.shuffle(deck)

        return deck;  
    }

    crearDeck()

    // anade a mano un nueva carta
    const pedirCarta = () => {

        if(deck.length === 0){
            throw 'No hay cartas'
        }

        carta = deck.pop();
        return carta;
    } 


    const valorCartas = (carta) => {
            const valor = carta.substring(0, carta.length - 1);
        return ( isNaN(valor) ) ? 
                    ( valor === 'A' ) ? 11 : 10
                : valor * 1;     
    }   

    // turno de la computadora 

    const turnoComputadora = (puntosMinimos) => {
        
    do{
        const carta = pedirCarta()
        puntosJugador2 = puntosJugador2 + valorCartas(carta);

        puntosSmall[1].innerText = puntosJugador2;

        const imgCarta = document.createElement('img');
        imgCarta.src=`assets/cartas/${carta}.png`
        imgCarta.classList.add('carta')
        divCartasJugador2.append(imgCarta)
        if(puntosMinimos > 21){
            break;
        }
    }while( (puntosJugador2 < puntosMinimos) && (puntosMinimos <= 21) );

    if(puntosJugador2 === puntosMinimos){
        alert('nadie Gana')
    }else if(puntosMinimos > 21){
        alert('gana computadora')
    }else if(puntosJugador2 > 21){
        alert('Computadora Pierde')
    }else{
        alert('Computadora gana')
    }

    
    }

    // eventos

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta()
        console.log(carta)

        puntosJugador = puntosJugador + valorCartas(carta);
        console.log(puntosJugador)

        puntosSmall[0].innerText = puntosJugador;

        const imgCarta = document.createElement('img');
        imgCarta.src=`assets/cartas/${carta}.png`
        imgCarta.classList.add('carta')
        divCartasJugador.append(imgCarta)
        
        
        if(puntosJugador > 21){
            btnPedir.disabled = true;
            btnDetener.disabled = true;

            turnoComputadora(puntosJugador)
        }else if(puntosJugador === 21){
            btnPedir.disabled = true
            btnDetener.disabled = true;

            turnoComputadora(puntosJugador)

        }

    });

    btnDetener.addEventListener('click', ()=>{
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);

    });

    btnNuevo.addEventListener('click', ()=>{
        location.reload();
    });

    
})();