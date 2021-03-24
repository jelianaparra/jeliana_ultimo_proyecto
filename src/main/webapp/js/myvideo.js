
function chargueMyVideos(response) {
    if (response['results'] != "error") {
        var iteratorjson = JSON.parse(response['message']);
        for (var i = 1; i < 11; i++) {
            if (iteratorjson.hasOwnProperty(i.toString())) {
                json = JSON.parse(iteratorjson[i.toString()]);
                if (json.hasOwnProperty("thumbnail")) {
                    var img = document.getElementById("img" + i.toString());
                    var jsonThumbnail = JSON.parse(json['thumbnail']);
                    img.src = getPath() + "video?usuario=" + json['usuario'] + "&nombre=" +
                        jsonThumbnail['nombre'] + "." + jsonThumbnail['type'];
                    img.hidden = false;
                }
                var hrefvideo = document.getElementById(i.toString());
                var textp = document.getElementById("text" + i)
                var textvideo = json['usuario'] + " - " + json['nombre'];
                hrefvideo.setAttribute('href', getPath() + "video?usuario=" + json['usuario'] + "&nombre=" +
                    json['nombre'] + "." + json['type']);
                textp.innerHTML = textvideo;

            }
        }
    }
}




window.onload = function () {
    dashboardLoad(function () {

    });
    var raw = "";
    var myHeaders = new Headers();
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("news", requestOptions)
        .then(response => response.json())
        .catch(error => console.log('Error:' + error))
        .then(response => chargueMyVideos(response));
}