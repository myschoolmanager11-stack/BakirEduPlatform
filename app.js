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
  "School_Folder_ID": "1hW9f6QDQMFHTKpH8fI4wVM9subzojh-T",
  "Documents_Folder_ID": "1Mhsx0yQJX3iooQ1s9yBCYvI7BDJ7p5x9",
  "StudentsRecords_Folder_ID": "16JpBwOj_7iEF-CNdHwwpEW2S9p-IE0yh",
  "School_Link_File_ID": "1DTW9n3-TggYOa0XcNdzRv8t1hSEvTcCW",
  "ListeTeacher_File_ID": "1rjAcUud3-tgFUpJQiAN3RQuvZHSrvat5",
  "ListeSupervisory_File_ID": "16DGPMRjpKE_55OeEXy68gve98sKhE5B4",
  "ListeStudents_File_ID": "1uAYXlQGQOjdbY0FB2MWSR80VTCCo5fn_",
  "ListePrinsipal_File_ID": "1Cg_lvQ-VvaT8UxS0p4obldKnYTC4yzsQ",
  "Listepointage_File_ID": "1Oz7Ps0c-P47hz1V0lohhKaN2w4brwMyq",
  "New_Absented_File_ID": "10ci-EC2rEKBikLOsXjE1Dr_j6OU8Pbpx",
  "Old_Absented_File_ID": "1dNoGk6DUSlxFz8ptOY2MxgxsW0QjDgWL",
  "ListeClasses_File_ID": "1yXIUX9rM6ILw8QnX4YtOTjyHenEpFRM-",
  "Reception_Schedule_File_ID": "15IqM59K107ZcpoGxKOkQAHBA24-4RgAS",
  "Weekly_Students_Timetable_File_ID": "1Lm9eHzneBtaScPTH1v0PwYsH3PKZwJBO",
  "Teacher_Timetable_File_ID": "1h6zUDZReva03nI8uRz3Hh11eVCqzJp3y",
  "Exams_Calendar_File_ID": "1Qb3CXV_4NnQSL04EJFi7OjCIa73F_z8z",
  "Students_Documents_File_ID": "1fhsmmLCp2o5sG3R-5nrBaHLIDZ5IvXDa",
  "Teacher_Documents_File_ID": "1c8igqdJAJerlqnT_Yni_C8PKd6B8WPBo",
  "Supervisory_Documents_File_ID": "11Oe0DHFRzE-Ykptl_Q9T0peUVP3kS_s5",
  "Announcements_File_ID": "1fdhianG-OnDNRAsa1gEzBgESHM1OStB_"
};

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

//"قائمة التلاميذ الغائبون قبل اليوم": CONFIG.Old_Absented_File_ID,
//"متابعة غيابات اليوم": CONFIG.New_Absented_File_ID,

const GAS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwvXiyo83WcCCHYdxXUTDAEaMohUq9ocXi9VzMpCJKjr0wDBhd2OEQH1oKV9BwfXLLW/exec";

let OLD_ABS_DATA = [];
let NEW_ABS_DATA = [];
let TEMP_SELECTED_ABS = [];

let currentUserType = null;
let usersStudents = [];
let usersTeachers = [];
let usersSupervisory = [];

// ==================== DOCUMENT READY ====================
document.addEventListener("DOMContentLoaded", function () {

   // عناصر الصفحة
const userTypeSelect = document.getElementById("userTypeSelect");
const racordInput = document.getElementById("racordInput");
const scanQRBtn = document.getElementById("scanQRBtn");
const loginBtn = document.getElementById("loginBtn");
const racordBlock = document.getElementById("racordBlock");
  
const menuBtn = document.getElementById("menuBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const welcomeText = document.getElementById("welcomeText");
const itemDescription = document.getElementById("itemDescription");
const loginModal = document.getElementById("loginModal");
const schoolKeyBtn = document.getElementById("schoolKeyBtn");

const oldAbsModal = document.getElementById("ModalOldAbsented");
const oldAbsSelect = document.getElementById("oldAbsClassFilter");
const oldAbsTableBody = document.querySelector("#oldAbsTable tbody");
  
const newAbsModal = document.getElementById("ModalNewAbsented");
const newAbsSelect = document.getElementById("newAbsClassFilter");
const newAbsTableBody = document.querySelector("#newAbsTable tbody");

const sendAbsModal = document.getElementById("SendAbsentedModal");
const sendAbsSelect = document.getElementById("sendAbsClassFilter");
const sendAbsTableBody = document.querySelector("#sendAbsTable tbody");
const schoolNameElement = document.getElementById("schoolName");
  
  // ߔՠتهيئة اسم المؤسسة والعنوان
document.title = CONFIG.SchoolName;

/* اظهار نافذة تسجيل الدخول */
loginModal.classList.add("show");

/* عند اختيار نوع المستخدم */
userTypeSelect.addEventListener("change", function(){

    if(this.value !== ""){
        racordBlock.style.display = "block";
        scanQRBtn.style.display = "inline-flex";
        loginBtn.style.display = "flex";
    }else{
        racordBlock.style.display = "none";
        scanQRBtn.style.display = "none";
        loginBtn.style.display = "none";
    }

});

});

  
if (schoolNameElement) {
    schoolNameElement.textContent = CONFIG.SchoolName;
}
  
function showLoader() { document.getElementById("globalLoader").style.display = "flex"; }
function hideLoader() { document.getElementById("globalLoader").style.display = "none"; }

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

  
loginBtn.addEventListener("click", loginWithRacord);

// تسجيل الدخول بالضغط على Enter
racordInput.addEventListener("keypress", function(e){

if(e.key === "Enter"){
loginWithRacord();
}

});
  
// ==================== تحميل القوائم حسب نوع المستخدم ====================
userTypeSelect.addEventListener("change", async function(){

const type = this.value;

if(!type) return;

currentUserType = type;

showLoader();

try{

if(type === "parent" && usersStudents.length === 0){

const list = await fetchFile(CONFIG.ListeStudents_File_ID);

if(list){

usersStudents = list.map(line=>{
const p = line.split(";");

return {
name: p[0]?.trim(),
classe: p[1]?.trim(),
racord: p[2]?.trim(),
email: p[3]?.trim(),
record: p[4]?.trim()
};

});

}

}

if(type === "teacher" && usersTeachers.length === 0){

const list = await fetchFile(CONFIG.ListeTeacher_File_ID);

if(list){

usersTeachers = list.map(line=>{
const p = line.split(";");

return {
name: p[0]?.trim(),
racord: p[1]?.trim(),
specialite: p[2]?.trim(),
email: p[3]?.trim()
};

});

}

}

if(type === "consultation" && usersSupervisory.length === 0){

const list = await fetchFile(CONFIG.ListeSupervisory_File_ID);

if(list){

usersSupervisory = list.map(line=>{
const p = line.split(";");

return {
name: p[0]?.trim(),
racord: p[1]?.trim(),
fonction: p[2]?.trim(),
email: p[3]?.trim()
};

});

}

}

}catch(err){

console.error(err);
alert("تعذر تحميل قائمة المستخدمين");

}

hideLoader();

// إظهار عناصر تسجيل الدخول
racordBlock.style.display = "flex";
racordInput.value = "";
racordInput.focus();
  
});

// ==================== تسجيل الدخول عبر Racord ====================
function loginWithRacord(){

const racord = racordInput.value.trim();

if(!racord){
alert("أدخل معرف Racord");
return;
}

let user = null;

if(currentUserType === "parent"){

user = usersStudents.find(u => u.racord === racord);

if(user){

localStorage.setItem("userName", user.name);
localStorage.setItem("StudentRecords_Fille_ID", user.record);

openSession("parent");
return;

}

}

if(currentUserType === "teacher"){

user = usersTeachers.find(u => u.racord === racord);

if(user){

localStorage.setItem("userName", user.name);

openSession("teacher");
return;

}

}

if(currentUserType === "consultation"){

user = usersSupervisory.find(u => u.racord === racord);

if(user){

localStorage.setItem("userName", user.name);

openSession("consultation");
return;

}

}

alert("المعرف غير صحيح");

}

// ==================== تشغيل ماسح QR ====================
scanQRBtn.addEventListener("click", function(){

const modal = document.getElementById("qrScannerModal");
modal.style.display = "flex";

if(typeof Html5Qrcode === "undefined"){
alert("مكتبة QR غير محملة");
return;
}
const scanner = new Html5Qrcode("qrReader");

scanner.start(
{ facingMode: "environment" },
{ fps: 10, qrbox: 250 },

(decodedText) => {

racordInput.value = decodedText;

scanner.stop();
modal.style.display = "none";

loginWithRacord();

},

(err)=>{}

);

});

// ==================== فتح الجلسة ====================
function openSession(type) {

    console.log("فتح الجلسة للمستخدم:", type);

    document.getElementById("loginModal").style.display = "none";

    localStorage.setItem("userType", type);

    menuBtn.disabled = false;

    const userName = localStorage.getItem("userName") || "المستخدم";

    if(type === "parent") {
        welcomeText.textContent = `مرحبًا بك ${userName} في فضاء أولياء التلاميذ`;
    } 
    else if(type === "teacher") {
        welcomeText.textContent = `مرحبًا بك الأستاذ ${userName}`;
    } 
    else {
        welcomeText.textContent = `مرحبًا بك ${userName} في فضاء الإشراف التربوي`;
    }

    fillMenu(type);
}
  

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
        {icon:"campaign", label:"إعلانات", desc:"عرض آخر الإعلانات الصادرة عن الإدارة"},
        {icon:"call", label:"اتصل بنا", desc:"إرسال رسالة مباشرة لإدارة البوابة"},
        {icon:"logout", label:"تسجيل الخروج", desc:"الخروج من البوابة"}
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
        {icon:"campaign", label:"إعلانات", desc:"عرض آخر الإعلانات الصادرة عن الإدارة"},
        {icon:"call", label:"اتصل بنا", desc:"إرسال رسالة مباشرة لإدارة البوابة"},
        {icon:"logout", label:"تسجيل الخروج", desc:"الخروج من البوابة"}
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
        {icon:"campaign", label:"إعلانات", desc:"عرض آخر الإعلانات"},
        {icon:"call", label:"اتصل بنا", desc:"إرسال رسالة مباشرة لإدارة البوابة"},
        {icon:"logout", label:"تسجيل الخروج", desc:"الخروج من البوابة"}
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

  // روابط خارجية
 if(item.label === "فضاء الأساتذة") {
    window.open("https://ostad.education.dz/auth", "_blank");
    dropdownMenu.style.display = "none";
    return;
}

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

  if(item.icon === "call") {
    document.getElementById("contactModal").style.display = "flex";
      dropdownMenu.style.display = "none";
    return;
}

  if(item.icon === "logout") logout();
     
if(item.label === "سجل الغيابات و المراسلات الإدارية" && type === "parent"){
const id = localStorage.getItem("StudentRecords_Fille_ID");
if(id) openFilePreview(id);
else alert("لم يتم العثور على الملف");
    dropdownMenu.style.display = "none";
    return;
}

if(item.label === "قائمة التلاميذ الغائبون قبل اليوم"){
    openOldAbsentedModal();
    dropdownMenu.style.display = "none";
    return;
}

if(item.label === "متابعة غيابات اليوم"){
    openNewAbsentedModal();
    dropdownMenu.style.display = "none";
    return;
}

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

// ==================== logout ====================
function logout() {

welcomeText.textContent = "مرحبًا بك! الرجاء تسجيل الدخول للمتابعة.";
itemDescription.textContent = "";

dropdownMenu.style.display = "none";
menuBtn.disabled = true;

localStorage.removeItem("userType");
localStorage.removeItem("userName");
localStorage.removeItem("StudentRecords_Fille_ID");

loginModal.style.display = "flex";
loginModal.classList.remove("expanded");

userTypeSelect.value = "";
racordBlock.style.display = "none";
racordInput.value = "";
racordInput.focus();

document.getElementById("filePreviewPanel").style.display = "none";

}

  window.toggleMenu = function () {
    dropdownMenu.style.display = (dropdownMenu.style.display==="block") ? "none" : "block";
  };

  
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

// ==================== دالة اتصل بنا ====================
  document.getElementById("closeContactModal").addEventListener("click", function(){
    document.getElementById("contactModal").style.display="none";
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

 // ==================== فتح مودال الغيابات القديمة ====================
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

  // ==================== غلق المودال ====================
  window.closeOldAbsentedModal = function(){
     oldAbsModal.classList.remove("show");
  };

  // ==================== فلترة حسب القسم ====================
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
// ==================== نهاية مودال الغيابات القديمة ====================
  
// ==================== فتح مودال متابعة الغيابات اليومية ====================
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

    // ====== تجميع البيانات ======
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

// ==================== غلق المودال ====================
window.closeNewAbsentedModal = function(){
    newAbsModal.classList.remove("show");
};

// ==================== فلترة حسب القسم ====================
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
// ==================== نهاية مودال الغيابات اليومية ====================

// ==================== فتح مودال إرسال الغيابات ====================
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


// ==================== غلق المودال ====================
window.closeSendAbsentedModal = function(){
    sendAbsModal.classList.remove("show");
};


// ==================== فلترة حسب القسم ====================
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
        filtered = usersStudents;
    }else{
        filtered = usersStudents.filter(s => s.classe === selected);
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


    // ==================== عرض التلاميذ ====================
    filtered.forEach((student, index)=>{

const name = student.name;
const classe = student.classe;
const record = student.record;

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


        // ==================== الضغط على الصف ====================
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

// ==================== ربط زر الإرسال ====================
document.getElementById("SendAbsenceBtn")
.addEventListener("click", SendAbsence);
  
// ==================== حفظ التحديد عند تغيير checkbox ====================
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

// ==================== دالة تحديد جميع التلاميذ القائمة الحالية ====================
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
        alert("لم يتم تحديد أي تلميذ");
        return;
    }

    showLoader();

    let newLines = TEMP_SELECTED_ABS
        .map(student => buildAbsenceLine(student))
        .filter(line => line);

    if(newLines.length === 0){
        hideLoader();
        alert("هذه الغيابات مسجلة مسبقاً");
        return;
    }

    const finalData = newLines.join("\n");

    const success = await updateFile(CONFIG.New_Absented_File_ID, finalData);

    hideLoader();

    if(success){
        alert("تم إرسال الغيابات بنجاح ✅");
    }else{
        alert("فشل حفظ الغيابات ❌");
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
  
// ==================== نهاية مودال إرسال الغيابات ====================

  
// ==================== إغلاق مودال الحضور ====================
  document.getElementById("closeAttendanceModal").addEventListener("click", function(){
      document.getElementById("attendanceModal").style.display = "none";
  });

});

  
// ==================== معاينة الملفات ====================
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

// ==================== تفعيل عناصر المعاينة بعد تحميل الصفحة ====================
  const panel = document.getElementById("filePreviewPanel");
  const header = panel.querySelector(".preview-header");

  const previewClose = document.getElementById("previewClose");
  const previewDownload = document.getElementById("previewDownload");
  const previewOpen = document.getElementById("previewOpen");
  const previewToggle = document.getElementById("previewToggle");

  // زر الإغلاق
  previewClose.addEventListener("click", () => {
      panel.style.display = "none";
  });

  // زر التحميل
  previewDownload.addEventListener("click", () => {
      window.open(previewDownload.href, "_blank");
  });

  // زر فتح في تبويب جديد
  previewOpen.addEventListener("click", () => {
      window.open(previewOpen.href, "_blank");
  });

  // ==================== السحب والتحريك ====================
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

  // ==================== دعم اللمس ====================
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

  // ==================== تكبير / تصغير ====================
  previewToggle.addEventListener("click", () => {
      panel.classList.toggle("fullscreen");
  });

// إغلاق مودال الحضور
document.getElementById("closeAttendanceModal").addEventListener("click", function(){
  document.getElementById("attendanceModal").style.display = "none";
});



// ==================== زر تحميل OldAbsented.txt ====================
function DownloadOldAbsented() {

    const fileId = CONFIG.Old_Absented_File_ID;

    if(!fileId){
        alert("معرف الملف غير موجود");
        return;
    }

    const downloadUrl =
        `https://drive.google.com/uc?id=${fileId}&export=download`;

    window.open(downloadUrl, "_blank");
}

// ==================== زر تحميل OldAbsented.txt ====================
function DownloadNewAbsented() {

    const fileId = CONFIG.New_Absented_File_ID;

    if(!fileId){
        alert("معرف الملف غير موجود");
        return;
    }

    const downloadUrl =
        `https://drive.google.com/uc?id=${fileId}&export=download`;

    window.open(downloadUrl, "_blank");
}



