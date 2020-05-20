(function(){
  var peer = new Peer({key: 'lwjd5qra8257b9'});
  var conn = null;
  var contactIn= document.getElementById('idAlguien');
  var contactB= document.getElementById('botonContacto');
  var estatus= document.getElementById('estatus');
  var mensajeInput= document.getElementById('mensajeInput');
  var idH=document.getElementById('id');
  var botonEnviar=document.getElementById('botonEnviar');
  var cajaMensajes= document.getElementById('cajaMensajes');
  var llamadaVozBoton= document.getElementById('botonLlamarVoz');


  function initialice(){
    peer.on('open', function(id) {
      idH.innerHTML=id;
    });

    peer.on('connection', function(c) {
      console.log('connected');
      estatus.innerHTML= "Conectado con "+  c.peer;
      conn=c;
     ready();
    });
    peer.on('call', function(call) {
      navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia);
      navigator.getMedia({ audio: true, video: false },
        function(stream){
        call.answer(stream);
      call.on('stream', function(remoteStream){
        onReceiveStream(remoteStream);
      });
    }, function(err){
      console.log('fallamos');
    })

    });

    }


  function ready(){
    conn.on('data', function(data) {
      cajaMensajes.appendChild(document.createElement('p').appendChild(document.createTextNode("Tu amigo: "+data)));
      cajaMensajes.appendChild(document.createElement('br'));
      });

  }

  function sendM(){
    cajaMensajes.appendChild(document.createElement('p').appendChild(document.createTextNode("Tu: "+mensajeInput.value)));
    cajaMensajes.appendChild(document.createElement('br'));
    conn.send(mensajeInput.value);
    mensajeInput.value='';
  }

  function contact(){
     conn = peer.connect(contactIn.value,{reliable:true});
     conn.on('open', function(){
         estatus.innerHTML= "Conectado con "+conn.peer;
     });
     conn.on('data', function(data) {
       cajaMensajes.appendChild(document.createElement('p').appendChild(document.createTextNode("Tu amigo: "+data)));
       cajaMensajes.appendChild(document.createElement('br'));
       });
  }


  function call(){
    navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia);
    navigator.getMedia({ audio: true, video: false }, function(stream){
      var call = peer.call(contactIn.value,
    stream);
    call.on('stream', function(remoteStream){
      onReceiveStream(remoteStream);
    });
  }, function(err){
    console.log('fallamos');
  });

  }

  function onReceiveStream(stream){
    var audio= document.querySelector('audio');
    audio.srcObject=  stream;
    audio.onloadedmetadata= function(e){
      audio.play();
    }
  }


  initialice();
  contactB.addEventListener("click",contact);
  botonEnviar.addEventListener("click",sendM);
  llamadaVozBoton.addEventListener("click", call);
})();
