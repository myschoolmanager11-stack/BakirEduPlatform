/* ===========================
   الإعدادات والمعرفات مباشرة
   =========================== */
const CONFIG = {
    "School_Folder_ID": "1nHNjXIKcdo_vw8gsKvnd3QcPHhpL2WJr",
    "Documents_Folder_ID": "1Bx7UdP1Qgt30UoFE6cXwwVrOJ-zZHMMN",
    "Students_Correspondence_Folder_ID": "13Cj18RuJp9i8eGFm8-uNSyYquXZveSis",
    "Students_SijileAbsence_Folder_ID": "1Yf0KytenTjLVghWJ5qpaDWa2EZsUDGoD",
    "Employes_File_ID": "12cCRGjcOzhuPehYk5b3PKfYet5v_MwyH",
    "Students_File_ID": "1wFDZT1mi-4wVCnZm-DRzc2NjWaHzw9T5",
    "New_Absented_File_ID": "13p68uanh-WKYOE2r8HxN7P8ySuZtAihU",
    "Old_Absented_File_ID": "1vPsYG34-llAe-D5cyaqfuElQlvPsEG8a",
    "Password_File_ID": "17vZgeIm3o-LyOCBgrHLs5YeK-aWhEL4v",
    "ListeClasses_File_ID": "1NFoSgY64y79T_YWLzZgv688XJDaKSqeU",
    "ListeBranches_File_ID": "1PulS8YVKNIcOVdP2NHdGjldCiNG28wFB",
    "Reception_Schedule_File_ID": "11vQ-ALsdYqo7KcDABfVpbBKQ6vtyz7cL",
    "Weekly_Students_Timetable_File_ID": "15_NecKLGNZDpH_gBkuTQuGGGyoSXpJe0",
    "Teacher_Timetable_File_ID": "1vAlPDSiI_dHrWXBqkN9KI0TC1fwLKWBc",
    "Exams_Calendar_File_ID": "198gnwvXd82BJjC9aOerpslfG2nn2k2v_",
    "Students_Documents_File_ID": "1QCQ7c6eYKdMfRQgXE7W7FlRlVffjqsUZ",
    "Teacher_Documents_File_ID": "1aaa8LjXI6mfXS2Xumfc3EHh-nJKANpcy",
    "Supervisory_Documents_File_ID": "1ZsI2pJ5nNHtHkuxmtvHI57tnW58Z25yy",
    "Announcements_File_ID": "15d6lxMV76PS-MPv-HZCej7F-W6UaJ4ZG"
};

// رابط Google Apps Script الخاص بك
const GAS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby2X2ku8gwIIq5_nYjEykekNk27IiTzNFRfF5fUhzwnczdZKf1ilUXssxfC4o-KB0tE/exec";

/* ===========================
   متغيرات البوابة
   =========================== */
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

let CURRENT_INSTITUTION = CONFIG;
let PASSWORDS = [];

/* ===========================
   دالة الحصول على رابط Google Apps Script مع معرف الملف
   =========================== */
function getFileLink(fileId) {
    return `${GAS_SCRIPT_URL}?id=${fileId}`;
}

/* ===========================
   تحميل الموظفين
   =========================== */
function loadEmployees() {
    fetch(getFileLink(CURRENT_INSTITUTION.Employes_File_ID))
        .then(r => { if(!r.ok) throw new Error("فشل تحميل ملف الموظفين"); return r.text(); })
        .then(text => {
            let employees = text.replace(/\r/g,"").split("\n").map(x=>x.trim()).filter(x=>x);
            employeeSelect.innerHTML = '<option value="">-- اختر اسم ولقب الموظف --</option>';
            employees.forEach(e => {
                employeeSelect.innerHTML += `<option value="${e}">${e}</option>`;
            });
        })
        .catch(err => {
            console.error(err);
            alert("تعذر تحميل قائمة الموظفين");
        });
}

/* ===========================
   تحميل كلمات المرور
   =========================== */
function loadPasswords() {
    fetch(getFileLink(CURRENT_INSTITUTION.Password_File_ID))
        .then(r => { if(!r.ok) throw new Error("فشل تحميل ملف كلمات المرور"); return r.text(); })
        .then(text => {
            PASSWORDS = text.replace(/\r/g,"").split("\n").map(x=>x.trim()).filter(x=>x);
        })
        .catch(err => {
            console.error(err);
            alert("تعذر تحميل كلمات المرور");
        });
}

/* ===========================
   تغيير نوع المستخدم
   =========================== */
userTypeSelect.addEventListener("change", function () {
    employeeBlock.style.display = "none";
    authBlock.style.display = "none";
    continueBtn.style.display = "none";
    loginBtn.style.display = "none";

    if (this.value === "parent") continueBtn.style.display = "block";
    if (this.value === "teacher" || this.value === "consultation") {
        employeeBlock.style.display = "block";
        authBlock.style.display = "block";
        loginBtn.style.display = "block";
    }
});

/* ===========================
   ولي الأمر
   =========================== */
continueBtn.addEventListener("click", function () {
    openSession("parent");
});

/* ===========================
   تسجيل الدخول
   =========================== */
loginBtn.addEventListener("click", function () {
    if (!loginPassword.value) return alert("أدخل كلمة المرور");
    if (!PASSWORDS.includes(loginPassword.value)) return alert("كلمة المرور غير صحيحة");
    openSession(userTypeSelect.value);
});

/* ===========================
   فتح الجلسة
   =========================== */
function openSession(type) {
    loginModal.style.display = "none";
    menuBtn.disabled = false;
    fillMenu(type);
}

/* ===========================
   تعبئة القائمة
   =========================== */
function fillMenu(type) {
    dropdownMenu.innerHTML = "";
    const MENUS = {
        parent: ["📋 سجل الغيابات","📨 سجل المراسلات الإدارية","🗓 جدول استقبال الأولياء","📅 جدول التوقيت الأسبوعي للتلاميذ","📝 رزنامة الفروض والاختبارات","📂 استمارات ووثائق مختلفة للتلاميذ","📢 إعلانات","☎️ اتصل بنا","🚪 تسجيل الخروج","🗑 مسح جميع الروابط المحفوظة"],
        teacher: ["📋 القوائم الإسمية للتلاميذ","📝 قوائم صب النقاط","⏳ الغائبون قبل اليوم","📤 إرسال غيابات اليوم","📅 جدول توقيت الأستاذ","📅 جدول التوقيت الأسبوعي للتلاميذ","📝 رزنامة الفروض والاختبارات","📂 استمارات ووثائق مختلفة للأساتذة","📢 إعلانات","☎️ اتصل بنا","🚪 تسجيل الخروج","🗑 مسح جميع الروابط المحفوظة"],
        consultation: ["📋 القوائم الإسمية","⏳ الغائبون قبل اليوم","📊 متابعة غيابات اليوم","📅 جدول توقيت الأستاذ","📅 جدول التوقيت الأسبوعي للتلاميذ","📝 رزنامة الفروض والاختبارات","📂 وثائق خاصة بالإشراف التربوي","📢 إعلانات","☎️ اتصل بنا","🚪 تسجيل الخروج","🗑 مسح جميع الروابط المحفوظة"]
    };

    MENUS[type].forEach(item => {
        let div = document.createElement("div");
        div.textContent = item;
        if (item.includes("تسجيل الخروج")) div.onclick = logout;
        dropdownMenu.appendChild(div);
    });
}

function toggleMenu() {
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
}

function logout() {
    dropdownMenu.style.display = "none";
    menuBtn.disabled = true;
    loginModal.style.display = "flex";
}

/* ===========================
   بدء تحميل البيانات مباشرة
   =========================== */
loadEmployees();
loadPasswords();
