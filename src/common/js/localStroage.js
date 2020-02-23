let iLocalStroage = {
    get:function(item){
       return window.localStorage.getItem(item);
    },
    gets:function(item){
        return JSON.parse(window.localStorage.getItem(item));
     },
    set:function(key,value){
        window.localStorage.setItem(key,value)
    },
    sets:function(key,value){
        window.localStorage.setItem(key,JSON.stringify(value))
    },
    removeItem:function(key){
        window.localStorage.removeItem(key)
    },
    removeAll:function(){
        window.localStorage.clear();
    }
};
export default iLocalStroage;