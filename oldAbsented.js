// ==================== فتح مودال الغيابات القديمة ====================
window.openOldAbsentedModal = async function() {

    oldAbsModal.classList.add("show");
    showLoader();

    oldAbsSelect.innerHTML = `<option value="">-- جاري التحميل... --</option>`;
    oldAbsTableBody.innerHTML = "";

    // جلب قائمة التلاميذ الغائبين قبل اليوم
    const list = await fetchFile(CONFIG.Old_Absented_File_ID);

    if(!list){
        hideLoader();
        oldAbsSelect.innerHTML = `<option value="">تعذر تحميل البيانات</option>`;
        return;
    }

    // تحليل كل سطر
    OLD_ABS_DATA = list.map(line=>{
        const p = line.split(";");
        return {
            fullName: p[0]?.trim() || "",
            classe: p[1]?.trim() || "",
            hours: p[2]?.trim() || "0"
        };
    });

    // استخراج الأقسام الفريدة
    const classes = [...new Set(OLD_ABS_DATA.map(x=>x.classe).filter(x=>x))];

    // إضافة خيار الأقسام في Select
    oldAbsSelect.innerHTML = `
        <option value="">-- اختر القسم --</option>
        <option value="all">كل الأقسام</option>
    `;
    classes.forEach(c=>{
        const option = document.createElement("option");
        option.value = c;
        option.textContent = c;
        oldAbsSelect.appendChild(option);
    });

    hideLoader();
};

// ==================== غلق المودال ====================
window.closeOldAbsentedModal = function(){
    oldAbsModal.classList.remove("show");
};

// ==================== فلترة الجدول حسب القسم ====================
oldAbsSelect.addEventListener("change", function(){

    const selected = this.value;
    oldAbsTableBody.innerHTML = "";

    if(!selected){
        oldAbsTableBody.innerHTML = `
            <tr>
                <td colspan="4" style="padding:15px;color:#777;">
                    اختر قسمًا لعرض التلاميذ
                </td>
            </tr>`;
        return;
    }

    let filtered = selected === "all" ? OLD_ABS_DATA : OLD_ABS_DATA.filter(x => x.classe === selected);

    filtered = filtered.sort((a,b)=>Number(b.hours)-Number(a.hours));

    if(filtered.length === 0){
        oldAbsTableBody.innerHTML = `
            <tr>
                <td colspan="4" style="padding:15px;color:#777;">
                    لا توجد بيانات
                </td>
            </tr>`;
        return;
    }

    filtered.forEach((row, index) => {
        const tr = document.createElement("tr");

        if(Number(row.hours) >= 10){
            tr.style.background = "#ffe6e6"; // تمييز التلاميذ الغائبين كثيرًا
        }

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td style="text-align:right;font-weight:600;">${row.fullName}</td>
            <td>${row.classe}</td>
            <td>${row.hours}</td>
        `;

        oldAbsTableBody.appendChild(tr);
    });
});
