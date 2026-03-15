const fs = require("fs");
const path = require("path");
function generateSite(id){
    const folder = path.join(__dirname,"../public/projects","site_"+id);
    if(!fs.existsSync(folder)) fs.mkdirSync(folder,{recursive:true});
    fs.writeFileSync(path.join(folder,"index.html"),<h1>موقع AI #${id}</h1>);
}
module.exports = {generateSite};