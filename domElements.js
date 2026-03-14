// ==================== DOM ELEMENTS تعريف عناصر الصفحة ====================

let oldAbsModal, newAbsModal, sendAbsModal, attendanceModal, loginModal, contactModal;
let menuBtn, dropdownMenu, itemDescription;
let filePreviewPanel, filePreviewFrame, previewDownload, previewOpen, previewLoader, filePreviewHeader, previewCloseBtn, previewToggleBtn;
let userTypeSelect, racordBlock, racordInput, scanQRBtn, loginBtn;
let loader, welcomeText;
let contactCloseBtn, contactSendBtn, contactEmail, contactMessage, contactResult;
let oldAbsSelect, oldAbsTableBody;
let newAbsSelect, newAbsTableBody;
let sendAbsSelect, sendAbsTableBody;
let closeAttendanceModalBtn;

// ==================== MEMORY USERS / MAP ====================
let memoryUsers = { teacher: [], consultation: [], parent: [] };
let usersMap = new Map();

// ==================== بعد تحميل الصفحة ====================
window.addEventListener("DOMContentLoaded", () => {

    // --- المودالات ---
    oldAbsModal = document.getElementById("ModalOldAbsented");
    newAbsModal = document.getElementById("ModalNewAbsented");
    sendAbsModal = document.getElementById("SendAbsentedModal");
    attendanceModal = document.getElementById("attendanceModal");
    loginModal = document.getElementById("loginModal");
    contactModal = document.getElementById("contactModal");

    // --- القائمة ---
    menuBtn = document.getElementById("menuBtn");
    dropdownMenu = document.getElementById("dropdownMenu");
    itemDescription = document.getElementById("itemDescription");

    // --- نافذة عرض الملفات ---
    filePreviewPanel = document.getElementById("filePreviewPanel");
    filePreviewFrame = document.getElementById("filePreviewFrame");
    previewDownload = document.getElementById("previewDownload");
    previewOpen = document.getElementById("previewOpen");
    previewLoader = document.getElementById("previewLoader");
    filePreviewHeader = filePreviewPanel.querySelector(".preview-header");
    previewCloseBtn = document.getElementById("previewClose");
    previewToggleBtn = document.getElementById("previewToggle");

    // --- تسجيل الدخول ---
    userTypeSelect = document.getElementById("userTypeSelect");
    racordBlock = document.getElementById("racordBlock");
    racordInput = document.getElementById("racordInput");
    scanQRBtn = document.getElementById("scanQRBtn");
    loginBtn = document.getElementById("loginBtn");

    // --- اللودر العام ---
    loader = document.getElementById("globalLoader");

    // --- عناصر الصفحة ---
    welcomeText = document.getElementById("welcomeText");

    // --- عناصر مودال اتصل بنا ---
    contactCloseBtn = document.getElementById("closeContactModal");
    contactSendBtn = document.getElementById("contactSendBtn");
    contactEmail = document.getElementById("contactEmail");
    contactMessage = document.getElementById("contactMessage");
    contactResult = document.getElementById("contactResult");

    // --- عناصر OldAbsented ---
    oldAbsSelect = document.getElementById("oldAbsClassFilter");
    oldAbsTableBody = document.querySelector("#oldAbsTable tbody");

    // --- عناصر مودال متابعة الغيابات اليومية ---
    newAbsSelect = document.getElementById("newAbsClassFilter");
    newAbsTableBody = document.querySelector("#newAbsTable tbody");

    // --- عناصر مودال sendAbs ---
    sendAbsSelect = document.getElementById("sendAbsClassFilter");
    sendAbsTableBody = document.querySelector("#sendAbsTable tbody");

    // --- عناصر مودال الحضور الذكي ---
    closeAttendanceModalBtn = document.getElementById("closeAttendanceModal");

    // --- استرجاع آخر Racord ---
    const lastRacord = localStorage.getItem("lastRacord");
    if(lastRacord){
        racordInput.value = lastRacord;
        // إذا أحببت يمكن عمل محاولة تسجيل دخول تلقائي
        // loginWithRacord();
    }

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
