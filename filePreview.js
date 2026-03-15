// ==================== filePreview.js ====================

// ==================== معاينة الملفات ====================
function openFilePreview(fileId) {

    // إظهار اللوحة
    filePreviewPanel.style.opacity = 0;
    filePreviewPanel.style.display = "flex";

    // إظهار رسالة التحميل
    previewLoader.style.display = "flex";
    filePreviewFrame.style.display = "none";

    const url = `https://drive.google.com/file/d/${fileId}/preview`;

    filePreviewFrame.onload = () => {
        previewLoader.style.display = "none";
        filePreviewFrame.style.display = "block";
    };

    filePreviewFrame.onerror = () => {
        previewLoader.innerHTML = "⚠️ حدث خطأ أثناء تحميل الملف";
    };

    filePreviewFrame.src = url;

    // روابط التحميل والفتح
    previewDownload.href = `https://drive.google.com/uc?id=${fileId}&export=download`;
    previewOpen.href = url;
    previewOpen.target = "_blank";

    setTimeout(() => filePreviewPanel.style.opacity = 1, 50);
}


// ==================== وظائف الأزرار ====================
previewClose.addEventListener("click", () => filePreviewPanel.style.display = "none");

previewDownload.addEventListener("click", () => window.open(previewDownload.href, "_blank"));

previewOpen.addEventListener("click", () => window.open(previewOpen.href, "_blank"));

previewToggle.addEventListener("click", () => filePreviewPanel.classList.toggle("fullscreen"));


// ==================== السحب والتحريك ====================
let isDragging = false, startX, startY, startLeft, startTop;

filePreviewHeader?.addEventListener("mousedown", e => {
    if(filePreviewPanel.classList.contains("fullscreen")) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    const rect = filePreviewPanel.getBoundingClientRect();
    startLeft = rect.left;
    startTop = rect.top;
    filePreviewPanel.style.transition = "none";
    document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", e => {
    if(!isDragging) return;
    filePreviewPanel.style.left = startLeft + (e.clientX - startX) + "px";
    filePreviewPanel.style.top  = startTop  + (e.clientY - startY) + "px";
});

document.addEventListener("mouseup", () => {
    if(!isDragging) return;
    isDragging = false;
    filePreviewPanel.style.transition = "all 0.3s ease";
    document.body.style.userSelect = "";
});


// ==================== دعم اللمس ====================
filePreviewHeader?.addEventListener("touchstart", e => {
    if(filePreviewPanel.classList.contains("fullscreen")) return;
    isDragging = true;
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    const rect = filePreviewPanel.getBoundingClientRect();
    startLeft = rect.left;
    startTop = rect.top;
    filePreviewPanel.style.transition = "none";
});

filePreviewHeader?.addEventListener("touchmove", e => {
    if(!isDragging) return;
    const touch = e.touches[0];
    filePreviewPanel.style.left = startLeft + (touch.clientX - startX) + "px";
    filePreviewPanel.style.top  = startTop  + (touch.clientY - startY) + "px";
    e.preventDefault();
}, {passive: false});

filePreviewHeader?.addEventListener("touchend", () => {
    if(!isDragging) return;
    isDragging = false;
    filePreviewPanel.style.transition = "all 0.3s ease";
});
