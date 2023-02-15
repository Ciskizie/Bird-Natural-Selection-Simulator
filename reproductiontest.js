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