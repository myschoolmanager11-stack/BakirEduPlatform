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
"قائمة التلاميذ الغائبون قبل اليوم": CONFIG.Old_Absented_File_ID,
"متابعة غيابات اليوم": CONFIG.New_Absented_File_ID,
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
let OLD_ABS_DATA = [];

// ==================== DOCUMENT READY ====================
document.addEventListener("DOMContentLoaded", function () {

  // 🔵 تهيئة اسم المؤسسة والعنوان
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



// ==================== دالة فتح مودال قائمة الغيابات القديمة ====================
async function openOldAbsentedModal(){

  const modal = document.getElementById("ModalOldAbsented");
  const select = document.getElementById("oldAbsClassFilter");

  modal.style.display = "flex";

  // 🔵 إظهار لودر عام
  showLoader();

  // 🔵 تفريغ الجدول
  renderOldAbsTable([]);

  // 🔵 تحميل الملف من جديد دائماً لضمان التحديث
  const list = await fetchFile(CONFIG.Old_Absented_File_ID);

  if(!list){
      hideLoader();
      alert("تعذر تحميل ملف الغيابات القديمة");
      return;
  }

  // 🔵 تخزين البيانات
  OLD_ABS_DATA = list.map(line => {
      const parts = line.split(";");
      return {
          fullName: parts[0]?.trim() || "",
          classe: parts[1]?.trim() || "",
          hours: parts[2]?.trim() || "0"
      };
  });

  // 🔵 استخراج الأقسام
  const classes = [...new Set(OLD_ABS_DATA.map(x => x.classe))];

  // 🔵 تعبئة الكمبوبكس
  select.innerHTML = `<option value="">-- اختر القسم --</option>`;
  classes.forEach(c => {
      select.innerHTML += `<option value="${c}">${c}</option>`;
  });

  hideLoader();
}

// ==================== دالة غلق مودال الغيابات القديمة ====================
function closeOldAbsentedModal(){
  document.getElementById("ModalOldAbsented").style.display = "none";
}

// ==================== دالة تحميل ملف الغيابات القديمة ====================
async function loadOldAbsentedData(){

  const list = await fetchFile(CONFIG.Old_Absented_File_ID);

  if(!list) return alert("تعذر تحميل ملف الغيابات القديمة");

  OLD_ABS_DATA = list.map(line => {

    const parts = line.split(";");

    return {
      fullName: parts[0]?.trim() || "",
      classe: parts[1]?.trim() || "",
      hours: parts[2]?.trim() || "0"
    };

  });
}

// ==================== ComboBox بالأقسام دالة تعبئة ====================
function populateOldAbsClassFilter(){

  const select = document.getElementById("oldAbsClassFilter");

  const classes = [...new Set(OLD_ABS_DATA.map(x => x.classe))];

  select.innerHTML = '<option value="">-- اختر القسم --</option>';

  classes.forEach(c => {
    select.innerHTML += `<option value="${c}">${c}</option>`;
  });
}

// ==================== الفلترة ====================
document.getElementById("oldAbsClassFilter")
.addEventListener("change", function(){

  const selectedClass = this.value;

  if(!selectedClass){
      renderOldAbsTable([]);
      return;
  }

  const filtered = OLD_ABS_DATA.filter(x => x.classe === selectedClass);

  renderOldAbsTable(filtered);
});

// ==================== تعبئة الداتا قريد ====================
function renderOldAbsTable(data){

  const tbody = document.querySelector("#oldAbsTable tbody");
  tbody.innerHTML = "";

  if(data.length === 0){
      tbody.innerHTML = `
        <tr>
          <td colspan="3" style="padding:15px; color:#777;">
            لا توجد بيانات للعرض
          </td>
        </tr>
      `;
      return;
  }

  data.forEach(row => {

    tbody.innerHTML += `
      <tr>
        <td style="text-align:right;">${row.fullName}</td>
        <td>${row.classe}</td>
        <td>${row.hours}</td>
      </tr>
    `;
  });
}













