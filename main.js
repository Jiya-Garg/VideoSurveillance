video = "";
object_status = false;
objects = [];
function preload() {
    video = createVideo('video.mp4');
    video.hide();
}
function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}
function draw() {
    image(video, 0, 0, 480, 380);
    if (object_status != false) {
        objectDetector.detect(video, gotResults)
        document.getElementById("status").innerHTML = "Status: Detecting Objects";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects: " + objects.length; 
        for (i = 0; i < objects.length; i++) {
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    } 
}
function gotResults(error, results) {
    if (error) {
        console.error(error)
    }
    console.log(results)
    objects = results;
}
function modelLoaded() {
    console.log('Model loaded!');
    object_status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
