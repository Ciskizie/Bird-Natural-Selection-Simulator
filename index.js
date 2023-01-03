let birdCount = 1; //finches
let Generation = 0; 
let MutationRate; //IDK YET

function enableBeak(n) {
  if (n === 1) {
    const btn = document.getElementById('bbtn1');
    btn.style.backgroundColor = "gray";
  } else if (n === 2) {
    const btn = document.getElementById('bbtn2');
    btn.style.backgroundColor = "gray";
  } else if (n === 3) {
    const btn = document.getElementById('bbtn3');
    btn.style.backgroundColor = "gray";
  } else if (n === 'reset') {
    const btns = document.querySelectorAll('.beak-btn');
    btns.forEach(btn => {
      btn.style.backgroundColor = "";
    });
  }
}
function enableSize(n) {
  if (n === 1) {
    const btn = document.getElementById('sbtn1');
    btn.style.backgroundColor = "gray";
  } else if (n === 2) {
    const btn = document.getElementById('sbtn2');
    btn.style.backgroundColor = "gray";
  } else if (n === 3) {
    const btn = document.getElementById('sbtn3');
    btn.style.backgroundColor = "gray";
  } else if (n === 'reset') {
    const btns = document.querySelectorAll('.size-btn');
    btns.forEach(btn => {
      btn.style.backgroundColor = "";
    });
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
