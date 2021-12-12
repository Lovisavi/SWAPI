const modal = document.querySelector("#about-modal-content");
const starStaff = (valueOne) => {
  //when the value is above 0, data renders out to the about-modal-content
  //all information renders out to the modal window
  if (characters.length > 0) {
    const starWarsHTML = characters[valueOne].map((char) => `<p>${char.name}</p>`).sort().join("");
    document.querySelector("#name").innerHTML = starWarsHTML;
    document.querySelector("#titles").innerHTML = information[valueOne].title;
  }};

//collects every button with the classname in the array
//when the modal gets clicked on, the modal shows up 
const startModal = () => {
  const btn = document.querySelectorAll(".star-btn");
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", () => {
      modal.style.display = "block";
      starStaff([i]);
    });
  }
};

//closes and hides the modal
const endModal = () => {
  modal.style.display = "none";
};
window.addEventListener("click", (event) => {
  if (event.target.id === "about-modal-content") {
    endModal();
  }
});

window.addEventListener("load", startModal);

//API
const starYear = document.querySelectorAll(".year");
const starTitles = document.querySelectorAll(".title");
const starFilm = "https://swapi.dev/api/films/";

//Empty arrays with sorting method
const characters = [].sort();
const information = [];

//converting starFilm to json and pushing data into information
fetch(starFilm)
.then((res) => res.json()).then((data) => {
    data.results.forEach((info) => {
      information.push(info);
    });

    //fetch information from the array and looping the titles in
    for (i = 0; i < starTitles.length; i++) {
      starTitles[i].innerHTML = information[i].title;
      starYear[i].innerHTML = information[i].release_date;
      document.querySelectorAll(".title")[i].classList.remove("loader");
    
      //promises from character url and conversts them to json
      const promises = information[i].characters.map((url) =>
        fetch(url) .then((res) => res.json()) 
        .catch((error) => {
            console.log(error);
          })
      );
      
      //pushing all the promises and data into the character array, removes noClick when all character information finished
      const setChars = () => {
        Promise.all(promises).then((res) => {
          characters.push(res);
          document.querySelector(".section-wrapper").classList.remove("noClick");
        });
      };
      setChars();
    }
  });