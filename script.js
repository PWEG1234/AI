const API_URL = "https://pweg-ai.pwegaparat.workers.dev";



const input = document.getElementById("userInput");

const sendBtn = document.getElementById("sendBtn");

const messages = document.getElementById("messages");

const typing = document.getElementById("typing");


// ===========================
// MENU
// ===========================

const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");


function openMenu(){

    sideMenu.classList.add("show");

    menuOverlay.classList.add("show");

}


function closeMenuFunc(){

    sideMenu.classList.remove("show");

    menuOverlay.classList.remove("show");

}



if(menuBtn){

    menuBtn.addEventListener("click", openMenu);

}


if(closeMenu){

    closeMenu.addEventListener("click", closeMenuFunc);

}


if(menuOverlay){

    menuOverlay.addEventListener("click", closeMenuFunc);

}



// بستن منو بعد از انتخاب گزینه

document.querySelectorAll(".side-menu a").forEach(link=>{

    link.addEventListener("click",()=>{

        closeMenuFunc();

    });

});




function addMessage(text,type){


    const div=document.createElement("div");


    div.className="message " + type;


    div.innerText=text;


    messages.appendChild(div);


    messages.scrollTop =
    messages.scrollHeight;


}





function showTyping(){


    typing.style.display="flex";


}



function hideTyping(){


    typing.style.display="none";


}







async function sendMessage(){


    const text=input.value.trim();



    if(!text) return;




    addMessage(text,"user");


    input.value="";



    showTyping();




    try{


        const response =
        await fetch(API_URL,{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },


            body:JSON.stringify({

                message:text

            })

        });




        const data =
        await response.json();




        hideTyping();



        addMessage(

            data.answer ||

            "متأسفانه جوابی دریافت نشد.",

            "ai"

        );



    }



    catch(error){


        hideTyping();


        addMessage(

        "متأسفانه مشکلی در سرور PWEG AI پیش آمده ، لطفا بعدا دوباره تلاش کنید.",

        "ai"

        );


    }



}






sendBtn.addEventListener(

"click",

sendMessage

);





input.addEventListener(

"keydown",

function(e){


    if(e.key==="Enter"){


        sendMessage();


    }


}

);
