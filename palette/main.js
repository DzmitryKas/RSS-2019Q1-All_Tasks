transform.onclick = function() { 
  var elementChildrens = document.querySelector('#canvas').children;
  console.log(elementChildrens);
  
  let transform = document.querySelector( '#canvas div');
  console.log(transform);
  
  
  Array.from(elementChildrens).forEach(function (transform) {
    transform.addEventListener('click', function (e) {  
      e.target.classList.toggle('circle')  
  })
  });
};

// const chooseColorEl = document.getElementById('choose-color');

// chooseColorEl.addEventListener('click', finction (event) {

//   console.log('click',event)

// });


