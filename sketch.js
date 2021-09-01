var dog,Dog,happy_Dog;
var database;
var foodS,foodStock;

function preload(){
   Dog=loadImage("Images/dogImg.png");
   happy_Dog=loadImage("Images/dogImg1.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1000,500);

  dog=createSprite(800,250,100,100);
  dog.addImage(Dog);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}

// function to display UI
function draw() {
  background(46,139,87);

  if(keyWentDown("space") && foodS===0){
    writestock(foodS);
    dog.addImage(Dog);
  }

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happy_Dog);
  }

  

  drawSprites();
  fill(255,255,254);
  stroke("black");
 // text("Food remaining : "+foodS,180,280);
  textSize(18);
  //text("Note: Press UP_ARROW Key To Feed Drago Milk!",100,10,300,20);
  //text("Press space to reset",160,60)
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
} 

function writestock(x){
    x=20;
  database.ref('/').update({
    Food:x
  })
} 