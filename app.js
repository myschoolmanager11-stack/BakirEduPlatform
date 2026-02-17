const CONFIG = {
  "SchoolName": "متوسطة الشهيد بكير تركي محمد بن حسن (المدية)",
  "SchoolAcadimi": "مديرية التربية لولاية المدية",
  "SchoolVille": "المدية",
  "SchoolDaira": "المدية",
  "SchoolBaladiya": "المدية",
  "Schoolsystem": "متوسط",
  "SchoolPhone": "0000000000",
  "SchoolAdresse": "حي راس قلوش المدية",
  "SchoolMail": "cembakirtorki@gmail.com",
  "SchoolLink": "https://myschoolmanager11-stack.github.io/BakirEduPlatform/",
  "SchoolKey": "29fZIb47Ed",
  "School_Folder_ID": "1_QRPDalqnbAB_ydeZNa2ZGLBEOFy4VKr",
  "Documents_Folder_ID": "1KXP6lrj1VHFeavzw42XeRnI3V3JERi_3",
  "Students_Correspondence_Folder_ID": "1JCVhwwYTW7QnMRTjzkb2m2h-Uq_gRbn_",
  "Students_SijileAbsence_Folder_ID": "1mL5eJIfj6sRxj1XoGtlfeGKQVnMGcNZq",
  "School_Key_File_ID": "1J9tUtwMXdyzRyphRdxYcEJv4kAB5rqsB",
  "School_Link_File_ID": "1AMDhbO6ylmC8Aj-7Uy9li1r0PIutePtS",
  "ListeTeacher_File_ID": "1fWx9ngbHdmm7ZXGNeHgB35Lp1xXtol8q",
  "ListeSupervisory_File_ID": "1rC-2-w8sgpKRCBPr7OoPN-KMPRzdN_VY",
  "ListeStudents_File_ID": "1kuMFj94eNpknZmljsAY2cUmkoheg6sCk",
  "New_Absented_File_ID": "1VlBle_lhUfCaSfk8PedIZ95TG0GQR7iM",
  "Old_Absented_File_ID": "1vPcNv5CrlRGd7cCV0raAhyu2EI24POiH",
  "Password_File_ID": "1cX6acqEHh4zGGLHv5G8P3OFIBo4wmsn6",
  "ListeClasses_File_ID": "1Nh2_fo3Gjj26oqjqsicOEc3pCqhByuVW",
  "ListeBranches_File_ID": "1lLtipDukDIFJIQsC9GIDJikFURhOqZh-",
  "Reception_Schedule_File_ID": "1StoRkoYX_pc9Vr50pCOsRbLgVxL14ncm",
  "Weekly_Students_Timetable_File_ID": "1BIjn3CMudumwJ-ZjGpsybYo5KeAKvT03",
  "Teacher_Timetable_File_ID": "1PzyPfwuRdMOOJAlpq6WJy-GbHPrm19W",
  "Exams_Calendar_File_ID": "1bgBZuAAecXMMoKqQTvlSU9vUlRc2AM9d",
  "Students_Documents_File_ID": "1lb0p5OhGZ1IpnlyFtBFn_0J5z93WCFnz",
  "Teacher_Documents_File_ID": "1a-g6QAG-GbqUlFuzVfwdsgH4HwH_rxcT",
  "Supervisory_Documents_File_ID": "1VaIgUqIWVBpwJSmHEho28gU0HoJgMS1M",
  "Announcements_File_ID": "1tbtXXyU1NvrTKME50QjJ53VL-FODcCo6"
};

const GAS_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycby2X2ku8gwIIq5_nYjEykekNk27IiTzNFRfF5fUhzwnczdZKf1ilUXssxfC4o-KB0tE/exec";

let PASSWORDS = [];
let SCHOOL_KEY = "";

document.addEventListener("DOMContentLoaded", function () {
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
  const schoolKeyBtn = document.getElementById("schoolKeyBtn");

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
    fetch(getFileLink(fileId))
      .then(r => r.text())
      .then(text => {
        let list = text.replace(/\r/g,"").split("\n").map(x => x.trim()).filter(x => x);
        employeeSelect.innerHTML = '<option value="">-- اختر الاسم واللقب --</option>';
        list.forEach(e => employeeSelect.innerHTML += `<option value="${e}">${e}</option>`);
      });
  }

  function openSession(type) {
    const welcomeText = document.getElementById("welcomeText");
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
        {icon:"assignment", label:"سجل الغيابات"},
        {icon:"mail", label:"سجل المراسلات الإدارية"},
        {icon:"event", label:"جدول استقبال الأولياء"},
        {icon:"calendar_today", label:"جدول التوقيت الأسبوعي للتلاميذ"},
        {icon:"description", label:"رزنامة الفروض والاختبارات"},
        {icon:"folder", label:"استمارات ووثائق مختلفة للتلاميذ"},
        {icon:"campaign", label:"إعلانات"},
        {icon:"call", label:"اتصل بنا"},
        {icon:"logout", label:"تسجيل الخروج"}
      ],
      teacher: [
        {icon:"assignment", label:"القوائم الإسمية للتلاميذ"},
        {icon:"description", label:"قوائم صب النقاط"},
        {icon:"hourglass_top", label:"الغائبون قبل اليوم"},
        {icon:"send", label:"إرسال غيابات اليوم"},
        {icon:"calendar_today", label:"جدول توقيت الأستاذ"},
        {icon:"calendar_view_week", label:"جدول التوقيت الأسبوعي للتلاميذ"},
        {icon:"description", label:"رزنامة الفروض والاختبارات"},
        {icon:"folder", label:"استمارات ووثائق مختلفة للأساتذة"},
        {icon:"campaign", label:"إعلانات"},
        {icon:"call", label:"اتصل بنا"},
        {icon:"logout", label:"تسجيل الخروج"}
      ],
      consultation: [
        {icon:"assignment", label:"القوائم الإسمية"},
        {icon:"hourglass_top", label:"الغائبون قبل اليوم"},
        {icon:"bar_chart", label:"متابعة غيابات اليوم"},
        {icon:"calendar_today", label:"جدول توقيت الأستاذ"},
        {icon:"calendar_view_week", label:"جدول التوقيت الأسبوعي للتلاميذ"},
        {icon:"description", label:"رزنامة الفروض والاختبارات"},
        {icon:"folder", label:"وثائق خاصة بالإشراف التربوي"},
        {icon:"campaign", label:"إعلانات"},
        {icon:"call", label:"اتصل بنا"},
        {icon:"logout", label:"تسجيل الخروج"}
      ]
    };

    MENUS[type].forEach((item, idx) => {
      let div = document.createElement("div");
      let span = document.createElement("span"); span.className="material-icons"; span.textContent=item.icon;
      div.appendChild(span);
      let label = document.createElement("span"); label.textContent=item.label; div.appendChild(label);

      if(item.icon==="logout") div.onclick=logout;

      div.addEventListener('click', function(){
        if(item.icon==="call") document.getElementById("contactModal").style.display="flex";
      });

      dropdownMenu.appendChild(div);
      setTimeout(()=> div.classList.add("show"), idx*80);
    });
  }

  function logout() {
    const welcomeText = document.getElementById("welcomeText");
    welcomeText.textContent = "مرحبًا بك! الرجاء تسجيل الدخول للمتابعة.";
    dropdownMenu.style.display="none";
    menuBtn.disabled = true;
    loginModal.style.display="flex";
    localStorage.clear();
    employeeSelect.innerHTML = '<option value="">-- اختر الاسم واللقب --</option>';
    loginPassword.value = "";
    schoolKeyInput.value = "";
  }

  window.toggleMenu = function () {
    dropdownMenu.style.display = (dropdownMenu.style.display==="block") ? "none" : "block";
  };

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

  const savedType = localStorage.getItem("userType");
  const savedName = localStorage.getItem("employeeName");
  if(savedType) {
    menuBtn.disabled=false;
    loginModal.style.display="none";
    fillMenu(savedType);
    document.getElementById("welcomeText").textContent = (savedType==="parent") ? 
      "مرحبًا بك! افتح القائمة لاستخدام خدماتنا." : `مرحبًا بك يا ${savedName}! افتح القائمة لاستخدام خدماتنا.`;
  }

});
