document.addEventListener("DOMContentLoaded", function () {

    const dropdownMenu = document.getElementById("dropdownMenu");

    // زر إظهار وإخفاء القائمة
    window.toggleMenu = function () {
        dropdownMenu.style.display =
            dropdownMenu.style.display === "block" ? "none" : "block";
    };

    // دالة إنشاء القائمة حسب نوع المستخدم
    function fillMenu(type) {

        dropdownMenu.innerHTML = "";

        const MENUS = {

            parent: [
                {icon:"assignment", label:"سجل الغيابات"},
                {icon:"mail", label:"سجل المراسلات الإدارية"},
                {icon:"event", label:"جدول استقبال الأولياء"},
                {icon:"calendar_today", label:"جدول التوقيت الأسبوعي للتلاميذ"},
                {icon:"description", label:"رزنامة الفروض والاختبارات"},
                {icon:"folder", label:"استمارات ووثائق مختلفة للتلاميذ"},
                {icon:"campaign", label:"إعلانات"},
                {icon:"call", label:"اتصل بنا"},
                {icon:"logout", label:"تسجيل الخروج"}
            ],

            teacher: [
                {icon:"assignment", label:"القوائم الإسمية للتلاميذ"},
                {icon:"description", label:"قوائم صب النقاط"},
                {icon:"hourglass_top", label:"الغائبون قبل اليوم"},
                {icon:"send", label:"إرسال غيابات اليوم"},
                {icon:"calendar_today", label:"جدول توقيت الأستاذ"},
                {icon:"calendar_view_week", label:"جدول التوقيت الأسبوعي للتلاميذ"},
                {icon:"description", label:"رزنامة الفروض والاختبارات"},
                {icon:"folder", label:"استمارات ووثائق مختلفة للأساتذة"},
                {icon:"campaign", label:"إعلانات"},
                {icon:"call", label:"اتصل بنا"},
                {icon:"logout", label:"تسجيل الخروج"}
            ],

            consultation: [
                {icon:"assignment", label:"القوائم الإسمية"},
                {icon:"hourglass_top", label:"الغائبون قبل اليوم"},
                {icon:"bar_chart", label:"متابعة غيابات اليوم"},
                {icon:"calendar_today", label:"جدول توقيت الأستاذ"},
                {icon:"calendar_view_week", label:"جدول التوقيت الأسبوعي للتلاميذ"},
                {icon:"description", label:"رزنامة الفروض والاختبارات"},
                {icon:"folder", label:"وثائق خاصة بالإشراف التربوي"},
                {icon:"campaign", label:"إعلانات"},
                {icon:"call", label:"اتصل بنا"},
                {icon:"logout", label:"تسجيل الخروج"}
            ]
        };

        if (!MENUS[type]) return;

        MENUS[type].forEach(item => {

            const div = document.createElement("div");
            div.className = "menu-item";
            div.innerHTML = `
                <span class="material-icons">${item.icon}</span>
                <span>${item.label}</span>
            `;

            // معالجة الأحداث الخاصة
            if (item.label === "اتصل بنا") {
                div.addEventListener("click", function () {
                    if (typeof openContactModal === "function") {
                        openContactModal();
                    }
                    toggleMenu();
                });
            }

            else if (item.label === "تسجيل الخروج") {
                div.addEventListener("click", function () {
                    logout();
                    toggleMenu();
                });
            }

            else {
                div.addEventListener("click", function () {
                    if (typeof handleMenuClick === "function") {
                        handleMenuClick(item.label);
                    }
                    toggleMenu();
                });
            }

            dropdownMenu.appendChild(div);
        });
    }

    // استرجاع نوع المستخدم بعد تحديث الصفحة
    const savedType = localStorage.getItem("userType");
    if (savedType) {
        document.getElementById("menuBtn").disabled = false;
        fillMenu(savedType);
    }

    // جعل الدالة متاحة لبقية الملفات
    window.fillMenu = fillMenu;

});
