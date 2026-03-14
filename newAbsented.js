// ==================== فتح مودال متابعة الغيابات اليومية ====================
window.openNewAbsentedModal = async function() {

    newAbsModal.classList.add("show");
    showLoader();

    // تهيئة الـ select والجدول
    newAbsSelect.innerHTML = `<option value="">-- جاري التحميل... --</option>`;
    newAbsTableBody.innerHTML = "";

    // تحميل قائمة الغيابات اليومية
    const list = await fetchFile(CONFIG.New_Absented_File_ID);
    if (!list) {
        hideLoader();
        newAbsSelect.innerHTML = `<option value="">تعذر تحميل البيانات</option>`;
        return;
    }

    // ====== تجميع البيانات ======
    const studentsMap = {};
    const hoursColumns = ["8","9","10","11","13","14","15","16"];

    list.forEach(line => {
        const p = line.split(";");
        const fullName = p[0]?.trim();
        const classe = p[1]?.trim();
        if(!fullName || !classe) return;

        const key = `${fullName}|${classe}`;

        if (!studentsMap[key]) {
            studentsMap[key] = {
                fullName,
                classe,
                hours: []
            };
        }

        hoursColumns.forEach((h, i) => {
            if(p[i + 2]?.trim() && !studentsMap[key].hours.includes(h)) {
                studentsMap[key].hours.push(h);
            }
        });
    });

    // تحويل إلى مصفوفة بعد التجميع
    NEW_ABS_DATA = Object.values(studentsMap);

    // تحميل الأقسام
    const classes = await fetchFile(CONFIG.ListeClasses_File_ID);
    newAbsSelect.innerHTML = `
        <option value="">-- اختر القسم --</option>
        <option value="all">كل الأقسام</option>
    `;
    if (classes) {
        classes.forEach(c => {
            newAbsSelect.innerHTML += `<option value="${c}">${c}</option>`;
        });
    }

    hideLoader();
};

// ==================== غلق المودال ====================
window.closeNewAbsentedModal = function() {
    newAbsModal.classList.remove("show");
};

// ==================== فلترة وعرض البيانات حسب القسم ====================
newAbsSelect.addEventListener("change", function() {

    const selected = this.value;
    newAbsTableBody.innerHTML = "";

    if (!selected) {
        newAbsTableBody.innerHTML = `
            <tr>
                <td colspan="12" style="padding:15px;color:#777;">
                    اختر قسمًا لعرض التلاميذ
                </td>
            </tr>`;
        return;
    }

    let filtered = (selected === "all") ? NEW_ABS_DATA : NEW_ABS_DATA.filter(x => x.classe === selected);

    if (filtered.length === 0) {
        newAbsTableBody.innerHTML = `
            <tr>
                <td colspan="12" style="padding:15px;color:#777;">
                    لا توجد بيانات
                </td>
            </tr>`;
        return;
    }

    // ترتيب تنازلي حسب عدد الساعات
    filtered.sort((a, b) => b.hours.length - a.hours.length);

    const hoursColumns = ["8","9","10","11","13","14","15","16"];

    filtered.forEach((row, index) => {
        const totalHours = row.hours.length;
        const tr = document.createElement("tr");

        if (totalHours >= 4) tr.style.backgroundColor = "#ffe6e6";

        const hoursCells = hoursColumns.map(h => `
            <td class="Checkbox-col">
                <input type="checkbox" disabled ${row.hours.includes(h) ? "checked" : ""}>
            </td>
        `).join("");

        tr.innerHTML = `
            <td class="Count-col">${index + 1}</td>
            <td class="name-col" style="font-weight:600;text-align:right;">${row.fullName}</td>
            <td class="Classe-col">${row.classe}</td>
            ${hoursCells}
            <td class="Hore-col" style="font-weight:bold;color:#b30000;">${totalHours}</td>
        `;

        newAbsTableBody.appendChild(tr);
    });
});
