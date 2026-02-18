async function initApp() {
  // ==================== عناصر الصفحة ====================
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

  const FILE_ITEMS = CONFIG.FILE_ITEMS || {}; // إذا كانت هناك ملفات للمعاينة

  loginModal.style.display = "flex";
  loginModal.style.zIndex = "5000";
  menuBtn.disabled = true;

  let itemDescription = document.createElement("div");
  itemDescription.id = "itemDescription";
  itemDescription.style.fontSize = "13px";
  itemDescription.style.color = "#555";
  itemDescription.style.marginTop = "4px";
  itemDescription.style.minHeight = "18px";
  welcomeText.insertAdjacentElement('afterend', itemDescription);

  // ==================== Flags & Storage ====================
  let SCHOOL_KEY = "";
  let PASSWORDS = [];
  let passwordsLoaded = false;

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
    passwordsLoaded = true;
  }

  async function loadEmployeeList(type) {
    const fileId = type === "teacher" ? CONFIG.ListeTeacher_File_ID : CONFIG.ListeSupervisory_File_ID;
    employeeSelect.disabled = true;
    employeeSelect.innerHTML = `<option value="">يرجى الإنتظار... جاري تحميل قائمة ${type==="teacher"?"الأساتذة":"الإشراف التربوي"}</option>`;
    try {
      const r = await fetch(getFileLink(fileId));
      const list = (await r.text()).replace(/\r/g, "").split("\n").map(x => x.trim()).filter(x => x);
      employeeSelect.innerHTML = '<option value="">-- اختر الاسم واللقب --</option>';
      list.forEach(e => employeeSelect.innerHTML += `<option value="${e}">${e}</option>`);
      employeeSelect.disabled = false;
    } catch (error) {
      employeeSelect.innerHTML = '<option value="">حدث خطأ أثناء تحميل القائمة</option>';
      console.error("خطأ في تحميل القائمة:", error);
      employeeSelect.disabled = false;
    }
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

      div.addEventListener('click', function(){
        itemDescription.textContent = item.desc || "";

        if(item.label === "فضاء الأساتذة") window.open("https://ostad.education.dz/auth", "_blank");
        if(item.label === "فضاء أولياء التلاميذ") window.open("https://awlyaa.education.dz/", "_blank");
        if(item.label === "نظام الحضور الذكي") document.getElementById("attendanceModal").style.display = "flex";
        if(item.icon === "call") document.getElementById("contactModal").style.display = "flex";
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

  // ==================== DOM Events ====================
  continueBtn.addEventListener("click", async function() {
    const type = userTypeSelect.value;
    if(!type) return alert("اختر نوع المستخدم");

    if(type === "parent") { openSession("parent"); return; }

    if(!schoolKeyInput.value) return alert("أدخل رمز المؤسسة");
    await loadSchoolKey();
    if(schoolKeyInput.value !== SCHOOL_KEY) return alert("رمز المؤسسة غير صحيح");

    schoolKeyBlock.style.display = "none";
    employeeBlock.style.display = "block";
    await loadEmployeeList(type);
    await loadPasswords();
  });

  employeeSelect.addEventListener("change", function() {
    if(this.value!=="") { authBlock.style.display="block"; loginBtn.style.display="flex"; }
  });

  loginBtn.addEventListener("click", function() {
    if(!employeeSelect.value) return alert("اختر الاسم واللقب");
    if(!loginPassword.value) return alert("أدخل كلمة المرور");
    if(!passwordsLoaded) return alert("جارٍ تحميل كلمات المرور، يرجى الانتظار");
    if(!PASSWORDS.includes(loginPassword.value)) return alert("كلمة المرور غير صحيحة");
    openSession(userTypeSelect.value);
  });

  // ==================== استرجاع الجلسة ====================
  const savedType = localStorage.getItem("userType");
  const savedName = localStorage.getItem("employeeName");
  if(savedType) {
    menuBtn.disabled=false;
    loginModal.style.display="none";
    fillMenu(savedType);
    welcomeText.textContent = (savedType==="parent") ? 
      "مرحبًا بك! افتح القائمة لاستخدام خدماتنا." : `مرحبًا بك يا ${savedName}! افتح القائمة لاستخدام خدماتنا.`;
  }

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

  // ==================== دعم معاينة الملفات ====================
  const panel = document.getElementById("filePreviewPanel");
  const header = panel.querySelector(".preview-header");
  const previewClose = document.getElementById("previewClose");
  const previewDownload = document.getElementById("previewDownload");
  const previewOpen = document.getElementById("previewOpen");
  const previewToggle = document.getElementById("previewToggle");

  previewClose.addEventListener("click", () => panel.style.display = "none");
  previewDownload.addEventListener("click", () => window.open(previewDownload.href, "_blank"));
  previewOpen.addEventListener("click", () => window.open(previewOpen.href, "_blank"));
  previewToggle.addEventListener("click", () => panel.classList.toggle("fullscreen"));

  // سحب وتحريك المعاينة
  let isDragging = false, startX, startY, startLeft, startTop;
  header.addEventListener("mousedown", e => {
    if(panel.classList.contains("fullscreen")) return;
    isDragging = true; startX = e.clientX; startY = e.clientY;
    const rect = panel.getBoundingClientRect();
    startLeft = rect.left; startTop = rect.top;
    panel.style.transition = "none"; document.body.style.userSelect = "none";
  });
  document.addEventListener("mousemove", e => {
    if(!isDragging) return;
    let dx = e.clientX - startX; let dy = e.clientY - startY;
    panel.style.left = startLeft + dx + "px";
    panel.style.top = startTop + dy + "px";
  });
  document.addEventListener("mouseup", () => { if(isDragging) { isDragging=false; panel.style.transition="all 0.3s ease"; document.body.style.userSelect=""; } });

  // دعم اللمس
  header.addEventListener("touchstart", e => {
    if(panel.classList.contains("fullscreen")) return;
    isDragging = true;
    const touch = e.touches[0];
    startX = touch.clientX; startY = touch.clientY;
    const rect = panel.getBoundingClientRect();
    startLeft = rect.left; startTop = rect.top;
    panel.style.transition = "none";
  });
  header.addEventListener("touchmove", e => {
    if(!isDragging) return;
    const touch = e.touches[0];
    let dx = touch.clientX - startX; let dy = touch.clientY - startY;
    panel.style.left = startLeft + dx + "px";
    panel.style.top = startTop + dy + "px";
    e.preventDefault();
  }, {passive:false});
  header.addEventListener("touchend", () => { if(isDragging) { isDragging=false; panel.style.transition="all 0.3s ease"; } });

  // إغلاق مودال الحضور
  document.getElementById("closeAttendanceModal").addEventListener("click", () => document.getElementById("attendanceModal").style.display="none");

  // مودال الاتصال
  document.getElementById("closeContactModal").addEventListener("click", () => document.getElementById("contactModal").style.display="none");
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

}

document.addEventListener("DOMContentLoaded", initApp);
