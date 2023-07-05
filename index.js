



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
  fetch('http://localhost:3000/movies')
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
          // newSeatsContainer.innerHTML = `
          //  <button class="closeButton">Close</button>`;//not seen button
           

          //  newSeatsContainer.appendChild(closeButton)
          document.body.appendChild(newSeatsContainer);
          //newlyadded code
          
          //to come back
          if (seatsContainer.classList.contains('seatsContainerExpanded')) {
            seatsContainer.classList.remove('seatsContainerExpanded');
            newSeatsContainer.classList.remove('seatsContainerExpanded');
          } else {
            seatsContainer.classList.add('seatsContainerExpanded');
            newSeatsContainer.classList.add('seatsContainerExpanded');
          }


          selectSeatsButtons[i].addEventListener('click', function () {
            newSeatsContainer.classList.toggle('active');
            const seatContent = document.querySelector('#seatMap');
            if (seatContent.style.maxHeight) {
              seatContent.style.maxHeight = null;
            } else {
              seatContent.style.maxHeight = seatContent.scrollHeight + 'px';
            }
          });
    
          generateSeatMap(newSeatsContainer);
         
        });
      }



      function handleSeatClick(event) {
        const seat = event.target;
        const row = parseInt(seat.dataset.row);
        const col = parseInt(seat.dataset.col);
        //removing the clicked seats from the array
        if (seat.classList.contains('selected')) {
          seat.classList.remove('selected');
          //to check
          selectedSeats = selectedSeats.filter(s => s.row !== row || s.col !== col);
        } else {
          seat.classList.add('selected');
          selectedSeats.push({ row, col });
        }
        updateSelectedSeats(newSeatsContainer);
      }




      function updateSelectedSeats(newSeatsContainer) {
        const selectedSeatsPlaceElement=document.createElement('p')
        selectedSeatsPlaceElement.className='selectedSeatsPlaceElement';
        
        if (selectedSeatsPlaceElement) {
          selectedSeatsPlaceElement.remove();
        }
        if (selectedSeats.length === 0) {
          selectedSeatsPlaceElement.textContent = 'No seats selected';//seat already booked
        } else {
          selectedSeatsPlaceElement.textContent = 'Selected Seats: ';
          selectedSeats.forEach((seat, index) => {
            const seatText = seatRows[seat.row] + seatColumns[seat.col];
            selectedSeatsPlaceElement.textContent += seatText;
            if (index < selectedSeats.length - 1) {
              selectedSeatsPlaceElement.textContent += ', ';
            }
          });
          newSeatsContainer.appendChild(selectedSeatsPlaceElement);
        }
      }
      


           // Function to generate the seat map
      function generateSeatMap(newSeatsContainer) {
        // Check if the container element is correctly referenced
        const seatLayout = [
          [1, 1, 0, 1, 1, 1, 0, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1],
          [0, 1, 1, 0, 1, 0, 1, 1, 0],
          [1, 1, 0, 1, 1, 1, 0, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        const seatRows = ['A', 'B', 'C', 'D', 'E'];
        const seatColumns = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
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

         newSeatsContainer = document.getElementsByClassName('seatsContainerCollapsed');
        for (let i = 0; i < newSeatsContainer.length; i++) {
          const container = newSeatsContainer[i];
          container.innerHTML = '';
          container.appendChild(screen);
          container.appendChild(seatMap);
          container.appendChild(closeButton)
        }
      }
    
  });
})










//     //Subscribe Form

//     const newForm=document.createElement('form');
//     newForm.id="subscribe-form";
//     newForm.innerHTML=`

//     <label for =fname>FIRST NAME</label>
//     <input type="text" id="fname" name="name" required>
//     <label for =lname>LAST NAME</label>
//     <input type="text" id="lname" name="name" required>
//     <label for =email>EMAIL ADDRESS</label>
//     <input type="text" id="email" name="email" required>
//     <label for =pno>CONTACT</label>
//     <input type="number" id="pnumber"  required>
//     <br><button>SUBSCRIBE TO OUR NEWSLETTER </button>
    
//     `;
//     //delaying the appending of the form
//     setTimeout(() => {
//       document.body.appendChild(newForm);
//     }, 200);



//     //bottom nav bar
//     const bottomNavBar=document.createElement('nav')
//     bottomNavBar.className='newBottomNavBar'
//     bottomNavBar.innerHTML=`
//     <div class=theBottom>
//     <p>Popcorn Rendezvous Cinemas<br>is the leading destination for movies<br> and leisure in East Africa.</p>
//     <p>MOBILE:0768657465/7937654783</p>
//     <p>EMAIL ADDRESS:Popcorn@rendezvous@hotmail.com</p>
//     </div>
//     <div class=anotherBottom>
//     <ul id=theBottomList>
//     <li>24hr Security Systems</li>
//     <li>100+ Parking Spaces </li>
//     <li>Affordable Eating Outlets</li>
//     <li>Comfortable Seats and Armrests</li>
//     </ul>
//     </div>
//     `
//  ;  
//  //delaying the appending of the bottom navbar
//  setTimeout(() => {
//   document.body.appendChild(bottomNavBar);
// }, 200);


   
 




