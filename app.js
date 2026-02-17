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
  "SchoolKey": "2R98c0I301",
  "School_Folder_ID": "17JuIu9yqqPLCtUvzLpNro9W2Kxcvxd1z",
  "Documents_Folder_ID": "1D8ENvWpCQTSuEIeMK_D-fyUVLdakLOfC",
  "Students_Correspondence_Folder_ID": "1EUT7U6_PgH1cArOQn_3XrvDsB22mh8Q_",
  "Students_SijileAbsence_Folder_ID": "1-D0cD8EzsA-r5ahxTANCtYeDBoFDbmK5",
  "School_Key_File_ID": "1mSNMoZNZvOIEUl1WYkoTdp2qLvhSVkT2",
  "School_Link_File_ID": "1qoimW3ARvOKq3eQHjyRjRYadz2DLNOCM",
  "ListeTeacher_File_ID": "1wAtKCVQ-colhdZe-oY6BkRTix9kqIAB7",
  "ListeSupervisory_File_ID": "15yK29UDbc1FLuja02Ps7t_Z5teu30dKi",
  "ListeStudents_File_ID": "1zRiRa_ZAdUMwEzCqYJtjsT5Aq7Rds-gK",
  "New_Absented_File_ID": "1LL0jB8-pWf7jjJAvcubOgn-tOQ3kNt3q",
  "Old_Absented_File_ID": "1ChEkzdH0WPbLb97vbCP85Ud97NKpKt0x",
  "Password_File_ID": "10T4EbNNpCJ4psRbSQZLtglj66PTJVQi8",
  "ListeClasses_File_ID": "1Nmxg-OTbZim8Xzg0tVBBe5f7NF1FgiqK",
  "ListeBranches_File_ID": "1YVugctovM0MqU55AqkxCy1gDKBoT-ITo",
  "Reception_Schedule_File_ID": "1Lr74xtl22pGzvm0BwkGe0uslJw0eAkLb",
  "Weekly_Students_Timetable_File_ID": "1sntTaJEc9mJzJiHit7ReH71ruQ8THRD5",
  "Teacher_Timetable_File_ID": "1OYCAhCwivuJZoRHP1Bwejg32Luys8Bfc",
  "Exams_Calendar_File_ID": "18bvygHQ_ZRdooalwYsN4cIUWcLe8kngK",
  "Students_Documents_File_ID": "1ZGRHd9e64nx9Bv9QvVtQIK4op0j9XHKy",
  "Teacher_Documents_File_ID": "1wHgjfJUu5Zxl4o0dXBsBcSBopS2LKsVJ",
  "Supervisory_Documents_File_ID": "1hx9UFDaaMWobU8QKDaSJ4w44fD-iSpdP",
  "Announcements_File_ID": "1hpH71D6X6-GuBJau0YeM6geya7ftcEP0"
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
  const loginModal = document.getElementById("loginModal");
  const menuBtn = document.getElementById("menuBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const schoolKeyBlock = document.getElementById("schoolKeyBlock");
  const schoolKeyInput = document.getElementById("schoolKeyInput");
  const welcomeText = document.getElementById("welcomeText");
  const schoolKeyBtn = document.getElementById("schoolKeyBtn");
  
  // div وصف العنصر
  let itemDescription = document.createElement("div");
  itemDescription.id = "itemDescription";
  itemDescription.style.fontSize = "13px";
  itemDescription.style.color = "#555";
  itemDescription.style.marginTop = "4px";
  itemDescription.style.minHeight = "18px";
  welcomeText.insertAdjacentElement('afterend', itemDescription);

  // ==================== FUNCTIONS ====================
  function getFileLink(fileId) {
    return `${GAS_SCRIPT_URL}?id=${fileId}`;
  }

  async function loadSchoolKey() {
    const r = await fetch(getFileLink(CONFIG.School_Key_File_ID));
    SCHOOL_KEY = (await r.text()).trim();
  }

  async function loadPasswords() {
    const r = await fetch(getFileLink(CONFIG.Password_File_ID));
    PASSWORDS = (await r.text())
      .replace(/\r/g, "")
      .split("\n")
      .map(x => x.trim())
      .filter(x => x);
  }

  function loadEmployeeList(type) {
    const fileId = type === "teacher" ? CONFIG.ListeTeacher_File_ID : CONFIG.ListeSupervisory_File_ID;
    employeeSelect.disabled = true;
    employeeSelect.innerHTML = `<option value="">يرجى الإنتظار... جاري تحميل قائمة ${type==="teacher"?"الأساتذة":"الإشراف التربوي"}</option>`;

    fetch(getFileLink(fileId))
      .then(r => r.text())
      .then(text => {
        let list = text.replace(/\r/g, "").split("\n").map(x => x.trim()).filter(x => x);
        employeeSelect.innerHTML = '<option value="">-- اختر الاسم واللقب --</option>';
        list.forEach(e => employeeSelect.innerHTML += `<option value="${e}">${e}</option>`);
        employeeSelect.disabled = false;
      })
      .catch(error => {
        employeeSelect.innerHTML = '<option value="">حدث خطأ أثناء تحميل القائمة</option>';
        console.error("خطأ في تحميل القائمة:", error);
        employeeSelect.disabled = false;
      });
  }

  function openSession(type) {
    const employeeName = employeeSelect.value;
    loginModal.style.display = "none";
    menuBtn.disabled = false;
    dropdownMenu.style.display = "none";

    welcomeText.textContent = (type==="parent") 
      ? "مرحبًا بك! افتح القائمة لاستخدام خدماتنا." 
      : `مرحبًا بك يا ${employeeName}! افتح القائمة لاستخدام خدماتنا.`;

    fillMenu(type);
    localStorage.setItem("userType", type);
    localStorage.setItem("employeeName", employeeName);
  }

  function fillMenu(type) {
    dropdownMenu.innerHTML = "";
    const MENUS = {
      parent: [
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

        if(item.icon === "call") document.getElementById("contactModal").style.display="flex";
        if(item.icon === "logout") logout();
        if(FILE_ITEMS[item.label]) openFilePreview(FILE_ITEMS[item.label]);
        dropdownMenu.style.display = "none";
      });

      dropdownMenu.appendChild(div);
      setTimeout(()=> div.classList.add("show"), idx*80);
    });
  }

  function logout() {
    welcomeText.textContent = "مرحبًا بك! الرجاء تسجيل الدخول للمتابعة.";
    if(itemDescription) itemDescription.textContent = "";
    dropdownMenu.style.display = "none";
    menuBtn.disabled = true;
    localStorage.clear();
    loginModal.style.display = "flex";
    loginModal.classList.remove("expanded");
    userTypeSelect.value = "";
    schoolKeyInput.value = "";
    loginPassword.value = "";
    employeeSelect.innerHTML = '<option value="">-- اختر الاسم واللقب --</option>';
    schoolKeyBlock.style.display = employeeBlock.style.display = authBlock.style.display = continueBtn.style.display = loginBtn.style.display = "none";
    document.getElementById("filePreviewPanel").style.display="none";
  }

  window.toggleMenu = function () {
    dropdownMenu.style.display = (dropdownMenu.style.display==="block") ? "none" : "block";
  };

  // ==================== EVENTS ====================
  userTypeSelect.addEventListener("change", function () {
    employeeBlock.style.display = authBlock.style.display = continueBtn.style.display = loginBtn.style.display = schoolKeyBlock.style.display = "none";
    if(this.value==="parent") continueBtn.style.display="flex";
    if(this.value==="teacher" || this.value==="consultation") schoolKeyBlock.style.display="block";
  });

  continueBtn.addEventListener("click", function () { openSession("parent"); });

  schoolKeyBtn.addEventListener("click", async function () {
    if(!schoolKeyInput.value) return alert("أدخل رمز المؤسسة");
    await loadSchoolKey();
    if(schoolKeyInput.value !== SCHOOL_KEY) return alert("رمز المؤسسة غير صحيح");
    schoolKeyBlock.style.display="none";
    employeeBlock.style.display="block";
    loadEmployeeList(userTypeSelect.value);
    await loadPasswords();
  });

  employeeSelect.addEventListener("change", function() {
    if(this.value!=="") { authBlock.style.display="block"; loginBtn.style.display="flex"; }
  });

  loginBtn.addEventListener("click", function() {
    if(!loginPassword.value) return alert("أدخل كلمة المرور");
    if(!PASSWORDS.includes(loginPassword.value)) return alert("كلمة المرور غير صحيحة");
    openSession(userTypeSelect.value);
  });

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

  // ==================== حفظ الجلسة ====================
  const savedType = localStorage.getItem("userType");
  const savedName = localStorage.getItem("employeeName");
  if(savedType) {
    menuBtn.disabled=false;
    loginModal.style.display="none";
    fillMenu(savedType);
    welcomeText.textContent = (savedType==="parent") ? 
      "مرحبًا بك! افتح القائمة لاستخدام خدماتنا." : `مرحبًا بك يا ${savedName}! افتح القائمة لاستخدام خدماتنا.`;
  }

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

  setTimeout(()=> panel.style.opacity=1, 50);
}

document.getElementById("previewClose").addEventListener("click", () => {
    document.getElementById("filePreviewPanel").style.display = "none";
});


