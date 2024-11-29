let profileButtons = [];
let openAllButton = document.getElementById("openall-button");
let debounce = false;

document.querySelectorAll(".button").forEach(button =>{
    let name_img = button.parentElement.getElementsByClassName("name-img")[0];
    if(!name_img){return}

    profileButtons.push(button);
})


function updateOpenAllButton(){
    let checkHide = false;
    let checkShow = false;
    profileButtons.forEach(button => {
        if (button.innerHTML == "Show") checkShow = true;
        else if(button.innerHTML == "Hide") checkHide = true;
    })

    if(checkShow == false) openAllButton.innerHTML = "Hide all";
    else if(checkHide == false) openAllButton.innerHTML = "Show all";
}


function activeButton(button){
    let name_img = button.parentElement.getElementsByClassName("name-img")[0];
    if(!name_img){return}

    name_img.classList.toggle("active");

    if (button.innerHTML == "Show") button.innerHTML = "Hide"; 
    else if (button.innerHTML == "Hide") button.innerHTML = "Show";
}


profileButtons.forEach(button => {
    button.addEventListener("click", function(event) {
        console.log("Clickkkkkkkkkk")

        activeButton(button)
        updateOpenAllButton()
    })
})

openAllButton.addEventListener("click", function(event){
    if(debounce == true) return;
    debounce = true;

    for(let i = 0; i < profileButtons.length; i++){
        let button = profileButtons[i];

        let name_img = button.parentElement.getElementsByClassName("name-img")[0];
        if(!name_img) continue;

        let img = name_img.getElementsByTagName("img")[0];
        if(!img) continue;
 
        let computedStyle = window.getComputedStyle(img);
        
        if(openAllButton.innerHTML == "Show all"){
            if (computedStyle.opacity != 1) continue;
            button.innerHTML = "Hide"
            name_img.classList.toggle("active");
        }
        else{
            if (computedStyle.opacity != 0) continue;
            button.innerHTML = "Show"
            name_img.classList.toggle("active");
        }
    }


    if (openAllButton.innerHTML == "Show all") openAllButton.innerHTML = "Hide all";
    else if (openAllButton.innerHTML == "Hide all") openAllButton.innerHTML = "Show all";

    setTimeout(() => {
        debounce = false;
      }, 500);
})