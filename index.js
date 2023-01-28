let birdCount = 1; //finches
let Generation = 0;
//let MutationRate= 0.1; //IDK YET

//traits (default settings: Short and thick beak(for seeds), Small size, Brown feathers)
let beakForm = new Set(["shortthick"])  //["longthin","shortthick","longcurved"];

let plumageColor = new Set(["brown"]) //["brown","white","green"]; 

//environment
let availableFood = new Set(["Seeds"]); //["seeds","insects","nectar"];
let predators = false;
let area = "forest" //["forest","jungle","tundra"] 

let addBirdAmount = 0

//Summon first bird on load
window.onload = function () {

  document.getElementById("generationNumber").innerHTML = Generation; // generation 0 on bar

  var startbird = document.createElement('div');
  startbird.classList.add('bird');
  startbird.classList.add('gen0');
  startbird.id = "startbird";
  document.querySelector('.main').appendChild(startbird);
  document.getElementById('startbird').innerHTML = '<img src="https://i.ibb.co/wW5cDpV/bird11.png" alt="bird11">';


  var startbirdes = document.querySelectorAll('.bird');
  startbirdes.forEach(function (bird) {
    let x = Math.random() * 90;
    x = Math.floor(x);

    let y = Math.random() * 80;
    y = Math.floor(y);

    //console.log(x, y)
    bird.style.left = x + "%";
    bird.style.top = y + "%"
  });

};

function startSimulation() {

  //birdCount = 2
  console.log("amount of birds is", birdCount);
  // Add Second Bird

  for (var i = 0; i < 1; i++) {
    var bird = document.createElement('div');
    bird.classList.add('bird');
    bird.classList.add('gen0');

    bird.id = "bird";

    document.querySelector('.main').appendChild(bird);

  }
  var birdes = document.querySelectorAll('.bird');
  birdes.forEach(function (bird) {
    bird.innerHTML = '<img src="https://i.ibb.co/wW5cDpV/bird11.png" alt="bird11">';

    let x = Math.random() * 90;
    x = Math.floor(x);

    let y = Math.random() * 80;
    y = Math.floor(y);

    //console.log(x, y)
    bird.style.left = x + "%";
    bird.style.top = y + "%"

  });
  // Make the button disappear
  document.getElementById("startbtn").style.display = 'none';
  document.getElementById("info").style.display = 'none';


  //move the Generation Bar

  var i = 0;
  let Generation = 0;

  function progressBar() {

    if (i == 0) {
      i = 1;
      var elem = document.getElementById("myBar");
      var width = 1;
      id = setInterval(frame, 50);//speed
      running = true;
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0;

          elem.style.width = "0%";

          if (addBirdAmount < 972) {
            Generation += 1 // generation + 1
            console.log("generation is", Generation)
           

            document.getElementById("generationNumber").innerHTML = Generation;
            birdTerminator();
            if(beakForm.size == 0 || plumageColor == 0){
              console.log("no beak or color selected")
              document.getElementById("title").innerHTML = "No beak or color selected     (Refresh the page to try again)"
              return;
              }
            birdReproduction();
            addData(chart, [Generation], [birdCount])
            progressBar(); // call the function again to loop

          } else {
            document.getElementById("title").innerHTML = "Birds Dominate the Planet!     (population reached the max limit)"
          }
        } else {
          width++;
          elem.style.width = width + "%";
          //console.log(elem.offsetWidth)

        }
        document.getElementById("pausebtn").addEventListener("click", function () {
          if (running) {
            clearInterval(id);
            running = false;
            this.innerHTML = "Resume"
          } else {
            id = setInterval(frame, 50);//speed
            running = true;
            this.innerHTML = "Pause"
          }
        });
      }
    }
  }

  progressBar();



}; // END OF startSimulation
function birdTerminator() { //birds older than 2 generations DIE!
  Generation += 1

  if (Generation >= 2) {
    console.log("TERMINATOR!")
    let birdClass = `${"gen"}${Generation - 2}`
    console.log(birdClass, "birdclass")
    document.querySelectorAll("." + birdClass).forEach(e => e.remove()); //!!!!! TERMINATOR

  }
}

function birdReproduction() {

  console.log("inside function gen", Generation);
  let birdClassAmount = document.getElementsByClassName("bird").length

  console.log("CLASS bird AMOUNT", birdClassAmount);

  if (birdClassAmount > 250){
    let = randomFloat = Math.random() * (3.5-2.5)+ 2.5;
    console.log(randomFloat)
    
    addBirdAmount = birdClassAmount/randomFloat //NIET GOED
    } else{
      birdCount = birdClassAmount*3
  console.log(birdCount, 'this is birdCount')
  addBirdAmount = birdCount - birdClassAmount;
    }
      console.log(addBirdAmount, "=addbirdamount")
      
  /*birdCount = birdClassAmount * 3;
  console.log(birdCount, 'this is birdCount')
  addBirdAmount = birdCount - birdClassAmount;
  console.log(addBirdAmount, "=addbirdamount")

  let newbirdCount = birdCount * 3 // birdcoubt is 2
  console.log("amount of birds is", newbirdCount);
  addBirdAmount = newbirdCount - birdCount;
  console.log(addBirdAmount, "=addbirdamount")
  birdCount = newbirdCount;
  */

  let genUpS = "gen"
  let genUpN = Generation; //!!!!!
  let genUp = `${genUpS}${genUpN}`;
  console.log(genUp, "genup");


  for (var i = 0; i < addBirdAmount; i++) {
    var bird = document.createElement('div');
    bird.classList.add('bird');

    bird.classList.add(genUp)
    bird.classList.add(new Array(...beakForm).filter(name => name.includes('shortthick')));
    bird.classList.add(new Array(...plumageColor));
    console.log((new Array(...plumageColor).join(' ')))
    bird.id = "bird";
    console.log(beakForm, plumageColor)

    document.querySelector('.main').appendChild(bird);
  }
 birdCount = document.getElementsByClassName("bird").length
 console.log("amount of birds is", birdCount);

  var birdes = document.querySelectorAll('.bird');
  birdes.forEach(function (bird) {
    bird.innerHTML = '<img src="https://i.ibb.co/wW5cDpV/bird11.png" alt="bird11">';

    let x = Math.random() * 90;
    x = Math.floor(x);

    let y = Math.random() * 80;
    y = Math.floor(y);


    bird.style.left = x + "%";
    bird.style.top = y + "%";

  });

}


function enableBeak(n) {
  if (n === 1) {                                  //long and thin
    const btn = document.getElementById('bbtn1');
    btn.style.backgroundColor = "gray";
    console.log("long and thin")
    beakForm.add("longthin")
    if (availableFood.has("Insects")) {
      console.log("bird can eat insects -> survive");

    }

  } else if (n === 2) {                           //short and thick
    const btn = document.getElementById('bbtn2');
    btn.style.backgroundColor = "gray";
      console.log("short and thick")
      beakForm.add("shortthick")
    if (availableFood.has("Seeds")) {
      console.log("bird can eat seeds -> survive");

    }

  } else if (n === 3) {                           //long and curved
    const btn = document.getElementById('bbtn3');
    btn.style.backgroundColor = "gray";
    console.log("long and curved")
    beakForm.add("longcurved")
    if (availableFood.has("Nectar")) {
      console.log("bird can eat nectar -> survive");

    }

  } else if (n === 'reset') {
    const btns = document.querySelectorAll('.beak-btn');
    btns.forEach(btn => {
      btn.style.backgroundColor = "";
    });
    beakForm.clear();
    console.log("birdbeak is reset to ", beakForm);
  }
}


function enableFood(m) {
  if (m === 1) {
    const food = document.getElementById('food1').value;
    console.log(food)
    availableFood.add("Seeds");
    console.log(availableFood)
  } else if (m === 2) {
    const food = document.getElementById('food2').value;
    console.log(food)
    availableFood.add("Insects");
    console.log(availableFood)
  } else if (m === 3) {
    const food = document.getElementById('food3').value;
    console.log(food)
    availableFood.add("Nectar");
    console.log(availableFood)
  } else if (m === 'reset') {
    availableFood.clear()
    console.log(availableFood)
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
    console.log("birdsize is reset to ", size)
  }
}

