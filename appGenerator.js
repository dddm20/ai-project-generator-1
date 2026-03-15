const fs = require("fs");
const path = require("path");
function generateApp(id){
    const folder = path.join(__dirname,"../public/projects","app_"+id);
    if(!fs.existsSync(folder)) fs.mkdirSync(folder,{recursive:true});
    fs.writeFileSync(path.join(folder,"app.html"),<h1>تطبيق AI #${id}</h1>);
}
module.exports = {generateApp};