// ==================== عناصر القائمة ====================

const MENUS = {

parent: [

{icon:"people", label:"فضاء أولياء التلاميذ", desc:"مرحبا بكم في فضاء أولياء التلاميذ"},
{icon:"assignment", label:"سجل الغيابات و المراسلات الإدارية", desc:"عرض سجل الغيابات و المراسلات الإدارية"},
{icon:"event", label:"جدول استقبال الأولياء", desc:"مواعيد استقبال الأولياء من قبل الإدارة"},
{icon:"calendar_today", label:"جدول التوقيت الأسبوعي للتلاميذ", desc:"عرض التوقيت الأسبوعي للتلاميذ"},
{icon:"description", label:"رزنامة الفروض والاختبارات", desc:"رزنامة الفروض والاختبارات للفترة الحالية"},
{icon:"folder", label:"استمارات ووثائق مختلفة للتلاميذ", desc:"تحميل الاستمارات والوثائق المخصصة للتلاميذ"},
{icon:"campaign", label:"إعلانات", desc:"عرض آخر الإعلانات الصادرة عن الإدارة"},
{icon:"call", label:"اتصل بنا", desc:"إرسال رسالة مباشرة لإدارة البوابة"},
{icon:"logout", label:"تسجيل الخروج", desc:"الخروج من البوابة"}

],

teacher: [

{icon:"person", label:"فضاء الأساتذة", desc:"مرحبا بكم في الأرضية الرقمية - فضاء الأساتذة"},
{icon:"assignment", label:"القوائم الإسمية للتلاميذ", desc:"عرض القوائم الإسمية للتلاميذ"},
{icon:"description", label:"قوائم صب النقاط", desc:"إدخال ومتابعة صب النقاط"},
{icon:"hourglass_top", label:"قائمة التلاميذ الغائبون قبل اليوم", desc:"قائمة التلاميذ الغائبين قبل اليوم"},
{icon:"send", label:"إرسال غيابات اليوم", desc:"إرسال غيابات اليوم للإدارة"},
{icon:"calendar_today", label:"جدول توقيت الأستاذ", desc:"عرض جدول توقيت الأستاذ"},
{icon:"calendar_view_week", label:"جدول التوقيت الأسبوعي للتلاميذ", desc:"جدول التلاميذ الأسبوعي"},
{icon:"description", label:"رزنامة الفروض والاختبارات", desc:"رزنامة الفروض والاختبارات للفترة الحالية"},
{icon:"folder", label:"استمارات ووثائق مختلفة للأساتذة", desc:"تحميل استمارات ووثائق مختلفة للأساتذة"},
{icon:"campaign", label:"إعلانات", desc:"عرض آخر الإعلانات الصادرة عن الإدارة"},
{icon:"call", label:"اتصل بنا", desc:"إرسال رسالة مباشرة لإدارة البوابة"},
{icon:"logout", label:"تسجيل الخروج", desc:"الخروج من البوابة"}

],

consultation: [

{icon:"qr_code_2", label:"نظام الحضور الذكي", desc:"تسجيل حضور التلاميذ بالباركود"},
{icon:"assignment", label:"القوائم الإسمية للتلاميذ", desc:"عرض القوائم الإسمية للتلاميذ"},
{icon:"hourglass_top", label:"قائمة التلاميذ الغائبون قبل اليوم", desc:"قائمة التلاميذ الغائبين قبل اليوم"},
{icon:"bar_chart", label:"متابعة غيابات اليوم", desc:"متابعة غيابات اليوم"},
{icon:"calendar_today", label:"جدول توقيت الأستاذ", desc:"عرض جدول توقيت الأستاذ"},
{icon:"calendar_view_week", label:"جدول التوقيت الأسبوعي للتلاميذ", desc:"جدول التلاميذ الأسبوعي"},
{icon:"description", label:"رزنامة الفروض والاختبارات", desc:"رزنامة الفروض والاختبارات"},
{icon:"folder", label:"استمارات ووثائق مختلفة للإشراف التربوي", desc:"تحميل استمارات ووثائق مختلفة للإشراف التربوي"},
{icon:"campaign", label:"إعلانات", desc:"عرض آخر الإعلانات"},
{icon:"call", label:"اتصل بنا", desc:"إرسال رسالة مباشرة لإدارة البوابة"},
{icon:"logout", label:"تسجيل الخروج", desc:"الخروج من البوابة"}

]

};



// ==================== ملء القائمة ====================

function fillMenu(type){

dropdownMenu.innerHTML = "";

MENUS[type].forEach((item,index)=>{

const div = document.createElement("div");

div.className="dropdown-item";

div.innerHTML=`
<span class="material-icons">${item.icon}</span>
<span>${item.label}</span>
`;

div.onclick = function(){
handleMenuClick(item,type);
};

dropdownMenu.appendChild(div);

// تأثير ظهور تدريجي
setTimeout(()=>{
div.classList.add("show");
},index*80);

});

}



// ==================== معالجة الضغط على عنصر القائمة ====================

function handleMenuClick(item,type){

itemDescription.textContent = item.desc || "";

dropdownMenu.style.display="none";


// تسجيل الخروج
if(item.icon==="logout"){
logout();
return;
}


// اتصل بنا
if(item.icon==="call"){
contactModal.style.display="flex";
return;
}


// روابط خارجية
if(item.label==="فضاء الأساتذة"){
window.open("https://ostad.education.dz/auth","_blank");
return;
}

if(item.label==="فضاء أولياء التلاميذ"){
window.open("https://awlyaa.education.dz/","_blank");
return;
}


// نظام الحضور
if(item.label==="نظام الحضور الذكي"){
attendanceModal.style.display="flex";
return;
}


// سجل الولي
if(item.label==="سجل الغيابات و المراسلات الإدارية" && type==="parent"){

const id = localStorage.getItem("StudentRecords_Fille_ID");

if(id) openFilePreview(id);
else alert("لم يتم العثور على الملف");

return;

}


// غيابات قديمة
if(item.label==="قائمة التلاميذ الغائبون قبل اليوم"){
openOldAbsentedModal();
return;
}


// متابعة غيابات اليوم
if(item.label==="متابعة غيابات اليوم"){
openNewAbsentedModal();
return;
}


// إرسال الغيابات
if(item.label==="إرسال غيابات اليوم"){
openSendAbsentedModal();
return;
}


// فتح الملفات
if(FILE_ITEMS[item.label]){
openFilePreview(FILE_ITEMS[item.label]);
return;
}

}

function toggleMenu(){

    if(dropdownMenu.style.display === "block"){
        dropdownMenu.style.display = "none";
    }else{
        dropdownMenu.style.display = "block";
    }

}
