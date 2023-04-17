//const { plugins } = require("chart.js");

let birdCount = 1; //finches
let Generation = 0;
//let MutationRate= 0.3; //IDK YET

//traits (default settings: Short and thick beak(for seeds), Small size, Brown feathers)
let beakForm = new Set(["Dshortthick"])  //["longthin","shortthick"];

let plumageColor = new Set(["Dbrown"]) //["brown","white"]; 

//environment
let availableFood = new Set(["Seeds"]); //["seeds","insects"];
let predators = false;
let area = "forest" //["forest","tundra"] 

let addBirdAmount = 0

//Summon first bird on load
window.onload = function () {

  document.getElementById("generationNumber").innerHTML = Generation; // generation 0 on bar

  var startbird = document.createElement("div");
  startbird.classList.add("bird");
  startbird.classList.add("bird11");
  startbird.classList.add("gen0");
  startbird.classList.add("DshortthickDshortthick");
  startbird.classList.add("Dbrown");
  startbird.id = "startbird";
  document.querySelector(".main").appendChild(startbird);
  document.getElementById("startbird").innerHTML = '<img src="https://i.ibb.co/wW5cDpV/bird11.png" alt="bird11">';


  var startbirdes = document.querySelectorAll(".bird");
  startbirdes.forEach(function (bird) {
    let x = Math.random() * 86;
    x = Math.floor(x);

    let y = Math.random() * 74;
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
    var bird = document.createElement("div");
    bird.classList.add("bird")
    bird.classList.add("bird11");;
    bird.classList.add("gen0");
    bird.classList.add("DshortthickDshortthick");
    bird.classList.add("Dbrown");

    bird.id = "bird";

    document.querySelector(".main").appendChild(bird);

  }
  var birdes = document.querySelectorAll(".bird");
  birdes.forEach(function (bird) {
    bird.innerHTML = '<img src="https://i.ibb.co/wW5cDpV/bird11.png" alt="bird11">';

    let x = Math.random() * 86;
    x = Math.floor(x);

    let y = Math.random() * 74;
    y = Math.floor(y);

    //console.log(x, y)
    bird.style.left = x + "%";
    bird.style.top = y + "%"

  });
  // Make the button disappear
  document.getElementById("startbtn").style.display = "none";
  document.getElementById("info").style.display = "none";


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
            if (beakForm.size == 0 || plumageColor == 0 || availableFood.size == 0) {
              console.log("no beak, color or food selected")
              document.getElementById("title").innerHTML = "No beak, color or food selected     (Refresh the page to try again)"
              return;
            }

            birdReproduction();
            if (birdCount == 0) {
              document.getElementById("title").innerHTML = "All birds have died 💀   <br>(Refresh the page to try again)"
              return
            }
            addData(chart, [Generation], [birdCount])
            progressBar(); // call the function again to loop

          } else {
            document.getElementById("title").innerHTML = "Birds Dominate the Planet!     (population reached the max limit)"
          }
        } else {
          width++;
          elem.style.width = width + "%";
          if(elem.style.width === "70%"){
            console.log("predatorCheck")
            if(isChecked === true ){
             predators = true
          Predators()}
          }
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
  if (beakForm.has("Rlongthin" || "Dlongthin") == true && availableFood.has("Insects") == false) {
    console.log("rip longthin beaks")
    document.querySelectorAll(".bird21").forEach(e => e.remove()); //!!!!! kills all birds with long thin beaks because there are no insects
  }
  if (beakForm.has("shortthick") == true && availableFood.has("Seeds") == false) {
    console.log("rip shortthick beaks")
    document.querySelectorAll(".bird11").forEach(e => e.remove()); //!!!!! kills all birds with short thick beaks because there are no insects
  }


}

function birdReproduction() {
  let genUpS = "gen"
  let genUpN = Generation; //!!!!!
  let genUp = `${genUpS}${genUpN}`;
  console.log(genUp, "genup");

  let bird11Amount = document.getElementsByClassName("bird11").length
  let bird21Amount = document.getElementsByClassName("bird21").length

  let birdClassAmount = bird11Amount + bird21Amount
  console.log(birdClassAmount,"birclassamount")

  if (birdClassAmount > 200) {
    let = randomFloat = Math.random() * (3.5 - 2.5) + 2.5;
    console.log(randomFloat)
   
    h = birdClassAmount / randomFloat //idk
    console.log(h, "starvebirds")
    starvebirdAmount = (birdClassAmount - h) /3
    console.log(starvebirdAmount, "starvebirdAmount")
    for (birdClassAmount; birdClassAmount > starvebirdAmount; birdClassAmount--) {
      document.getElementById("bird").remove()
    }
    console.log(document.getElementsByClassName("bird").length, "birdamountafterkill")
      birdReproduction()
  } else {
    let bird11Count = bird11Amount *3
    let bird21Count = bird21Amount *3
  
  
    let addbird11Amount = bird11Count - bird11Amount
    let addbird21Amount = bird21Count - bird21Amount

    
    addBirdAmount = addbird11Amount + addbird21Amount
  
  console.log(addBirdAmount, "=addbirdamount")

// Get all the HTML birds you want to loop over
const birds = document.querySelectorAll('.bird');

// Loop over the birds, stepping by 2 each time
for (let i = 0; i < birds.length; i += 2) {
  const parent1 = birds[i];
  const parent2 = birds[i + 1];
  console.log(parent1,parent2)
//Beak traits

  // Randomly choose a class from each element
  for (let i = 0; i < 3; i++) {
    // code to be executed
  
  if (parent1.classList.contains("DshortthickDshortthick")){ 
   
   
  }





}

}

  var birdes11 = document.querySelectorAll(".newbird11");


  birdes11.forEach(function (bird) {
    bird.classList.add(genUp)
    bird.classList.add("bird")
    bird.id = "bird";
    bird.innerHTML = '<img src="https://i.ibb.co/wW5cDpV/bird11.png" alt="bird11">';

    let x = Math.random() * 86;
    x = Math.floor(x);

    let y = Math.random() * 74;
    y = Math.floor(y);


    bird.style.left = x + "%";
    bird.style.top = y + "%";

  });

  }


  birdCount = document.getElementsByClassName("bird").length
  console.log("amount of birds is", birdCount);
  birdClassAmount = birdCount



  var birdes11 = document.querySelectorAll(".newbird11");


  birdes11.forEach(function (bird) {
    bird.innerHTML = '<img src="https://i.ibb.co/wW5cDpV/bird11.png" alt="bird11">';

    let x = Math.random() * 86;
    x = Math.floor(x);

    let y = Math.random() * 74;
    y = Math.floor(y);


    bird.style.left = x + "%";
    bird.style.top = y + "%";

  });
  var birdes21 = document.querySelectorAll(".newbird21");
  birdes21.forEach(function (bird) {
    bird.innerHTML = '<img src="https://i.ibb.co/87zqMjv/bird21.png" alt="bird21">';

    let x = Math.random() * 86;
    x = Math.floor(x);

    let y = Math.random() * 74;
    y = Math.floor(y);


    bird.style.left = x + "%";
    bird.style.top = y + "%";

  });


  var oldbird11 = document.querySelectorAll(".newbird11");
  oldbird11.forEach(function (bird) {
    bird.classList.remove("newbird11")
    bird.classList.add("bird11")
  })
  var oldbird21 = document.querySelectorAll(".newbird21");
  oldbird21.forEach(function (bird) {
    bird.classList.remove("newbird21")
    bird.classList.add("bird21")
  })


  if (birdClassAmount > 400) {
    let = randomFloat = Math.random() * (3.5 - 2.5) + 2.5;
    console.log(randomFloat)
   
    h = birdClassAmount / randomFloat //NIET GOED
    console.log(h, "starvebirds")
    starvebirdAmount = (birdClassAmount - h) /3
    console.log(starvebirdAmount, "starvebirdAmount")
    for (birdClassAmount; birdClassAmount > starvebirdAmount; birdClassAmount--) {
      document.getElementById("bird").remove()
    }
    console.log(document.getElementsByClassName("bird").length, "birdamountafterkill")
      birdReproduction()
  }
}

function randomMutation(n){
 if(n ===1){ //Dshortthick Rlongthin
  var firstElementWithClass = document.querySelector('.Rlongthin2');
  firstElementWithClass.classList.add("newbird21")
  firstElementWithClass.classList.add("Rlongthin2")
  firstElementWithClass.classList.add("Dshortthick1")


  console.log("RANDOMMUTATION")
 }
}


function enableBeak(n) {
  if (n === 1 && !beakForm.has("Rlongthin") && !beakForm.has("Dshortthick")) {                                  //long and thin
    const btn = document.getElementById("bbtn1");
    btn.style.backgroundColor = "gray";
    console.log("Dlong and thin")
    beakForm.add("Dlongthin")
    if (availableFood.has("Insects")) {
      console.log("bird can eat insects -> survive");

    } else { }

  } else if (n === 2 && !beakForm.has("Rshortthick") && !beakForm.has("Dlongthin")) {                           //short and thick
    const btn = document.getElementById("bbtn2");
    btn.style.backgroundColor = "gray";
    console.log("Dshort and thick")
    beakForm.add("Dshortthick")
    
    if (availableFood.has("Seeds")) {
      console.log("bird can eat seeds -> survive");

    } else { }

  }  else if (n === 4 && !beakForm.has("Dlongthin") && !beakForm.has("Rshortthick")) {                           
    const btn = document.getElementById("bbtn4");
    btn.style.backgroundColor = "gray";
    console.log("Rlong and thin")
    beakForm.add("Rlongthin")


  } else if (n === 5 && !beakForm.has("Dshortthick")  && !beakForm.has("Rlongthin")) {                          
    const btn = document.getElementById("bbtn5");
    btn.style.backgroundColor = "gray";
    console.log("Rshort and thick")
    beakForm.add("Rshortthick")
    console.log(beakForm)


  }  else if (n === "reset") {
    const btns = document.querySelectorAll(".beak-btn");
    btns.forEach(btn => {
      btn.style.backgroundColor = "";
    });
    beakForm.clear();
    console.log("birdbeak is reset to ", beakForm);
  }
}


function enableFood(m) {
  if (m === 1) {
    const food = document.getElementById("food1").value;
    console.log(food)
    availableFood.add("Seeds");
    console.log(availableFood)
  } else if (m === 2) {
    const food = document.getElementById("food2").value;
    console.log(food)
    availableFood.add("Insects");
    console.log(availableFood)
  }  else if (m === "reset") {
    availableFood.clear()
    console.log(availableFood)
    const btns = document.querySelectorAll(".food-btn");
    btns.forEach(food => {
      food.checked = false;

    });
  }
}

function enableColor(n) {
  if (n === 1  && !plumageColor.has("Rbrown") && !plumageColor.has("Dwhite")) {
    const btn = document.getElementById("cbtn1");
    btn.style.backgroundColor = "sienna";
    console.log("Dbrown")
    plumageColor.add("Dbrown")

  } else if (n === 4 && !plumageColor.has("Dbrown") && !plumageColor.has("Rwhite")) {
    const btn = document.getElementById("cbtn4");
    btn.style.backgroundColor = "sienna";
    console.log("Rbrown")
    plumageColor.add("Rbrown")

  } else if (n === 2 && !plumageColor.has("Dbrown") && !plumageColor.has("Rwhite")) {
    const btn = document.getElementById("cbtn2");
    btn.style.backgroundColor = "";
    console.log("Dwhite")
    plumageColor.add("Dwhite")

  } else if (n === 5 && !plumageColor.has("Rbrown") && !plumageColor.has("Dwhite")) {
    const btn = document.getElementById("cbtn5");
    btn.style.backgroundColor = "";
    console.log("Rwhite")
    plumageColor.add("Rwhite")

  } else if (n === "reset") {
    const btns = document.querySelectorAll(".color-btn");
    btns.forEach(btn => {
      cbtn1.style.backgroundColor = "saddlebrown";
      cbtn2.style.backgroundColor = "white";
      cbtn4.style.backgroundColor = "saddlebrown";
      cbtn5.style.backgroundColor = "white";
    });
    plumageColor.clear()
    console.log("plumageColor is reset to ", plumageColor);

  }
}

//environment
function enableEnv(n) {
  if (n === 1) {                                  //forest
    const btn = document.getElementById("Forest");
    btn.style.backgroundColor = "gray";
    document.getElementById("simulationBackground").innerHTML = '<img src="https://png.pngtree.com/thumb_back/fh260/back_our/20200630/ourmid/pngtree-green-small-fresh-forest-banner-image_340877.jpg">';

  } else if (n === 2) {                           //tundra
    const btn = document.getElementById("Tundra");
    btn.style.backgroundColor = "gray";
    document.getElementById("simulationBackground").innerHTML = '<img src="https://i.pinimg.com/736x/b5/0e/d3/b50ed315eb512a081ec97ec5c8cf04ea.jpg">';

  }  else if (n === "reset") {
    const btns = document.querySelectorAll(".env-btn");
    btns.forEach(btn => {
      btn.style.backgroundColor = "";
      document.getElementById("simulationBackground").innerHTML = "simulationBackground"
    });
    let size = "small";
    console.log("birdsize is reset to ", size)
  }
}
var isChecked = false
function enablePredators(){
  var chxBox = document.querySelector(".switch");
  isChecked = false; //false because the checkbox is unchecked on page load
  chxBox.addEventListener("change", function(){
  isChecked = isChecked ? false : true;
  console.log(isChecked)
  Predators()
  })

}


function Predators(){
  if(isChecked === true && predators === true){
    console.log("gg")
    var bar = document.getElementById("myBar").style.width
  console.log(bar, "predator yesss")
  
  
    
    
  if(bar >= "70%"){
    console.log("ggboys")
    
    
  
  }
  }
}

