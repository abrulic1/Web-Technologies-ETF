const PoziviAjax = (()=>{
    // ako postoji greška poruka se prosljeđuje u error parametar callback-a, a data je tada null
    function impl_getPredmet(naziv,fnCallback){
    }
    // vraća listu predmeta za loginovanog nastavnika ili grešku da nastavnik nije loginovan
    function impl_getPredmeti(fnCallback){

    }

    
    function impl_postLogin(username,password,fnCallback){
      //pravim xhr objekat
        var ajax = new XMLHttpRequest();

      //otvaramo konekciju na server
      ajax.open("POST", "/login", true);
      ajax.setRequestHeader("Content-Type", "application/json");
      const podaci = {
        "username": username, 
        "password": password
      }
      
      ajax.send(JSON.stringify(podaci, null, 2));
    
      ajax.onreadystatechange = function() {
	     if (ajax.readyState == 4 && ajax.status == 200){
            fnCallback(null, ajax.responseText);
             //ovdje bi se sada trebala postaviti stranica il nesto tako umjesto ovog ajax.responseText
             //document.body.innerHTML = ajax.responseText;
         }
	     if (ajax.readyState == 4 && ajax.status == 404){
            fnCallback(ajax.status, null);
         }
       } 
    }


    
    function impl_postLogout(fnCallback){
         var ajax = new XMLHttpRequest();
         ajax.open("POST", "/logout", true);
         ajax.setRequestHeader("Content-Type", "application/json");
         //ovo mi vrv ni ne treba
         ajax.send();
         ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200){
               fnCallback(null, ajax.responseText);
            }
            if (ajax.readyState == 4 && ajax.status == 404){
               fnCallback(ajax.status, null);
            }
          } 
    }
    //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}
    function impl_postPrisustvo(naziv,index,prisustvo,fnCallback){
    }
    return{
    postLogin: impl_postLogin,
    postLogout: impl_postLogout,
    getPredmet: impl_getPredmet,
    getPredmeti: impl_getPredmeti,
    postPrisustvo: impl_postPrisustvo
    };
    })();