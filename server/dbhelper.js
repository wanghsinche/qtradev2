const path = require('path');
const fs = require('fs');
class Database {
    obj = null
    constructor(){
        const txt = fs.readFileSync(path.resolve(__dirname, './db.json'), 'utf8');
        this.obj = JSON.parse(txt);
    }
    save(){
        const txt = JSON.stringify(this.obj);
        fs.writeFileSync(path.resolve(__dirname, './db.json'), txt);
    }
    queryHelper(el, query){
        return Object.keys(query).every(k=>el[k]===query[k]);
    }
    findOne(colection, query){
        const list = this.obj[colection];
        if (!list) return;
        return list.find(el=>this.queryHelper(el, query));
    }
    findAll(colection, query){
        const list = this.obj[colection];
        if (!list) return;
        return list.filter(el=>this.queryHelper(el, query));
    }
    insert(colection, obj){
        const list = this.obj[colection];
        if (!list) return;
        list.push(obj);
        this.save();
    }
    updateAll(colection, obj, query){
        const all = this.findAll(colection, query);
        if (all) {
            all.forEach(el=>{
                Object.assign(el, obj);
            });
        }
        this.save();
    }
}

exports.db = new Database();