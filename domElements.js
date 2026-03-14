// ==================== DOM ELEMENTS تعريف عناصر الصفحة ====================

// --- المودالات ---
const oldAbsModal = document.getElementById("ModalOldAbsented");
const newAbsModal = document.getElementById("ModalNewAbsented");
const sendAbsModal = document.getElementById("SendAbsentedModal");
const attendanceModal = document.getElementById("attendanceModal");
const loginModal = document.getElementById("loginModal");
const contactModal = document.getElementById("contactModal");

// --- القائمة ---
const menuBtn = document.getElementById("menuBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const itemDescription = document.getElementById("itemDescription");

// --- نافذة عرض الملفات ---
const filePreviewPanel = document.getElementById("filePreviewPanel");
const filePreviewFrame = document.getElementById("filePreviewFrame");
const previewDownload = document.getElementById("previewDownload");
const previewOpen = document.getElementById("previewOpen");
const previewLoader = document.getElementById("previewLoader");
const filePreviewHeader = filePreviewPanel?.querySelector(".preview-header");
const previewCloseBtn = document.getElementById("previewClose");
const previewToggleBtn = document.getElementById("previewToggle");

// --- تسجيل الدخول ---
const userTypeSelect = document.getElementById("userTypeSelect");
const racordBlock = document.getElementById("racordBlock");
const racordInput = document.getElementById("racordInput");
const scanQRBtn = document.getElementById("scanQRBtn");
const loginBtn = document.getElementById("loginBtn");

// --- اللودر العام ---
const loader = document.getElementById("globalLoader");

// --- عناصر الصفحة ---
const welcomeText = document.getElementById("welcomeText");

// --- عناصر مودال اتصل بنا ---
const contactCloseBtn = document.getElementById("closeContactModal");
const contactSendBtn = document.getElementById("contactSendBtn");
const contactEmail = document.getElementById("contactEmail");
const contactMessage = document.getElementById("contactMessage");
const contactResult = document.getElementById("contactResult");

// --- عناصر OldAbsented ---
const oldAbsSelect = document.getElementById("oldAbsClassFilter");
const oldAbsTableBody = document.querySelector("#oldAbsTable tbody");

// --- عناصر مودال متابعة الغيابات اليومية ---
const newAbsSelect = document.getElementById("newAbsClassFilter");
const newAbsTableBody = document.querySelector("#newAbsTable tbody");

// --- عناصر مودال sendAbs ---
const sendAbsSelect = document.getElementById("sendAbsClassFilter");
const sendAbsTableBody = document.querySelector("#sendAbsTable tbody");

// --- عناصر مودال الحضور الذكي ---
const closeAttendanceModalBtn = document.getElementById("closeAttendanceModal");

// ==================== MEMORY USERS / MAP ====================
let memoryUsers = { teacher: [], consultation: [], parent: [] };
let usersMap = new Map();

// ==================== بعد تحميل الصفحة ====================
window.addEventListener("DOMContentLoaded", () => {
    // استرجاع آخر معرف مستخدم
    const lastRacord = localStorage.getItem("lastRacord");
    if(lastRacord){
        racordInput.value = lastRacord;
        // loginWithRacord(); // إذا أحببت محاولة تسجيل دخول تلقائي
    }

    // تفعيل زر تسجيل الدخول بعد تحميل DOM
    loginBtn?.addEventListener("click", () => {
        const racord = racordInput.value.trim();
        if(!racord) {
            alert("رجاءً أدخل المعرف!");
            return;
        }
        localStorage.setItem("lastRacord", racord);
        openSession("teacher"); // مثال
    });
});

// ==================== LOADER دوال اللودر ====================
function showLoader(){
    if(loader){
        loader.style.display = "flex";
    }
}

function hideLoader(){
    if(loader){
        loader.style.display = "none";
    }
}

// ==================== FETCH FILE تحميل الملفات من Google Drive ====================
async function fetchFile(fileId){
    if(!fileId){
        console.error("خطأ: لم يتم تحديد ID الملف");
        return null;
    }
    try{
        const response = await fetch(`${GAS_SCRIPT_URL}?id=${fileId}`);
        if(!response.ok){
            throw new Error("فشل تحميل الملف من Google Drive");
        }
        const text = await response.text();
        return text
            .replace(/\r/g,"")
            .split("\n")
            .map(x => x.trim())
            .filter(x => x);
    } catch(err){
        console.error(`خطأ في تحميل الملف ${fileId}:`, err);
        return null;
    }
}

// ==================== PARSE STUDENT / TEACHER / SUPERVISORY ====================
function parseStudentLine(line){
    if(!line) return null;
    const parts = line.split(";");
    return {
        name: parts[0] || "",
        classe: parts[1] || "",
        racord: parts[2] || "",
        email: parts[3] || "",
        StudentRecords_Fille_ID: parts[4] || ""
    };
}

function parseTeacherLine(line){
    if(!line) return null;
    const parts = line.split(";");
    return {
        name: parts[0] || "",
        racord: parts[1] || "",
        specialty: parts[2] || "",
        email: parts[3] || "",
        classes: parts.slice(4)
    };
}

function parseSupervisoryLine(line){
    if(!line) return null;
    const parts = line.split(";");
    return {
        name: parts[0] || "",
        racord: parts[1] || "",
        profession: parts[2] || "",
        email: parts[3] || ""
    };
}
