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
  var llamadaVideoBoton= document.getElementById('botonLlamarVideo');
  var waiting = document.getElementById('waiting');
  
var backgrounds=['https://1.bp.blogspot.com/-vX7wRl89e2U/WKh_fq0aNtI/AAAAAAAABHA/tbFywzTsHzIaYYWf3LvOT2JdP4sDlNp9QCLcB/s400/waiting%2Bgif.gif', 'https://i.pinimg.com/originals/06/ca/d0/06cad031cca7d7117dd12232cbeac17d.gif', 'https://i.pinimg.com/originals/49/c6/d8/49c6d8004be45c83ce4b4f94278aa28f.gif', 'https://i.gifer.com/B5ut.gif', 'https://media.tenor.com/images/cfd5c19b4fb05c9e3c338815b714b21b/tenor.gif','https://i0.wp.com/media2.giphy.com/media/jPAdK8Nfzzwt2/giphy.gif?resize=640%2C640&ssl=1&crop=1', 'https://media1.tenor.com/images/370fd33a43100051e5db247288fc620f/tenor.gif?itemid=12161781', 'https://media.giphy.com/media/3oriOdQbqRC0VtKWMU/source.gif', 'https://media1.tenor.com/images/08c7d88eda7ddd1bb622b3896b08259e/tenor.gif?itemid=16464665','https://media1.tenor.com/images/984e76ac115b0b7b43b39dc6c697773d/tenor.gif?itemid=10746038','https://media3.giphy.com/media/VeHlKYjhWUCZy/giphy.gif','https://66.media.tumblr.com/c3cf79c6e97d7f042810953198c2915b/tumblr_oxy2373lCR1wzvt9qo2_500.gifv', 'https://media0.giphy.com/media/xTk9ZP2IPCyHl1JSP6/giphy.gif?cid=ecf05e47r8ndkl4plq96ms9ebx42tpm6na8a3yudyoco7mr0&rid=giphy.gif', 'https://media2.giphy.com/media/93uYptVAHE7C0/giphy.gif?cid=ecf05e47r8ndkl4plq96ms9ebx42tpm6na8a3yudyoco7mr0&rid=giphy.gif', 'https://media2.giphy.com/media/xT9DPlbvIe2POSISM8/giphy.gif?cid=ecf05e47r8ndkl4plq96ms9ebx42tpm6na8a3yudyoco7mr0&rid=giphy.gif', 'https://media2.giphy.com/media/7kn27lnYSAE9O/giphy.gif?cid=ecf05e47r8ndkl4plq96ms9ebx42tpm6na8a3yudyoco7mr0&rid=giphy.gif', 'https://media3.giphy.com/media/GiabMxIHNpZf2/giphy.gif?cid=ecf05e47ohnqxv7g974cj5icd5t6285fp101hj15sgcavu8r&rid=giphy.gif', 'https://media2.giphy.com/media/vwI4mYEHP8k0w/giphy.gif?cid=ecf05e47r8ndkl4plq96ms9ebx42tpm6na8a3yudyoco7mr0&rid=giphy.gif', 'https://media1.giphy.com/media/jPAdK8Nfzzwt2/giphy.gif?cid=ecf05e47d63bq85bihxtufjtu8mksrc8dl26ud473wdak0kj&rid=giphy.gif', 'https://media0.giphy.com/media/Bgi0FT9D2Bu2Q/giphy.gif?cid=ecf05e474q1vzjs7uu0slu3p20w1mu45cslahsmt3tqgmvc3&rid=giphy.gif', 'https://media1.giphy.com/media/8TtImhajiYbzLhZndq/giphy.gif?cid=ecf05e474q1vzjs7uu0slu3p20w1mu45cslahsmt3tqgmvc3&rid=giphy.gif', 'https://media0.giphy.com/media/I3xd127IMrJss/giphy.gif?cid=ecf05e473b17bfdefbff35d4fd18a41ce6454c875acfe63e&rid=giphy.gif'];
  var controls= document.getElementById('controls');
  var me= document.getElementById('me');
	function initialice(){
    waiting.style.background='url('+backgrounds[Math.floor((Math.random() * backgrounds.length) )]+')';	  
    peer.on('open', function(id) {
      idH.innerHTML=id;
    });

    peer.on('connection', function(c) {
      console.log('connected');
      estatus.innerHTML= "Conectado con "+  c.peer;
      llamadaVozBoton.style.display='block';
      llamadaVideoBoton.style.display='block';
      conn=c;
     ready();
    });
    peer.on('call', function(call) {
      waiting.style.display='none';	    
      controls.style.display='block';
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
         llamadaVozBoton.style.display='block';
	 llamadaVideoBoton.style.display='block';
     });
     conn.on('data', function(data) {
       cajaMensajes.appendChild(document.createElement('p').appendChild(document.createTextNode("Tu amigo: "+data)));
       cajaMensajes.appendChild(document.createElement('br'));
       });
  }


  function call(){
     waiting.style.display='none';	    
      controls.style.display='block';
      
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

  function video(){
     navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia);
    navigator.getMedia({ audio: true, video: true }, function(stream){
      var call = peer.call(contactIn.value,
    stream);
   controls.style.display= 'block';
   waiting.style.display='none';
    call.on('stream', function(remoteStream){
      onReceiveStream(remoteStream);
    });
  }, function(err){
    console.log('fallamos');
  });

  
  }

  function onReceiveStream(stream){
    var audio= document.querySelector('audio');
//    var video= document.querySelector('video');
    audio.srcObject=  stream;
    video.srcObject= stream;

    audio.onloadedmetadata= function(e){
      audio.play();
    }
//    video.onloadedmetadat= function(e){
//      video.play();
//    }
  }
  initialice();
  contactB.addEventListener("click",contact);
  botonEnviar.addEventListener("click",sendM);
 llamadaVozBoton.addEventListener("click", call);
  mensajeInput.addEventListener('keyup', function(e){ if(conn !=null && e.keyCode==13){sendM()}});
//  llamadaVideoBoton.addEventListener("click", video);
})();
