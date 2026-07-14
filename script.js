const API_URL = "https://pweg-ai.pwegaparat.workers.dev/";



const input = document.getElementById("userInput");

const sendBtn = document.getElementById("sendBtn");

const messages = document.getElementById("messages");

const typing = document.getElementById("typing");





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

        "خطا در اتصال به هوش مصنوعی ❌",

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
