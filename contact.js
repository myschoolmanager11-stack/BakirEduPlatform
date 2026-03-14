// ==================== contact.js ====================

// غلق المودال
contactCloseBtn.addEventListener("click", () => {
    contactModal.style.display = "none";
    contactResult.textContent = "";
});

// إرسال الرسالة
contactSendBtn.addEventListener("click", () => {
    const email = contactEmail.value.trim();
    const message = contactMessage.value.trim();

    if(!email || !/\S+@\S+\.\S+/.test(email)) {
        contactResult.textContent = "⚠️ يرجى إدخال بريد إلكتروني صحيح";
        contactResult.style.color = "red";
        return;
    }
    if(!message) {
        contactResult.textContent = "⚠️ يرجى كتابة الرسالة";
        contactResult.style.color = "red";
        return;
    }

    const subject = encodeURIComponent("رسالة من مستخدم البوابة");
    const body = encodeURIComponent(`السلام عليكم،\n\nتم إرسال هذه الرسالة من خلال نموذج اتصل بنا.\n\nالبريد: ${email}\nالرسالة: ${message}\n\nتحياتنا.`);
    window.location.href = `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;

    contactResult.textContent = "✅ سيتم فتح بريدك لإرسال الرسالة مباشرة";
    contactResult.style.color = "green";

    contactEmail.value = "";
    contactMessage.value = "";
});

// إغلاق المودال عند الضغط خارج المحتوى أو Escape
window.addEventListener("click", (e) => {
    if(e.target === contactModal) contactModal.style.display = "none";
});
document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && contactModal.style.display === "flex") {
        contactModal.style.display = "none";
    }
});
