let TabelaPrisustvo = function (divRef, podaci) {
    //Ako se nalazi nesto u divu, treba isprazniti sadrzaj
    if(divRef.childNodes.length!=0)
    divRef.innerHtml="";

    //privatni atributi modula
    var trenutnaSedmica=null; //sad za sad je null

    //implementacija metoda
    let sljedecaSedmica = function () {
    }
    let prethodnaSedmica = function () {
    }


    return {
    sljedecaSedmica: sljedecaSedmica,
    prethodnaSedmica: prethodnaSedmica
    }
    
    };