// Когда встроена Яндекс Форма (в #yaform есть iframe) — прячем запасной блок.
  (function(){
    try{
      var slot=document.getElementById('yaform');
      if(slot && slot.querySelector('iframe')){
        var fb=document.getElementById('fallback');
        if(fb) fb.style.display='none';
      }
    }catch(e){}
  })();
