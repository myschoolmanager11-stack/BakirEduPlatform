// ==================== CONFIGURATION ====================

const CONFIG = {
  SchoolName: "متوسطة الشهيد بكير تركي محمد بن حسن (المدية)",
  SchoolAcadimi: "مديرية التربية لولاية المدية",
  SchoolVille: "المدية",
  SchoolDaira: "المدية",
  SchoolBaladiya: "المدية",
  Schoolsystem: "متوسط",
  SchoolPhone: "0000000000",
  SchoolAdresse: "حي راس قلوش المدية",
  SchoolMail: "YourMail@Gmail.com",
  SchoolLink: "https://myschoolmanager11-stack.github.io/BakirEduPlatform/",

  School_Folder_ID: "1hW9f6QDQMFHTKpH8fI4wVM9subzojh-T",
  Documents_Folder_ID: "1Mhsx0yQJX3iooQ1s9yBCYvI7BDJ7p5x9",
  StudentsRecords_Folder_ID: "16JpBwOj_7iEF-CNdHwwpEW2S9p-IE0yh",

  School_Link_File_ID: "1DTW9n3-TggYOa0XcNdzRv8t1hSEvTcCW",
  ListeTeacher_File_ID: "1rjAcUud3-tgFUpJQiAN3RQuvZHSrvat5",
  ListeSupervisory_File_ID: "16DGPMRjpKE_55OeEXy68gve98sKhE5B4",
  ListeStudents_File_ID: "1uAYXlQGQOjdbY0FB2MWSR80VTCCo5fn_",
  ListePrinsipal_File_ID: "1Cg_lvQ-VvaT8UxS0p4obldKnYTC4yzsQ",
  Listepointage_File_ID: "1Oz7Ps0c-P47hz1V0lohhKaN2w4brwMyq",

  New_Absented_File_ID: "10ci-EC2rEKBikLOsXjE1Dr_j6OU8Pbpx",
  Old_Absented_File_ID: "1dNoGk6DUSlxFz8ptOY2MxgxsW0QjDgWL",

  ListeClasses_File_ID: "1yXIUX9rM6ILw8QnX4YtOTjyHenEpFRM-",
  Reception_Schedule_File_ID: "15IqM59K107ZcpoGxKOkQAHBA24-4RgAS",
  Weekly_Students_Timetable_File_ID: "1Lm9eHzneBtaScPTH1v0PwYsH3PKZwJBO",
  Teacher_Timetable_File_ID: "1h6zUDZReva03nI8uRz3Hh11eVCqzJp3y",
  Exams_Calendar_File_ID: "1Qb3CXV_4NnQSL04EJFi7OjCIa73F_z8z",

  Students_Documents_File_ID: "1fhsmmLCp2o5sG3R-5nrBaHLIDZ5IvXDa",
  Teacher_Documents_File_ID: "1c8igqdJAJerlqnT_Yni_C8PKd6B8WPBo",
  Supervisory_Documents_File_ID: "11Oe0DHFRzE-Ykptl_Q9T0peUVP3kS_s5",

  Announcements_File_ID: "1fdhianG-OnDNRAsa1gEzBgESHM1OStB_"
};


// ==================== الملفات المرتبطة بالقائمة ====================

const FILE_ITEMS = {

"القوائم الإسمية للتلاميذ": CONFIG.ListePrinsipal_File_ID,

"قوائم صب النقاط": CONFIG.Listepointage_File_ID,

"جدول توقيت الأستاذ": CONFIG.Teacher_Timetable_File_ID,

"جدول استقبال الأولياء": CONFIG.Reception_Schedule_File_ID,

"جدول التوقيت الأسبوعي للتلاميذ": CONFIG.Weekly_Students_Timetable_File_ID,

"رزنامة الفروض والاختبارات": CONFIG.Exams_Calendar_File_ID,

"استمارات ووثائق مختلفة للتلاميذ": CONFIG.Students_Documents_File_ID,

"استمارات ووثائق مختلفة للأساتذة": CONFIG.Teacher_Documents_File_ID,

"استمارات ووثائق مختلفة للإشراف التربوي": CONFIG.Supervisory_Documents_File_ID,

"إعلانات": CONFIG.Announcements_File_ID

};


// ==================== رابط Google Apps Script ====================

const GAS_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwvXiyo83WcCCHYdxXUTDAEaMohUq9ocXi9VzMpCJKjr0wDBhd2OEQH1oKV9BwfXLLW/exec";



// ==================== متغيرات عامة ====================

let currentFileURL = null;

let STUDENTS_LIST = [];

let parentData = null;

let OLD_ABS_DATA = [];

let NEW_ABS_DATA = [];

let TEMP_SELECTED_ABS = [];
