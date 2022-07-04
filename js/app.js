//variables
const formulario = document.querySelector('#formulario');
const lista = document.querySelector('#lista-tweets');

let tweets = [];

//event Listener
eventListener();
function eventListener(){
      formulario.addEventListener('submit',agregarTweet);

      document.addEventListener('DOMContentLoaded',()=>{
            tweets = JSON.parse(localStorage.getItem('tweets')) || [];

            //console.log(tweets);
            createHtml();
      });
      
}

//funciones
function agregarTweet(e){
      e.preventDefault();
      
      const tweet = document.querySelector('#tweet').value;
     

      if(tweet === ''){
            //console.log('No puede ir vacio');
            mostrarError('El mensaje no puede ir vacio');
            return; //evitar que se egecute el codigo
      }

      const tweetObj = {
            id: Date.now(),
            tweet
      }
      tweets = [...tweets, tweetObj];
      //console.log(tweets);
      createHtml();

      formulario.reset();
}

function mostrarError(message){
      const mensajeError = document.createElement('p');
      mensajeError.classList.add('error');
      mensajeError.textContent = message;

      const contenido = document.querySelector('#contenido');
      contenido.appendChild(mensajeError);

      setTimeout(()=>{
            mensajeError.remove();
      },3000);
}

//muestra listado de los tweets
function createHtml(){
      cleanHtml();
      if(tweets.length > 0 ){
            
            tweets.forEach(tweet =>{
                  const li = document.createElement('li');
                  const btnEliminar = document.createElement('a');
                  btnEliminar.classList.add('borrar-tweet');
                  btnEliminar.textContent = 'X';

                  btnEliminar.onclick = ()=>{
                        borrarTweet(tweet.id);
                  }

                  li.innerText = tweet.tweet;
                  li.appendChild(btnEliminar);
                  lista.appendChild(li);
            });
            
      }
      sincronizarStorage();
}

//limpiar html
function cleanHtml(){
      while(lista.firstChild){
            lista.removeChild(lista.firstChild);
      }     
}

function sincronizarStorage(){
      localStorage.setItem('tweets',JSON.stringify(tweets));
}


function borrarTweet(id){
      //console.log(id);
      tweets = tweets.filter(twee => twee.id !== id);
      createHtml();
}