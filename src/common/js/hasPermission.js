const hasPermission ={
    install(Vue,options){
        Vue.directive('has',{
            inserted(el,binding,vnode){
                let permTypes = vnode.context.$route.meta.permTypes;
                console.log('vnode.context.$route',vnode.context.$route)

                console.log('vnode.context.$route.meta',vnode.context.$route.meta)
                
                console.log('permTypes',permTypes)
                if(!permTypes.includes(binding.value)){  
                    console.log('没有');
                    el.parentNode.removeChild(el)
                }
            }
        })
    }
}
export default hasPermission;