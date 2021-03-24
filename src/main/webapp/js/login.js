function $(id) {
  return document.getElementById(id);
}

function login() {
  const data = {
    usuario: $('user').value,
    pass: $('pass').value
  },
    params = {
      method: "POST",
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    }

  fetch("./../login", params)
    .then(resp => resp.json())
    .then(resp => {
      console.log(data);
      if (resp.status === 200) {
        localStorage.setItem("userInfo", JSON.stringify(resp.data));
        location.href = "./../views/dashboard.html";
      } else {
        M.toast({ html: resp.message + ", status(" + resp.status + ")", inDuration: 500, outDuration: 500 })
      }
    });
}