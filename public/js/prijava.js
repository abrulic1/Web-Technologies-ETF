document.getElementById('submitBttn').addEventListener('click', posaljiPodatke);

function posaljiPodatke(){
 var forma = document.getElementById('loginForm');
 const inputs = forma.getElementsByTagName('input');
  const obj = {
    username: inputs[0].value,
    password: inputs[1].value
  }

  if(obj.password==='' || obj.username==='')
    alert('Niste unijeli sve podatke!');

  else
    PoziviAjax.postLogin(obj.username, obj.password, (err, data)=>{
       if(err!=null){
        alert('Neispravni podaci!');
       }
       else{
       //console.log('Bez greske');
       //ovdje nisam sigurna da li se treba otvoriti nova stranica ili da se nekako zamijeni bez refreshanja
       window.location.href="../html/nastavnikHome.html";
       }
    });
}
