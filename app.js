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
  "SchoolKey": "4PWf9-2566",
  "School_Folder_ID": "1Ssuf_-m5YsYHF3mTzjdVtFo3Uwaqvz63",
  "Documents_Folder_ID": "1hP-4ftbTV77dpIwaTrivc9OyTQZSMCeH",
  "Students_Correspondence_Folder_ID": "1xx9j7Q7QFO9veZidUh7V6KcwO-8itCit",
  "Students_SijileAbsence_Folder_ID": "1deEuPZ2wrBSxZXVsuQk0GfTJJMzF5wNF",
  "School_Key_File_ID": "1wk1lzlw8zXgPhY7dSIPPjdHHmBuwk0ES",
  "School_Link_File_ID": "1a9dZfrsiGserk7lLAguyKh36JdAVaqQ9",
  "ListeTeacher_File_ID": "1VvcCZUoev1vAXdfmpz82vR3_H-lawYbW",
  "ListeSupervisory_File_ID": "1WsBoYuSyWfnUYc0jcnXLlfAxk25PqTez",
  "ListeStudents_File_ID": "1aUnIX_m35Ecv1E5pPCOwGHD2HFVHjfE9",
  "ListePrinsipal_File_ID": "1UUZwekfSqvNh8AToYewCnOMxJCYK0fAE",
  "Listepointage_File_ID": "1ySVj-qn2SynSw_5Bel_DmlfJ2eHUUL2G",
  "New_Absented_File_ID": "1i27h10X82CoZbLzSFN-tY6XX33rBtpZB",
  "Old_Absented_File_ID": "14EBYTvZTC3CFsbOaczHMboF4jLPznqoq",
  "Password_File_ID": "1zeB3n_vnIsuAcrK1PeHNHVTh7fjA35-o",
  "ListeClasses_File_ID": "15RUQ04Sun3ZLMA8XsikFchmOr_ahkZ90",
  "Reception_Schedule_File_ID": "1bDiBp-yGv9X2oyuQAfBxgt5oH31D581c",
  "Weekly_Students_Timetable_File_ID": "1CkQD1aI8ePaE2fJkLxE4FRZoiYOaBhxJ",
  "Teacher_Timetable_File_ID": "1jRDk8vg2E6AQWe8uKNEnI7wzdqKKrIVU",
  "Exams_Calendar_File_ID": "1a01PmemEAk2e3hZ7HJsEDPjdPT4EZVuB",
  "Students_Documents_File_ID": "1RFvL7QoDtJdGsQTSlBPVF1wuxKTL_ufq",
  "Teacher_Documents_File_ID": "1SWXyB1InicaBT1vj_p6QIl578m97v2PI",
  "Supervisory_Documents_File_ID": "1QaoANEXPc1bZFMyPLTUDlEgZLFNkx089",
  "Announcements_File_ID": "1FLH_qbP7pU8TfaWXaNMwD3p1EI5nMacB"
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

const GAS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyYaQCYzINzpJNjlS8m-4m2s5IJ-JZyIqVBCPKZC61oB91ERLklSnEl7HGmGEJ3Vuzn/exec";

let currentFileURL = null;
let PASSWORDS = [];
let SCHOOL_KEY = "";
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

  
 // عناصر الصفحة
const userTypeSelect = document.getElementById("userTypeSelect");
const employeeBlock = document.getElementById("employeeBlock");
const employeeSelect = document.getElementById("employeeSelect");
const authBlock = document.getElementById("authBlock");
const continueBtn = document.getElementById("continueBtn");
const loginBtn = document.getElementById("loginBtn");
const loginPassword = document.getElementById("loginPassword");
const schoolKeyBlock = document.getElementById("schoolKeyBlock");
const schoolKeyInput = document.getElementById("schoolKeyInput");
const studentBlock = document.getElementById("studentBlock");
const studentSelect = document.getElementById("studentSelect");
const classeSelect = document.getElementById("ClasseSelect");

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

// تعريف parseStudentLine
function parseStudentLine(line) {
    const parts = line.split(";");
    if (parts.length < 5) return null;
    return {
        name: parts[0].trim(),
        classe: parts[1].trim(),
        racord: parts[2].trim(),
        correspondenceID: parts[3].trim(),
        absenceID: parts[4].trim()
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
  
// ==================== تغيير نوع المستخدم ====================
userTypeSelect.addEventListener("change", async function () {
    const type = this.value;
    console.log("نوع المستخدم المختار:", type);

    // إخفاء جميع البلوكات أولاً
    employeeBlock.style.display =
    authBlock.style.display =
    continueBtn.style.display =
    loginBtn.style.display =
    schoolKeyBlock.style.display =
    studentBlock.style.display = "none";

    if(type === "parent") {
        studentBlock.style.display = "block";
        loginBtn.style.display = "flex";
        await loadClassesList();
    } else if(type === "teacher" || type === "consultation") {
        schoolKeyBlock.style.display = "block";
    }
});

// ==================== تحميل قائمة الأقسام ====================
async function loadClassesList() {
    classeSelect.disabled = true;
    classeSelect.innerHTML = `<option value="">-- يرجى الإنتظار... --</option>`;
    showLoader();

    const classes = await fetchFile(CONFIG.ListeClasses_File_ID);

    if(classes) {
        classeSelect.innerHTML = `<option value="">-- اختر القسم --</option><option value="all">كل الأقسام</option>`;
        classes.forEach(c => classeSelect.innerHTML += `<option value="${c}">${c}</option>`);
    } else {
        classeSelect.innerHTML = `<option value="">حدث خطأ أثناء تحميل الأقسام</option>`;
    }

    classeSelect.disabled = false;
    hideLoader();
}

// ==================== تغيير القسم ====================
classeSelect.addEventListener("change", async function () {
    const selectedClasse = this.value;
    if(selectedClasse) await loadStudentsList(selectedClasse);
});

// ==================== تحميل قائمة الطلاب ====================
async function loadStudentsList(selectedClasse = "all") {
    showLoader();
    studentSelect.disabled = true;
    studentSelect.innerHTML = `<option value="">يرجى الإنتظار...</option>`;

    const list = await fetchFile(CONFIG.ListeStudents_File_ID);
    if(list) {
        STUDENTS_LIST = list;
        let filteredList = selectedClasse === "all" ? list : list.filter(line => line.split(";")[1].trim() === selectedClasse);
        studentSelect.innerHTML = '<option value="">-- اختر الاسم واللقب --</option>';
        filteredList.forEach(line => {
            const parts = line.split(";");
            studentSelect.innerHTML += `<option value="${line}">${parts[0]}</option>`;
        });
    } else {
        studentSelect.innerHTML = `<option value="">حدث خطأ أثناء تحميل القائمة</option>`;
    }

    studentSelect.disabled = false;
    hideLoader();
}

// ==================== زر متابعة للولي ====================
continueBtn.addEventListener("click", function () {
    const selectedLine = studentSelect.value;
    if(!selectedLine) return alert("اختر التلميذ من القائمة");

    const data = parseStudentLine(selectedLine);
    if(!data) return alert("خطأ في بيانات التلميذ المختار");

    parentData = data;
    localStorage.setItem("Correspondence_Fille_ID", data.correspondenceID);
    localStorage.setItem("SijileAbsence_Fille_ID", data.absenceID);

    openSession("parent");
});

// ==================== إدخال رمز المؤسسة ====================
schoolKeyBtn.addEventListener("click", async function () {
    if(!schoolKeyInput.value) return alert("أدخل رمز المؤسسة");

    showLoader();
    try {
        const list = await fetchFile(CONFIG.School_Key_File_ID);
        if(list && list.length>0) SCHOOL_KEY = list[0];

       SCHOOL_KEY = (list && list.length > 0) ? list[0].trim() : CONFIG.SchoolKey;

if(schoolKeyInput.value.trim() !== SCHOOL_KEY) {
    hideLoader();
    return alert("رمز المؤسسة غير صحيح");
}

        schoolKeyBlock.style.display = "none";
        employeeBlock.style.display = "block";
        await loadEmployeeList(userTypeSelect.value);
        await loadPasswords();

    } catch(err) {
        console.error(err);
        alert("حدث خطأ أثناء تحميل البيانات");
    } finally {
        hideLoader();
    }
});

// ==================== تحميل الموظفين ====================
async function loadEmployeeList(type){
    showLoader();
    const fileId = type === "teacher" ? CONFIG.ListeTeacher_File_ID : CONFIG.ListeSupervisory_File_ID;
    employeeSelect.disabled = true;
    employeeSelect.innerHTML = `<option value="">يرجى الإنتظار... </option>`;
    const list = await fetchFile(fileId);
    if(list){
        employeeSelect.innerHTML = '<option value="">-- اختر الاسم واللقب --</option>';
        list.forEach(line => {

    const parts = line.split(";");
    const teacherName = parts[0]?.trim() || "";
    const branche = parts[1]?.trim() || "";

    employeeSelect.innerHTML += 
        `<option value="${teacherName}" data-branche="${branche}">
            ${teacherName}
        </option>`;
});
    } else {
        employeeSelect.innerHTML = '<option value="">حدث خطأ أثناء تحميل القائمة</option>';
    }
    employeeSelect.disabled = false;
    hideLoader();
}

  employeeSelect.addEventListener("change", function(){

    if(this.value){
        authBlock.style.display = "block";
        loginBtn.style.display = "flex";
    } else {
        authBlock.style.display = "none";
        loginBtn.style.display = "none";
    }

});
  
// ==================== تحميل كلمات المرور ====================
async function loadPasswords(){
    const list = await fetchFile(CONFIG.Password_File_ID);
    if(list) PASSWORDS = list;
}

// ==================== تسجيل الدخول ====================
loginBtn.addEventListener("click", function() {

    // ===== دخول ولي =====
    if(userTypeSelect.value === "parent") {

        const selectedLine = studentSelect.value;
        if(!selectedLine) return alert("اختر التلميذ من القائمة");

        const data = parseStudentLine(selectedLine);
        if(!data) return alert("خطأ في بيانات التلميذ المختار");

        parentData = data;

        localStorage.setItem("Correspondence_Fille_ID", data.correspondenceID);
        localStorage.setItem("SijileAbsence_Fille_ID", data.absenceID);
        localStorage.setItem("userName", data.name);

        openSession("parent");
        return;
    }

    // ===== دخول موظف =====
    if(!loginPassword.value) return alert("أدخل كلمة المرور");

    showLoader();

    setTimeout(() => {

        if(!PASSWORDS.includes(loginPassword.value)) {
            hideLoader();
            return alert("كلمة المرور غير صحيحة");
        }

        const selectedOption = employeeSelect.options[employeeSelect.selectedIndex];

        const teacherName = selectedOption.value;
        const branche = selectedOption.getAttribute("data-branche") || "";

        localStorage.setItem("userName", teacherName);
        localStorage.setItem("Branche_Id", branche);

        openSession(userTypeSelect.value);
        hideLoader();

    }, 300);
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
        {icon:"assignment", label:"سجل الغيابات", desc:"عرض سجل الغيابات الخاص بتلميذك"},
        {icon:"mail", label:"سجل المراسلات الإدارية", desc:"عرض المراسلات الإدارية بين الإدارة وأولياء الأمور"},
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

if(item.label === "سجل الغيابات" && type === "parent"){
const id = localStorage.getItem("SijileAbsence_Fille_ID");
if(id) openFilePreview(id);
else alert("لم يتم العثور على الملف");
    dropdownMenu.style.display = "none";
    return;
}

if(item.label === "سجل المراسلات الإدارية" && type === "parent"){
const id = localStorage.getItem("Correspondence_Fille_ID");
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

    // إرجاع النص الترحيبي
    welcomeText.textContent = "مرحبًا بك! الرجاء تسجيل الدخول للمتابعة.";
    itemDescription.textContent = "";

    // إخفاء القائمة
    dropdownMenu.style.display = "none";
    menuBtn.disabled = true;

    // حذف التخزين
    localStorage.clear();
    parentData = null;

    // إرجاع نافذة الدخول
    loginModal.style.display = "flex";
    loginModal.classList.remove("expanded");

    // إعادة الحقول للقيم الافتراضية
    userTypeSelect.value = "";
    schoolKeyInput.value = "";
    loginPassword.value = "";
    employeeSelect.innerHTML = '<option value="">-- اختر الاسم واللقب --</option>';
    studentSelect.innerHTML = '<option value="">-- اختر الاسم واللقب --</option>';
    classeSelect.innerHTML = '<option value="">-- اختر القسم --</option>';

  loadClassesList();
  
    // إخفاء البلوكات
    schoolKeyBlock.style.display =
    employeeBlock.style.display =
    authBlock.style.display =
    continueBtn.style.display =
    loginBtn.style.display =
    studentBlock.style.display = "none";

    // إغلاق أي معاينة مفتوحة
    document.getElementById("filePreviewPanel").style.display = "none";
}

  window.toggleMenu = function () {
    dropdownMenu.style.display = (dropdownMenu.style.display==="block") ? "none" : "block";
  };

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


    // ==================== عرض التلاميذ ====================
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















