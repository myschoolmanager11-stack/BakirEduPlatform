// app.js

const GAS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby2X2ku8gwIIq5_nYjEykekNk27IiTzNFRfF5fUhzwnczdZKf1ilUXssxfC4o-KB0tE/exec";

let PASSWORDS = [];
let SCHOOL_KEY = "";

document.addEventListener("DOMContentLoaded", function () {

  // ==============================
  // عناصر الصفحة
  // ==============================
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

  const contactModal = document.getElementById("contactModal");
  const closeContactModal = document.getElementById("closeContactModal");
  const contactSendBtn = document.getElementById("contactSendBtn");
  const contactEmail = document.getElementById("contactEmail");
  const contactMessage = document.getElementById("contactMessage");
  const contactResult = document.getElementById("contactResult");
  const ADMIN_EMAIL = "myschoolmanager11@gmail.com";

  // ==============================
  // دوال مساعدة
  // ==============================
  function getFileLink(fileId) {
    return `${GAS_SCRIPT_URL}?id=${fileId}`;
  }

  async function loadSchoolKey() {
    const r = await fetch(getFileLink(CONFIG.School_Key_File_ID));
    const text = await r.text();
    SCHOOL_KEY = text.trim();
  }

  async function loadPasswords() {
    const r = await fetch(getFileLink(CONFIG.Password_File_ID));
    const text = await r.text();
    PASSWORDS = text.replace(/\r/g, "").split("\n").map(x => x.trim()).filter(x => x);
  }

  function loadEmployeeList(type) {
    let fileId =
      type === "teacher"
        ? CONFIG.ListeTeacher_File_ID
        : CONFIG.ListeSupervisory_File_ID;

    fetch(getFileLink(fileId))
      .then(r => r.text())
      .then(text => {
        let list = text.replace(/\r/g, "").split("\n").map(x => x.trim()).filter(x => x);
        employeeSelect.innerHTML = '<option value="">-- اختر الاسم واللقب --</option>';
        list.forEach(e => {
          employeeSelect.innerHTML += `<option value="${e}">${e}</option>`;
        });
      });
  }

  // ==============================
  // إدارة الجلسة
  // ==============================
  function openSession(type) {
    const welcomeText = document.getElementById("welcomeText");
    const employeeName = employeeSelect.value;

    loginModal.style.display = "none";
    menuBtn.disabled = false;
    dropdownMenu.style.display = "none";

    if (type === "parent") {
      welcomeText.textContent = "مرحبًا بك! افتح القائمة لاستخدام خدماتنا.";
    } else {
      welcomeText.textContent = `مرحبًا بك يا ${employeeName}! افتح القائمة لاستخدام خدماتنا.`;
    }

    fillMenu(type);

    localStorage.setItem("userType", type);
    localStorage.setItem("employeeName", employeeName);
  }

  function logout() {
    const welcomeText = document.getElementById("welcomeText");
    welcomeText.textContent = "مرحبًا بك! الرجاء تسجيل الدخول للمتابعة.";

    dropdownMenu.style.display = "none";
    menuBtn.disabled = true;
    loginModal.style.display = "flex";

    localStorage.removeItem("userType");
    localStorage.removeItem("employeeName");

    employeeSelect.innerHTML = '<option value="">-- اختر الاسم واللقب --</option>';
    loginPassword.value = "";
    schoolKeyInput.value = "";
  }

  window.toggleMenu = function () {
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
  };

  // ==============================
  // إنشاء القائمة
  // ==============================
  function fillMenu(type) {
    dropdownMenu.innerHTML = "";

    const MENUS = {
      parent: [
        { icon: "assignment", label: "سجل الغيابات" },
        { icon: "mail", label: "سجل المراسلات الإدارية" },
        { icon: "event", label: "جدول استقبال الأولياء" },
        { icon: "calendar_today", label: "جدول التوقيت الأسبوعي للتلاميذ" },
        { icon: "description", label: "رزنامة الفروض والاختبارات" },
        { icon: "folder", label: "استمارات ووثائق مختلفة للتلاميذ" },
        { icon: "campaign", label: "إعلانات" },
        { icon: "call", label: "اتصل بنا" },
        { icon: "logout", label: "تسجيل الخروج" }
      ],
      teacher: [
        { icon: "assignment", label: "القوائم الإسمية للتلاميذ" },
        { icon: "description", label: "قوائم صب النقاط" },
        { icon: "hourglass_top", label: "الغائبون قبل اليوم" },
        { icon: "send", label: "إرسال غيابات اليوم" },
        { icon: "calendar_today", label: "جدول توقيت الأستاذ" },
        { icon: "calendar_view_week", label: "جدول التوقيت الأسبوعي للتلاميذ" },
        { icon: "description", label: "رزنامة الفروض والاختبارات" },
        { icon: "folder", label: "استمارات ووثائق مختلفة للأساتذة" },
        { icon: "campaign", label: "إعلانات" },
        { icon: "call", label: "اتصل بنا" },
        { icon: "logout", label: "تسجيل الخروج" }
      ],
      consultation: [
        { icon: "assignment", label: "القوائم الإسمية" },
        { icon: "hourglass_top", label: "الغائبون قبل اليوم" },
        { icon: "bar_chart", label: "متابعة غيابات اليوم" },
        { icon: "calendar_today", label: "جدول توقيت الأستاذ" },
        { icon: "calendar_view_week", label: "جدول التوقيت الأسبوعي للتلاميذ" },
        { icon: "description", label: "رزنامة الفروض والاختبارات" },
        { icon: "folder", label: "وثائق خاصة بالإشراف التربوي" },
        { icon: "campaign", label: "إعلانات" },
        { icon: "call", label: "اتصل بنا" },
        { icon: "logout", label: "تسجيل الخروج" }
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

      if (item.icon === "logout") div.onclick = logout;
      if (item.label === "اتصل بنا") div.onclick = () => contactModal.style.display = "flex";

      dropdownMenu.appendChild(div);
      setTimeout(() => div.classList.add("show"), idx * 80);
    });
  }

  // ==============================
  // استعادة الجلسة
  // ==============================
  const savedType = localStorage.getItem("userType");
  const savedName = localStorage.getItem("employeeName");

  if (savedType) {
    menuBtn.disabled = false;
    loginModal.style.display = "none";
    fillMenu(savedType);

    const welcomeText = document.getElementById("welcomeText");
    welcomeText.textContent = savedType === "parent"
      ? "مرحبًا بك! افتح القائمة لاستخدام خدماتنا."
      : `مرحبًا بك يا ${savedName}! افتح القائمة لاستخدام خدماتنا.`;
  }

  // ==============================
  // الأحداث
  // ==============================
  userTypeSelect.addEventListener("change", function () {
    employeeBlock.style.display = "none";
    authBlock.style.display = "none";
    continueBtn.style.display = "none";
    loginBtn.style.display = "none";
    schoolKeyBlock.style.display = "none";

    if (this.value === "parent") continueBtn.style.display = "flex";
    if (this.value === "teacher" || this.value === "consultation") schoolKeyBlock.style.display = "block";
  });

  continueBtn.addEventListener("click", () => openSession("parent"));

  schoolKeyBtn.addEventListener("click", async function () {
    if (!schoolKeyInput.value) return alert("أدخل رمز المؤسسة");

    await loadSchoolKey();
    if (schoolKeyInput.value !== SCHOOL_KEY) return alert("رمز المؤسسة غير صحيح");

    schoolKeyBlock.style.display = "none";
    employeeBlock.style.display = "block";

    loadEmployeeList(userTypeSelect.value);
    await loadPasswords();
  });

  employeeSelect.addEventListener("change", function () {
    if (this.value !== "") {
      authBlock.style.display = "block";
      loginBtn.style.display = "flex";
    }
  });

  loginBtn.addEventListener("click", function () {
    if (!loginPassword.value) return alert("أدخل كلمة المرور");
    if (!PASSWORDS.includes(loginPassword.value)) return alert("كلمة المرور غير صحيحة");

    openSession(userTypeSelect.value);
  });

  // ==============================
  // مودال اتصل بنا
  // ==============================
  closeContactModal?.addEventListener("click", () => contactModal.style.display = "none");

  contactSendBtn?.addEventListener("click", function () {
    const emailVal = contactEmail.value.trim();
    const msgVal = contactMessage.value.trim();

    if (!emailVal || !/\S+@\S+\.\S+/.test(emailVal)) {
      contactResult.textContent = "يرجى إدخال بريد إلكتروني صحيح";
      contactResult.style.color = "red";
      return;
    }
    if (!msgVal) {
      contactResult.textContent = "يرجى كتابة الرسالة";
      contactResult.style.color = "red";
      return;
    }

    const subject = encodeURIComponent("رسالة من مستخدم البوابة");
    const body = encodeURIComponent(
      `السلام عليكم،\n\nتم إرسال هذه الرسالة من خلال نموذج اتصل بنا.\n\nالبريد: ${emailVal}\nالرسالة: ${msgVal}\n\nتحياتنا.`
    );

    window.location.href = `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
    contactResult.textContent = "سيتم فتح بريدك لإرسال الرسالة مباشرة";
    contactResult.style.color = "green";

    contactEmail.value = "";
    contactMessage.value = "";
  });

}); // نهاية DOMContentLoaded
