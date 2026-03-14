// ==================== LOGIN SYSTEM ====================

// تخزين القوائم في الذاكرة
let USERS_LIST = [];


// ==================== عند اختيار نوع المستخدم ====================

userTypeSelect.addEventListener("change", async function(){

    const type = this.value;

    if(type === "") return;

    showLoader();

    try{

        let fileId = "";

        if(type === "teacher"){
            fileId = CONFIG.ListeTeacher_File_ID;
        }
        else if(type === "consultation"){
            fileId = CONFIG.ListeSupervisory_File_ID;
        }
        else if(type === "parent"){
            fileId = CONFIG.ListeStudents_File_ID;
        }

        const lines = await fetchFile(fileId);

        if(!lines){
            alert("تعذر تحميل قائمة المستخدمين");
            hideLoader();
            return;
        }

        USERS_LIST = [];

        for(let line of lines){

            if(!line) continue;

            let data = null;

            if(type === "teacher"){
                data = parseTeacherLine(line);
            }
            else if(type === "consultation"){
                data = parseSupervisoryLine(line);
            }
            else if(type === "parent"){
                data = parseStudentLine(line);
            }

            if(data){
                USERS_LIST.push(data);
            }

        }

        console.log("تم تحميل المستخدمين:", USERS_LIST.length);

    }
    catch(error){

        console.error("خطأ تحميل القائمة:", error);

        alert("حدث خطأ أثناء تحميل القائمة");

    }

    hideLoader();

});

// ==================== LOGIN BUTTON زر تسجيل الدخول ====================

loginBtn.addEventListener("click", function(){

    const type = userTypeSelect.value;
    const racord = racordInput.value.trim();

    if(type === ""){
        alert("يرجى اختيار نوع المستخدم");
        return;
    }

    if(racord === ""){
        alert("يرجى إدخال المعرف");
        return;
    }

    const user = USERS_LIST.find(u => u.racord === racord);

    if(!user){
        alert("المعرف غير صحيح");
        return;
    }

    openSession(type, user);

});

// ==================== OPEN SESSION فتح الجلسة ====================

function openSession(type, user) {

    console.log("فتح الجلسة للمستخدم:", type);

    // إغلاق نافذة تسجيل الدخول
    loginModal.classList.remove("show");

    // حفظ معلومات المستخدم
    localStorage.setItem("userType", type);
    localStorage.setItem("userName", user.name);

    if(type === "parent"){
        localStorage.setItem("StudentRecords_Fille_ID", user.StudentRecords_Fille_ID);
    }

    // تفعيل زر القائمة
    menuBtn.disabled = false;

    const userName = user.name || "المستخدم";

    // تحديث رسالة الترحيب
    if(type === "parent") {

        welcomeText.textContent = `مرحبًا بك ${userName} في فضاء أولياء التلاميذ`;

    } 
    else if(type === "teacher") {

        welcomeText.textContent = `مرحبًا بك الأستاذ ${userName}`;

    } 
    else {

        welcomeText.textContent = `مرحبًا بك ${userName} في فضاء الإشراف التربوي`;

    }

    // ملء القائمة
    fillMenu(type);

}

// ==================== QR SCANNER مسح QR ====================

let qrScanner = null;

function startQRScan(){

    const modal = document.getElementById("qrScannerModal");

    modal.style.display = "flex";

    qrScanner = new Html5Qrcode("qrReader");

    qrScanner.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: 250
        },
        qrCodeMessage => {

            racordInput.value = qrCodeMessage;

            stopQRScanner();

        }
    );

}


function stopQRScanner(){

    if(qrScanner){
        qrScanner.stop();
        qrScanner = null;
    }

    document.getElementById("qrScannerModal").style.display = "none";

}

// ==================== CLOSE QR MODAL ====================

document.getElementById("closeQrModal").addEventListener("click", function(){

    stopQRScanner();

});

// ==================== LOGIN WITH ENTER تسجيل الدخول بالضغط على Enter ====================

racordInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        loginBtn.click();
    }

});
