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
function enableSize(n) {
  if (n === 1) {                                  //small
    const btn = document.getElementById('sbtn1');
    btn.style.backgroundColor = "gray";
    if(size = "small"){
      console.log("bird is small size");

    }

  } else if (n === 2) {                           //medium
    const btn = document.getElementById('sbtn2');
    btn.style.backgroundColor = "gray";
    if(size = "medium"){
      console.log("bird is medium size");

    }

  } else if (n === 3) {                           //large
    const btn = document.getElementById('sbtn3');
    btn.style.backgroundColor = "gray";
    if(size = "large"){
      console.log("bird is large size");

    }


  } else if (n === 'reset') {
    const btns = document.querySelectorAll('.size-btn');
    btns.forEach(btn => {
      btn.style.backgroundColor = "";
 
    });
    let size = "small";
    console.log("birdsize is reset to ",size)
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
    btn.style.backgroundColor = "saddlebrown";
  } else if (n === 2) {
    const btn = document.getElementById('cbtn2');
    btn.style.backgroundColor = "";
  } else if (n === 3) {
    const btn = document.getElementById('cbtn3');
    btn.style.backgroundColor = "limegreen";
  } else if (n === 'reset') {
    const btns = document.querySelectorAll('.color-btn');
    btns.forEach(btn => {
      cbtn1.style.backgroundColor = "sienna";
      cbtn2.style.backgroundColor = "white";
      cbtn3.style.backgroundColor = "lime";
    });
  }
}