const id_profile_img = "profileimg";
const id_box_edit = "boxedit";
const id_button_editphoto = "editphoto";
const id_button_exitbox = "exitbox";
const id_file = "file";
const id_text_status = "status";
const id_progresscontainer = "progresscontainer";
const id_progress = "progress";
const id_usuario = "usuario";
const id_correo = "correo";
const id_edit_usuario = "editusuario";
const id_edit_email = "editemail";
const id_change_usuario = "changeuario";
const id_change_correo = "changecorreo";
const id_button_check_usuario = "checkusuario";
const id_button_check_correo = "checkcorreo";
const id_input_check_pass = "checkpass";

function chargeProfile() {
    var img = document.getElementById(id_profile_img);
    img.src = document.getElementById(id_element_imgprofile).src;
}

function changeStatus(message) {
    if (message.includes("|")) {
        document.getElementById(id_progresscontainer).hidden = false;
        message = message.split("|");
        document.getElementById(id_text_status).innerHTML = message[0];
        document.getElementById(id_progress).style.width = message[1];

    }
    else {
        document.getElementById(id_progresscontainer).hidden = true;
        document.getElementById(id_text_status).innerHTML = message;
    }
}
function uploadFile(parts) {
    var user = null;
    if (window.localStorage) {
        var data = window.localStorage.getItem(session_data_parameter);
        if (data == null) {
            window.location.href = "index.html";
        }
        else {
            var json = JSON.parse(data);
            user = json['usuario'];
        }
    }
    else {
        throw new Error('Tu Browser no soporta sessionStorage!');
    }
    if (user != null) {
        var number = 0;
        var type = document.getElementById(id_file).files[0].type.split("/")[1];
        function send(callback) {
            var myHeaders = new Headers();
            var raw = '{"nombre":"' + user + '/profile/profile' + '","type":"' + type + '","part":"' + parts[number] + '"}';
            var rawdelete = '{"nombre":"' + user + '/profile/profile' + '","type":"' + type + '"}';
            var requestOptionsDelete = {
                method: 'DELETE',
                headers: myHeaders,
                body: rawdelete,
                redirect: 'follow'
            };
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            function readResponse(response) {
                if (response['results'] != "error") {
                    var json = JSON.parse(response['message']);
                    if (json['ready'] == "false") {
                        document.getElementById(id_progresscontainer).hidden = false;
                        document.getElementById(id_text_status).innerHTML = "Uploading...";
                        document.getElementById(id_progress).style.width = json['percent'];
                        number++;
                        callback(send);
                    }
                    else {
                        document.getElementById(id_progresscontainer).hidden = true;
                        document.getElementById(id_text_status).innerHTML = "Ready ! ";
                    }
                }
                else {
                    document.getElementById(id_text_status).innerHTML = response['message'];
                    window.location.reload();
                }
            }
            fetch('video', requestOptionsDelete).then(response => response.json())
                .catch(error => console.log('Error:' + error))
                .then(response => console.log(response['message']));
            fetch('video', requestOptions).then(response => response.json())
                .catch(error => console.log('Error:' + error))
                .then(response => readResponse(response));
        }
        send(send);
    }
    else {
        window.localStorage.removeItem(session_data_parameter);
        window.location.href = "index.html";
    }
}

window.onload = function () {
    dashboardLoad(chargeProfile);
    var button = document.getElementById(id_button_editphoto);
    button.onclick = function () {
        var box = document.getElementById(id_box_edit);
        box.hidden = !box.hidden;
        document.getElementById(id_input_check_pass).hidden = true;
        document.getElementById(id_file).hidden = false;
        document.getElementById(id_text_status).innerHTML = "Select a file";
    }
    button = document.getElementById(id_button_exitbox);
    button.onclick = function () {
        var box = document.getElementById(id_box_edit);
        box.hidden = true;
    }
    var file = document.getElementById(id_file);
    file.onchange = function () {
        fileCodificator(file.files[0], changeStatus, uploadFile)
    }
    if (window.localStorage) {
        var data = window.localStorage.getItem(session_data_parameter);
        if (data == null) {
            window.location.href = "index.html";
        }
        else {
            var json = JSON.parse(data);
            user = json['usuario'];
            email = json['correo'];
            document.getElementById(id_usuario).innerHTML = usuario;
            document.getElementById(id_correo).innerHTML = correo;
        }
    }
    button = document.getElementById(id_edit_usuario);
    button.onclick = function () {
        var usuario = document.getElementById(id_usuario);
        usuario.hidden = !usuario.hidden;
        var inputUsuario = document.getElementById(id_change_usuario);
        inputUsuario.hidden = !inputUsuario.hidden;
        inputUsuario.value = usuario.innerHTML;
        var buttonCheck = document.getElementById(id_button_check_usuario);
        buttonCheck.hidden = !buttonCheck.hidden;
        function sendUpdate(value, password) {
            var myHeaders = new Headers();
            var raw = JSON.stringify({ "password": password, "parameter": "nombre", "value": value });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            function charguenewSession(response) {
                document.getElementById(id_text_status).innerHTML = response['message'];
                if (response['results'] != "error") {
                    if (window.localStorage) {
                        function setSession(response) {
                            if (response['results'] != "error") {
                                window.localStorage.removeItem(session_data_parameter);
                                console.log(response['message']);
                                window.localStorage.setItem(session_data_parameter, response['message']);
                            }
                        }
                        function getData(callback) {
                            var myHeaders = new Headers();
                            var requestOptions = {
                                method: 'PUT',
                                headers: myHeaders,
                                redirect: 'follow'
                            };
                            fetch('video', requestOptions)
                                .then(response => response.json())
                                .catch(error => console.log('Error:' + error))
                                .then(response => callback(response));
                        }
                        getData(setSession);
                    }
                    else {
                        throw new Error('Tu Browser no soporta localStorage!');
                    }
                }
            }
            fetch('update', requestOptions).then(response => response.json())
                .catch(error => console.log('Error:' + error))
                .then(response => charguenewSession(response));
        }
        function getPassword(input) {
            var box = document.getElementById(id_box_edit);
            box.hidden = false;
            var file = document.getElementById(id_file);
            file.hidden = true;
            document.getElementById(id_text_status).innerHTML = "Insert you pass";
            var inputPass = document.getElementById(id_input_check_pass);
            inputPass.hidden = false;
            input.hidden = !input.hidden;
            buttonCheck.hidden = !buttonCheck.hidden;
            usuario.hidden = !usuario.hidden;
            inputPass.onkeyup = function (event) {
                var isenter = (event.key == "Enter");
                if (isenter) {
                    sendUpdate(input.value, inputPass.value);
                }
            }
        }
        inputUsuario.onkeyup = function (event) {
            var isenter = (event.key == "Enter");
            if (isenter) {
                getPassword(inputUsuario);
            }
        };
        var button = document.getElementById(id_button_check_usuario);
        button.onclick = function () {
            getPassword(inputUsuario);
        };
    }
    button = document.getElementById(id_edit_correo);
    button.onclick = function () {
        var usuario = document.getElementById(id_correo);
        usuario.hidden = !usuario.hidden;
        var inputUsuario = document.getElementById(id_change_correo);
        inputUsuario.hidden = !inputUsuario.hidden;
        inputUsuario.value = usuario.innerHTML;
        var buttonCheck = document.getElementById(id_button_check_correo);
        buttonCheck.hidden = !buttonCheck.hidden;
        function sendUpdate(value, password) {
            var myHeaders = new Headers();
            console.log(value);
            var raw = JSON.stringify({ "pass": password, "parameter": "correo", "value": value });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            function charguenewSession(response) {
                document.getElementById(id_text_status).innerHTML = response['message'];
                if (response['results'] != "error") {
                    if (window.localStorage) {
                        function setSession(response) {
                            if (response['results'] != "error") {
                                window.localStorage.removeItem(session_data_parameter);
                                console.log(response['message']);
                                window.localStorage.setItem(session_data_parameter, response['message']);
                            }
                        }
                        function getData(callback) {
                            var myHeaders = new Headers();
                            var requestOptions = {
                                method: 'PUT',
                                headers: myHeaders,
                                redirect: 'follow'
                            };
                            fetch('video', requestOptions)
                                .then(response => response.json())
                                .catch(error => console.log('Error:' + error))
                                .then(response => callback(response));
                        }
                        getData(setSession);
                    }
                    else {
                        throw new Error('Tu Browser no soporta localStorage!');
                    }
                }
            }
            fetch('update', requestOptions).then(response => response.json())
                .catch(error => console.log('Error:' + error))
                .then(response => charguenewSession(response));
        }
        function getPassword(input) {
            var box = document.getElementById(id_box_edit);
            box.hidden = false;
            var file = document.getElementById(id_file);
            file.hidden = true;
            document.getElementById(id_text_status).innerHTML = "Insert you pass";
            var inputPass = document.getElementById(id_input_check_pass);
            inputPass.hidden = false;
            input.hidden = !input.hidden;
            buttonCheck.hidden = !buttonCheck.hidden;
            usuario.hidden = !usuario.hidden;
            inputPass.onkeyup = function (event) {
                var isenter = (event.key == "Enter");
                if (isenter) {
                    sendUpdate(input.value, inputPass.value);
                }
            }
        }
        inputUsuario.onkeyup = function (event) {
            var isenter = (event.key == "Enter");
            if (isenter) {
                getPassword(inputUsuario);
            }
        };
        var button = document.getElementById(id_button_check_usuario);
        button.onclick = function () {
            getPassword(inputUsuario);
        };
    }
}