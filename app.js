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
  "SchoolKey": "7706-9P0RW",
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

// ==================== DOCUMENT READY ====================
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
  const welcomeText = document.getElementById("welcomeText");
  const schoolKeyBtn = document.getElementById("schoolKeyBtn");

  // ==================== عناصر أولياء الأمور ====================
  const studentBlock = document.getElementById("studentBlock");
  const studentSelect = document.getElementById("studentSelect");
  let STUDENTS_LIST = [];
  let parentData = null;

  // ==================== تحميل قائمة التلاميذ ====================
  async function loadStudentsList() {
    studentSelect.disabled = true;
    studentSelect.innerHTML = `<option value="">يرجى الإنتظار... جاري تحميل قائمة التلاميذ</option>`;

    try {
      const r = await fetch(getFileLink(CONFIG.ListeStudents_File_ID));
      let list = (await r.text())
        .replace(/\r/g, "")
        .split("\n")
        .map(x => x.trim())
        .filter(x => x);

      STUDENTS_LIST = list;
      studentSelect.innerHTML = '<option value="">-- اختر الاسم واللقب --</option>';

      list.forEach(line => {
        let parts = line.split(";");
        studentSelect.innerHTML += `<option value="${line}">${parts[0]}</option>`;
      });

    } catch (err) {
      studentSelect.innerHTML = `<option value="">حدث خطأ أثناء تحميل القائمة</option>`;
      console.error(err);
    }

    studentSelect.disabled = false;
  }

  // ==================== تثبيت عرض المودال ====================
  loginModal.style.display = "flex";
  loginModal.style.zIndex = "5000";
  menuBtn.disabled = true;

  // div وصف العنصر
  let itemDescription = document.createElement("div");
  itemDescription.id = "itemDescription";
  itemDescription.style.fontSize = "13px";
  itemDescription.style.color = "#555";
  itemDescription.style.marginTop = "4px";
  itemDescription.style.minHeight = "18px";
  welcomeText.insertAdjacentElement('afterend', itemDescription);

  // ==================== FUNCTIONS ====================
  function getFileLink(fileId) { return `${GAS_SCRIPT_URL}?id=${fileId}`; }

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
    employeeSelect.innerHTML = `<option value="">يرجى الإنتظار... جاري تحميل قائمة ${type === "teacher" ? "الأساتذة" : "الإشراف التربوي"}</option>`;

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

    welcomeText.textContent = (type === "parent")
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
        { icon: "people", label: "فضاء أولياء التلاميذ", desc: "مرحبا بكم في فضاء أولياء التلاميذ" },
        { icon: "assignment", label: "سجل الغيابات", desc: "عرض سجل الغيابات الخاص بتلميذك" },
        { icon: "mail", label: "سجل المراسلات الإدارية", desc: "عرض المراسلات الإدارية بين الإدارة وأولياء الأمور" },
        { icon: "event", label: "جدول استقبال الأولياء", desc: "مواعيد استقبال الأولياء من قبل الإدارة" },
        { icon: "calendar_today", label: "جدول التوقيت الأسبوعي للتلاميذ", desc: "عرض التوقيت الأسبوعي للتلاميذ" },
        { icon: "description", label: "رزنامة الفروض والاختبارات", desc: "رزنامة الفروض والاختبارات للفترة الحالية" },
        { icon: "folder", label: "استمارات ووثائق مختلفة للتلاميذ", desc: "تحميل الاستمارات والوثائق المخصصة للتلاميذ" },
        { icon: "campaign", label: "إعلانات", desc: "عرض آخر الإعلانات الصادرة عن الإدارة" },
        { icon: "call", label: "اتصل بنا", desc: "إرسال رسالة مباشرة لإدارة البوابة" },
        { icon: "logout", label: "تسجيل الخروج", desc: "الخروج من البوابة" }
      ],
      teacher: [
        // باقي عناصر الأساتذة كما هي
      ],
      consultation: [
        // باقي عناصر الاستشارة كما هي
      ]
    };

    MENUS[type].forEach((item, idx) => {
      let div = document.createElement("div");
      let span = document.createElement("span");
      span.className = "material-icons";
      span.textContent = item.icon;
      div.appendChild(span);

      let label = document.createElement("span");
      label.textContent = item.label;
      div.appendChild(label);

      div.addEventListener('click', function () {
        itemDescription.textContent = item.desc || "";

        if (item.label === "فضاء الأساتذة") {
          window.open("https://ostad.education.dz/auth", "_blank");
          dropdownMenu.style.display = "none";
          return;
        }

        if (item.label === "فضاء أولياء التلاميذ") {
          window.open("https://awlyaa.education.dz/", "_blank");
          dropdownMenu.style.display = "none";
          return;
        }

        if (item.icon === "call") {
          document.getElementById("contactModal").style.display = "flex";
          dropdownMenu.style.display = "none";
          return;
        }

        if (item.icon === "logout") logout();

        if (item.label === "سجل الغيابات") {
          openFilePreview(localStorage.getItem("SijileAbsence_Fille_ID"));
          dropdownMenu.style.display = "none";
          return;
        }

        if (item.label === "سجل المراسلات الإدارية") {
          openFilePreview(localStorage.getItem("Correspondence_Fille_ID"));
          dropdownMenu.style.display = "none";
          return;
        }

        if (FILE_ITEMS[item.label]) {
          openFilePreview(FILE_ITEMS[item.label]);
          dropdownMenu.style.display = "none";
          return;
        }
      });

      dropdownMenu.appendChild(div);
      setTimeout(() => div.classList.add("show"), idx * 80);
    });
  }

  function logout() {
    welcomeText.textContent = "مرحبًا بك! الرجاء تسجيل الدخول للمتابعة.";
    if (itemDescription) itemDescription.textContent = "";
    dropdownMenu.style.display = "none";
    menuBtn.disabled = true;
    localStorage.removeItem("userType");
    localStorage.removeItem("employeeName");
    localStorage.removeItem("Correspondence_Fille_ID");
    localStorage.removeItem("SijileAbsence_Fille_ID");
    loginModal.style.display = "flex";
    loginModal.classList.remove("expanded");
    userTypeSelect.value = "";
    schoolKeyInput.value = "";
    loginPassword.value = "";
    employeeSelect.innerHTML = '<option value="">-- اختر الاسم واللقب --</option>';
    schoolKeyBlock.style.display = employeeBlock.style.display = authBlock.style.display = continueBtn.style.display = loginBtn.style.display = "none";
    document.getElementById("filePreviewPanel").style.display = "none";
  }

  // ==================== EVENTS ====================
  userTypeSelect.addEventListener("change", function () {
    employeeBlock.style.display =
      authBlock.style.display =
      continueBtn.style.display =
      loginBtn.style.display =
      schoolKeyBlock.style.display =
      studentBlock.style.display = "none";

    if (this.value === "parent") {
      studentBlock.style.display = "block";
      loginBtn.style.display = "flex";
      loadStudentsList();
    }

    if (this.value === "teacher" || this.value === "consultation") {
      schoolKeyBlock.style.display = "block";
    }
  });

  loginBtn.addEventListener("click", function () {
    if (userTypeSelect.value === "parent") {
      let selectedLine = studentSelect.value;

      if (!selectedLine)
        return alert("اختر التلميذ من القائمة");

      let parts = selectedLine.trim().split(";");

      parentData = {
        name: parts[0],
        classe: parts[1],
        racord: parts[2],
        correspondenceID: parts[3],
        absenceID: parts[4]
      };

      localStorage.setItem("Correspondence_Fille_ID", parentData.correspondenceID);
      localStorage.setItem("SijileAbsence_Fille_ID", parentData.absenceID);

      openSession("parent");
      return;
    }

    if (!loginPassword.value) return alert("أدخل كلمة المرور");

    const spinner = document.getElementById("loadingSpinner");
    spinner.style.display = "block";

    setTimeout(() => {
      if (!PASSWORDS.includes(loginPassword.value)) {
        spinner.style.display = "none";
        return alert("كلمة المرور غير صحيحة");
      }
      openSession(userTypeSelect.value);
      spinner.style.display = "none";
    }, 300);
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


// ==================== تفعيل عناصر المعاينة بعد تحميل الصفحة ====================
document.addEventListener("DOMContentLoaded", function(){

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

