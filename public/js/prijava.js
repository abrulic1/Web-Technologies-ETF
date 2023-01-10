document.getElementById('submitBttn').addEventListener('click',

function posaljiPodatke(){
  // e.preventDefault()
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
       window.location.href="http://localhost:3000/predmeti.html";
       }
    });
}
);