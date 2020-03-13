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
    setExpired(key, value, expired) {
        window.localStorage.setItem(key,value)
        window.localStorage.setItem(`${key}_expired`, expired)
    },
    getExpired (key) {
        debugger
        let expired = window.localStorage.getItem(`${key}_expired`)
        let now = Date.now();
        if ( now > expired) {
            this.removeExpired(key);
            return;
        }
        return window.localStorage.getItem(key);
    },
    removeExpired (key) {
        window.localStorage.removeItem(key)
        window.localStorage.removeItem(`${key}_expired`)
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
