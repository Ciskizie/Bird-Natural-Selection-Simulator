//const { plugins } = require("chart.js");

let birdCount = 1; //finches
var birdCountST = 1
var birdCountLT = 0
var birdCountW = 0
var birdCountB = 1
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
  startbird.classList.add("DbrownDbrown");
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
  birdCount = document.getElementsByClassName("bird").length
  console.log("amount of birds is", birdCount);
  // Add Second Bird

  for (var i = 0; i < 1; i++) {
    var bird = document.createElement("div");
    bird.classList.add("bird")
    bird.classList.add("bird11");;
    bird.classList.add("gen0");
    bird.classList.add("DshortthickDshortthick");
    bird.classList.add("DbrownDbrown");

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
      id = setInterval(frame, 30);//speed
      running = true;

      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0;

          elem.style.width = "0%";
 
          if (addBirdAmount < 972) {
           var predator = document.getElementById("predator")
           if(predator != null){
            console.log(predator)
            document.querySelector(".main").removeChild(predator);
          }
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
            
            birdCount = document.getElementsByClassName("bird").length
           
            birdCountST = document.getElementsByClassName("bird11").length + document.getElementsByClassName("bird12").length
            console.log(birdCountST,'shortthickguys')
            
            birdCountLT = document.getElementsByClassName("bird21").length + document.getElementsByClassName("bird22").length
           
            birdCountW = document.getElementsByClassName("bird12").length + document.getElementsByClassName("bird22").length
           
            birdCountB = document.getElementsByClassName("bird21").length + document.getElementsByClassName("bird11").length
            addData(chart, [Generation], [birdCount], [birdCountST], [birdCountLT], [birdCountW], [birdCountB])
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
            id = setInterval(frame, 30);//speed
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
  if (beakForm.has("Rshortthick" || "Dshortthick") == true && availableFood.has("Seeds") == false) {
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
  let bird22Amount = document.getElementsByClassName("bird22").length
  let bird12Amount = document.getElementsByClassName("bird12").length

  let birdClassAmount = bird11Amount + bird21Amount + bird12Amount + bird22Amount
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
  //console.log(parent1,parent2)
//Beak traits

  // Randomly choose a class from each element
  for (let i = 0; i < 3; i++) {
    // code to be executed
  
    if (typeof parent1 != 'undefined' && typeof parent2 != 'undefined') {
     
  
 
      //SIT1 BEAK
      if(parent1.classList.contains("DshortthickDshortthick")){

        if(parent2.classList.contains("DshortthickDshortthick")){ //AA+AA
          const newbird = document.createElement('div');
        newbird.classList.add("DshortthickDshortthick");        //= DshortthickDshortthick   1
        newbird.classList.add("newbird11")
          // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
  
        if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
          
        newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
        newbird.classList.add("newbird11")
        document.querySelector(".main").appendChild(newbird);

        }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
          
        // Generate a random number between 1 and 2 (inclusive)
        const randomNumber = Math.floor(Math.random() * 2) + 1;

        // Output the result to the console
        console.log(randomNumber);
        if(randomNumber === 1){
          newbird.classList.add("DbrownRwhite");        
          newbird.classList.add("newbird11")

        } else {
        newbird.classList.add("DbrownDbrown");        
        newbird.classList.add("newbird11")
  
      }
        document.querySelector(".main").appendChild(newbird);
      }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                  newbird.classList.add("DbrownRwhite");        
        newbird.classList.add("newbird11")
        document.querySelector(".main").appendChild(newbird);

      }
      
      }else if(parent1.classList.contains("DbrownRwhite")){

      if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
       
        // Generate a random number between 1 and 2 (inclusive)
        const randomNumber = Math.floor(Math.random() * 2) + 1;

        // Output the result to the console
        console.log(randomNumber);
        if(randomNumber === 1){
          newbird.classList.add("DbrownRwhite");        
          newbird.classList.add("newbird11")

        } else {
        newbird.classList.add("DbrownDbrown");        
        newbird.classList.add("newbird11")
  
      }
        document.querySelector(".main").appendChild(newbird);
      }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
       
        // Generate a random number between 1 and 4 (inclusive)
        const randomNumber = Math.floor(Math.random() * 4) + 1;

        // Output the result to the console
        console.log(randomNumber);

      // Output the result to the console
      console.log(randomNumber);
      if(randomNumber === 1){
        newbird.classList.add("RwhiteRwhite");       //aa 25% 
        newbird.classList.add("newbird12")

      } else if(randomNumber === 2){
        newbird.classList.add("DbrownDbrown");    //AA 25%     
        newbird.classList.add("newbird11")

      } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
        newbird.classList.add("DbrownRwhite");        
        newbird.classList.add("newbird11")

      }
      document.querySelector(".main").appendChild(newbird);
    }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
     
      // Generate a random number between 1 and 2 (inclusive)
      const randomNumber = Math.floor(Math.random() * 2) + 1;

      // Output the result to the console
      console.log(randomNumber);
      if(randomNumber === 1){
        newbird.classList.add("DbrownRwhite");        
        newbird.classList.add("newbird11")

      } else {
      newbird.classList.add("RwhiteRwhite");        
      newbird.classList.add("newbird12")

    }
      document.querySelector(".main").appendChild(newbird);
    }
    
      }else if(parent1.classList.contains("RwhiteRwhite")){

    if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
    console.log(beakForm)
        newbird.classList.add("DbrownRwhite");        
    newbird.classList.add("newbird11")
    document.querySelector(".main").appendChild(newbird);

    }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
          // Generate a random number between 1 and 2 (inclusive)
    const randomNumber = Math.floor(Math.random() * 2) + 1;

    // Output the result to the console
    console.log(randomNumber);
    if(randomNumber === 1){
      newbird.classList.add("DbrownRwhite");        
      newbird.classList.add("newbird11")

    } else {
    newbird.classList.add("RwhiteRwhite");        
    newbird.classList.add("newbird12")

  }
    document.querySelector(".main").appendChild(newbird);
  }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
    console.log(beakForm)
        newbird.classList.add("RwhiteRwhite");        
    newbird.classList.add("newbird12")
    document.querySelector(".main").appendChild(newbird);

  }

  //SIT2 BEAK
} else if(parent1.classList.contains("DwhiteDwhite")){
  if(parent2.classList.contains("DwhiteDwhite")){
    console.log(beakForm)
        newbird.classList.add("DwhiteDwhite");        
    newbird.classList.add("newbird12")
    document.querySelector(".main").appendChild(newbird);

  } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
        // Generate a random number between 1 and 2 (inclusive)
    const randomNumber = Math.floor(Math.random() * 2) + 1;

    // Output the result to the console
    console.log(randomNumber);
    if(randomNumber === 1){
      newbird.classList.add("DwhiteRbrown");        
      newbird.classList.add("newbird12")

    } else {
    newbird.classList.add("DwhiteDwhite");        
    newbird.classList.add("newbird12")

  }
    document.querySelector(".main").appendChild(newbird);
  } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
    console.log(beakForm)
        newbird.classList.add("DwhiteRbrown");        
    newbird.classList.add("newbird12")
    document.querySelector(".main").appendChild(newbird);

  }
} else if(parent1.classList.contains("DwhiteRbrown")){

      if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
        // Generate a random number between 1 and 2 (inclusive)
        const randomNumber = Math.floor(Math.random() * 2) + 1;

        // Output the result to the console
        console.log(randomNumber);
        if(randomNumber === 1){
          newbird.classList.add("DwhiteRbrown");        
          newbird.classList.add("newbird12")

        } else {
        newbird.classList.add("DwhiteDwhite");        
        newbird.classList.add("newbird12")
  
      }
        document.querySelector(".main").appendChild(newbird);
      }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
        // Generate a random number between 1 and 4 (inclusive)
        const randomNumber = Math.floor(Math.random() * 4) + 1;

        // Output the result to the console
        console.log(randomNumber);

      // Output the result to the console
      console.log(randomNumber);
      if(randomNumber === 1){
        newbird.classList.add("RbrownRbrown");       //aa 25% 
        newbird.classList.add("newbird11")

      } else if(randomNumber === 2){
        newbird.classList.add("DwhiteDwhite");    //AA 25%     
        newbird.classList.add("newbird12")

      } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
        newbird.classList.add("DwhiteRbrown");        
        newbird.classList.add("newbird12")

      }
      document.querySelector(".main").appendChild(newbird);
    }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
            // Generate a random number between 1 and 2 (inclusive)
      const randomNumber = Math.floor(Math.random() * 2) + 1;

      // Output the result to the console
      console.log(randomNumber);
      if(randomNumber === 1){
        newbird.classList.add("DwhiteRbrown");        
        newbird.classList.add("newbird12")

      } else {
      newbird.classList.add("RbrownRbrown");        
      newbird.classList.add("newbird11")

    }
      document.querySelector(".main").appendChild(newbird);
    }
    
      }else if(parent1.classList.contains("RbrownRbrown")){

    if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
    console.log(beakForm)
        newbird.classList.add("DwhiteRbrown");        
    newbird.classList.add("newbird12")
    document.querySelector(".main").appendChild(newbird);

    }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
          // Generate a random number between 1 and 2 (inclusive)
    const randomNumber = Math.floor(Math.random() * 2) + 1;

    // Output the result to the console
    console.log(randomNumber);
    if(randomNumber === 1){
      newbird.classList.add("DwhiteRbrown");        
      newbird.classList.add("newbird12")

    } else {
    newbird.classList.add("RbrownRbrown");        
    newbird.classList.add("newbird11")

  }
    document.querySelector(".main").appendChild(newbird);
  }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
    console.log(beakForm)
        newbird.classList.add("RbrownRbrown");        
    newbird.classList.add("newbird11")
    document.querySelector(".main").appendChild(newbird);

  }
} 
//COLOR

        }else if(parent2.classList.contains("DshortthickRlongthin")){  //AA+Aa
          const newbird = document.createElement('div');
        // Generate a random number between 1 and 2 (inclusive)
        const randomNumber = Math.floor(Math.random() * 2) + 1;

        // Output the result to the console
        console.log(randomNumber);
        if(randomNumber === 1){
          newbird.classList.add("DshortthickRlongthin");        
          newbird.classList.add("newbird11")
          // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
          
        } else {
        newbird.classList.add("DshortthickDshortthick");        
        newbird.classList.add("newbird11")
            // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      }
        document.querySelector(".main").appendChild(newbird);
      }else if(parent2.classList.contains("RlongthinRlongthin")){  //AA+aa
          const newbird = document.createElement('div');
        newbird.classList.add("DshortthickRlongthin");        
        newbird.classList.add("newbird11")
        
                  // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR

      }
      
      }else if(parent1.classList.contains("DshortthickRlongthin")){

      if(parent2.classList.contains("DshortthickDshortthick")){ //Aa+AA
        const newbird = document.createElement('div');
        // Generate a random number between 1 and 2 (inclusive)
        const randomNumber = Math.floor(Math.random() * 2) + 1;

        // Output the result to the console
        console.log(randomNumber);
        if(randomNumber === 1){
          newbird.classList.add("DshortthickRlongthin");        
          newbird.classList.add("newbird11")
          // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
        } else {
        newbird.classList.add("DshortthickDshortthick");        
        newbird.classList.add("newbird11")
            // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      }
        document.querySelector(".main").appendChild(newbird);
      }else if(parent2.classList.contains("DshortthickRlongthin")){  //Aa+Aa
        const newbird = document.createElement('div');
        // Generate a random number between 1 and 4 (inclusive)
        const randomNumber = Math.floor(Math.random() * 4) + 1;

        // Output the result to the console
        console.log(randomNumber);

      // Output the result to the console
      console.log(randomNumber);
      if(randomNumber === 1){
        newbird.classList.add("RlongthinRlongthin");       //aa 25% 
        newbird.classList.add("newbird21")
          // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      } else if(randomNumber === 2){
        newbird.classList.add("DshortthickDshortthick");    //AA 25%     
        newbird.classList.add("newbird11")
          // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
        newbird.classList.add("DshortthickRlongthin");        
        newbird.classList.add("newbird11")
          // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      }
      document.querySelector(".main").appendChild(newbird);
    }else if(parent2.classList.contains("RlongthinRlongthin")){  //Aa+aa
      const newbird = document.createElement('div');
      // Generate a random number between 1 and 2 (inclusive)
      const randomNumber = Math.floor(Math.random() * 2) + 1;

      // Output the result to the console
      console.log(randomNumber);
      if(randomNumber === 1){
        newbird.classList.add("DshortthickRlongthin");        
        newbird.classList.add("newbird11")
          // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      } else {
      newbird.classList.add("RlongthinRlongthin");        
      newbird.classList.add("newbird21")
          // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
    }
      
    }
    
      }else if(parent1.classList.contains("RlongthinRlongthin")){

    if(parent2.classList.contains("DshortthickDshortthick")){ //aa+AA
    console.log(beakForm)
    const newbird = document.createElement('div');
    newbird.classList.add("DshortthickRlongthin");        
    newbird.classList.add("newbird11")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR

    }else if(parent2.classList.contains("DshortthickRlongthin")){  //aa+Aa
      const newbird = document.createElement('div');
    // Generate a random number between 1 and 2 (inclusive)
    const randomNumber = Math.floor(Math.random() * 2) + 1;

    // Output the result to the console
    console.log(randomNumber);
    if(randomNumber === 1){
      newbird.classList.add("DshortthickRlongthin");        
      newbird.classList.add("newbird11")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
    } else {
    newbird.classList.add("RlongthinRlongthin");        
    newbird.classList.add("newbird21")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
  }
    
  }else if(parent2.classList.contains("RlongthinRlongthin")){  //aa+aa
    console.log(beakForm)
    const newbird = document.createElement('div');
    newbird.classList.add("RlongthinRlongthin");        
    newbird.classList.add("newbird21")
    
        
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR

  }

  //SIT2 BEAK
      } else if(parent1.classList.contains("DlongthinDlongthin")){
  if(parent2.classList.contains("DlongthinDlongthin")){
    console.log(beakForm)
    const newbird = document.createElement('div');
    newbird.classList.add("DlongthinDlongthin");        
    newbird.classList.add("newbird21")
    
        
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR

  } else if(parent2.classList.contains("DlongthinRshortthick")){ //AA+Aa
    const newbird = document.createElement('div');
    // Generate a random number between 1 and 2 (inclusive)
    const randomNumber = Math.floor(Math.random() * 2) + 1;

    // Output the result to the console
    console.log(randomNumber);
    if(randomNumber === 1){
      newbird.classList.add("DlongthinRshortthick");        
      newbird.classList.add("newbird21")

          
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
    } else {
    newbird.classList.add("DlongthinDlongthin");        
    newbird.classList.add("newbird21")

        
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
  }
    document.querySelector(".main").appendChild(newbird);
  } else if(parent2.classList.contains("RshortthickRshortthick")){ //AA+aa
    console.log(beakForm)
    const newbird = document.createElement('div');
    newbird.classList.add("DlongthinRshortthick");        
    newbird.classList.add("newbird21")
        
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR

  }
      } else if(parent1.classList.contains("DlongthinRshortthick")){

      if(parent2.classList.contains("DlongthinDlongthin")){ //Aa+AA
        const newbird = document.createElement('div');
        // Generate a random number between 1 and 2 (inclusive)
        const randomNumber = Math.floor(Math.random() * 2) + 1;

        // Output the result to the console
        console.log(randomNumber);
        if(randomNumber === 1){
          newbird.classList.add("DlongthinRshortthick");        
          newbird.classList.add("newbird21")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
        } else {
        newbird.classList.add("DlongthinDlongthin");        
        newbird.classList.add("newbird21")
      
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      }
        
      }else if(parent2.classList.contains("DlongthinRshortthick")){  //Aa+Aa
        const newbird = document.createElement('div');
        // Generate a random number between 1 and 4 (inclusive)
        const randomNumber = Math.floor(Math.random() * 4) + 1;

        // Output the result to the console
        console.log(randomNumber);

      // Output the result to the console
      console.log(randomNumber);
      if(randomNumber === 1){
        newbird.classList.add("RshortthickRshortthick");       //aa 25% 
        newbird.classList.add("newbird11")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      } else if(randomNumber === 2){
        newbird.classList.add("DlongthinDlongthin");    //AA 25%     
        newbird.classList.add("newbird21")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
        newbird.classList.add("DlongthinRshortthick");        
        newbird.classList.add("newbird21")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      }
      
    }else if(parent2.classList.contains("RshortthickRshortthick")){  //Aa+aa
      const newbird = document.createElement('div');
      // Generate a random number between 1 and 2 (inclusive)
      const randomNumber = Math.floor(Math.random() * 2) + 1;

      // Output the result to the console
      console.log(randomNumber);
      if(randomNumber === 1){
        newbird.classList.add("DlongthinRshortthick");        
        newbird.classList.add("newbird21")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      } else {
      newbird.classList.add("RshortthickRshortthick");        
      newbird.classList.add("newbird11")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
    }
     
    }
    
      }else if(parent1.classList.contains("RshortthickRshortthick")){

    if(parent2.classList.contains("DlongthinDlongthin")){ //aa+AA
    console.log(beakForm)
    const newbird = document.createElement('div');
    newbird.classList.add("DlongthinRshortthick");        
    newbird.classList.add("newbird21")
        
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
    }else if(parent2.classList.contains("DlongthinRshortthick")){  //aa+Aa
      const newbird = document.createElement('div');
    // Generate a random number between 1 and 2 (inclusive)
    const randomNumber = Math.floor(Math.random() * 2) + 1;

    // Output the result to the console
    console.log(randomNumber);
    if(randomNumber === 1){
      newbird.classList.add("DlongthinRshortthick");        
      newbird.classList.add("newbird21")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
    } else {
    newbird.classList.add("RshortthickRshortthick");        
    newbird.classList.add("newbird11")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
  }
    document.querySelector(".main").appendChild(newbird);
  }else if(parent2.classList.contains("RshortthickRshortthick")){  //aa+aa
    console.log(beakForm)
    const newbird = document.createElement('div');
    newbird.classList.add("RshortthickRshortthick");        
    newbird.classList.add("newbird11")
    document.querySelector(".main").appendChild(newbird);
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent2.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent2.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent2.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent2.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent2.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent2.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent2.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
  }
} 







    }else {
      console.log(parent1,parent2,"no bird found!")
      const parent3 = birds[i];
      console.log(parent3)
      //SIT1 BEAK
      if(parent1.classList.contains("DshortthickDshortthick")){

        if(parent3.classList.contains("DshortthickDshortthick")){ //AA+AA
          const newbird = document.createElement('div');
        newbird.classList.add("DshortthickDshortthick");        //= DshortthickDshortthick   1
        newbird.classList.add("newbird11")
          // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
  
        if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
          
        newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
        newbird.classList.add("newbird11")
        document.querySelector(".main").appendChild(newbird);

        }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
          
        // Generate a random number between 1 and 2 (inclusive)
        const randomNumber = Math.floor(Math.random() * 2) + 1;

        // Output the result to the console
        console.log(randomNumber);
        if(randomNumber === 1){
          newbird.classList.add("DbrownRwhite");        
          newbird.classList.add("newbird11")

        } else {
        newbird.classList.add("DbrownDbrown");        
        newbird.classList.add("newbird11")
  
      }
        document.querySelector(".main").appendChild(newbird);
      }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                  newbird.classList.add("DbrownRwhite");        
        newbird.classList.add("newbird11")
        document.querySelector(".main").appendChild(newbird);

      }
      
      }else if(parent1.classList.contains("DbrownRwhite")){

      if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
       
        // Generate a random number between 1 and 2 (inclusive)
        const randomNumber = Math.floor(Math.random() * 2) + 1;

        // Output the result to the console
        console.log(randomNumber);
        if(randomNumber === 1){
          newbird.classList.add("DbrownRwhite");        
          newbird.classList.add("newbird11")

        } else {
        newbird.classList.add("DbrownDbrown");        
        newbird.classList.add("newbird11")
  
      }
        document.querySelector(".main").appendChild(newbird);
      }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
       
        // Generate a random number between 1 and 4 (inclusive)
        const randomNumber = Math.floor(Math.random() * 4) + 1;

        // Output the result to the console
        console.log(randomNumber);

      // Output the result to the console
      console.log(randomNumber);
      if(randomNumber === 1){
        newbird.classList.add("RwhiteRwhite");       //aa 25% 
        newbird.classList.add("newbird12")

      } else if(randomNumber === 2){
        newbird.classList.add("DbrownDbrown");    //AA 25%     
        newbird.classList.add("newbird11")

      } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
        newbird.classList.add("DbrownRwhite");        
        newbird.classList.add("newbird11")

      }
      document.querySelector(".main").appendChild(newbird);
    }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
     
      // Generate a random number between 1 and 2 (inclusive)
      const randomNumber = Math.floor(Math.random() * 2) + 1;

      // Output the result to the console
      console.log(randomNumber);
      if(randomNumber === 1){
        newbird.classList.add("DbrownRwhite");        
        newbird.classList.add("newbird11")

      } else {
      newbird.classList.add("RwhiteRwhite");        
      newbird.classList.add("newbird12")

    }
      document.querySelector(".main").appendChild(newbird);
    }
    
      }else if(parent1.classList.contains("RwhiteRwhite")){

    if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
    console.log(beakForm)
        newbird.classList.add("DbrownRwhite");        
    newbird.classList.add("newbird11")
    document.querySelector(".main").appendChild(newbird);

    }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
          // Generate a random number between 1 and 2 (inclusive)
    const randomNumber = Math.floor(Math.random() * 2) + 1;

    // Output the result to the console
    console.log(randomNumber);
    if(randomNumber === 1){
      newbird.classList.add("DbrownRwhite");        
      newbird.classList.add("newbird11")

    } else {
    newbird.classList.add("RwhiteRwhite");        
    newbird.classList.add("newbird12")

  }
    document.querySelector(".main").appendChild(newbird);
  }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
    console.log(beakForm)
        newbird.classList.add("RwhiteRwhite");        
    newbird.classList.add("newbird12")
    document.querySelector(".main").appendChild(newbird);

  }

  //SIT2 BEAK
} else if(parent1.classList.contains("DwhiteDwhite")){
  if(parent3.classList.contains("DwhiteDwhite")){
    console.log(beakForm)
        newbird.classList.add("DwhiteDwhite");        
    newbird.classList.add("newbird12")
    document.querySelector(".main").appendChild(newbird);

  } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
        // Generate a random number between 1 and 2 (inclusive)
    const randomNumber = Math.floor(Math.random() * 2) + 1;

    // Output the result to the console
    console.log(randomNumber);
    if(randomNumber === 1){
      newbird.classList.add("DwhiteRbrown");        
      newbird.classList.add("newbird12")

    } else {
    newbird.classList.add("DwhiteDwhite");        
    newbird.classList.add("newbird12")

  }
    document.querySelector(".main").appendChild(newbird);
  } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
    console.log(beakForm)
        newbird.classList.add("DwhiteRbrown");        
    newbird.classList.add("newbird12")
    document.querySelector(".main").appendChild(newbird);

  }
} else if(parent1.classList.contains("DwhiteRbrown")){

      if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
        // Generate a random number between 1 and 2 (inclusive)
        const randomNumber = Math.floor(Math.random() * 2) + 1;

        // Output the result to the console
        console.log(randomNumber);
        if(randomNumber === 1){
          newbird.classList.add("DwhiteRbrown");        
          newbird.classList.add("newbird12")

        } else {
        newbird.classList.add("DwhiteDwhite");        
        newbird.classList.add("newbird12")
  
      }
        document.querySelector(".main").appendChild(newbird);
      }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
        // Generate a random number between 1 and 4 (inclusive)
        const randomNumber = Math.floor(Math.random() * 4) + 1;

        // Output the result to the console
        console.log(randomNumber);

      // Output the result to the console
      console.log(randomNumber);
      if(randomNumber === 1){
        newbird.classList.add("RbrownRbrown");       //aa 25% 
        newbird.classList.add("newbird11")

      } else if(randomNumber === 2){
        newbird.classList.add("DwhiteDwhite");    //AA 25%     
        newbird.classList.add("newbird12")

      } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
        newbird.classList.add("DwhiteRbrown");        
        newbird.classList.add("newbird12")

      }
      document.querySelector(".main").appendChild(newbird);
    }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
            // Generate a random number between 1 and 2 (inclusive)
      const randomNumber = Math.floor(Math.random() * 2) + 1;

      // Output the result to the console
      console.log(randomNumber);
      if(randomNumber === 1){
        newbird.classList.add("DwhiteRbrown");        
        newbird.classList.add("newbird12")

      } else {
      newbird.classList.add("RbrownRbrown");        
      newbird.classList.add("newbird11")

    }
      document.querySelector(".main").appendChild(newbird);
    }
    
      }else if(parent1.classList.contains("RbrownRbrown")){

    if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
    console.log(beakForm)
        newbird.classList.add("DwhiteRbrown");        
    newbird.classList.add("newbird12")
    document.querySelector(".main").appendChild(newbird);

    }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
          // Generate a random number between 1 and 2 (inclusive)
    const randomNumber = Math.floor(Math.random() * 2) + 1;

    // Output the result to the console
    console.log(randomNumber);
    if(randomNumber === 1){
      newbird.classList.add("DwhiteRbrown");        
      newbird.classList.add("newbird12")

    } else {
    newbird.classList.add("RbrownRbrown");        
    newbird.classList.add("newbird11")

  }
    document.querySelector(".main").appendChild(newbird);
  }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
    console.log(beakForm)
        newbird.classList.add("RbrownRbrown");        
    newbird.classList.add("newbird11")
    document.querySelector(".main").appendChild(newbird);

  }
} 
//COLOR

        }else if(parent3.classList.contains("DshortthickRlongthin")){  //AA+Aa
          const newbird = document.createElement('div');
        // Generate a random number between 1 and 2 (inclusive)
        const randomNumber = Math.floor(Math.random() * 2) + 1;

        // Output the result to the console
        console.log(randomNumber);
        if(randomNumber === 1){
          newbird.classList.add("DshortthickRlongthin");        
          newbird.classList.add("newbird11")
          // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
          
        } else {
        newbird.classList.add("DshortthickDshortthick");        
        newbird.classList.add("newbird11")
            // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      }
        document.querySelector(".main").appendChild(newbird);
      }else if(parent3.classList.contains("RlongthinRlongthin")){  //AA+aa
          const newbird = document.createElement('div');
        newbird.classList.add("DshortthickRlongthin");        
        newbird.classList.add("newbird11")
        
                  // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR

      }
      
      }else if(parent1.classList.contains("DshortthickRlongthin")){

      if(parent3.classList.contains("DshortthickDshortthick")){ //Aa+AA
        const newbird = document.createElement('div');
        // Generate a random number between 1 and 2 (inclusive)
        const randomNumber = Math.floor(Math.random() * 2) + 1;

        // Output the result to the console
        console.log(randomNumber);
        if(randomNumber === 1){
          newbird.classList.add("DshortthickRlongthin");        
          newbird.classList.add("newbird11")
          // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
        } else {
        newbird.classList.add("DshortthickDshortthick");        
        newbird.classList.add("newbird11")
            // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      }
        document.querySelector(".main").appendChild(newbird);
      }else if(parent3.classList.contains("DshortthickRlongthin")){  //Aa+Aa
        const newbird = document.createElement('div');
        // Generate a random number between 1 and 4 (inclusive)
        const randomNumber = Math.floor(Math.random() * 4) + 1;

        // Output the result to the console
        console.log(randomNumber);

      // Output the result to the console
      console.log(randomNumber);
      if(randomNumber === 1){
        newbird.classList.add("RlongthinRlongthin");       //aa 25% 
        newbird.classList.add("newbird21")
          // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      } else if(randomNumber === 2){
        newbird.classList.add("DshortthickDshortthick");    //AA 25%     
        newbird.classList.add("newbird11")
          // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
        newbird.classList.add("DshortthickRlongthin");        
        newbird.classList.add("newbird11")
          // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      }
      document.querySelector(".main").appendChild(newbird);
    }else if(parent3.classList.contains("RlongthinRlongthin")){  //Aa+aa
      const newbird = document.createElement('div');
      // Generate a random number between 1 and 2 (inclusive)
      const randomNumber = Math.floor(Math.random() * 2) + 1;

      // Output the result to the console
      console.log(randomNumber);
      if(randomNumber === 1){
        newbird.classList.add("DshortthickRlongthin");        
        newbird.classList.add("newbird11")
          // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      } else {
      newbird.classList.add("RlongthinRlongthin");        
      newbird.classList.add("newbird21")
          // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
    }
      
    }
    
      }else if(parent1.classList.contains("RlongthinRlongthin")){

    if(parent3.classList.contains("DshortthickDshortthick")){ //aa+AA
    console.log(beakForm)
    const newbird = document.createElement('div');
    newbird.classList.add("DshortthickRlongthin");        
    newbird.classList.add("newbird11")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR

    }else if(parent3.classList.contains("DshortthickRlongthin")){  //aa+Aa
      const newbird = document.createElement('div');
    // Generate a random number between 1 and 2 (inclusive)
    const randomNumber = Math.floor(Math.random() * 2) + 1;

    // Output the result to the console
    console.log(randomNumber);
    if(randomNumber === 1){
      newbird.classList.add("DshortthickRlongthin");        
      newbird.classList.add("newbird11")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
    } else {
    newbird.classList.add("RlongthinRlongthin");        
    newbird.classList.add("newbird21")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
  }
    
  }else if(parent3.classList.contains("RlongthinRlongthin")){  //aa+aa
    console.log(beakForm)
    const newbird = document.createElement('div');
    newbird.classList.add("RlongthinRlongthin");        
    newbird.classList.add("newbird21")
    
        
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR

  }

  //SIT2 BEAK
      } else if(parent1.classList.contains("DlongthinDlongthin")){
  if(parent3.classList.contains("DlongthinDlongthin")){
    console.log(beakForm)
    const newbird = document.createElement('div');
    newbird.classList.add("DlongthinDlongthin");        
    newbird.classList.add("newbird21")
    
        
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR

  } else if(parent3.classList.contains("DlongthinRshortthick")){ //AA+Aa
    const newbird = document.createElement('div');
    // Generate a random number between 1 and 2 (inclusive)
    const randomNumber = Math.floor(Math.random() * 2) + 1;

    // Output the result to the console
    console.log(randomNumber);
    if(randomNumber === 1){
      newbird.classList.add("DlongthinRshortthick");        
      newbird.classList.add("newbird21")

          
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
    } else {
    newbird.classList.add("DlongthinDlongthin");        
    newbird.classList.add("newbird21")

        
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
  }
    document.querySelector(".main").appendChild(newbird);
  } else if(parent3.classList.contains("RshortthickRshortthick")){ //AA+aa
    console.log(beakForm)
    const newbird = document.createElement('div');
    newbird.classList.add("DlongthinRshortthick");        
    newbird.classList.add("newbird21")
        
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR

  }
      } else if(parent1.classList.contains("DlongthinRshortthick")){

      if(parent3.classList.contains("DlongthinDlongthin")){ //Aa+AA
        const newbird = document.createElement('div');
        // Generate a random number between 1 and 2 (inclusive)
        const randomNumber = Math.floor(Math.random() * 2) + 1;

        // Output the result to the console
        console.log(randomNumber);
        if(randomNumber === 1){
          newbird.classList.add("DlongthinRshortthick");        
          newbird.classList.add("newbird21")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
        } else {
        newbird.classList.add("DlongthinDlongthin");        
        newbird.classList.add("newbird21")
      
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      }
        
      }else if(parent3.classList.contains("DlongthinRshortthick")){  //Aa+Aa
        const newbird = document.createElement('div');
        // Generate a random number between 1 and 4 (inclusive)
        const randomNumber = Math.floor(Math.random() * 4) + 1;

        // Output the result to the console
        console.log(randomNumber);

      // Output the result to the console
      console.log(randomNumber);
      if(randomNumber === 1){
        newbird.classList.add("RshortthickRshortthick");       //aa 25% 
        newbird.classList.add("newbird11")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      } else if(randomNumber === 2){
        newbird.classList.add("DlongthinDlongthin");    //AA 25%     
        newbird.classList.add("newbird21")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
        newbird.classList.add("DlongthinRshortthick");        
        newbird.classList.add("newbird21")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      }
      
    }else if(parent3.classList.contains("RshortthickRshortthick")){  //Aa+aa
      const newbird = document.createElement('div');
      // Generate a random number between 1 and 2 (inclusive)
      const randomNumber = Math.floor(Math.random() * 2) + 1;

      // Output the result to the console
      console.log(randomNumber);
      if(randomNumber === 1){
        newbird.classList.add("DlongthinRshortthick");        
        newbird.classList.add("newbird21")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
      } else {
      newbird.classList.add("RshortthickRshortthick");        
      newbird.classList.add("newbird11")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
    }
     
    }
    
      }else if(parent1.classList.contains("RshortthickRshortthick")){

    if(parent3.classList.contains("DlongthinDlongthin")){ //aa+AA
    console.log(beakForm)
    const newbird = document.createElement('div');
    newbird.classList.add("DlongthinRshortthick");        
    newbird.classList.add("newbird21")
        
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
    }else if(parent3.classList.contains("DlongthinRshortthick")){  //aa+Aa
      const newbird = document.createElement('div');
    // Generate a random number between 1 and 2 (inclusive)
    const randomNumber = Math.floor(Math.random() * 2) + 1;

    // Output the result to the console
    console.log(randomNumber);
    if(randomNumber === 1){
      newbird.classList.add("DlongthinRshortthick");        
      newbird.classList.add("newbird21")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
    } else {
    newbird.classList.add("RshortthickRshortthick");        
    newbird.classList.add("newbird11")
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
  }
    document.querySelector(".main").appendChild(newbird);
  }else if(parent3.classList.contains("RshortthickRshortthick")){  //aa+aa
    console.log(beakForm)
    const newbird = document.createElement('div');
    newbird.classList.add("RshortthickRshortthick");        
    newbird.classList.add("newbird11")
    document.querySelector(".main").appendChild(newbird);
    
              // COLOR

      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){
          
                if(parent3.classList.contains("DbrownDbrown")){ //AA+AA
                          
                newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
                }else if(parent3.classList.contains("DbrownRwhite")){  //AA+Aa
                  
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("RwhiteRwhite")){  //AA+aa
                                  newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
                document.querySelector(".main").appendChild(newbird);
        
              }
              
              }else if(parent1.classList.contains("DbrownRwhite")){
        
              if(parent3.classList.contains("DbrownDbrown")){ //Aa+AA
               
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DbrownRwhite");        
                  newbird.classList.add("newbird11")
        
                } else {
                newbird.classList.add("DbrownDbrown");        
                newbird.classList.add("newbird11")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DbrownRwhite")){  //Aa+Aa
               
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RwhiteRwhite");       //aa 25% 
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DbrownDbrown");    //AA 25%     
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RwhiteRwhite")){  //Aa+aa
             
              // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DbrownRwhite");        
                newbird.classList.add("newbird11")
        
              } else {
              newbird.classList.add("RwhiteRwhite");        
              newbird.classList.add("newbird12")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RwhiteRwhite")){
        
            if(parent3.classList.contains("DbrownDbrown")){ //aa+AA
                      newbird.classList.add("DbrownRwhite");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DbrownRwhite")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DbrownRwhite");        
              newbird.classList.add("newbird11")
        
            } else {
            newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RwhiteRwhite")){  //aa+aa
                      newbird.classList.add("RwhiteRwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        
          //SIT2 BEAK
        } else if(parent1.classList.contains("DwhiteDwhite")){
          if(parent3.classList.contains("DwhiteDwhite")){
                      newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          } else if(parent3.classList.contains("DwhiteRbrown")){ //AA+Aa
                // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("DwhiteDwhite");        
            newbird.classList.add("newbird12")
        
          }
            document.querySelector(".main").appendChild(newbird);
          } else if(parent3.classList.contains("RbrownRbrown")){ //AA+aa
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } else if(parent1.classList.contains("DwhiteRbrown")){
        
              if(parent3.classList.contains("DwhiteDwhite")){ //Aa+AA
                // Generate a random number between 1 and 2 (inclusive)
                const randomNumber = Math.floor(Math.random() * 2) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
                if(randomNumber === 1){
                  newbird.classList.add("DwhiteRbrown");        
                  newbird.classList.add("newbird12")
        
                } else {
                newbird.classList.add("DwhiteDwhite");        
                newbird.classList.add("newbird12")
          
              }
                document.querySelector(".main").appendChild(newbird);
              }else if(parent3.classList.contains("DwhiteRbrown")){  //Aa+Aa
                // Generate a random number between 1 and 4 (inclusive)
                const randomNumber = Math.floor(Math.random() * 4) + 1;
        
                // Output the result to the console
                console.log(randomNumber);
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("RbrownRbrown");       //aa 25% 
                newbird.classList.add("newbird11")
        
              } else if(randomNumber === 2){
                newbird.classList.add("DwhiteDwhite");    //AA 25%     
                newbird.classList.add("newbird12")
        
              } else if(randomNumber === 3 || randomNumber === 4){  //Aa 50% 
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              }
              document.querySelector(".main").appendChild(newbird);
            }else if(parent3.classList.contains("RbrownRbrown")){  //Aa+aa
                    // Generate a random number between 1 and 2 (inclusive)
              const randomNumber = Math.floor(Math.random() * 2) + 1;
        
              // Output the result to the console
              console.log(randomNumber);
              if(randomNumber === 1){
                newbird.classList.add("DwhiteRbrown");        
                newbird.classList.add("newbird12")
        
              } else {
              newbird.classList.add("RbrownRbrown");        
              newbird.classList.add("newbird11")
        
            }
              document.querySelector(".main").appendChild(newbird);
            }
            
              }else if(parent1.classList.contains("RbrownRbrown")){
        
            if(parent3.classList.contains("DwhiteDwhite")){ //aa+AA
                      newbird.classList.add("DwhiteRbrown");        
            newbird.classList.add("newbird12")
            document.querySelector(".main").appendChild(newbird);
        
            }else if(parent3.classList.contains("DwhiteRbrown")){  //aa+Aa
                  // Generate a random number between 1 and 2 (inclusive)
            const randomNumber = Math.floor(Math.random() * 2) + 1;
        
            // Output the result to the console
            console.log(randomNumber);
            if(randomNumber === 1){
              newbird.classList.add("DwhiteRbrown");        
              newbird.classList.add("newbird12")
        
            } else {
            newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
        
          }
            document.querySelector(".main").appendChild(newbird);
          }else if(parent3.classList.contains("RbrownRbrown")){  //aa+aa
                      newbird.classList.add("RbrownRbrown");        
            newbird.classList.add("newbird11")
            document.querySelector(".main").appendChild(newbird);
        
          }
        } 
        //COLOR
  }
} 
    }





}

}



  }


  birdCount = document.getElementsByClassName("bird").length
  console.log("amount of birds is", birdCount);
  birdClassAmount = birdCount


  var birdes11 = document.querySelectorAll(".newbird11");


  birdes11.forEach(function (bird) {
    bird.classList.add(genUp)
    bird.classList.add("bird")
    bird.id = "bird";
    bird.innerHTML = '<img src="https://i.ibb.co/wW5cDpV/bird11.png" alt="bird11" >';

    let x = Math.random() * 86;
    x = Math.floor(x);

    let y = Math.random() * 74;
    y = Math.floor(y);


    bird.style.left = x + "%";
    bird.style.top = y + "%";

  });
  var doublebird = document.querySelectorAll(".bird")

  doublebird.forEach(function (bird) {
    
    if(bird.classList.contains("newbird11") && bird.classList.contains("newbird21")){
      console.log(bird,"doubletrouble")
    bird.classList.remove("newbird11")

  }
});
  var birdes21 = document.querySelectorAll(".newbird21");
  birdes21.forEach(function (bird) {
    bird.classList.add(genUp)
    bird.classList.add("bird")
    bird.id = "bird";
    bird.innerHTML = '<img src="https://i.ibb.co/87zqMjv/bird21.png" alt="bird21">';

    let x = Math.random() * 86;
    x = Math.floor(x);

    let y = Math.random() * 74;
    y = Math.floor(y);


    bird.style.left = x + "%";
    bird.style.top = y + "%";

  });

  var birdes12 = document.querySelectorAll(".newbird12");
  birdes12.forEach(function (bird) {
    bird.classList.add(genUp)
    bird.classList.add("bird")
    bird.id = "bird";
    bird.innerHTML = '<img src="https://i.ibb.co/sqXD6KC/bird12.png" alt="bird12">';

    let x = Math.random() * 86;
    x = Math.floor(x);

    let y = Math.random() * 74;
    y = Math.floor(y);


    bird.style.left = x + "%";
    bird.style.top = y + "%";

  });

  var doublebird = document.querySelectorAll(".bird")

  doublebird.forEach(function (bird) {
    
    if(bird.classList.contains("newbird21") && bird.classList.contains("newbird12")){
      console.log(bird,"doubletrouble")
    bird.classList.remove("newbird21")
    bird.classList.remove("newbird12")
    bird.classList.add("newbird22")
  }
});
  var birdes22 = document.querySelectorAll(".newbird22");
  birdes22.forEach(function (bird) {
    bird.classList.add(genUp)
    bird.classList.add("bird")
    bird.id = "bird";
    bird.innerHTML = '<img src="https://i.ibb.co/XYHG6nf/bird22.png" alt="bird22">';

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
  var oldbird12 = document.querySelectorAll(".newbird12");
  oldbird12.forEach(function (bird) {
    bird.classList.remove("bird11")
    bird.classList.remove("newbird12")
    bird.classList.add("bird12")
  })
  var oldbird22 = document.querySelectorAll(".newbird22");
  oldbird22.forEach(function (bird) {
    bird.classList.remove("newbird22")
    bird.classList.add("bird22")
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
 if(n === 4){ //Rlongthin
  var firstElementWithClass = document.querySelector('.DshortthickDshortthick');
  if(firstElementWithClass.classList.contains("DshortthickDshortthick")){
  firstElementWithClass.classList.remove("DshortthickDshortthick")
  firstElementWithClass.classList.add("DshortthickRlongthin")
 console.log(firstElementWithClass)
}
  console.log("RANDOMMUTATION")
 }else if(n === 2){ //Dlongthin
  var firstElementWithClass = document.querySelector('.DshortthickDshortthick');
  if(firstElementWithClass.classList.contains("DshortthickDshortthick")){
  firstElementWithClass.classList.remove("DshortthickDshortthick")
  firstElementWithClass.classList.add("DlongthinDlongthin")
 console.log(firstElementWithClass)
}
  console.log("RANDOMMUTATION")
 }else if(n === 3){ //Rshortthick
  var firstElementWithClass = document.querySelector('.DshortthickDshortthick');
  if(firstElementWithClass.classList.contains("DshortthickDshortthick")){
  firstElementWithClass.classList.remove("DshortthickDshortthick")
  firstElementWithClass.classList.add("DlongthinRshortthick")
 console.log(firstElementWithClass)
}
  console.log("RANDOMMUTATION")
 }else if(n === 5){ //Dbrown

  console.log("RANDOMMUTATION")
 }else if(n === 6){ //Rbrown
  var firstElementWithClass = document.querySelector('.DbrownDbrown');
  if(firstElementWithClass.classList.contains("DbrownDbrown")){
  firstElementWithClass.classList.remove("DbrownDbrown")
  firstElementWithClass.classList.add("DwhiteRbrown")
 console.log(firstElementWithClass)
}
  console.log("RANDOMMUTATION")
 }else if(n === 7){ //Dwhite
  var firstElementWithClass = document.querySelector('.DbrownDbrown');
  if(firstElementWithClass.classList.contains("DbrownDbrown")){
  firstElementWithClass.classList.remove("DbrownDbrown")
  firstElementWithClass.classList.add("DwhiteDwhite")
 console.log(firstElementWithClass)
}
  console.log("RANDOMMUTATION")
 }else if(n === 8){ //Rwhite
  var firstElementWithClass = document.querySelector('.DbrownDbrown');
  if(firstElementWithClass.classList.contains("DbrownDbrown")){
  firstElementWithClass.classList.remove("DbrownDbrown")
  firstElementWithClass.classList.add("DbrownRwhite")
 console.log(firstElementWithClass)
}
  console.log("RANDOMMUTATION")
 }
}


function enableBeak(n) {
  if (n === 1 && !beakForm.has("Rlongthin") && !beakForm.has("Dshortthick")) {                                  //Dlong and thin
    const btn = document.getElementById("bbtn1");
    btn.style.backgroundColor = "gray";
    console.log("Dlong and thin")
    beakForm.add("Dlongthin")
    randomMutation(2)
    if (availableFood.has("Insects")) {
      console.log("bird can eat insects -> survive");

    } else { }

  } else if (n === 2 && !beakForm.has("Rshortthick") && !beakForm.has("Dlongthin")) {                           //Dshort and thick
    const btn = document.getElementById("bbtn2");
    btn.style.backgroundColor = "gray";
    console.log("Dshort and thick")
    beakForm.add("Dshortthick")
    randomMutation(1)
    if (availableFood.has("Seeds")) {
      console.log("bird can eat seeds -> survive");

    } else { }

  }  else if (n === 4 && !beakForm.has("Dlongthin") && !beakForm.has("Rshortthick")) {                         //Rlong and thin        
    const btn = document.getElementById("bbtn4");
    btn.style.backgroundColor = "gray";
    console.log("Rlong and thin")
    beakForm.add("Rlongthin")
    randomMutation(4)


  } else if (n === 5 && !beakForm.has("Dshortthick")  && !beakForm.has("Rlongthin")) {                        //Rshort and thick  
    const btn = document.getElementById("bbtn5");
    btn.style.backgroundColor = "gray";
    console.log("Rshort and thick")
    beakForm.add("Rshortthick")
    console.log(beakForm)
    randomMutation(3)


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
    randomMutation(5)

  } else if (n === 4 && !plumageColor.has("Dbrown") && !plumageColor.has("Rwhite")) {
    const btn = document.getElementById("cbtn4");
    btn.style.backgroundColor = "sienna";
    console.log("Rbrown")
    plumageColor.add("Rbrown")
    randomMutation(6)
  } else if (n === 2 && !plumageColor.has("Dbrown") && !plumageColor.has("Rwhite")) {
    const btn = document.getElementById("cbtn2");
    btn.style.backgroundColor = "";
    console.log("Dwhite")
    plumageColor.add("Dwhite")
    randomMutation(7)
  } else if (n === 5 && !plumageColor.has("Rbrown") && !plumageColor.has("Dwhite")) {
    const btn = document.getElementById("cbtn5");
    btn.style.backgroundColor = "";
    console.log("Rwhite")
    plumageColor.add("Rwhite")
    randomMutation(8)

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
    area = "forest"
    console.log(area)
  } else if (n === 2) {                           //tundra
    const btn = document.getElementById("Tundra");
    btn.style.backgroundColor = "gray";
    document.getElementById("simulationBackground").innerHTML = '<img src="https://i.pinimg.com/736x/b5/0e/d3/b50ed315eb512a081ec97ec5c8cf04ea.jpg">';
    area = "tundra"
    console.log(area)
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
    var predator = document.createElement("div");
    predator.classList.add("predator")
    
    predator.id = "predator"
    document.querySelector(".main").appendChild(predator);
    document.getElementById("predator").innerHTML = '<img src="https://i.ibb.co/QP0SZ1y/ezgif-com-gif-maker-2.gifAA" alt="ezgif-com-gif-maker-2">';

    var predatores = document.querySelectorAll(".predator");
    predatores.forEach(function (predator) {

  
      //console.log(x, y)
      predator.style.left = "35%";
      predator.style.top = "5%"
    });

    if(area === "forest"){
      console.log("white birds die")
      let randomNumber = Math.floor(Math.random() * 6) + 5;
       console.log(randomNumber);
    let  birds = document.getElementsByClassName("bird").length
    let survivors = birds/randomNumber 
    let goners = birds - survivors
    console.log(goners)
    for (let i = 0; i < goners; i++) {
      // code to be executed
      let birds = document.querySelectorAll('.bird');
      if (birds[i].classList.contains("bird12") || birds[i].classList.contains("bird22")){
        console.log(birds[i])
        birds[i].remove()
      }
      
    }
    
    }else if(area === "tundra"){
      console.log("brown birds die")
      let randomNumber = Math.floor(Math.random() * 6) + 5;
       console.log(randomNumber);
    let  birds = document.getElementsByClassName("bird").length
    let survivors = birds/randomNumber 
    let goners = birds - survivors
    console.log(goners)
    for (let i = 0; i < goners; i++) {
      // code to be executed
      let birds = document.querySelectorAll('.bird');
      if (birds[i].classList.contains("bird11") || birds[i].classList.contains("bird21")){
        console.log(birds[i])
        birds[i].remove()

      }
      
    }
    }
    
  
  }

  }
  
}

