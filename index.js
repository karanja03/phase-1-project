document.addEventListener('DOMContentLoaded',function(){

    //creating a scrollable images

    const scrollContainer=document.getElementById('scroll-container');
    scrollContainer.innerHTML=`
    <img src='./images/DrStrange.jpg' alt="DR.STRANGE" >
    <img src ='./images/thor.jpg'  alt="THOR LOVE AND THUNDER" >
    <img src ='./images/wakanda.jpg'  alt="WAKANDA FOREVER" >
    <img src ='./images/blacklist.jpg'  alt="THE BLACKLIST" >
    <img src ='./images/htgawm.jpg'  alt="HOW TO GET AWAY WITH MURDER" >
    <img src ='./images/woman.jpg'  alt="THE WOMAN KING" >

    `;
  


fetch( ' http://localhost:3000/movies')
.then(response => response.json())
.then(data => {
//creating the individual movie cards
for(const movie of data) {

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
        <p>Screen1,Screen2, Screen 5</p>
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

        <button class =selectSeats type="click">Select Seats</button>
      `;
  
      // Appending the card container to the document body
      document.body.appendChild(cardInfo);
        }
    })
  
  

    //Subscribe Form

    const newForm=document.createElement('form');
    newForm.id="subscribe-form";
    newForm.innerHTML=`

    <label for =fname>FIRST NAME</label>
    <input type="text" id="fname" name="name" required>
    <label for =lname>LAST NAME</label>
    <input type="text" id="lname" name="name" required>
    <label for =email>EMAIL ADDRESS</label>
    <input type="text" id="lname" name="name" required>
    <label for =pno>CONTACT</label>
    <input type="number" id="pnumber"  required>
    <br><button>SUBSCRIBE TO OUR NEWSLETTER </button>
    
    `;

    //delaying the appending of the form
    setTimeout(() => {
      document.body.appendChild(newForm);
    }, 200);

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
    <li>Comfortable Seats and Armrests</li>s
    `
 ;  
 //delaying the appending of the bottom navbar
 setTimeout(() => {
  document.body.appendChild(bottomNavBar);
}, 200);
   
 //we set how the seats will be arranged and their availability

  
    const seatLayout = [
      [1, 1, 0, 1, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 0, 1, 0, 1, 1, 0],
      [1, 1, 0, 1, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
     const seatRows=['A', 'B', 'C', 'D', 'E'];
     const seatColumns=['1','2', '3', '4', '5', '6', '7', '8', '9'];
     const availableTickets = seatLayout.flat().filter(seat => seat === 1).length;
     let selectedSeats = [];
      //capturing all buttons for booking seats
     const selectSeatsButtons = document.getElementsByClassName('selectSeats');
     const seatsContainer=document.createElement('div');
     seatsContainer.id='seatsContainer';
//add choose your seat text here and se whether it will work
     for (let i = 0; i < selectSeatsButtons.length; i++) {
      selectSeatsButtons[i].addEventListener('click', function(){
        seatsContainer.classList.toggle('collapsed');
        selectSeatsButtons.textContent=seatsContainer.classList.contains('collapsed')? 'Select Seats':'Close';
        

      });
    }


    //generating how the seats will be arranged
     function generateSeatMap(){
      const seatMap=document.createElement('div');
      seatMap.innerHtml='';//to remove to see whether it will stop refreshing
      //rows
      for (let row = 0; row < seatLayout.length; row++) {
        const rowLabel = seatRows[row];//to display the label eg A,B,C
        const rowElement = document.createElement('div');
        rowElement.className = 'seat-row';
        //columns
        for (let col = 0; col < seatLayout[row].length; col++) {
          if (col === 9) break; // Limit to 9 columns
          const colLabel = seatColumns[col];//to display label eg 1,2,3
          const seat = document.createElement('div');//each seat
          seat.className = 'seat';
          seat.dataset.row = row;
          seat.dataset.col = col;

          if (seatLayout[row][col] === 0) {
            seat.classList.add('unavailable');//should not be clickable
          } else {
            seat.addEventListener('click', handleSeatClick);
          }

          rowElement.appendChild(seat);
        }

        seatMap.appendChild(rowElement);
      }
    }

    //function to show the seat selected..label them
    function handleSeatClick(event) {
      const seat = event.target;
      const row = parseInt(seat.dataset.row);
      const col = parseInt(seat.dataset.col);
      if(seat.classList.contains('selected')){
        console.log("already booked");

       selectedSeats = selectedSeats.filter(
          seat => !(seat.row === row && seat.col === col)
        );
      } else {
        seat.classList.add('selected');
        selectedSeats.push({ row, col });
      }
      updateSelectedSeats();
      }

      function updateSelectedSeats(){
        const selectedSeatsPlace=document.createElement('p');
        selectedSeatsPlace.innerText='Selected Seats: ';
        selectedSeats.forEach((seat, index) => {
          const seatText = seatRows[seat.row] + seatColumns[seat.col];
          selectedSeatsPlace.innerHTML += seatText;
          if (index < selectedSeats.length - 1) {
            selectedSeatsPlace.textContent += ', ';
          }
        })



      }
      generateSeatMap();
      updateSelectedSeats();



    
    
     



  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // Function for handling the buy ticket button
  function handleClick(event) {
    event.preventDefault();

    const availableTicketsElement = this.parentNode.querySelector('.availableTickets');//this is the button
    const soldTicketsElement = this.parentNode.querySelector('.ticketsSold');

    let tickets = parseInt(availableTicketsElement.innerText);
    let ticketsSold = parseInt(soldTicketsElement.innerText);

    if (tickets > 0) {
      tickets--;
      ticketsSold++;

      availableTicketsElement.innerText = tickets;
      soldTicketsElement.innerText = ticketsSold;
    } else {
       alert('THIS MOVIE IS SOLD OUT!!!');
    
    }
  }



})
