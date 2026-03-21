// app.js
// ==================== CONFIGURATION ====================

const CONFIG = {
  "SchoolName": "متوسطة الشهيد بكير تركي محمد بن حسن (المدية)",
  "SchoolAcadimi": "مديرية التربية لولاية المدية",
  "SchoolVille": "المدية",
  "SchoolDaira": "المدية",
  "SchoolBaladiya": "المدية",
  "Schoolsystem": "متوسط",
  "SchoolPhone": "0000000000",
  "SchoolAdresse": "حي راس قلوش المدية",
  "SchoolMail": "YourMail@Gmail.com",
  "SchoolLink": "https://myschoolmanager11-stack.github.io/BakirEduPlatform/",
  "School_Link_File_ID": "1mfODIVdawMVMe3l8ZU4tGj6ryKO0boAR",
  "School_Folder_ID": "1S5oK5NpIFGSu1IsEOYoOcozOLvn3ssh9",
  "Documents_Folder_ID": "127KtZP7aBfHPBQ0fKMOpCTTLhbXUHGUi",
  "StudentsRecords_Folder_ID": "1ew7BnVL5-K_fDqDrlbnC6hc0u-i5y4ux",
  "ListeTeacher_File_ID": "18P3HcV2nrrjO9dY_sI1-f5ya5-tj-zwF",
  "ListeSupervisory_File_ID": "1MVKA6IExnbfGoc-lLyn_kneEvsTNxXxn",
  "ListeStudents_File_ID": "1XzW75oaHr-oDlYWUGoEB1dSkQ8GGqQnE",
  "ListePrinsipal_File_ID": "1fpKH1buhtLtZwfIxgMQxkaN_fQPyT8d-",
  "Listepointage_File_ID": "1LOMRDGw8yR0a1dkX6h_6BHEVui-S82Jj",
  "New_Absented_File_ID": "1blI8HkIKbzzfMs884qPmxmahZ2OW1dbD",
  "Archive_Absented_File_ID": "1vuQrU7QnR1UXUVCnAvjL_wKKlZsuLQcl",
  "Old_Absented_File_ID": "1IGX9WDp7m7gjBXV-VjWBk_msneMDzh4E",
  "ListeClasses_File_ID": "1OmLz44OZVyq_p-OwlxaCpryRQgcXoMlF",
  "Reception_Schedule_File_ID": "1vgbCzgI6xoYvuEicK5ZJW7DleYmmvHzE",
  "Weekly_Students_Timetable_File_ID": "13LKOM--ZBI2Z1BFrze9FpYWjmC9ZAlLs",
  "Teacher_Timetable_File_ID": "1ikv8-Eui-GXE043DLPcjbtO16umjw1c0",
  "Exams_Calendar_File_ID": "1LjF1E16FR4ntHqrtn7ExPpmzUnVBci5m",
  "Students_Documents_File_ID": "1MB7GnTUMAF6RWmXcA2wKNXFx_PIGpSly",
  "Teacher_Documents_File_ID": "1rjtepFMaANzqkYJ0yE9IedwOi8JWYRqQ",
  "Supervisory_Documents_File_ID": "1RHcTex-pkmZJbvNyANQJW1AINDovCmMQ",
  "Announcements_File_ID": "1ntWPExgMEFZNXWj3qrCXgVKTGYCxJHVO"
};

// ==================== الملفات المرتبطة بالقائمة ====================

const FILE_ITEMS = {

"القوائم الإسمية للتلاميذ": CONFIG.ListePrinsipal_File_ID,
"قوائم صب النقاط": CONFIG.Listepointage_File_ID,
"جدول توقيت الأستاذ": CONFIG.Teacher_Timetable_File_ID,
"جدول استقبال الأولياء": CONFIG.Reception_Schedule_File_ID,
"جدول التوقيت الأسبوعي للتلاميذ": CONFIG.Weekly_Students_Timetable_File_ID,
"رزنامة الفروض والاختبارات": CONFIG.Exams_Calendar_File_ID,
"استمارات ووثائق مختلفة للتلاميذ": CONFIG.Students_Documents_File_ID,
"استمارات ووثائق مختلفة للأساتذة": CONFIG.Teacher_Documents_File_ID,
"استمارات ووثائق مختلفة للإشراف التربوي": CONFIG.Supervisory_Documents_File_ID,
"إعلانات": CONFIG.Announcements_File_ID
};

// ==================== Google Apps Script رابط ====================

const GAS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxAnA7n0Kg40JXBXYjwxK-2RaPX02UjapS_bjI-obDG0HIvluDKl51RWPAwbsUbVf0/exec";

// ==================== متغيرات عامة ====================

let currentFileURL = null;
let STUDENTS_LIST = [];
let parentData = null;
let OLD_ABS_DATA = [];
let NEW_ABS_DATA = [];
let TEMP_SELECTED_ABS = [];


// ==================== DOCUMENT READY ====================

document.addEventListener("DOMContentLoaded", function () {

  // ߔՠتهيئة اسم المؤسسة والعنوان
document.title = CONFIG.SchoolName;

const schoolNameElement = document.getElementById("schoolName");
if (schoolNameElement) {
    schoolNameElement.textContent = CONFIG.SchoolName;
}

   
// ==================== DOM ELEMENTS تعريف عناصر الصفحة ====================

// --- عناصر الصفحة ---
const welcomeText = document.getElementById("welcomeText");

// --- المودالات ---
const loginModal = document.getElementById("loginModal");
const oldAbsModal = document.getElementById("ModalOldAbsented");
const newAbsModal = document.getElementById("ModalNewAbsented");
const sendAbsModal = document.getElementById("SendAbsentedModal");
const contactModal = document.getElementById("contactModal");

// --- القائمة ---
const menuBtn = document.getElementById("menuBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const itemDescription = document.getElementById("itemDescription");

// فتح/غلق القائمة
menuBtn.addEventListener("click", function () {
    if (dropdownMenu.style.display === "block") {
        dropdownMenu.style.display = "none";
    } else {
        dropdownMenu.style.display = "block";
    }
});


// ==================== إخفاء القائمة عند الضغط خارجها ====================
document.addEventListener("click", function(e){

    // إذا كانت القائمة غير مفتوحة → لا تفعل شيء
    if(dropdownMenu.style.display !== "block") return;

    // إذا ضغط داخل القائمة أو على زر القائمة → لا تغلق
    if(dropdownMenu.contains(e.target) || menuBtn.contains(e.target)) return;

    // ߔŠغير ذلك → أغلق القائمة
    dropdownMenu.style.display = "none";
});
  
  
// --- تعريف عناصر قائمة المستخدم ---
const userBtn = document.getElementById("userBtn");
const userDropdown = document.getElementById("userDropdown");
const userNameDisplay = document.getElementById("userNameDisplay");
const userTypeDisplay = document.getElementById("userTypeDisplay");

// --- تسجيل الدخول ---
const userTypeSelect = document.getElementById("userTypeSelect");
const racordBlock = document.getElementById("racordBlock");
const racordInput = document.getElementById("racordInput");
const scanQRBtn = document.getElementById("scanQRBtn");
const loginBtn = document.getElementById("loginBtn");

  // ߔŠإجبار إعادة تعيين الحقول عند تحميل الصفحة
userTypeSelect.value = "";
racordInput.value = "";
  
// --- عناصر OldAbsented ---
const oldAbsSelect = document.getElementById("oldAbsClassFilter");
const oldAbsTableBody = document.querySelector("#oldAbsTable tbody");
  
// --- عناصر مودال متابعة الغيابات اليومية ---
const newAbsSelect = document.getElementById("newAbsClassFilter");
const newAbsTableBody = document.querySelector("#newAbsTable tbody");

// --- عناصر مودال sendAbs ---
const sendAbsSelect = document.getElementById("sendAbsClassFilter");
const sendAbsTableBody = document.querySelector("#sendAbsTable tbody");
  
// --- اللودر العام  Loader ---
function showLoader() {
    const loader = document.getElementById("globalLoader");
    if(loader) loader.style.display = "flex";
}
function hideLoader() {
    const loader = document.getElementById("globalLoader");
    if(loader) loader.style.display = "none";
}

// ربط زر QR
if(scanQRBtn){
    scanQRBtn.addEventListener("click", startQRScan);
}
  
// تفعيل عناصر المعاينة PreviewPanel بعد تحميل الصفحة 
  const panel = document.getElementById("filePreviewPanel");
  const header = panel.querySelector(".preview-header");

  const previewClose = document.getElementById("previewClose");
  const previewDownload = document.getElementById("previewDownload");
  const previewOpen = document.getElementById("previewOpen");
  const previewToggle = document.getElementById("previewToggle");

// زر الإغلاق
  previewClose.addEventListener("click", () => {
      panel.style.display = "none";
      itemDescription.textContent = "";
    
  });

// زر التحميل
  previewDownload.addEventListener("click", () => {
      window.open(previewDownload.href, "_blank");
  });

// زر فتح في تبويب جديد
  previewOpen.addEventListener("click", () => {
      window.open(previewOpen.href, "_blank");
  });

// السحب والتحريك
  let isDragging = false, startX, startY, startLeft, startTop;

  header.addEventListener("mousedown", e => {
      if(panel.classList.contains("fullscreen")) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = panel.getBoundingClientRect();
      startLeft = rect.left;
      startTop = rect.top;
      panel.style.transition = "none";
      document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", e => {
      if(!isDragging) return;
      let dx = e.clientX - startX;
      let dy = e.clientY - startY;
      panel.style.left = startLeft + dx + "px";
      panel.style.top = startTop + dy + "px";
  });

  document.addEventListener("mouseup", () => {
      if(!isDragging) return;
      isDragging = false;
      panel.style.transition = "all 0.3s ease";
      document.body.style.userSelect = "";
  });

// دعم اللمس 
  header.addEventListener("touchstart", e => {
      if(panel.classList.contains("fullscreen")) return;
      isDragging = true;
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      const rect = panel.getBoundingClientRect();
      startLeft = rect.left;
      startTop = rect.top;
      panel.style.transition = "none";
  });

  header.addEventListener("touchmove", e => {
      if(!isDragging) return;
      const touch = e.touches[0];
      let dx = touch.clientX - startX;
      let dy = touch.clientY - startY;
      panel.style.left = startLeft + dx + "px";
      panel.style.top = startTop + dy + "px";
      e.preventDefault();
  }, {passive: false});

  header.addEventListener("touchend", () => {
      if(!isDragging) return;
      isDragging = false;
      panel.style.transition = "all 0.3s ease";
  });

// تكبير / تصغير 
  previewToggle.addEventListener("click", () => {
      panel.classList.toggle("fullscreen");
  });

// ==================== SESSION TIMEOUT ====================
let timeout;
let warningTimeout;

const SESSION_TIME = 10 * 60 * 1000; // 10 دقائق
const WARNING_TIME = 9 * 60 * 1000; // بعد 9 دقائق يظهر تنبيه

function resetSessionTimer(){

    clearTimeout(timeout);
    clearTimeout(warningTimeout);

    // ⏳ تنبيه قبل الخروج
    warningTimeout = setTimeout(()=>{
        showToast("⚠️ سيتم تسجيل الخروج بعد دقيقة بسبب عدم النشاط", "warning");
    }, WARNING_TIME);

    // ❌ تسجيل خروج
    timeout = setTimeout(()=>{
        logout();
    }, SESSION_TIME);
}

  
// ==================== MEMORY USERS / MAP ====================
let memoryUsers = { teacher: [], consultation: [], parent: [] };

let usersMap = new Map();  

  // تخزين القوائم في الذاكرة
let USERS_LIST = [];
let USERS_LOADED = false;
  
// ====================AttendanceModal إغلاق مودال الحضور ====================
const closeAttendanceModal = document.getElementById("closeAttendanceModal");
const attendanceModal = document.getElementById("attendanceModal");

if(closeAttendanceModal && attendanceModal){
    closeAttendanceModal.addEventListener("click", function(){
        attendanceModal.style.display = "none";
    });
}
  
// ==================== FETCH FILE تحميل الملفات من Google Drive ====================
async function fetchFile(fileId) {
    if(!fileId) {
        console.error("خطأ: لم يتم تحديد ID الملف");
        return null;
    }
    try {
        const response = await fetch(`${GAS_SCRIPT_URL}?id=${fileId}`);
        if(!response.ok) throw new Error("فشل تحميل الملف من Google Drive");
        const text = await response.text();
        return text.replace(/\r/g,"").split("\n").map(x=>x.trim()).filter(x=>x);
    } catch(err) {
        console.error(`خطأ في تحميل الملف ${fileId}:`, err);
        return null;
    }
}

// ==================== PARSE STUDENT / TEACHER / SUPERVISORY ====================

function parseStudentLine(line){
    if(!line) return null;
    const parts = line.split(";");
    return {
        name: parts[0] || "",
        classe: parts[1] || "",
        racord: parts[2] || "",
        email: parts[3] || "",
        StudentRecords_Fille_ID: parts[4] || ""
    };
}

function parseTeacherLine(line){
    if(!line) return null;
    const parts = line.split(";");
    return {
        name: parts[0] || "",
        racord: parts[1] || "",
        specialty: parts[2] || "",
        email: parts[3] || "",
        classes: parts.slice(4)
    };
}

function parseSupervisoryLine(line){
    if(!line) return null;
    const parts = line.split(";");
    return {
        name: parts[0] || "",
        racord: parts[1] || "",
        profession: parts[2] || "",
        email: parts[3] || ""
    };
}

// ==================== دالة حذف القائمة تلقائياً الساعة 23:00 (توقيت الجزائر) ====================
function autoClearAbsList(){

const now = new Date();

const target = new Date();

target.setHours(23,0,0,0);

let delay = target - now;

if(delay < 0){
delay += 24 * 60 * 60 * 1000;
}

setTimeout(()=>{

localStorage.removeItem("TEMP_SELECTED_ABS");

TEMP_SELECTED_ABS = [];

}, delay);

}

autoClearAbsList();
  
// ==================== دالة حفض التلاميذ المحددين للغياب في القائمة المؤقته ====================
function saveTempAbs(){
localStorage.setItem(
"TEMP_SELECTED_ABS",
JSON.stringify(TEMP_SELECTED_ABS)
);
}

// ==================== دالة تحميل قائمة التلاميذ المحددين للغياب من القائمة المؤقته ====================
const saved = localStorage.getItem("TEMP_SELECTED_ABS");

if(saved){
TEMP_SELECTED_ABS = JSON.parse(saved);
}
  

// ====================USERS LOADING  اختيار المستخدم وتحميل القوائمم ====================

loginBtn.disabled = true; // تعطيل الزر حتى يتم تحميل القوائم

// عند تغيير نوع المستخدم
userTypeSelect.addEventListener("change", async function() {
    const type = this.value;
    if(!type) return;

    showLoader();
    loginBtn.disabled = true; // منع الضغط أثناء التحميل
    USERS_LOADED = false;

    let fileId = "";
    if(type === "teacher") fileId = CONFIG.ListeTeacher_File_ID;
    if(type === "consultation") fileId = CONFIG.ListeSupervisory_File_ID;
    if(type === "parent") fileId = CONFIG.ListeStudents_File_ID;

    try {
        const lines = await fetchFile(fileId);
        if(!lines) throw new Error("تعذر تحميل الملف");

        memoryUsers[type] = [];
        usersMap.clear();

lines.forEach(line => {
    line = line.trim();
    if(!line) return;
    let user = null;
    if(type === "teacher") user = parseTeacherLine(line);
    if(type === "consultation") user = parseSupervisoryLine(line);
    if(type === "parent") user = parseStudentLine(line);

    if(user){
        memoryUsers[type].push(user);
   const key = user.racord
    .toString()
    .trim()
    .replace(/\s/g, "")
    .replace(/\r/g, "")
    .replace(/\n/g, "");

     usersMap.set(key, user); // <-- تنظيف صارم
    }
});

        USERS_LOADED = true;
        loginBtn.disabled = false; // تفعيل الزر بعد التحميل

    } catch(err) {
        console.error(err);
      
        showToast("حدث خطأ أثناء تحميل المستخدمين", "error");
            
        loginBtn.disabled = true;
    }

    hideLoader();
});

// ====================login  تسجيل الدخول ====================
loginBtn.addEventListener("click", function(){
    const type = userTypeSelect.value;
    let racordInputValue = racordInput.value; // القيمة الخام من الحقل
     
   if(!type || type === "-- اختر --"){
    showToast("يرجى اختيار نوع المستخدم", "warning");
    showFieldError(userTypeSelect);
    return;
    }
     
     if(!racordInputValue){
        showToast("يرجى إدخال المعرف", "warning");
        showFieldError(racordInput);
        return;
    }
            
    if(!USERS_LOADED){
      showToast("يرجى الإنتضار جاري تحميل قائمة المستخدمين", "warning"); 
      userTypeSelect.dispatchEvent(new Event("change"));
    return;
    } 
             
    // ߔ٠التعديل هنا: تنظيف المعرف من الفراغات قبل البحث
    const racordClean = racordInputValue
    .toString()
    .trim()
    .replace(/\s/g, "")
    .replace(/\r/g, "")
    .replace(/\n/g, "");

    console.log("المفاتيح الموجودة:", [...usersMap.keys()]);
    console.log("القيمة المدخلة:", racordClean);
  
    const user = usersMap.get(racordClean);

    console.log("محاولة تسجيل الدخول:", racordClean, user); // <-- تتبع المشكلة

    
    if(!user){
        showToast("المعرف غير صحيح", "error");
        showFieldError(racordInput);
        return;
    }
  
  // فتح الجلسة
    openSession(type, user);
    
});


// ==================== OPEN SESSION فتح الجلسة ====================

function openSession(type, user) {
  
    showToast("تم تسجيل الدخول بنجاح", "success"); 

  //  إرسال الإعدادات مرة واحدة فقط
if(!localStorage.getItem("configSent_" + CONFIG.School_Folder_ID)){

  const data = new URLSearchParams();

  data.append("action", "saveConfig");
  data.append("School_Folder_ID", CONFIG.School_Folder_ID);
  data.append("SchoolName", CONFIG.SchoolName);
  data.append("New_Absented_File_ID", CONFIG.New_Absented_File_ID);
  data.append("Archive_Absented_File_ID", CONFIG.Archive_Absented_File_ID);

  fetch(GAS_SCRIPT_URL, { // ✅ بدون ""
    method: "POST",
    body: data
  })
  .then(res => res.text())
  .then(res => {
    console.log("CONFIG RESPONSE:", res);

    if(res === "CONFIG_SAVED"){
      localStorage.setItem("configSent_" + CONFIG.School_Folder_ID, "true");
    }
  });
}
    console.log("فتح الجلسة للمستخدم:", type);

    document.body.style.pointerEvents = "auto";
    
    loginModal.classList.remove("show");
    loginModal.style.display = "none"; // ߔŠإجبار الإخفاء

    console.log("حالة المودال:", loginModal);
   
    if(type === "parent") localStorage.setItem("StudentRecords_Fille_ID", user.StudentRecords_Fille_ID);

    menuBtn.disabled = false;
    menuBtn.style.display = "block";
    const userName = user.name || "المستخدم";

    if(type === "parent") welcomeText.textContent = `مرحبًا بك ${userName} في فضاء أولياء التلاميذ`;
    else if(type === "teacher") welcomeText.textContent = `مرحبًا بك الأستاذ ${userName}`;
    else welcomeText.textContent = `مرحبًا بك ${userName} في فضاء الإشراف التربوي`;

    fillMenu(type);
  
  updateUserDropdown(type, user.name);
}
  

// ==================== SMART TOAST ====================
function showToast(message, type = "info"){
      
  let icons = {
        success: "✅",
        error: "❌",
        warning: "⚠️",
        info: "ℹ️"
    };

    let toast = document.createElement("div");
    toast.className = "toast-message toast-" + type;

    toast.innerHTML = `${icons[type] || ""} ${message}`;

    document.body.appendChild(toast);

    setTimeout(()=> toast.classList.add("show"), 100);

    setTimeout(()=>{
        toast.classList.remove("show");
        setTimeout(()=> toast.remove(), 300);
    }, 3000);
}

  
// ==================== SHOW ERROR ====================
function showFieldError(element){

    element.classList.add("input-error", "shake");

    // إزالة الاهتزاز بعد انتهاءه
    setTimeout(()=>{
        element.classList.remove("shake");
    }, 300);

    // إزالة اللون الأحمر عند التفاعل
    element.addEventListener("change", ()=>{
        element.classList.remove("input-error");
    }, { once: true });
}

  
// ==================== QR SCANNER مسح QR ====================
let qrScanner = null;
function startQRScan() {

  // ✅ تحقق من اختيار المستخدم
    if(!userTypeSelect.value){
      showToast("يرجى اختيار نوع المستخدم", "warning");
      showFieldError(userTypeSelect);
    return;
    }

  
    const modal = document.getElementById("qrScannerModal");
    const qrReader = document.getElementById("qrReader");

    if(!qrReader){
      showToast("عنصر QR Reader غير موجود!", "warning");   
      return;
    }
    
  
    modal.style.display = "flex";

    qrScanner = new Html5Qrcode("qrReader");
    qrScanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        qrCodeMessage => {
            racordInput.value = qrCodeMessage;
            stopQRScanner();
        }
    ).catch(err => {
      console.error("خطأ في QR Scanner:", err);
      
      showToast("تعذر فتح الكاميرا", "warning");
      
    });
}

// ==================== stop QR SCANNER  ====================
function stopQRScanner() {
    if(qrScanner){
        qrScanner.stop().catch(()=>{});
        qrScanner = null;
    }
    const modal = document.getElementById("qrScannerModal");
    if(modal) modal.style.display = "none";
}

document.getElementById("closeQrModal")?.addEventListener("click", stopQRScanner);
  

// ==================== LOGIN WITH ENTER تسجيل الدخول بالضغط على Enter ====================

racordInput.addEventListener("keydown", function(e){

    if(e.key === "Enter"){
        e.preventDefault(); // يمنع النزول للسطر
        loginBtn.click();
    }

});

// ==================== logout دالة تسجيل الخروج ====================
function logout() {
      // إرجاع النص الترحيبي
    welcomeText.textContent = "مرحبًا بك! الرجاء تسجيل الدخول للمتابعة.";
    itemDescription.textContent = "";
      
    localStorage.removeItem("StudentRecords_Fille_ID");

    memoryUsers = { teacher: [], consultation: [], parent: [] };
    usersMap.clear();
    USERS_LOADED = false;

    dropdownMenu.style.display = "none";
    menuBtn.disabled = true;
  
    loginModal.style.display = "flex"; // أو "block" حسب CSS
    loginModal.classList.add("show");

    racordInput.value = "";
    userTypeSelect.value = "";
  
     // إغلاق أي معاينة مفتوحة
    document.getElementById("filePreviewPanel").style.display = "none";

    showToast("تم تسجيل الخروج بنجاح", "success");
    console.log("تم تسجيل الخروج");
}
  
// ==================== التحكم بالقائمة المنبثقة الخاصة بالمستخدم ====================
  
// عرض / إخفاء القائمة عند الضغط على الزر
userBtn.addEventListener("click", () => {
    if(userDropdown.style.display === "block") userDropdown.style.display = "none";
    else userDropdown.style.display = "block";
});

// إغلاق القائمة عند الضغط خارجها
document.addEventListener("click", (e) => {
    if(userDropdown.style.display !== "block") return;
    if(userDropdown.contains(e.target) || userBtn.contains(e.target)) return;
    userDropdown.style.display = "none";
});

// تعبئة معلومات المستخدم عند تسجيل الدخول
function updateUserDropdown(userType, userName) {
    userNameDisplay.textContent = userName || "المستخدم";
    userTypeDisplay.textContent = (userType === "parent") ? "ولي تلميذ" :
                                   (userType === "teacher") ? "أستاذ" :
                                   "إشراف تربوي";
}

// ربط العناصر بالأحداث
document.getElementById("userAnnouncements").addEventListener("click", () => {
    openFilePreview(CONFIG.Announcements_File_ID);
    userDropdown.style.display = "none";
   itemDescription.textContent = "عرض آخر الإعلانات الصادرة عن الإدارة"
});

document.getElementById("userContact").addEventListener("click", () => {
    document.getElementById("contactModal").style.display = "flex";
    userDropdown.style.display = "none";
  itemDescription.textContent = "إرسال رسالة مباشرة لإدارة البوابة"
});

document.getElementById("userLogout").addEventListener("click", () => {
    logout();
    userDropdown.style.display = "none";
});

  
// ==================== تحميل عناصر القائمة fillMenu حسب المستخدم وربطها بالأحداث ====================
  function fillMenu(type) {
    dropdownMenu.innerHTML = "";
    const MENUS = {
      parent: [
        {icon:"people", label:"فضاء أولياء التلاميذ", desc:"مرحبا بكم في فضاء أولياء التلاميذ"},
        {icon:"assignment", label:"سجل الغيابات و المراسلات الإدارية", desc:"عرض سجل الغيابات و المراسلات الإدارية"},
        {icon:"event", label:"جدول استقبال الأولياء", desc:"مواعيد استقبال الأولياء من قبل الإدارة"},
        {icon:"calendar_today", label:"جدول التوقيت الأسبوعي للتلاميذ", desc:"عرض التوقيت الأسبوعي للتلاميذ"},
        {icon:"description", label:"رزنامة الفروض والاختبارات", desc:"رزنامة الفروض والاختبارات للفترة الحالية"},
        {icon:"folder", label:"استمارات ووثائق مختلفة للتلاميذ", desc:"تحميل الاستمارات والوثائق المخصصة للتلاميذ"},
      ],
      teacher: [
        {icon:"person", label:"فضاء الأساتذة", desc:"مرحبا بكم في الأرضية الرقمية - فضاء الأساتذة"},
        {icon:"assignment", label:"القوائم الإسمية للتلاميذ", desc:"عرض القوائم الإسمية للتلاميذ"},
        {icon:"description", label:"قوائم صب النقاط", desc:"إدخال ومتابعة صب النقاط"},
        {icon:"hourglass_top", label:"قائمة التلاميذ الغائبون قبل اليوم", desc:"قائمة التلاميذ الغائبين قبل اليوم"},
        {icon:"send", label:"إرسال غيابات اليوم", desc:"إرسال غيابات اليوم للإدارة"},
        {icon:"calendar_today", label:"جدول توقيت الأستاذ", desc:"عرض جدول توقيت الأستاذ"},
        {icon:"calendar_view_week", label:"جدول التوقيت الأسبوعي للتلاميذ", desc:"جدول التلاميذ الأسبوعي"},
        {icon:"description", label:"رزنامة الفروض والاختبارات", desc:"رزنامة الفروض والاختبارات للفترة الحالية"},
        {icon:"folder", label:"استمارات ووثائق مختلفة للأساتذة", desc:"تحميل استمارات ووثائق مختلفة للأساتذة"},
      ],
      consultation: [
        {icon:"qr_code_2", label:"نظام الحضور الذكي", desc:"تسجيل حضور التلاميذ بالباركود"},
        {icon:"assignment", label:"القوائم الإسمية للتلاميذ", desc:"عرض القوائم الإسمية للتلاميذ"},
        {icon:"hourglass_top", label:"قائمة التلاميذ الغائبون قبل اليوم", desc:"قائمة التلاميذ الغائبين قبل اليوم"},
        {icon:"bar_chart", label:"متابعة غيابات اليوم", desc:"متابعة غيابات اليوم"},
        {icon:"calendar_today", label:"جدول توقيت الأستاذ", desc:"عرض جدول توقيت الأستاذ"},
        {icon:"calendar_view_week", label:"جدول التوقيت الأسبوعي للتلاميذ", desc:"جدول التلاميذ الأسبوعي"},
        {icon:"description", label:"رزنامة الفروض والاختبارات", desc:"رزنامة الفروض والاختبارات"},
        {icon:"folder", label:"استمارات ووثائق مختلفة للإشراف التربوي", desc:"تحميل استمارات ووثائق مختلفة للإشراف التربوي"},
      ]
    };

    MENUS[type].forEach((item, idx) => {
      let div = document.createElement("div");
      let span = document.createElement("span"); 
      span.className="material-icons"; 
      span.textContent=item.icon;
      div.appendChild(span);

      let label = document.createElement("span"); 
      label.textContent=item.label; 
      div.appendChild(label);

// حدث الضغط الواحد لكل div
    div.addEventListener('click', function(){

  itemDescription.textContent = item.desc || "";

  // رابط فضاء الأساتذة
 if(item.label === "فضاء الأساتذة") {
    window.open("https://ostad.education.dz/auth", "_blank");
    dropdownMenu.style.display = "none";
    return;
}

//رابط فضاء أولياء التلاميذ
  if(item.label === "فضاء أولياء التلاميذ") {
    window.open("https://awlyaa.education.dz/", "_blank");
      dropdownMenu.style.display = "none";
    return;
}

// مودال نظام الحضور الذكي
  if(item.label === "نظام الحضور الذكي") {
    document.getElementById("attendanceModal").style.display = "flex";
      dropdownMenu.style.display = "none";
    return;
}

// سجل الغيابات و المراسلات الإدارية
  if(item.label==="سجل الغيابات و المراسلات الإدارية" && type==="parent"){
    const id = localStorage.getItem("SijileAbsence_Fille_ID");
    if(id) openFilePreview(id);
    else 
      
       showToast("لم يتم العثور على ملف سجل الغيابات و المراسلات الإدارية", "warning"); 
          
    dropdownMenu.style.display = "none";
    return;
}

//قائمة التلاميذ الغائبون قبل اليوم
if(item.label === "قائمة التلاميذ الغائبون قبل اليوم"){
    openOldAbsentedModal();
    dropdownMenu.style.display = "none";
    return;
}

//متابعة غيابات اليوم
if(item.label === "متابعة غيابات اليوم"){
    openNewAbsentedModal();
    dropdownMenu.style.display = "none";
    return;
}

//إرسال غيابات اليوم
if(item.label === "إرسال غيابات اليوم"){
    openSendAbsentedModal();
    dropdownMenu.style.display = "none";
    return;
}
      
if(FILE_ITEMS[item.label]) {
    openFilePreview(FILE_ITEMS[item.label]);
    dropdownMenu.style.display = "none";
    return;
}
     
});

      dropdownMenu.appendChild(div);
      setTimeout(()=> div.classList.add("show"), idx*80);
    });
  }

// ==================== دالة اتصل بنا ====================
  document.getElementById("closeContactModal").addEventListener("click", function(){
    document.getElementById("contactModal").style.display="none";
    itemDescription.textContent = "";
  });

  document.getElementById("contactSendBtn").addEventListener("click", function(){
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    const contactResult = document.getElementById("contactResult");
    const ADMIN_EMAIL = "myschoolmanager11@gmail.com";

    if(!email || !/\S+@\S+\.\S+/.test(email)) { contactResult.textContent="يرجى إدخال بريد إلكتروني صحيح"; contactResult.style.color="red"; return; }
    if(!message) { contactResult.textContent="يرجى كتابة الرسالة"; contactResult.style.color="red"; return; }

    const subject = encodeURIComponent("رسالة من مستخدم البوابة");
    const body = encodeURIComponent(`السلام عليكم،\n\nتم إرسال هذه الرسالة من خلال نموذج اتصل بنا.\n\nالبريد: ${email}\nالرسالة: ${message}\n\nتحياتنا.`);
    window.location.href = `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
    contactResult.textContent="سيتم فتح بريدك لإرسال الرسالة مباشرة"; contactResult.style.color="green";
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactMessage").value = "";
  });


 // ====================OldAbsentedModal مودال الغيابات القديمة ====================
 
window.openOldAbsentedModal = async function(){
oldAbsModal.classList.add("show");
      showLoader();

      oldAbsSelect.innerHTML = `<option value="">-- جاري التحميل... --</option>`;
      oldAbsTableBody.innerHTML = "";

      const list = await fetchFile(CONFIG.Old_Absented_File_ID);

      if(!list){
          hideLoader();
          oldAbsSelect.innerHTML = `<option value="">تعذر تحميل البيانات</option>`;
          return;
      }

      OLD_ABS_DATA = list.map(line=>{
          const p = line.split(";");
          return {
              fullName: p[0]?.trim() || "",
              classe: p[1]?.trim() || "",
              hours: p[2]?.trim() || "0"
          };
      });

      const classes = [...new Set(OLD_ABS_DATA.map(x=>x.classe).filter(x=>x))];

      oldAbsSelect.innerHTML = `
    <option value="">-- اختر القسم --</option>
    <option value="all">كل الأقسام</option>
`;

     classes.forEach(c=>{
    const option = document.createElement("option");
    option.value = c;
    option.textContent = c;
    oldAbsSelect.appendChild(option);
});

      hideLoader();
  };

  // OldAbsentedModal غلق المودال
  window.closeOldAbsentedModal = function(){
     oldAbsModal.classList.remove("show");
    itemDescription.textContent = "";
  };

  // فلترة حسب القسم 
oldAbsSelect.addEventListener("change", function(){

    const selected = this.value;
    oldAbsTableBody.innerHTML = "";

    if(!selected){
        oldAbsTableBody.innerHTML = `
            <tr>
                <td colspan="4" style="padding:15px;color:#777;">
                    اختر قسمًا لعرض التلاميذ
                </td>
            </tr>`;
        return;
    }

    let filtered;

    if(selected === "all"){
        filtered = OLD_ABS_DATA;
    } else {
        filtered = OLD_ABS_DATA.filter(x => x.classe === selected);
    }

    filtered = filtered.sort((a,b)=>Number(b.hours)-Number(a.hours));

    if(filtered.length === 0){
        oldAbsTableBody.innerHTML = `
            <tr>
                <td colspan="4" style="padding:15px;color:#777;">
                    لا توجد بيانات
                </td>
            </tr>`;
        return;
    }

    filtered.forEach((row, index) => {

        const tr = document.createElement("tr");

        if(Number(row.hours) >= 10){
            tr.style.background = "#ffe6e6";
        }

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td style="text-align:right;font-weight:600;">
                ${row.fullName}
            </td>
            <td>${row.classe}</td>
            <td>${row.hours}</td>
        `;

        oldAbsTableBody.appendChild(tr);
    });

});

// زر تحميل OldAbsented.txt 
function DownloadOldAbsented() {

    const fileId = CONFIG.Old_Absented_File_ID;

    if(!fileId){
      
       showToast("معرف ملف الغيابات القديمة غير موجود", "warning"); 
          
        return;
    }

    const downloadUrl =
        `https://drive.google.com/uc?id=${fileId}&export=download`;

    window.open(downloadUrl, "_blank");
}
// ====================OldAbsentedModal نهاية مودال الغيابات القديمة ====================
  
  
// ====================NewAbsentedModal  مودال متابعة الغيابات اليومية ==================

window.openNewAbsentedModal = async function(){

    newAbsModal.classList.add("show");
    showLoader();

    newAbsSelect.innerHTML = `<option value="">-- جاري التحميل... --</option>`;
    newAbsTableBody.innerHTML = "";

    const list = await fetchFile(CONFIG.New_Absented_File_ID);

    if(!list){
        hideLoader();
        newAbsSelect.innerHTML = `<option value="">تعذر تحميل البيانات</option>`;
        return;
    }

    // تجميع البيانات
    const studentsMap = {};
    const hoursColumns = ["8","9","10","11","13","14","15","16"];

    list.forEach(line => {

        const p = line.split(";");

        const fullName = p[0]?.trim();
        const classe   = p[1]?.trim();

        if(!fullName || !classe) return;

        const key = fullName + "|" + classe;

        if(!studentsMap[key]){
            studentsMap[key] = {
                fullName: fullName,
                classe: classe,
                hours: []
            };
        }

        // قراءة أعمدة الساعات
        for(let i = 0; i < hoursColumns.length; i++){

            const value = p[i + 2]?.trim();

            if(value){
                if(!studentsMap[key].hours.includes(hoursColumns[i])){
                    studentsMap[key].hours.push(hoursColumns[i]);
                }
            }
        }

    }); // ← هذا هو القوس الذي كان ناقص ߑȍ

    // تحويل إلى مصفوفة بعد انتهاء التجميع
    NEW_ABS_DATA = Object.values(studentsMap);

    // تحميل الأقسام
    const classes = await fetchFile(CONFIG.ListeClasses_File_ID);

    newAbsSelect.innerHTML = `
        <option value="">-- اختر القسم --</option>
        <option value="all">كل الأقسام</option>
    `;

    if(classes){
        classes.forEach(c=>{
            newAbsSelect.innerHTML += `<option value="${c}">${c}</option>`;
        });
    }

    hideLoader();
};

// غلق المودال
window.closeNewAbsentedModal = function(){
    newAbsModal.classList.remove("show");
  itemDescription.textContent = "";
};

// فلترة حسب القسم
newAbsSelect.addEventListener("change", function(){

    const selected = this.value;
    newAbsTableBody.innerHTML = "";

    if(!selected){
        newAbsTableBody.innerHTML = `
            <tr>
                <td colspan="12" style="padding:15px;color:#777;">
                    اختر قسمًا لعرض التلاميذ
                </td>
            </tr>`;
        return;
    }

    let filtered = (selected === "all")
        ? NEW_ABS_DATA
        : NEW_ABS_DATA.filter(x => x.classe === selected);

    if(filtered.length === 0){
        newAbsTableBody.innerHTML = `
            <tr>
                <td colspan="12" style="padding:15px;color:#777;">
                    لا توجد بيانات
                </td>
            </tr>`;
        return;
    }

// ترتيب حسب عدد الساعات (تنازلي)
    filtered.sort((a,b)=> b.hours.length - a.hours.length);

    const hoursColumns = ["8","9","10","11","13","14","15","16"];

    filtered.forEach((row, index) => {

        const tr = document.createElement("tr");
        const totalHours = row.hours.length;

// تلوين إذا تجاوز 4 ساعات
        if(totalHours >= 4){
            tr.style.backgroundColor = "#ffe6e6";
        }

        let hoursCells = "";

        hoursColumns.forEach(h => {
            const isChecked = row.hours.includes(h) ? "checked" : "";
            hoursCells += `
                <td class="Checkbox-col">
                    <input type="checkbox" disabled ${isChecked}>
                </td>`;
        });

        tr.innerHTML = `
            <td class="Count-col">${index + 1}</td>

            <td class="name-col" style="font-weight:600;text-align:right;">
                ${row.fullName}
            </td>

            <td class="Classe-col">
                ${row.classe}
            </td>

            ${hoursCells}

            <td class="Hore-col" style="font-weight:bold;color:#b30000;">
                ${totalHours}
            </td>
        `;

        newAbsTableBody.appendChild(tr);
    });

});


// زر تحميل NewAbsented.txt 
function DownloadNewAbsented() {

    const fileId = CONFIG.New_Absented_File_ID;

    if(!fileId){
       showToast("معرف ملف الغيابات الجديدة غير موجود", "warning"); 
     return;
    }

    const downloadUrl =
        `https://drive.google.com/uc?id=${fileId}&export=download`;

    window.open(downloadUrl, "_blank");
}

// ====================NewAbsentedModal  نهاية مودال الغيابات اليومية ================


// ====================SendAbsentedModal مودال إرسال الغيابات ====================
window.openSendAbsentedModal = async function(){

    sendAbsModal.classList.add("show");
    showLoader();

    sendAbsSelect.innerHTML = `<option value="">-- جاري التحميل... --</option>`;
    sendAbsTableBody.innerHTML = "";

// تحميل قائمة التلاميذ
    const list = await fetchFile(CONFIG.ListeStudents_File_ID);

    if(!list){
        hideLoader();
        sendAbsSelect.innerHTML = `<option value="">تعذر تحميل البيانات</option>`;
        return;
    }

// حفظ القائمة
    STUDENTS_LIST = list;

// تحميل الأقسام
    const classes = await fetchFile(CONFIG.ListeClasses_File_ID);

    sendAbsSelect.innerHTML = `
        <option value="">-- اختر القسم --</option>
        <option value="all">كل الأقسام</option>
    `;

    if(classes){
        classes.forEach(c=>{
            sendAbsSelect.innerHTML += `<option value="${c}">${c}</option>`;
        });
    }

    hideLoader();
};


// غلق المودال
window.closeSendAbsentedModal = function(){
    sendAbsModal.classList.remove("show");
  itemDescription.textContent = "";
  };


// فلترة حسب القسم 
sendAbsSelect.addEventListener("change", function(){

    const selected = this.value;
    sendAbsTableBody.innerHTML = "";

    if(!selected){
        sendAbsTableBody.innerHTML = `
        <tr>
            <td colspan="4" style="padding:15px;color:#777;">
                اختر قسمًا لعرض التلاميذ
            </td>
        </tr>`;
        return;
    }

    let filtered;

    if(selected === "all"){
        filtered = STUDENTS_LIST;
    }else{
        filtered = STUDENTS_LIST.filter(line=>{
            const p = line.split(";");
            return p[1]?.trim() === selected;
        });
    }

    if(filtered.length === 0){
        sendAbsTableBody.innerHTML = `
        <tr>
            <td colspan="4" style="padding:15px;color:#777;">
                لا توجد بيانات
            </td>
        </tr>`;
        return;
    }


// عرض التلاميذ
    filtered.forEach((line, index)=>{

        const p = line.split(";");

        const name = p[0]?.trim() || "";
        const classe = p[1]?.trim() || "";
        const record = p[2]?.trim();

        const tr = document.createElement("tr");

// تحقق إذا كان التلميذ محدد
        const isChecked = TEMP_SELECTED_ABS.some(x => x.record === record);

       if(isChecked){
              tr.classList.add("selected-row");
             }

        tr.innerHTML = `
        <td class="Count-col">${index + 1}</td>

        <td class="name-col student-name" style="font-weight:600;text-align:right;cursor:pointer;">
            ${name}
        </td>

        <td class="Classe-col">
            ${classe}
        </td>

        <td class="Checkbox-col">
            <input type="checkbox"
               class="abs-check"
               data-name="${name}"
               data-classe="${classe}"
               data-record="${record}"
               ${isChecked ? "checked" : ""}>
        </td>
        `;

        sendAbsTableBody.appendChild(tr);


// الضغط على الصف 
        tr.addEventListener("click", function(e){

            if(e.target.tagName.toLowerCase() === "input") return;

            const checkbox = tr.querySelector(".abs-check");
            checkbox.checked = !checkbox.checked;

            const name = checkbox.dataset.name;
            const classe = checkbox.dataset.classe;
            const record = checkbox.dataset.record;

            if(checkbox.checked){

                if(!TEMP_SELECTED_ABS.some(x => x.record === record)){
                    TEMP_SELECTED_ABS.push({name, classe, record});
                     saveTempAbs();
                }

                tr.classList.add("selected-row");

            }else{

                TEMP_SELECTED_ABS = TEMP_SELECTED_ABS.filter(x => x.record !== record);
                     saveTempAbs();
                 tr.classList.remove("selected-row");
            }
        });
    });
});

// ربط زر الإرسال 
document.getElementById("SendAbsenceBtn")
.addEventListener("click", SendAbsence);
  
// حفظ التحديد عند تغيير checkbox
sendAbsTableBody.addEventListener("change", function(e){

    if(!e.target.classList.contains("abs-check")) return;

    const checkbox = e.target;
    const tr = checkbox.closest("tr");

    const name = checkbox.dataset.name;
    const classe = checkbox.dataset.classe;
    const record = checkbox.dataset.record;

    if(checkbox.checked){

        if(!TEMP_SELECTED_ABS.some(x => x.record === record)){
            TEMP_SELECTED_ABS.push({name, classe, record});
        }

        tr.classList.add("selected-row");

    }else{

        TEMP_SELECTED_ABS = TEMP_SELECTED_ABS.filter(x => x.record !== record);

         tr.classList.remove("selected-row");
    }
});

// دالة تحديد جميع التلاميذ القائمة الحالية 
document.getElementById("checkAllBtn").addEventListener("click", function(){

const rows = sendAbsTableBody.querySelectorAll("tr");

rows.forEach(row=>{

const checkbox = row.querySelector(".abs-check");

if(!checkbox) return;

checkbox.checked = true;

const name = checkbox.dataset.name;
const classe = checkbox.dataset.classe;
const record = checkbox.dataset.record;

if(!TEMP_SELECTED_ABS.some(x => x.record === record)){
TEMP_SELECTED_ABS.push({name, classe, record});
}

row.classList.add("selected-row");

});

saveTempAbs();

});

//تحويل الساعة إلى العمود المناسب
function getCurrentSchoolHour(){

    const h = new Date().getHours();

    if(h >= 8 && h < 9) return 2;
    if(h >= 9 && h < 10) return 3;
    if(h >= 10 && h < 11) return 4;
    if(h >= 11 && h < 12) return 5;
    if(h >= 13 && h < 14) return 6;
    if(h >= 14 && h < 15) return 7;
    if(h >= 15 && h < 16) return 8;
    if(h >= 16 && h < 17) return 9;

    return null;
}

//دالة إنشاء سطر الغياب
function buildAbsenceLine(student){

    const hourIndex = getCurrentSchoolHour();

    if(hourIndex === null) return null;

    let cols = new Array(11).fill("");

    cols[0] = student.name;
    cols[1] = student.classe;
    cols[hourIndex] = "1";
    cols[10] = student.record;

    return cols.join(";");
}

//الدالة الرئيسية للإرسال
async function SendAbsence() {

    console.log("Start sending absence");

    if(TEMP_SELECTED_ABS.length === 0){
      
       showToast("لم يتم تحديد أي تلميذ", "warning"); 
          
        return;
    }

    showLoader();

    let newLines = TEMP_SELECTED_ABS
        .map(student => buildAbsenceLine(student))
        .filter(line => line);

    if(newLines.length === 0){
        hideLoader();
      
       showToast("هذه الغيابات مسجلة مسبقا او تحقق من ساعة ارسال الغياب", "warning"); 
        
        return;
    }

    const finalData = newLines.join("\n");

    const success = await updateFile(CONFIG.New_Absented_File_ID, finalData);

    hideLoader();

    if(success){
      
       showToast("تم إرسال الغيابات بنجاح", "success"); 
        
    }else{
      
       showToast("فشلت عملية ارسال الغيابات", "error"); 
        
    }

}

 //دالة updateFile التي ترسل البيانات إلى Google Apps Script 
async function updateFile(fileId, content) {

  try {

    const formData = new FormData();
    formData.append("id", fileId);
    formData.append("data", content);

    const response = await fetch(GAS_SCRIPT_URL, {
      method: "POST",
      body: formData
    });

    const result = await response.text();

    console.log("رد السيرفر:", result);

    if (result.trim() === "OK") {
      return true;
    }

    return false;

  } catch (err) {

    console.error("فشل تحديث الملف:", err);
    return false;

  }

}
  

// ====================SendAbsentedModal نهاية مودال إرسال الغيابات ====================

  
// ====================PreviewPanel معاينة الملفات ====================
function openFilePreview(fileId) {

  const panel = document.getElementById("filePreviewPanel");
  const frame = document.getElementById("filePreviewFrame");
  const previewDownload = document.getElementById("previewDownload");
  const previewOpen = document.getElementById("previewOpen");
  const previewLoader = document.getElementById("previewLoader");

  // إظهار اللوحة
  panel.style.opacity = 0;
  panel.style.display = "flex";

  // إظهار رسالة التحميل
  previewLoader.style.display = "flex";
  frame.style.display = "none";

  const url = `https://drive.google.com/file/d/${fileId}/preview`;

  frame.onload = function () {
      previewLoader.style.display = "none";
      frame.style.display = "block";
  };

  frame.onerror = function () {
      previewLoader.innerHTML = "⚠️ حدث خطأ أثناء تحميل الملف";
  };

  frame.src = url;

  previewDownload.href = `https://drive.google.com/uc?id=${fileId}&export=download`;
  previewOpen.href = url;
  previewOpen.target = "_blank";

  setTimeout(() => panel.style.opacity = 1, 50);
}
});
