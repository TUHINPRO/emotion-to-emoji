prediction_1="";
prediction_2="";

Webcam.set({
  width:350,
  height:300,
  image_format:'png',
  png_quality:100

});

camera=document.getElementById('camera');

Webcam.attach('#camera');

function take_snapshot() {
   Webcam.snap(function(data_uri){
       document.getElementById("result").innerHTML='<img id="data" src=" '+data_uri+' ">';
   }
   );
}

console.log("ml5version",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/83xjyHKeg/model.json",modelLoaded);

function modelLoaded() {
    console.log("modelLoaded");
}

function speak() {
var speaks=window.speechSynthesis;
speaks1="prediction 1 is " + prediction_1;
speaks2="prediction 2 is"  + prediction_2;
var speaks3=new SpeechSynthesisUtterance(speaks1+speaks2);
speaks.speak(speaks3);
}

function check() {
  img=document.getElementById("data");
  classifier.classify(img,gotResult);
}
 
function gotResult(error,results) {
  if(error) {
  console.error(error);
  }
  else{
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML=results[0].label;
    document.getElementById("result_emotion_name1").innerHTML=results[1].label;
    prediction_1=results[0].label;
    prediction_2=results[1].label;
    speak();
   if(prediction_1=="Happy"){
     document.getElementById("update_emoji").innerHTML="&#128522;";
   }
   if(prediction_1=="Sad"){
    document.getElementById("update_emoji").innerHTML="&#128532;";
}
if(prediction_1=="Angry"){
  document.getElementById("update_emoji").innerHTML="&#128545;";
}
if(prediction_2=="Happy"){
  document.getElementById("1_emoji_updated").innerHTML="&#128522;";
}
if(prediction_2=="Sad"){
  document.getElementById("1_emoji_updated").innerHTML="&#128532;";
}
if(prediction_2=="Angry"){
  document.getElementById("1_emoji_updated").innerHTML="&#128545;";
}
}}
