let buttons = document.querySelectorAll(".button");
let openAllButton = document.getElementById("openall-button");


function updateOpenAllButton(){
    let checkHide = false;
    let checkShow = false;
    buttons.forEach(button1 => {

        if (button1.innerHTML == "Show") checkShow = true;
        else if(button1.innerHTML == "Hide") checkHide = true;
    })

    if(checkShow == false) openAllButton.innerHTML = "Hide all";
    else if(checkHide == false) openAllButton.innerHTML = "Show all";
}


buttons.forEach(button => {
    button.addEventListener("click", function(event) {
        console.log("Clickkkkkkkkkk")
        let name_img = button.parentElement.getElementsByClassName("name-img")[0];
        if(!name_img){return}

        name_img.classList.toggle("active");

        if (button.innerHTML == "Show") button.innerHTML = "Hide";
        else if (button.innerHTML == "Hide") button.innerHTML = "Show";

  
        updateOpenAllButton()
    })
})

openAllButton.addEventListener("click", function(event){
    buttons.forEach(button => {
        let name_img = button.parentElement.getElementsByClassName("name-img")[0];
        if(!name_img){return}

        let img = name_img.getElementsByTagName("img")[0];
        if(!img){return}
 
        let computedStyle = window.getComputedStyle(img);
        

        if(openAllButton.innerHTML == "Show all"){
            if (computedStyle.opacity != 1) {return}
            button.innerHTML = "Hide"
            name_img.classList.toggle("active");
        }
        else{
            if (computedStyle.opacity != 0) {return}
            button.innerHTML = "Show"
            name_img.classList.toggle("active");
        }
    })

    if (openAllButton.innerHTML == "Show all") openAllButton.innerHTML = "Hide all";
    else if (openAllButton.innerHTML == "Hide all") openAllButton.innerHTML = "Show all";

})