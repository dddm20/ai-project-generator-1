const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

// دالة لإنشاء ملف ZIP لمشروع
function createProjectZip(projectId, callback){
    const zipName = project_${projectId}.zip;
    const output = fs.createWriteStream(zipName);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", function() {
        console.log(تم إنشاء ZIP: ${zipName} (${archive.pointer()} bytes));
        callback(null, zipName);
    });

    archive.on("error", function(err) {
        callback(err, null);
    });

    archive.pipe(output);

    // ===========================
    // إضافة ملفات المشروع (محاكاة)
    // ===========================
    const projectFolder = path.join(__dirname, "projects", project_${projectId});
    if(fs.existsSync(projectFolder)){
        archive.directory(projectFolder, false);
    } else {
        // إذا لم يوجد المشروع فعليًا، إضافة ملف dummy
        archive.append("هذا ملف ZIP تجريبي للمشروع ID: "+projectId, {name:"README.txt"});
    }

    archive.finalize();
}

// ===========================
// مثال للاستخدام
// ===========================
/*
createProjectZip(1, (err, zipName)=>{
    if(err) console.error(err);
    else console.log("تم إنشاء ZIP:", zipName);
});
*/

module.exports = { createProjectZip };