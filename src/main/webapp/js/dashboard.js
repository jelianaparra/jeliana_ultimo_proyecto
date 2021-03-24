function $(id){
    return document.getElementById(id);
}

function out() {
    params={
        method: "GET", 
        headers: new Headers({'Content-Type': 'application/json'}) 
    }
    fetch("./../logout", params)
      .then(resp =>resp.json())
      .then(data => {
          console.log(data);
        if (data.status==200){
        M.toast({html: 'Bye!',completeCallback:window.location.href = "./../",inDuration:500,outDuration:500})
            // location.href = "./../";
        }else{
        M.toast({html: data.message+", status("+data.status+")",inDuration:500,outDuration:500})
      }
    });
}