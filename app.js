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
  "SchoolKey": "W6EM4BML7R",
  "School_Folder_ID": "1rjWam6hEkw7wnGB8EHpwRdLMlVpe-d2o",
  "Documents_Folder_ID": "1HNgCr3CMZHdZsDu1P5xvz1vso-uD5BCt",
  "Students_Correspondence_Folder_ID": "1u1wn0FwyCBnXyoIBno47Yr_lA3LIeJmv",
  "Students_SijileAbsence_Folder_ID": "1WbROhU3sHKLvqZ1p8eRuwnTnb6sBKH9_",
  "School_Key_File_ID": "19dt0Y4SZOANsInV34NXSq-3t2OQ85Vj6",
  "School_Link_File_ID": "195x_X3u7ThLmsQd8OdJttBt1BTwScSzL",
  "ListeTeacher_File_ID": "155gv4A0mkxauKoq4dSxmt6OdDMR1bzcX",
  "ListeSupervisory_File_ID": "1QBswGnM2WH4BE00_Fk8ENVtg47OYTQTA",
  "ListeStudents_File_ID": "19k7AR-HLuc2j52Flxs4qzNzt9mcVuRZV",
  "ListePrinsipal_File_ID": "1_yq3GAifJtE1UbT4BWiH0e_5pa98TDk1",
  "Listepointage_File_ID": "1oT-j-P3hxa93wX7a4OTbkRhhWAaqCxy_",
  "New_Absented_File_ID": "1kicci4TwnfIy7NoEtBbTSrL1l5tnWgPI",
  "Old_Absented_File_ID": "1vUP2v1mGWdBc3QplX6heL56nQoTME0ee",
  "Password_File_ID": "1Ob12goGIKBKo2arHPjho7lh_QPHH23z0",
  "ListeClasses_File_ID": "1yYBUGMdXLNxq64PIRw_TxfDQbuVNoM8G",
  "ListeBranches_File_ID": "1KaoUynaIDXMEOvNNxk-rdZGhpDIMNsvJ",
  "Reception_Schedule_File_ID": "1MX2nQ6vIKA1Ow0yvXKV8XgJqLf8hu443",
  "Weekly_Students_Timetable_File_ID": "1RclZ2SWfn-BE7_FyLa8Qf42_eWX4_KwX",
  "Teacher_Timetable_File_ID": "1YG0tXIeHHK32fCVekP9JqIonIWeUMcLn",
  "Exams_Calendar_File_ID": "1wnRSBp-pIGT7xT146Mjxk2-FNeRoKig7",
  "Students_Documents_File_ID": "112dhRD_4xaFOvjoX9V2ZLkq9TOREn3T4",
  "Teacher_Documents_File_ID": "1R50YzFXll6R7mOeJuvcSCSL17ld8ne1U",
  "Supervisory_Documents_File_ID": "13C4qNopsWF9eBkh406zgiXa22RBvE9To",
  "Announcements_File_ID": "103ZBx1TJ-BKm05CAaJ5z03xDh2xgggrM"
};

const FILE_ITEMS = {
  "جدول توقيت الأستاذ": CONFIG.Teacher_Timetable_File_ID,
  "جدول استقبال الأولياء": CONFIG.Reception_Schedule_File_ID,
  "جدول التوقيت الأسبوعي للتلاميذ": CONFIG.Weekly_Students_Timetable_File_ID,
  "رزنامة الفروض والاختبارات": CONFIG.Exams_Calendar_File_ID,
  "استمارات ووثائق مختلفة للتلاميذ": CONFIG.Students_Documents_File_ID,
  "استمارات ووثائق مختلفة للأساتذة": CONFIG.Teacher_Documents_File_ID,
  "استمارات ووثائق مختلفة للإشراف التربوي": CONFIG.Supervisory_Documents_File_ID,
  "إعلانات": CONFIG.Announcements_File_ID
};

const GAS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby2X2ku8gwIIq5_nYjEykekNk27IiTzNFRfF5fUhzwnczdZKf1ilUXssxfC4o-KB0tE/exec";

let currentFileURL = null;
let PASSWORDS = [];
let SCHOOL_KEY = "";
let STUDENTS_LIST = [];
let parentData = null;
// ==================== DOCUMENT READY ====================
document.addEventListener("DOMContentLoaded", function () {

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
    if(parts.length < 4) return null;
    return {
        name: parts[0],
        classe: parts[1],
        correspondenceID: parts[2],
        absenceID: parts[3]
    };
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
        list.forEach(e => employeeSelect.innerHTML += `<option value="${e}">${e}</option>`);
    } else {
        employeeSelect.innerHTML = '<option value="">حدث خطأ أثناء تحميل القائمة</option>';
    }
    employeeSelect.disabled = false;
    hideLoader();
}

// ==================== تحميل كلمات المرور ====================
async function loadPasswords(){
    const list = await fetchFile(CONFIG.Password_File_ID);
    if(list) PASSWORDS = list;
}

// ==================== تسجيل الدخول ====================
loginBtn.addEventListener("click", function() {
    if(userTypeSelect.value === "parent") {
        const selectedLine = studentSelect.value;
        if(!selectedLine) return alert("اختر التلميذ من القائمة");

        const data = parseStudentLine(selectedLine);
        if(!data) return alert("خطأ في بيانات التلميذ المختار");

        parentData = data;
        localStorage.setItem("Correspondence_Fille_ID", data.correspondenceID);
        localStorage.setItem("SijileAbsence_Fille_ID", data.absenceID);

        openSession("parent");
        return;
    }

    if(!loginPassword.value) return alert("أدخل كلمة المرور");

    showLoader();
    setTimeout(() => {
        if(!PASSWORDS.includes(loginPassword.value)) {
            hideLoader();
            return alert("كلمة المرور غير صحيحة");
        }
        openSession(userTypeSelect.value);
        hideLoader();
    }, 300);
});

// ==================== فتح الجلسة ====================
function openSession(type) {
    console.log("فتح الجلسة للمستخدم:", type);
    document.getElementById("loginModal").style.display = "none";
    localStorage.setItem("userType", type);
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
        {icon:"hourglass_top", label:"الغائبون قبل اليوم", desc:"قائمة التلاميذ الغائبين قبل اليوم"},
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
        {icon:"assignment", label:"القوائم الإسمية", desc:"عرض القوائم الإسمية"},
        {icon:"hourglass_top", label:"الغائبون قبل اليوم", desc:"قائمة الغائبين قبل اليوم"},
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

// ==================== معاينة الملفات ====================
function openFilePreview(fileId) {
  const panel = document.getElementById("filePreviewPanel");
  const frame = document.getElementById("filePreviewFrame");
  const previewDownload = document.getElementById("previewDownload");
  const previewOpen = document.getElementById("previewOpen");

  frame.style.display = "none";
  panel.style.opacity = 0;
  panel.style.display = "flex";

  const url = `https://drive.google.com/file/d/${fileId}/preview`;
  frame.src = url;
  frame.onload = () => frame.style.display = "block";

  previewDownload.href = `https://drive.google.com/uc?id=${fileId}&export=download`;
  previewOpen.href = url;
  previewOpen.target = "_blank";

  setTimeout(() => panel.style.opacity = 1, 50);
}

// ==================== تدالتين عامتين لعرض نص الإنتضار وتحميل البيانات ====================
function showLoader(){
    document.getElementById("globalLoader").style.display = "flex";
}

function hideLoader(){
    document.getElementById("globalLoader").style.display = "none";
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

});

// إغلاق مودال الحضور
document.getElementById("closeAttendanceModal").addEventListener("click", function(){
  document.getElementById("attendanceModal").style.display = "none";
});















