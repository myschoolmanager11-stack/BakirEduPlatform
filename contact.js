document.addEventListener("DOMContentLoaded", function(){

const ADMIN_EMAIL = "myschoolmanager11@gmail.com";

const contactModal = document.getElementById("contactModal");
const closeBtn = document.getElementById("closeContactModal");
const sendBtn = document.getElementById("contactSendBtn");

window.openContactModal = function(){
    contactModal.style.display = "flex";
}

closeBtn.addEventListener("click", function(){
    contactModal.style.display = "none";
});

sendBtn.addEventListener("click", function(){

    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    const result = document.getElementById("contactResult");

    if(!/\S+@\S+\.\S+/.test(email)){
        result.textContent = "بريد غير صحيح";
        result.style.color = "red";
        return;
    }

    if(!message){
        result.textContent = "اكتب الرسالة";
        result.style.color = "red";
        return;
    }

    const subject = encodeURIComponent("رسالة من البوابة");
    const body = encodeURIComponent("البريد: " + email + "\n\n" + message);

    window.location.href = `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
});

});
