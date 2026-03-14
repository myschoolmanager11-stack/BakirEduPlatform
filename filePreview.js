// ==================== معاينة الملفات ====================
function openFilePreview(fileId) {

    const panel = document.getElementById("filePreviewPanel");
    const frame = document.getElementById("filePreviewFrame");
    const previewDownload = document.getElementById("previewDownload");
    const previewOpen = document.getElementById("previewOpen");
    const previewLoader = document.getElementById("previewLoader");

    // إظهار اللوحة
    panel.style.opacity = 0;
    panel.style.display = "flex";

    // إظهار رسالة التحميل
    previewLoader.style.display = "flex";
    frame.style.display = "none";

    const url = `https://drive.google.com/file/d/${fileId}/preview`;

    frame.onload = () => {
        previewLoader.style.display = "none";
        frame.style.display = "block";
    };

    frame.onerror = () => {
        previewLoader.innerHTML = "⚠️ حدث خطأ أثناء تحميل الملف";
    };

    frame.src = url;

    // روابط التحميل والفتح
    previewDownload.href = `https://drive.google.com/uc?id=${fileId}&export=download`;
    previewOpen.href = url;
    previewOpen.target = "_blank";

    setTimeout(() => panel.style.opacity = 1, 50);
}


// ==================== عناصر المعاينة ====================
const panel = document.getElementById("filePreviewPanel");
const header = panel.querySelector(".preview-header");

const previewClose = document.getElementById("previewClose");
const previewDownload = document.getElementById("previewDownload");
const previewOpen = document.getElementById("previewOpen");
const previewToggle = document.getElementById("previewToggle");


// ==================== وظائف الأزرار ====================
previewClose.addEventListener("click", () => panel.style.display = "none");

previewDownload.addEventListener("click", () => window.open(previewDownload.href, "_blank"));

previewOpen.addEventListener("click", () => window.open(previewOpen.href, "_blank"));

previewToggle.addEventListener("click", () => panel.classList.toggle("fullscreen"));


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
    panel.style.left = startLeft + (e.clientX - startX) + "px";
    panel.style.top  = startTop  + (e.clientY - startY) + "px";
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
    panel.style.left = startLeft + (touch.clientX - startX) + "px";
    panel.style.top  = startTop  + (touch.clientY - startY) + "px";
    e.preventDefault();
}, {passive: false});

header.addEventListener("touchend", () => {
    if(!isDragging) return;
    isDragging = false;
    panel.style.transition = "all 0.3s ease";
});
