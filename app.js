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
  "Teacher_Timetable_File_ID": "1PzyPfwuRdMOOJAlpq6nWJy-GbHPrm19W",
  "Exams_Calendar_File_ID": "1bgBZuAAecXMMoKqQTvlSU9vUlRc2AM9d",
  "Students_Documents_File_ID": "1lb0p5OhGZ1IpnlyFtBFn_0J5z93WCFnz",
  "Teacher_Documents_File_ID": "1a-g6QAG-GbqUlFuzVfwdsgH4HwH_rxcT",
  "Supervisory_Documents_File_ID": "1VaIgUqIWVBpwJSmHEho28gU0HoJgMS1M",
  "Announcements_File_ID": "1tbtXXyU1NvrTKME50QjJ53VL-FODcCo6"
};
const GAS_SCRIPT_URL = "https://script.google.com/macros/s/.../exec";

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

    function getFileLink(fileId) {
        return `${GAS_SCRIPT_URL}?id=${fileId}`;
    }

    async function loadSchoolKey() {
        let r = await fetch(getFileLink(CONFIG.School_Key_File_ID));
        SCHOOL_KEY = (await r.text()).trim();
    }

    async function loadEmployeeList(type) {
        let fileId = type === "teacher" ? CONFIG.ListeTeacher_File_ID : CONFIG.ListeSupervisory_File_ID;
        let r = await fetch(getFileLink(fileId));
        let list = (await r.text()).replace(/\r/g,"").split("\n").map(x=>x.trim()).filter(x=>x);
        employeeSelect.innerHTML = '<option value="">-- اختر الاسم واللقب --</option>';
        list.forEach(e => {
            let opt = document.createElement("option");
            opt.value = e; opt.textContent = e;
            employeeSelect.appendChild(opt);
        });
    }

    async function loadPasswords() {
        let r = await fetch(getFileLink(CONFIG.Password_File_ID));
        PASSWORDS = (await r.text()).replace(/\r/g,"").split("\n").map(x=>x.trim()).filter(x=>x);
    }

   function openSession(type) {
    loginModal.style.display = "none";
    menuBtn.disabled = false; // تفعيل زر القائمة
    dropdownMenu.style.display = "none";

    // تغيير النص الترحيبي
    document.getElementById("welcomeText").textContent =
        "مرحبًا بك 👋 لاختيار خدماتنا استخدم القائمة الجانبية.";

    // تعبئة القائمة
    fillMenu(type);

    // إخفاء عناصر fade-in السابقة إن وجدت
    Array.from(dropdownMenu.children).forEach(el => el.classList.remove("show"));
}


    function fillMenu(type) {
        dropdownMenu.innerHTML = "";
        const MENUS = {
            parent: ["assignment","mail","event","calendar_today","description","folder","campaign","call","logout","delete_sweep"],
            teacher: ["assignment","description","hourglass_top","send","calendar_today","calendar_view_week","description","folder","campaign","call","logout","delete_sweep"],
            consultation: ["assignment","hourglass_top","bar_chart","calendar_today","calendar_view_week","description","folder","campaign","call","logout","delete_sweep"]
        };
        const LABELS = {
            assignment: "سجل الغيابات",
            mail: "سجل المراسلات الإدارية",
            event: "جدول استقبال الأولياء",
            calendar_today: "جدول التوقيت الأسبوعي للتلاميذ",
            description: "رزنامة الفروض والاختبارات",
            folder: "استمارات ووثائق مختلفة",
            campaign: "إعلانات",
            call: "اتصل بنا",
            logout: "تسجيل الخروج",
            delete_sweep: "مسح جميع الروابط المحفوظة",
            hourglass_top: "الغائبون قبل اليوم",
            send: "إرسال غيابات اليوم",
            calendar_view_week: "جدول التوقيت الأسبوعي للتلاميذ",
            bar_chart: "متابعة غيابات اليوم"
        };
        MENUS[type].forEach((icon, idx) => {
            let div = document.createElement("div");
            let span = document.createElement("span");
            span.className = "material-icons"; span.textContent = icon;
            div.appendChild(span);
            let label = document.createElement("span");
            label.textContent = LABELS[icon] || icon;
            div.appendChild(label);
            if(icon==="logout") div.onclick = logout;
            dropdownMenu.appendChild(div);
            setTimeout(()=> div.classList.add("show"), idx*80); // fade-in effect
        });
    }

    function logout() {
        dropdownMenu.style.display = "none";
        menuBtn.disabled = true;
        loginModal.style.display = "flex";
        document.getElementById("welcomeText").textContent = "مرحبًا بك! الرجاء تسجيل الدخول للمتابعة.";
    }

    window.toggleMenu = function() {
        dropdownMenu.style.display = dropdownMenu.style.display==="block"?"none":"block";
    };

    // ======= الأحداث =======
    userTypeSelect.addEventListener("change", function() {
        employeeBlock.style.display = "none";
        authBlock.style.display = "none";
        continueBtn.style.display = "none";
        loginBtn.style.display = "none";
        schoolKeyBlock.style.display = "none";
        if(this.value==="parent") continueBtn.style.display = "flex";
        if(this.value==="teacher" || this.value==="consultation") schoolKeyBlock.style.display = "block";
    });

    continueBtn.addEventListener("click", function(){ openSession("parent"); });

   schoolKeyBtn.addEventListener("click", async function(){
    if(!schoolKeyInput.value) return alert("أدخل رمز المؤسسة الذي تم منحك إياه من طرف إدارة المؤسسة");
    await loadSchoolKey();
    if(schoolKeyInput.value!==SCHOOL_KEY) return alert("رمز المؤسسة غير صحيح");

    // إخفاء حقل رمز المدرسة
    schoolKeyBlock.style.display = "none";

    // إظهار قائمة الموظفين
    employeeBlock.style.display = "block";

    // تحميل قائمة الموظفين (أساتذة أو مشرفين)
    await loadEmployeeList(userTypeSelect.value);

    // تحميل كلمات المرور
    await loadPasswords();

    // التأكد من ظهور حقل كلمة المرور عند اختيار الموظف
    employeeSelect.addEventListener("change", function(){
        if(this.value!=="") {
            authBlock.style.display="block";  // إظهار كلمة المرور
            loginBtn.style.display="flex";
        } else {
            authBlock.style.display="none";
            loginBtn.style.display="none";
        }
    });
});


    employeeSelect.addEventListener("change", function(){
        if(this.value!=="") { authBlock.style.display="block"; loginBtn.style.display="flex"; }
    });

    loginBtn.addEventListener("click", function(){
        if(!loginPassword.value) return alert("أدخل كلمة المرور");
        if(!PASSWORDS.includes(loginPassword.value)) return alert("كلمة المرور غير صحيحة");
        openSession(userTypeSelect.value);
    });
});

