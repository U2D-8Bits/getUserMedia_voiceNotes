let mediaRecorder

navigator.mediaDevices.getUserMedia({audio: true}).then((stream)=>{
    mediaRecorder = new MediaRecorder(stream)
    let chuncks = []
    let boton = document.getElementById("btn");

    mediaRecorder.ondataavailable = data =>{
        chuncks.push(data.data)
    }

    mediaRecorder.onstop = () => {
        const blob = new Blob(chuncks, {type: 'audio/ogg; code=opus'})
        const reader = new window.FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
            const audio = document.createElement('audio')
            audio.src = reader.result
            audio.controls = true
            document.getElementById('contVoice').append(audio)
        }
    }
    

    boton.onclick = iniciar;


    function iniciar(){

        document.getElementById('btn').style.background = "red";
        mediaRecorder.start()
        // setTimeout(() => mediaRecorder.stop(), 50000)

        boton.onclick = detener;
    }

function detener(){
    document.getElementById('btn').style.background = '#4AC458';
    mediaRecorder.stop()
}


}).catch((err)=> console.log(err))