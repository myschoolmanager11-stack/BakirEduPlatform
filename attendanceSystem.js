// ==================== فتح المودال ====================
function openAttendanceModal() {
    attendanceModal.style.display = "block";
    // هنا يمكنك إضافة أي تهيئة للكاميرا عند الفتح
    // initCameraScanner(); // مثال: دالة بدء مسح الباركود بالكاميرا
}

// ==================== إغلاق المودال ====================
closeAttendanceModalBtn.addEventListener("click", function(){
    attendanceModal.style.display = "none";
    // هنا يمكن إيقاف الكاميرا أو أي عمليات مسح مؤقتة
    // stopCameraScanner();
});

// ==================== مسح بطاقة التلميذ ====================
// placeholder لدالة المسح لاحقًا
async function scanStudentCard() {
    // عند الانتهاء من المسح:
    // - احصل على record التلميذ
    // - حدث الحالة في قاعدة البيانات
    // - يمكن تحديث واجهة المستخدم مباشرة
    console.log("تم مسح بطاقة التلميذ (لم يتم تفعيل المسح بعد)");
}

// ==================== مثال ربط زر بدء المسح ====================
// يمكن لاحقًا إضافة زر أو بدء تلقائي عند فتح المودال
// document.getElementById("startScanBtn").addEventListener("click", scanStudentCard);
