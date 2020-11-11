var capture, scan;
var w = 640,
    h = 480;
var poseNet;
var pose;
var skeleton;
var glasses, glass_left, glass_right;
var imgDogEarRight, imgDogEarLeft, imgDogNose;
var fil = "one";


function preload() {
    glass_left = loadImage('assets/img/glass-left.png');
    glass_right = loadImage('assets/img/glass-right.png');
    glasses = loadImage('assets/img/glasses.png');
    imgDogEarRight = loadImage("https://i.ibb.co/bFJf33z/dog-ear-right.png");
    imgDogEarLeft = loadImage("https://i.ibb.co/dggwZ1q/dog-ear-left.png");
    imgDogNose = loadImage("https://i.ibb.co/PWYGkw1/dog-nose.png");
    scan = loadImage("assets/img/scan-lines.png");
    
}

function setup() {
    createCanvas(w, h);
    pixelDensity(1);
    capture = createCapture(VIDEO);
    capture.size(w, h);
    capture.hide();
    
    
     // Hook up poseNet
    poseNet = ml5.poseNet(capture, modelLoaded);
    
    poseNet.on('pose', gotPoses);
//    
    // Select 'clear' button html element
    firstBtn = select('#firstBtn');
    firstBtn.mousePressed(function() {
        fil = "one";
    });
    
    // Select 'clear' button html element
    secondBtn = select('#secondBtn');
    secondBtn.mousePressed(function() {
        fil="two";
    });
  
}

function draw() {
    
    capture.loadPixels();
    scan.loadPixels();

    switch(fil){
        case "one":
            firstFilter();
            break;
        case "two":
            secondFilter();
            break;
        default:
            firstFilter();
            break;
    }

    
  
}

function firstFilter(){
    
    
    
    
    if(capture.pixels.length > 0){
        for (var y = 0; y < h; y++) {
            for (var x = 0; x < w; x++) {
                var index = (x + y * w)*4;
                
               var index = (x + y * w)*4;
                
                var r = capture.pixels[index+0];
                var g = capture.pixels[index+1];
                var b = capture.pixels[index+2];
                var a = capture.pixels[index+3];   
          
                var avg = (r + g + b) / 3;
          
                capture.pixels[index+0] = avg;
                capture.pixels[index+1] = avg ;
                capture.pixels[index+2] = random(255);
                capture.pixels[index+3] = 120;        
            }
        }
        capture.updatePixels();
    }
//    
    image(capture, 0, 0);
    filter(POSTERIZE, 5);
    
    if(pose){
        
        var eyeR = pose.rightEye;
        var eyeL = pose.leftEye;
        var d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
       
            imageMode(CENTER);
            var centerX = (eyeR.x + eyeL.x)/2;
            var centerY = (eyeR.y + eyeL.y)/2;
            image (glasses, centerX, centerY);
//            image (glass_left, eyeL.x, eyeL.y);
//            image (imgDogNose, pose.nose.x, pose.nose.y);
//            image (imgDogEarLeft, pose.nose.x + d, pose.nose.y - (d*1.5));
//            image (imgDogEarRight, pose.nose.x - d, pose.nose.y - (d*1.5));
    
        imageMode(CORNER);
    }
    
    image(scan, 0, 0);
    
}

function secondFilter(){    
    
    if(capture.pixels.length > 0){
        for (var y = 0; y < h; y++) {
            for (var x = 0; x < w; x++) {
                var index = (x + y * w)*4;
                
               var index = (x + y * w)*4;
                
                
            }
        }
        capture.updatePixels();
    }
//    
    image(capture, 0, 0);
//    filter(POSTERIZE, 5);
    
    if(pose){
        
        var eyeR = pose.rightEye;
        var eyeL = pose.leftEye;
        var d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
       
            imageMode(CENTER);
            var centerX = (eyeR.x + eyeL.x)/2;
            var centerY = (eyeR.y + eyeL.y)/2;
            image (imgDogNose, pose.nose.x, pose.nose.y);
            image (imgDogEarLeft, pose.nose.x + d, pose.nose.y - (d*1.5));
            image (imgDogEarRight, pose.nose.x - d, pose.nose.y - (d*1.5));
        filter(POSTERIZE, 5);
    
        imageMode(CORNER);
    }
    
    image(scan, 0, 0);
    
    
}

function modelLoaded() {
  console.log('poseNet ready');
}

function gotPoses(poses) {
	// console.log(poses);	
	if (poses.length > 0) {
//		var neweX = poses[0].pose.keypoints[1].position.x;
//		var neweY = poses[0].pose.keypoints[1].position.y;
//		var newerX = poses[0].pose.keypoints[2].position.x;
//		var newerY = poses[0].pose.keypoints[2].position.y;
//		eleftX = lerp(eleftX, neweX, 0.5);
//		eleftY = lerp(eleftY, neweY, 0.5);
//		erightX = lerp(erightX, newerX, 0.5);
//		erightY = lerp(erightY, newerY, 0.5);
        
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
	}
}
