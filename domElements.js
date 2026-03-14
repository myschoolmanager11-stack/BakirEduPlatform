// ==================== DOM ELEMENTS تعريف عناصر الصفحة ====================

// المودالات
const loginModal = document.getElementById("loginModal");
const contactModal = document.getElementById("contactModal");
const ModalOldAbsented = document.getElementById("ModalOldAbsented");
const ModalNewAbsented = document.getElementById("ModalNewAbsented");
const SendAbsentedModal = document.getElementById("SendAbsentedModal");

// القائمة
const menuBtn = document.getElementById("menuBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

// نافذة عرض الملفات
const filePreviewPanel = document.getElementById("filePreviewPanel");
const filePreviewFrame = document.getElementById("filePreviewFrame");
const previewDownload = document.getElementById("previewDownload");
const previewOpen = document.getElementById("previewOpen");
const previewLoader = document.getElementById("previewLoader");

// تسجيل الدخول
const userTypeSelect = document.getElementById("userTypeSelect");
const racordBlock = document.getElementById("racordBlock");
const racordInput = document.getElementById("racordInput");
const scanQRBtn = document.getElementById("scanQRBtn");
const loginBtn = document.getElementById("loginBtn");

// اللودر العام
const loader = document.getElementById("loader");


// ==================== LOADER دوال اللودر====================

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

    try{

        const url = "https://drive.google.com/uc?export=download&id=" + fileId;

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("فشل تحميل الملف");
        }

        const text = await response.text();

        return text;

    }catch(error){

        console.error("خطأ في تحميل الملف:", error);

        return null;

    }

}

// ==================== PARSE STUDENT LINE تحليل سطر التلميذ ====================

function parseStudentLine(line){

    if(!line) return null;

    const parts = line.split(";");

    return {
        name: parts[0] || "",
        racord: parts[1] || "",
        classe: parts[2] || "",
        parent: parts[3] || ""
    };

}
