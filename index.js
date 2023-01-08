let birdCount = 1; //finches
let Generation = 0; 
let MutationRate= 0.1; //IDK YET

//traits (default settings: Short and thick beak(for seeds), Small size, Brown feathers)
let beakForm = "shortthick"  //["longthin","shortthick","longcurved"];
let size = "small" //['small', 'medium', 'large'];
let plumageColor = "brown" //["brown","white","green"]; 

//environment
let availableFood = "seeds" //["seeds","insects","nectar"];
let predators = false;
let area = "forest" //["forest","jungle","tundra"] 

//Summon first bird on load
window.onload = function() {
 
    var startbird = document.createElement('div');
    startbird.classList.add('startbox');
    startbird.id = "startbird"
    document.querySelector('.main').appendChild(startbird);
    document.getElementById('startbird').innerHTML = '<img src="https://i.ibb.co/wW5cDpV/bird11.png" alt="bird11">';


  var startboxes = document.querySelectorAll('.startbox');
  startboxes.forEach(function(startbox) {
    startbox.style.left = "60%";
    startbox.style.top = "35%";
  });
};

function startSimulation(){
  // Add Second Bird
    var box = document.createElement('div');
    box.classList.add('box');
    document.querySelector('.main').appendChild(box);
  

  var boxes = document.querySelectorAll('.box');
  boxes.forEach(function(box) {
    
  });
    // Make the button disappear
    document.getElementById("startbtn").style.display = 'none';
};



function enableBeak(n) {
  if (n === 1) {                                  //long and thin
    const btn = document.getElementById('bbtn1');
    btn.style.backgroundColor = "gray";
    if(availableFood = "insects"){
      console.log("bird can eat insects -> survive");

    }

  } else if (n === 2) {                           //short and thick
    const btn = document.getElementById('bbtn2');
    btn.style.backgroundColor = "gray";
    if(availableFood = "seeds"){
      console.log("bird can eat seeds -> survive");

    }

  } else if (n === 3) {                           //long and curved
    const btn = document.getElementById('bbtn3');
    btn.style.backgroundColor = "gray";
    if(availableFood = "nectar"){
      console.log("bird can eat nectar -> survive");

    }

  } else if (n === 'reset') {
    const btns = document.querySelectorAll('.beak-btn');
    btns.forEach(btn => {
      btn.style.backgroundColor = "";
    });
    let beakForm = "shortthick"      
    console.log("birdbeak is reset to ",beakForm);
  }
}


function enableFood(n) {
  if (n === 1) {
    const food = document.getElementById('food').checked.value(1);

  } else if (n === 2) {
    const food = document.getElementById('food').value;

  } else if (n === 3) {
    const food = document.getElementById('food').value;

  } else if (n === 'reset') {
    const btns = document.querySelectorAll('.food-btn');
    btns.forEach(food => {
      food.checked = false;
    });
  }
}

function enableColor(n) {
  if (n === 1) {                                  
    const btn = document.getElementById('cbtn1');
    btn.style.backgroundColor = "sienna";
  } else if (n === 2) {
    const btn = document.getElementById('cbtn2');
    btn.style.backgroundColor = "";
  } else if (n === 3) {
    const btn = document.getElementById('cbtn3');
    btn.style.backgroundColor = "limegreen";
  } else if (n === 'reset') {
    const btns = document.querySelectorAll('.color-btn');
    btns.forEach(btn => {
      cbtn1.style.backgroundColor = "saddlebrown";
      cbtn2.style.backgroundColor = "white";
      cbtn3.style.backgroundColor = "lime";
    });
  }
}

//environment
function enableEnv(n) { 
  if (n === 1) {                                  //forest
    const btn = document.getElementById('Forest');
    btn.style.backgroundColor = "gray";
    document.getElementById('simulationBackground').innerHTML = '<img src="https://png.pngtree.com/thumb_back/fh260/back_our/20200630/ourmid/pngtree-green-small-fresh-forest-banner-image_340877.jpg">';

  } else if (n === 2) {                           //tundra
    const btn = document.getElementById('Tundra');
    btn.style.backgroundColor = "gray";
    document.getElementById('simulationBackground').innerHTML = '<img src="https://i.pinimg.com/736x/b5/0e/d3/b50ed315eb512a081ec97ec5c8cf04ea.jpg">';

  } else if (n === 3) {                           //jungle
    const btn = document.getElementById('Jungle');
    btn.style.backgroundColor = "gray";
    document.getElementById('simulationBackground').innerHTML = '<img src="https://i.imgur.com/KpQjTkh.png">';


  } else if (n === 'reset') {
    const btns = document.querySelectorAll('.env-btn');
    btns.forEach(btn => {
      btn.style.backgroundColor = "";
      document.getElementById('simulationBackground').innerHTML = "simulationBackground"
    });
    let size = "small";
    console.log("birdsize is reset to ",size)
  }
}

