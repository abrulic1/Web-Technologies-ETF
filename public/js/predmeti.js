document.getElementById('logout').addEventListener('click', odjaviSe);

function odjaviSe(){
    PoziviAjax.postLogout((err, data)=>{
        if(err!=null){
         alert('Neispravni podaci!');
        }
        else{
        //console.log('Bez greske');
        //ovdje nisam sigurna da li se treba otvoriti nova stranica ili da se nekako zamijeni bez refreshanja
        window.location.href="http://localhost:3000/prijava.html";
        }
     });
}