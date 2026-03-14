// ==================== MAIN.JS ====================

// -------------------- استدعاء المودالات والوظائف --------------------
document.addEventListener("DOMContentLoaded", function(){

    const loginModal = document.getElementById("loginModal");
    const menuBtn = document.getElementById("menuBtn");

    console.log("loginModal:", loginModal, "CONFIG:", CONFIG);

    if(loginModal){
        loginModal.classList.add("show");
    }

    if(menuBtn){
        menuBtn.disabled = true;
    }

    // ==================== تهيئة اسم المؤسسة والعنوان ====================
    if(typeof CONFIG !== "undefined"){
        document.title = CONFIG.SchoolName;

        const schoolNameElement = document.getElementById("schoolName");
        if (schoolNameElement) schoolNameElement.textContent = CONFIG.SchoolName;
    } 
    else{
        console.error("CONFIG غير معرف!");
    }

    console.log("بوابة المؤسسة جاهزة للعمل 🚀");

    // ==================== إغلاق المودالات عند الضغط خارجها ====================
    [contactModal, attendanceModal, oldAbsModal, newAbsModal, sendAbsModa].forEach(modal => {
        window.addEventListener("click", e => {
            if(e.target === modal) modal.style.display = "none";
        });
    });

    document.addEventListener("keydown", e => {
        if(e.key === "Escape"){
            [contactModal, attendanceModal, oldAbsModal, newAbsModal, sendAbsModa].forEach(modal => {
                if(modal.style.display === "flex" || modal.style.display === "block"){
                    modal.style.display = "none";
                }
            });
        }
    });

    // ==================== تهيئة القارئ الذكي ====================
    document.getElementById("startScanBtn")?.addEventListener("click", function(){
        scanStudentCard();
    });

    // ==================== إعادة تحميل البيانات إذا لزم ====================
    if(localStorage.getItem("userType")){
        const type = localStorage.getItem("userType");
        const userName = localStorage.getItem("userName") || "المستخدم";

        welcomeText.textContent = (type === "parent") ? 
            `مرحبًا بك ${userName} في فضاء أولياء التلاميذ` :
            (type === "teacher") ?
            `مرحبًا بك الأستاذ ${userName}` :
            `مرحبًا بك ${userName} في فضاء الإشراف التربوي`;

        menuBtn.disabled = false;
        fillMenu(type);
    }

    // ==================== أزرار المودالات ====================
    contactCloseBtn.addEventListener("click", () => contactModal.style.display = "none");
    closeAttendanceModalBtn.addEventListener("click", () => attendanceModal.style.display = "none");
    previewCloseBtn.addEventListener("click", () => filePreviewPanel.style.display = "none");

    // ==================== بدء المسح عند فتح المودال ====================
    attendanceModal.addEventListener("show", function(){
        // initCameraScanner();
    });

});
