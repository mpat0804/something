Webcam.set({
    width:350,
    height:300,
    image_quality:"png", 
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach("#camera");

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("preview").innerHTML='<img id="captuered_image" src="'+data_uri+'"/>';
    });
}
console.log("ml5 version", ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/UUFfHzPTS/model.json", modelloaded);
function modelloaded(){
    console.log("model loaded");
}
prediction_1="";
prediction_2="";
function speak(){
    var synth=window.speechSynthesis;
    var speakData1="The first prediction is"+prediction_1;
    var speakData2="The second prediction is"+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speakData1+speakData2);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById("captuered_image");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{console.log(results)
        document.getElementById("prediction1").innerHTML = results[0].label;
        document.getElementById("prediction2").innerHTML = results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label=="happy"){
            document.getElementById("emoji1").innerHTML = "&#128512";
        }
        if(results[0].label=="sad"){
            document.getElementById("emoji1").innerHTML = "&#128546";
        }
        if(results[0].label=="angry"){
            document.getElementById("emoji1").innerHTML = "&#128545";
        }
        if(results[1].label=="happy"){
            document.getElementById("emoji2").innerHTML = "&#128512";
        }
        if(results[1].label=="sad"){
            document.getElementById("emoji2").innerHTML = "&#128546";
        }
        if(results[1].label=="angry"){
            document.getElementById("emoji2").innerHTML = "&#128545";
        }
    }
}