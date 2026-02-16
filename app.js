/* ===========================
   الإعدادات
=========================== */
const CONFIG = {
  SchoolName: "متوسطة الشهيد بكير تركي محمد بن حسن (المدية)",
  School_Key_File_ID: "1J9tUtwMXdyzRyphRdxYcEJv4kAB5rqsB",
  ListeTeacher_File_ID: "1fWx9ngbHdmm7ZXGNeHgB35Lp1xXtol8q",
  ListeSupervisory_File_ID: "1rC-2-w8sgpKRCBPr7OoPN-KMPRzdN_VY",
  Password_File_ID: "1cX6acqEHh4zGGLHv5G8P3OFIBo4wmsn6"
};

const GAS_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycby2X2ku8gwIIq5_nYjEykekNk27IiTzNFRfF5fUhzwnczdZKf1ilUXssxfC4o-KB0tE/exec";

let PASSWORDS = [];
let SCHOOL_KEY = "";

/* ===========================
   بعد تحميل الصفحة
=========================== */
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

  /* ===========================
     دوال المساعدة
  =========================== */

  function getFileLink(fileId) {
    return `${GAS_SCRIPT_URL}?id=${fileId}`;
  }

  function loadEmployeeList(type) {

    let fileId =
      type === "teacher"
        ? CONFIG.ListeTeacher_File_ID
        : CONFIG.ListeSupervisory_File_ID;

    fetch(getFileLink(fileId))
      .then(r => r.text())
      .then(text => {

        let list = text
          .replace(/\r/g, "")
          .split("\n")
          .map(x => x.trim())
          .filter(x => x);

        employeeSelect.innerHTML =
          '<option value="">-- اختر الاسم واللقب --</option>';

        list.forEach(e => {
          employeeSelect.innerHTML +=
            `<option value="${e}">${e}</option>`;
        });

      })
      .catch(() => alert("تعذر تحميل قائمة الموظفين"));
  }

  function loadPasswords() {
    return fetch(getFileLink(CONFIG.Password_File_ID))
      .then(r => r.text())
      .then(text => {
        PASSWORDS = text
          .replace(/\r/g, "")
          .split("\n")
          .map(x => x.trim())
          .filter(x => x);
      })
      .catch(() => alert("تعذر تحميل كلمات المرور"));
  }

  function openSession(type) {
    loginModal.style.display = "none";
    menuBtn.disabled = false;
    fillMenu(type);
  }

  function fillMenu(type) {

    dropdownMenu.innerHTML = "";

    const MENUS = {
      parent: [
        "📋 سجل الغيابات",
        "📨 سجل المراسلات الإدارية",
        "🗓 جدول استقبال الأولياء",
        "📅 جدول التوقيت الأسبوعي للتلاميذ",
        "📝 رزنامة الفروض والاختبارات",
        "📂 استمارات ووثائق مختلفة للتلاميذ",
        "📢 إعلانات",
        "☎️ اتصل بنا",
        "🚪 تسجيل الخروج"
      ],
      teacher: [
        "📋 القوائم الإسمية للتلاميذ",
        "📝 قوائم صب النقاط",
        "⏳ الغائبون قبل اليوم",
        "📤 إرسال غيابات اليوم",
        "📅 جدول توقيت الأستاذ",
        "📅 جدول التوقيت الأسبوعي للتلاميذ",
        "📝 رزنامة الفروض والاختبارات",
        "📂 استمارات ووثائق مختلفة للأساتذة",
        "📢 إعلانات",
        "☎️ اتصل بنا",
        "🚪 تسجيل الخروج"
      ],
      consultation: [
        "📋 القوائم الإسمية",
        "⏳ الغائبون قبل اليوم",
        "📊 متابعة غيابات اليوم",
        "📅 جدول توقيت الأستاذ",
        "📅 جدول التوقيت الأسبوعي للتلاميذ",
        "📝 رزنامة الفروض والاختبارات",
        "📂 وثائق خاصة بالإشراف التربوي",
        "📢 إعلانات",
        "☎️ اتصل بنا",
        "🚪 تسجيل الخروج"
      ]
    };

    MENUS[type].forEach(item => {

      let div = document.createElement("div");
      div.textContent = item;

      if (item.includes("تسجيل الخروج"))
        div.onclick = logout;

      dropdownMenu.appendChild(div);
    });
  }

  function logout() {
    dropdownMenu.style.display = "none";
    menuBtn.disabled = true;
    loginModal.style.display = "flex";
  }

  window.toggleMenu = function () {
    dropdownMenu.style.display =
      dropdownMenu.style.display === "block"
        ? "none"
        : "block";
  };

  /* ===========================
     الأحداث
  =========================== */

  userTypeSelect.addEventListener("change", function () {

    employeeBlock.style.display = "none";
    authBlock.style.display = "none";
    continueBtn.style.display = "none";
    loginBtn.style.display = "none";

    if (this.value === "parent") {
      continueBtn.style.display = "flex";
    }

    if (this.value === "teacher" || this.value === "consultation") {
      employeeBlock.style.display = "block";
      loadEmployeeList(this.value);
      loadPasswords();
    }

  });

  employeeSelect.addEventListener("change", function () {

    if (this.value !== "") {
      authBlock.style.display = "block";
      loginBtn.style.display = "flex";
    } else {
      authBlock.style.display = "none";
      loginBtn.style.display = "none";
    }

  });

  continueBtn.addEventListener("click", function () {
    openSession("parent");
  });

  loginBtn.addEventListener("click", function () {

    if (!employeeSelect.value)
      return alert("اختر الاسم أولاً");

    if (!loginPassword.value)
      return alert("أدخل كلمة المرور");

    if (!PASSWORDS.includes(loginPassword.value))
      return alert("كلمة المرور غير صحيحة");

    openSession(userTypeSelect.value);
  });

});
