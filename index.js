
const pricePerSeat=2000;
const seatRows = ['A', 'B', 'C', 'D', 'E'];
        const seatColumns = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

document.addEventListener('DOMContentLoaded', function () {
  // Creating a scrollable images
  const scrollContainer = document.getElementById('scroll-container');
  scrollContainer.innerHTML = `
    <img src='./images/DrStrange.jpg' alt="DR. STRANGE">
    <img src='./images/thor.jpg' alt="THOR LOVE AND THUNDER">
    <img src='./images/wakanda.jpg' alt="WAKANDA FOREVER">
    <img src='./images/blacklist.jpg' alt="THE BLACKLIST">
    <img src='./images/htgawm.jpg' alt="HOW TO GET AWAY WITH MURDER">
    <img src='./images/woman.jpg' alt="THE WOMAN KING">
  `;

  // Fetching movies from the server
  fetch('https://json-server-movies.onrender.com/movies')
    .then(response => response.json())
    .then(data => {
      // Creating movie cards
      for (const movie of data) {
        const cardInfo = document.createElement('div');
        cardInfo.className = 'card1Info';
        cardInfo.innerHTML = `
          <img src='${movie.image}' alt="${movie.title}" class="imagecontainer">
          <h2>${movie.title}</h2>
          <h2>${movie.title2}</h2>
          <p>${movie.description}</p>
          <p class="pg">PG HOLLYWOOD</p>
          <p>${movie.genre}</p>
          2D
          <p>Screen1, Screen2, Screen 5</p>
          <p>${movie.days1}</p>
          <div class="time">
            <div id="time1">
              <button>${movie.time1x}</button>
              <button>${movie.time1a}</button>
              <button>${movie.time1b}</button>
              <button>${movie.time1c}</button>
              <button>${movie.time1d}</button>
            </div>
          </div>
          <p>3D VIP</p>
          <p>Screen3, Screen4</p>
          <p>${movie.days2}</p>
          <div class="time">
            <div id="time2">
              <button>${movie.time2}</button>
              <button>${movie.time2a}</button>
              <button>${movie.time2b}</button>
            </div>
          </div>
          <button class="selectSeats" type="button">Select Seats</button>
        `;

        // Appending the movie card to the document body
        document.body.appendChild(cardInfo);
      }
      //appending the payment form after the cards
      document.body.appendChild(paymentForm);


      // Grabbing the select seat button
     const selectSeatsButtons = document.querySelectorAll('.selectSeats');

      // For each button, once clicked, it displays a container for seats
      for (let i = 0; i < selectSeatsButtons.length; i++) {
        selectSeatsButtons[i].addEventListener('click', function () {
          console.log('Button clicked'); // Check if the button click event is triggered

          const seatsContainer = document.createElement('div');
          seatsContainer.className = 'seatsContainer';
          if (seatsContainer) {
            // If seatsContainer already exists, remove it
            seatsContainer.remove();//not well implemented
          }
          console.log(seatsContainer);
          //the new seats container
          const newSeatsContainer = document.createElement('div');
          newSeatsContainer.className = 'seatsContainerCollapsed';
          const closeButton=document.createElement('button');
          closeButton.className='closeButton'
          closeButton.textContent='CLOSE'
          newSeatsContainer.appendChild(closeButton)

          //  newSeatsContainer.appendChild(closeButton)
          document.body.appendChild(newSeatsContainer);
          
          //to make the screen container to appear
          
          if (seatsContainer.classList.contains('seatsContainerExpanded')) {
            seatsContainer.classList.remove('seatsContainerExpanded');
            newSeatsContainer.classList.remove('seatsContainerExpanded');
          } else {
            seatsContainer.classList.add('seatsContainerExpanded');
            newSeatsContainer.classList.add('seatsContainerExpanded');
          }


          selectSeatsButtons[i].addEventListener('click', function () {//add event listener for select seat button
            newSeatsContainer.classList.toggle('active');
            const seatContent = document.querySelector('#seatMap');
            if (seatContent.style.maxHeight) {
              seatContent.style.maxHeight = null;
            } else {
              seatContent.style.maxHeight = seatContent.scrollHeight + 'px';
            }
          });
          closeButton.addEventListener('click', function () {
            newSeatsContainer.remove();
          });
    
    
          generateSeatMap(newSeatsContainer);
         
        });
      }
         //handling every seat clicked
      let selectedSeats = [];
      const newSeatsContainer=document.getElementsByClassName('seatsContainerCollapsed');
      const selectedSeatsMap = new Map();//for storing the selected seats

      function handleSeatClick(event) {
        const seat = event.target;
        const row = parseInt(seat.dataset.row);
        const col = parseInt(seat.dataset.col);
        const container = seat.closest('.seatsContainerCollapsed');//closest ansestor element:identify the specific container the seat belongs to
        let selectedSeats = selectedSeatsMap.get(container) || [];//getting the selected seats array associated with that specific container
        

        //removing the clicked seats from the array
        if (seat.classList.contains('selected')) {
          seat.classList.remove('selected');
          //to check
          selectedSeats = selectedSeats.filter(s => s.row !== row || s.col !== col);
        } else {
          seat.classList.add('selected');
          selectedSeats.push({ row, col });
        }
        selectedSeatsMap.set(container, selectedSeats);//updates the selectedseatsMaps with the latest selected seats array
        updateSelectedSeats(newSeatsContainer);
        updateTotalCost(selectedSeats)
      
      }
      //button to display the amount to be paid
      const amountButton=document.createElement('button') ;
      amountButton.id='amountButton'
      document.body.appendChild(amountButton)
      //function to add the value of the total cost on the seat container
      function updateTotalCost(selectedSeats) {
         const totalSeatsElement = document.getElementById('totalSeats');
        const totalCostElement = document.getElementById('totalCost');
        const totalSeats = selectedSeats.length;
        const totalCost = totalSeats * pricePerSeat;
      
        totalSeatsElement.textContent = `Total number of seats: ${totalSeats}`;
        totalCostElement.textContent = `Total Cost: ${totalCost}`;
        
            amountButton.textContent = `Pay Amount: ${totalCost}`;
             }
            

             //function to handle the selected seats
      function updateSelectedSeats(newSeatsContainer) {
        [...newSeatsContainer].forEach(container => {
          
          const selectedSeats = selectedSeatsMap.get(container) || [];
        const selectedSeatsPlaceElement=document.createElement('p')
        selectedSeatsPlaceElement.className='selectedSeatsPlaceElement';
        
        if (selectedSeatsPlaceElement) {
          selectedSeatsPlaceElement.remove();
        }
        if (selectedSeats.length === 0) {
          selectedSeatsPlaceElement.textContent = 'No seats selected';
        } else {
          const selectedSeatsText = selectedSeats.map(seat => seatRows[seat.row] + seatColumns[seat.col]);//displaying the value of seats selected
    selectedSeatsPlaceElement.textContent = 'Selected Seats: ' + selectedSeatsText.join(', ');

          
        }
        // Check if the selectedSeatsPlaceElement is already appended to the container
        const existingPlaceElement = container.querySelector('.selectedSeatsPlaceElement');
    if (existingPlaceElement) {
      existingPlaceElement.replaceWith(selectedSeatsPlaceElement);
    } else {
      container.appendChild(selectedSeatsPlaceElement);
    }
      })
        
      }
      
      // Function to generate the seat map
           const closeButton=document.getElementsByClassName('closeButton')
      function generateSeatMap(newSeatsContainer) {
        // Check if the container element is correctly referenced
        const seatLayout = [
          [1, 1, 0, 1, 1, 1, 0, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1],
          [0, 1, 1, 0, 1, 0, 1, 1, 0],
          [1, 1, 0, 1, 1, 1, 0, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        
        let selectedSeats = [];

        console.log(newSeatsContainer); // Check if the container element is correctly referenced
        console.log(seatLayout); // Check the values of seatLayout array
        console.log(seatRows); // Check the values of seatRows array
        console.log(seatColumns); // Check the values of seatColumns array

        const screen = document.createElement('div');
        screen.id = 'screen';
        screen.textContent = 'SCREEN';

        const seatMap = document.createElement('div');
        seatMap.id = 'seatMap';

        for (let row = 0; row < seatLayout.length; row++) {
          const rowLabel = seatRows[row];
          const rowElement = document.createElement('div');
          rowElement.className = 'seat-row';

          for (let col = 0; col < seatLayout[row].length; col++) {
            if (col === 9) break;

            const colLabel = seatColumns[col];//collabel
            const seat = document.createElement('div');
            seat.className = 'seat';
            seat.dataset.row = row;
            seat.dataset.col = col;

            if (seatLayout[row][col] === 0) {
              seat.classList.add('unavailable');
            } else {
              seat.addEventListener('click', handleSeatClick);
            }

            rowElement.appendChild(seat);
          }

          seatMap.appendChild(rowElement);
        }

        //button that redirects user to payment form
        const makePaymentButton=document.createElement('button')
        makePaymentButton.id=' makePaymentButton'
        makePaymentButton.textContent='PROCEED TO PAYMENT';
        //its eventlistener
        makePaymentButton.addEventListener('click', function(){
          console.log("clicked")
          paymentForm.scrollIntoView({behavior:'smooth'})
          })
        
        const totalSeatsElement = document.createElement('p');
        totalSeatsElement.id = 'totalSeats';
        const totalCostElement = document.createElement('p');
        totalCostElement.id = 'totalCost';

          // appending every element we have created onto theseat container
         newSeatsContainer = document.querySelectorAll('.seatsContainerCollapsed');
        for (let i = 0; i < newSeatsContainer.length; i++) {
          const container = newSeatsContainer[i];
          container.appendChild(screen);
          container.appendChild(seatMap);
          container.appendChild(totalSeatsElement)
          container.appendChild(totalCostElement)
          container.appendChild(makePaymentButton)
        //  container.innerHTML += existingContent;
         
          }
          
      }
    
  });


//payment form
const  paymentForm=document.createElement('div');
paymentForm.className='payment';
paymentForm.innerHTML=`
<form id="paymentForm">
<h2 class ="title">Payment Details</h2>
<label for="fname">FIRST NAME </label>
<input type="text" placeholder="FIRST NAME" id="fname" required>
<label for="lname">LAST NAME</label>
<input type="text" placeholder="LAST NAME" id="lname" required>
<label for="email">EMAIL ADDRESS</label>
<input type="email" placeholder="EMAIL ADDRESS" id="email" required>

<h3 class="paymentMethodheading">PAYMENT METHOD</h3>
<label for="cnumber">CREDIT CARD NUMBER</label>
<input type="number" placeholder="CREDIT CARD NUMBER" id="cnumber" required ></br>
<button id='paymentSubmit' type="submit">MAKE PAYMENT</button>
<p class="paymentNotify">AN EMAIL WILL BE SENT TO THE ABOVE EMAIL ADDRESS<br> WITH THE BOOKED SEATS AND RECEIPTS.PLEASE PRINT THIS TO ACCESS THE CINEMA</p>
</form>

`
paymentForm.addEventListener('submit', function(event){
  event.preventDefault();
  const firstName = document.getElementById('fname').value;
  const lastName = document.getElementById('lname').value;
  const email = document.getElementById('email').value;
  
  const cardNumber = document.getElementById('cnumber').value;
 
  const paymentDetails={
    firstName,
    lastName,
    email,
    cardNumber,
    
};
//post the details onto the server
  fetch('https://json-server-movies.onrender.com/paymentDetails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentDetails),
  })
    .then(response => response.json())
    .then(() => {
     alert("Payment Details Updated Successfully");
      // Handle any further actions or UI updates after successful update
    })
    


})



//Subscribe Form

    const newForm=document.createElement('div');
    newForm.id="subscribe-div";
    newForm.innerHTML=`
    <div>
    <div class="whySubscribe">
    <p>Subscribe below to get some special email news, promotions,<br> freebies and many more surprises. </p>
    </div>
    <div id="subscribe-form">
    <form>
    <label for =fname>FIRST NAME</label>
    <input type="text" id="nfname" name="name" required>
    <label for =lname>LAST NAME</label>
    <input type="text" id="nlname" name="name" required>
    <label for =email>EMAIL ADDRESS</label>
    <input type="text" id="nemail" name="email" required>
    <label for =pno>CONTACT</label>
    <input type="number" id="pnumber"  required></br>
    <button id="subscribeButton" type="submit">SUBSCRIBE TO OUR NEWSLETTER </button>
    </form>
    </div>
    </div>
    
    `;
    //delaying the appending of the form
    setTimeout(() => {
      document.body.appendChild(newForm);
    }, 1000);


    newForm.addEventListener('submit', function(event){
      event.preventDefault();
      const FirstName = document.getElementById('nfname').value;
      const LastName = document.getElementById('nlname').value;
      const Email = document.getElementById('nemail').value;
      
      const PhoneNumber = document.getElementById('pnumber').value;
     
      const paymentDetails={
        FirstName,
        LastName,
        Email,
        PhoneNumber,
        
    
    
    };
    //adds the info into the server
    
      fetch('https://json-server-movies.onrender.com/subscribeForms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
      })
        .then(response => response.json())
        .then(() => {
         alert("THANK YOU FOR SUBSCRIBING");
          
        })
        
    
    
    })

    //bottom nav bar
const bottomNavBar=document.createElement('nav')
    bottomNavBar.className='newBottomNavBar'
    bottomNavBar.innerHTML=`
    <div class=theBottom>
    <p>Popcorn Rendezvous Cinemas<br>is the leading destination for movies<br> and leisure in East Africa.</p>
    <p>MOBILE:0768657465/7937654783</p>
    <p>EMAIL ADDRESS:Popcorn@rendezvous@hotmail.com</p>
    </div>
    <div class=anotherBottom>
    <ul id=theBottomList>
    <li>24hr Security Systems</li>
    <li>100+ Parking Spaces </li>
    <li>Affordable Eating Outlets</li>
    <li>Comfortable Seats and Armrests</li>
    </ul>
    </div>
    `
 ;  
 //delaying the appending of the bottom navbar
 setTimeout(() => {
  document.body.appendChild(bottomNavBar);
}, 1000);
})


   
 




