/* if (beakForm.has("longthin") && beakForm.has("shortthick")) {
       console.log("beakcheck", beakForm, new Array(...beakForm).filter(name => name.includes("longthin")))
       if (availableFood.has("Seeds")){
       var d = Math.random()
       if (d < 0.3) {
         beakForm.delete("shortthick")
         console.log(beakForm, 0.3)
         bird.classList.add(new Array(...beakForm));
         bird.classList.add("bird21")
         beakForm.add("shortthick")
 
       } else {
         beakForm.delete("longthin")
         console.log(beakForm, 0.7)
         bird.classList.add(new Array(...beakForm));
         bird.classList.add("bird11")
         beakForm.add("longthin")
 
       }}else{
         beakForm.delete("shortthick")
         bird.classList.add(new Array(...beakForm));
         bird.classList.add("bird21")
         beakForm.add("shortthick")
       }
     } else if(beakForm.size == 1 && beakForm.has("shortthick")){
       bird.classList.add(new Array(...beakForm))
       bird.classList.add("bird11")
     }else if(beakForm.size == 1 && beakForm.has("longthin")){
       bird.classList.add(new Array(...beakForm))
       bird.classList.add("bird21")}*/
       if (plumageColor.size == 2) {
        if (plumageColor.has("brown") && plumageColor.has("white")) {
          var bird12 = document.querySelector()
        }
      }
      if (beakForm.size == 2) {
        if (beakForm.has("longthin") && beakForm.has("shortthick")) {
          if (availableFood.has("Seeds")) {
            var d = Math.random()
            if (d < 0.3) { //chance for longthin
              beakForm.delete("shortthick")
              console.log(beakForm, 0.3)
              bird.classList.add(new Array(...beakForm));
              bird.classList.add("newbird21")
              beakForm.add("shortthick")
  
            } else {
              beakForm.delete("longthin")
              console.log(beakForm, 0.7)
              bird.classList.add(new Array(...beakForm));
              bird.classList.add("newbird11")
              beakForm.add("longthin")
  
            }
  
          } else {
            beakForm.delete("shortthick")
            bird.classList.add(new Array(...beakForm));
            bird.classList.add("newbird21")
            beakForm.add("shortthick")
          }
        }
        if (beakForm.has("longcurved") && beakForm.has("shortthick")) {
          if (availableFood.has("Nectar")) {
            var d = Math.random()
            if (d < 0.3) { //chance for longcurved
              beakForm.delete("shortthick")
              console.log(beakForm, 0.3)
              bird.classList.add(new Array(...beakForm));
              bird.classList.add("newbird31")
              beakForm.add("shortthick")
  
            } else {
              beakForm.delete("longcurved")
              console.log(beakForm, 0.7)
              bird.classList.add(new Array(...beakForm));
              bird.classList.add("newbird11")
              beakForm.add("longcurved")
            }
          } else {
            beakForm.delete("longcurved")
            console.log(beakForm, 0.7)
            bird.classList.add(new Array(...beakForm));
            bird.classList.add("newbird11")
            beakForm.add("longcurved")
          }
        }
        if (beakForm.has("longthin") && beakForm.has("longcurved")) {
          if (availableFood.has("Nectar")) {
            var d = Math.random()
            if (d < 0.3) { //chance for longcurved
              beakForm.delete("longthin")
              console.log(beakForm, 0.3)
              bird.classList.add(new Array(...beakForm));
              bird.classList.add("newbird31")
              beakForm.add("longthin")
  
            } else {
              beakForm.delete("longcurved")
              console.log(beakForm, 0.7)
              bird.classList.add(new Array(...beakForm));
              bird.classList.add("newbird21")
              beakForm.add("longcurved")
            }
          } else {
            beakForm.delete("longthin")
            console.log(beakForm, 0.7)
            bird.classList.add(new Array(...beakForm));
            bird.classList.add("newbird21")
            beakForm.add("longthin")
          }
        }
      } else if (beakForm.size == 1) {
        if (beakForm.has("shortthick")) {
          bird.classList.add(new Array(...beakForm))
          bird.classList.add("newbird11")
        }
        if (beakForm.has("longthin")) {
          bird.classList.add(new Array(...beakForm))
          bird.classList.add("newbird21")
        }
        if (beakForm.has("longcurved")) {
          bird.classList.add(new Array(...beakForm))
          bird.classList.add("newbird31")
        }
      }

// COLOR
      //SIT1 COLOR
      if(parent1.classList.contains("DbrownDbrown")){

        if(parent2.classList.contains("DbrownDbrown")){ //AA+AA
        console.log(beakForm)
        const newbird = document.createElement('div');
        newbird.classList.add("DbrownDbrown");        //= DbrownDbrown   1
        newbird.classList.add("newbird11")
        document.querySelector(".main").appendChild(newbird);

        }else if(parent2.classList.contains("DbrownRwhite")){  //AA+Aa
          const newbird = document.createElement('div');
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
        console.log(beakForm)
        const newbird = document.createElement('div');
        newbird.classList.add("DbrownRwhite");        
        newbird.classList.add("newbird11")
        document.querySelector(".main").appendChild(newbird);

      }
      
      }else if(parent1.classList.contains("DbrownRwhite")){

      if(parent2.classList.contains("DbrownDbrown")){ //Aa+AA
        const newbird = document.createElement('div');
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
        const newbird = document.createElement('div');
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
      const newbird = document.createElement('div');
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
    const newbird = document.createElement('div');
    newbird.classList.add("DbrownRwhite");        
    newbird.classList.add("newbird11")
    document.querySelector(".main").appendChild(newbird);

    }else if(parent2.classList.contains("DbrownRwhite")){  //aa+Aa
      const newbird = document.createElement('div');
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
    const newbird = document.createElement('div');
    newbird.classList.add("RwhiteRwhite");        
    newbird.classList.add("newbird12")
    document.querySelector(".main").appendChild(newbird);

  }

  //SIT2 BEAK
} else if(parent1.classList.contains("DwhiteDwhite")){
  if(parent2.classList.contains("DwhiteDwhite")){
    console.log(beakForm)
    const newbird = document.createElement('div');
    newbird.classList.add("DwhiteDwhite");        
    newbird.classList.add("newbird12")
    document.querySelector(".main").appendChild(newbird);

  } else if(parent2.classList.contains("DwhiteRbrown")){ //AA+Aa
    const newbird = document.createElement('div');
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
    const newbird = document.createElement('div');
    newbird.classList.add("DwhiteRbrown");        
    newbird.classList.add("newbird12")
    document.querySelector(".main").appendChild(newbird);

  }
} else if(parent1.classList.contains("DwhiteRbrown")){

      if(parent2.classList.contains("DwhiteDwhite")){ //Aa+AA
        const newbird = document.createElement('div');
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
        const newbird = document.createElement('div');
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
      const newbird = document.createElement('div');
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
    const newbird = document.createElement('div');
    newbird.classList.add("DwhiteRbrown");        
    newbird.classList.add("newbird12")
    document.querySelector(".main").appendChild(newbird);

    }else if(parent2.classList.contains("DwhiteRbrown")){  //aa+Aa
      const newbird = document.createElement('div');
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
    const newbird = document.createElement('div');
    newbird.classList.add("RbrownRbrown");        
    newbird.classList.add("newbird11")
    document.querySelector(".main").appendChild(newbird);

  }
} 
//COLOR