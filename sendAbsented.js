// ==================== فتح مودال إرسال الغيابات ====================
window.openSendAbsentedModal = async function() {

    SendAbsentedModal.classList.add("show");
    showLoader();

    sendAbsSelect.innerHTML = `<option value="">-- جاري التحميل... --</option>`;
    sendAbsTableBody.innerHTML = "";

    // تحميل قائمة التلاميذ
    const list = await fetchFile(CONFIG.ListeStudents_File_ID);
    if(!list){
        hideLoader();
        sendAbsSelect.innerHTML = `<option value="">تعذر تحميل البيانات</option>`;
        return;
    }

    // تحميل الأقسام
    const classes = await fetchFile(CONFIG.ListeClasses_File_ID);
    sendAbsSelect.innerHTML = `
        <option value="">-- اختر القسم --</option>
        <option value="all">كل الأقسام</option>
    `;
    if(classes){
        classes.forEach(c => {
            sendAbsSelect.innerHTML += `<option value="${c}">${c}</option>`;
        });
    }

    hideLoader();
};

// ==================== غلق المودال ====================
window.closeSendAbsentedModal = function() {
    SendAbsentedModal.classList.remove("show");
};

// ==================== فلترة وعرض التلاميذ حسب القسم ====================
sendAbsSelect.addEventListener("change", function() {

    const selected = this.value;
    sendAbsTableBody.innerHTML = "";

    if(!selected){
        sendAbsTableBody.innerHTML = `
            <tr>
                <td colspan="4" style="padding:15px;color:#777;">
                    اختر قسمًا لعرض التلاميذ
                </td>
            </tr>`;
        return;
    }

    let filtered = (selected === "all") ? usersStudents : usersStudents.filter(s => s.classe === selected);

    if(filtered.length === 0){
        sendAbsTableBody.innerHTML = `
            <tr>
                <td colspan="4" style="padding:15px;color:#777;">
                    لا توجد بيانات
                </td>
            </tr>`;
        return;
    }

    filtered.forEach((student, index) => {
        const {name, classe, record} = student;
        const tr = document.createElement("tr");

        const isChecked = TEMP_SELECTED_ABS.some(x => x.record === record);
        if(isChecked) tr.classList.add("selected-row");

        tr.innerHTML = `
            <td class="Count-col">${index + 1}</td>
            <td class="name-col student-name" style="font-weight:600;text-align:right;cursor:pointer;">${name}</td>
            <td class="Classe-col">${classe}</td>
            <td class="Checkbox-col">
                <input type="checkbox" class="abs-check" data-name="${name}" data-classe="${classe}" data-record="${record}" ${isChecked ? "checked" : ""}>
            </td>
        `;

        sendAbsTableBody.appendChild(tr);

        // الضغط على الصف لتغيير التحديد
        tr.addEventListener("click", function(e){
            if(e.target.tagName.toLowerCase() === "input") return;

            const checkbox = tr.querySelector(".abs-check");
            checkbox.checked = !checkbox.checked;
            handleCheckboxChange(checkbox, tr);
        });
    });
});

// ==================== التعامل مع تغيير checkbox ====================
sendAbsTableBody.addEventListener("change", function(e){
    if(!e.target.classList.contains("abs-check")) return;

    const checkbox = e.target;
    const tr = checkbox.closest("tr");

    handleCheckboxChange(checkbox, tr);
});

function handleCheckboxChange(checkbox, tr){
    const {name, classe, record} = checkbox.dataset;

    if(checkbox.checked){
        if(!TEMP_SELECTED_ABS.some(x => x.record === record)){
            TEMP_SELECTED_ABS.push({name, classe, record});
        }
        tr.classList.add("selected-row");
    } else {
        TEMP_SELECTED_ABS = TEMP_SELECTED_ABS.filter(x => x.record !== record);
        tr.classList.remove("selected-row");
    }

    saveTempAbs();
}

// ==================== زر تحديد الكل ====================
checkAllBtn.addEventListener("click", function(){
    sendAbsTableBody.querySelectorAll("tr").forEach(row => {
        const checkbox = row.querySelector(".abs-check");
        if(!checkbox) return;

        checkbox.checked = true;
        const {name, classe, record} = checkbox.dataset;
        if(!TEMP_SELECTED_ABS.some(x => x.record === record)){
            TEMP_SELECTED_ABS.push({name, classe, record});
        }
        row.classList.add("selected-row");
    });

    saveTempAbs();
});

// ==================== دوال إنشاء سطر الغياب ====================
function getCurrentSchoolHour(){
    const h = new Date().getHours();
    if(h >= 8 && h < 9) return 2;
    if(h >= 9 && h < 10) return 3;
    if(h >= 10 && h < 11) return 4;
    if(h >= 11 && h < 12) return 5;
    if(h >= 13 && h < 14) return 6;
    if(h >= 14 && h < 15) return 7;
    if(h >= 15 && h < 16) return 8;
    if(h >= 16 && h < 17) return 9;
    return null;
}

function buildAbsenceLine(student){
    const hourIndex = getCurrentSchoolHour();
    if(hourIndex === null) return null;

    let cols = new Array(11).fill("");
    cols[0] = student.name;
    cols[1] = student.classe;
    cols[hourIndex] = "1";
    cols[10] = student.record;

    return cols.join(";");
}

// ==================== دالة الإرسال ====================
SendAbsenceBtn.addEventListener("click", SendAbsence);

async function SendAbsence(){
    if(TEMP_SELECTED_ABS.length === 0){
        alert("لم يتم تحديد أي تلميذ");
        return;
    }

    showLoader();

    const newLines = TEMP_SELECTED_ABS.map(buildAbsenceLine).filter(line => line);

    if(newLines.length === 0){
        hideLoader();
        alert("هذه الغيابات مسجلة مسبقاً");
        return;
    }

    const success = await updateFile(CONFIG.New_Absented_File_ID, newLines.join("\n"));
    hideLoader();

    alert(success ? "تم إرسال الغيابات بنجاح ✅" : "فشل حفظ الغيابات ❌");
}

// ==================== دالة تحديث الملف عبر GAS ====================
async function updateFile(fileId, content){
    try {
        const formData = new FormData();
        formData.append("id", fileId);
        formData.append("data", content);

        const response = await fetch(GAS_SCRIPT_URL, {
            method: "POST",
            body: formData
        });

        const result = await response.text();
        console.log("رد السيرفر:", result);

        return result.trim() === "OK";
    } catch(err) {
        console.error("فشل تحديث الملف:", err);
        return false;
    }
}
