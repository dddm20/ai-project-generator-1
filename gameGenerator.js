const fs = require("fs");
const path = require("path");
function generateGame(id){
    const folder = path.join(__dirname,"../public/projects","game_"+id);
    if(!fs.existsSync(folder)) fs.mkdirSync(folder,{recursive:true});
    fs.writeFileSync(path.join(folder,"game.html"),<h1>لعبة AI #${id}</h1>);
}
module.exports = {generateGame};