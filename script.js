
const btnRevenir = document.querySelector(".revenir");
if (btnRevenir) {
  btnRevenir.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

window.addEventListener('load', () => {
  gsap.registerPlugin(Draggable);

  Draggable.create("#draggable-img", {
    type: "x,y",       
    bounds: "#processus",  
    inertia: true, 
  });
});