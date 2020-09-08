
let draggableListSelectedItem=false;
let draggableListSelectedItemOffsetHeight=0;

    document.body.addEventListener("click", function(){event.target.style.pointerEvents="auto";});
    document.body.addEventListener("mousedown", draggableListDragged);
    document.body.addEventListener("mousemove", draggableListEntered);
    window.addEventListener("mouseup", draggableListEnded);
    window.addEventListener('selectstart', disableSelect); 

for(let i=0; i<document.getElementsByClassName("draggableList").length; i++){
    document.getElementsByClassName("draggableList")[0].addEventListener("mouseleave", draggableListMouseLeave);
}

/* for(let i=0; i<document.getElementsByClassName("draggableItem").length; i++){
    document.getElementsByClassName("draggableItem")[i].draggable = true;
} */

function draggableListDragged(){
    if(event.target.classList.contains("draggableItem")){

    draggableListSelectedItem=event.target;

    let dummy = draggableListSelectedItem.cloneNode(true);
    dummy.style.visibility="hidden";
    dummy.style.position="relative";
    dummy.classList.add("draggableListDummyItem");
    let draggableListSelectedItemTop=draggableListSelectedItem.getBoundingClientRect().top;
    let draggableListSelectedItemLeft=draggableListSelectedItem.getBoundingClientRect().left;
    let draggableListSelectedItemHeight=draggableListSelectedItem.offsetHeight;
    let draggableListSelectedItemWidth=draggableListSelectedItem.offsetWidth;

    draggableListSelectedItemOffsetHeight=(parseInt(event.clientY) - parseInt(draggableListSelectedItem.getBoundingClientRect().top));

    draggableListSelectedItem.parentNode.insertBefore(dummy, event.target);

    draggableListSelectedItem.style.position = "fixed";
    draggableListSelectedItem.style.zIndex="99";
    draggableListSelectedItem.style.top = draggableListSelectedItemTop + "px";
    draggableListSelectedItem.style.height = draggableListSelectedItemHeight + "px";
    draggableListSelectedItem.style.width = draggableListSelectedItemWidth + "px";
    draggableListSelectedItem.style.pointerEvents="none"; 
    
    }else if(!event.target.classList.contains("draggableList")){
        draggableListSelectedItem=draggableListFindAncestor(event.target);

        let dummy = draggableListSelectedItem.cloneNode(true);
        dummy.style.visibility="hidden";
        dummy.style.position="relative";
        dummy.classList.add("draggableListDummyItem");
    
        let draggableListSelectedItemTop=draggableListSelectedItem.getBoundingClientRect().top;
        let draggableListSelectedItemLeft=draggableListSelectedItem.getBoundingClientRect().left;
        let draggableListSelectedItemHeight=draggableListSelectedItem.offsetHeight;
        let draggableListSelectedItemWidth=draggableListSelectedItem.offsetWidth;

        draggableListSelectedItemOffsetHeight=(parseInt(event.clientY) - parseInt(draggableListSelectedItem.getBoundingClientRect().top));

        draggableListSelectedItem.parentNode.insertBefore(dummy, draggableListSelectedItem);

        draggableListSelectedItem.style.position = "fixed";
        draggableListSelectedItem.style.zIndex="99";
        draggableListSelectedItem.style.top = draggableListSelectedItemTop + "px";
        draggableListSelectedItem.style.height = draggableListSelectedItemHeight + "px";
        draggableListSelectedItem.style.width = draggableListSelectedItemWidth + "px";
        draggableListSelectedItem.style.pointerEvents="none";
        
    }
}

function draggableListEntered(){
    if(draggableListSelectedItem){
    draggableListSelectedItem.style.top = parseInt(event.clientY) - draggableListSelectedItemOffsetHeight + "px";

    if(event.target.classList.contains("draggableItem")){
        if(event.target.parentNode===draggableListSelectedItem.parentNode){

            try{
            draggableListSelectedItem.parentNode.getElementsByClassName("draggableListDummyItem")[0].parentNode.removeChild(draggableListSelectedItem.parentNode.getElementsByClassName("draggableListDummyItem")[0]);
            }catch(e){    
            }
/*         for(let i=0;i<document.getElementsByClassName("draggableListDummyItem").length;i++){
            document.getElementsByClassName("draggableListDummyItem")[i].parentNode.removeChild(document.getElementsByClassName("draggableListDummyItem")[i]);
        } */

        if((event.target.getBoundingClientRect().top+(parseInt(event.target.offsetHeight)/2))>parseInt(draggableListSelectedItem.style.top)){
            let dummy = draggableListSelectedItem.cloneNode(true);
            dummy.style.visibility="hidden";
            dummy.style.position="static";
            dummy.classList.add("draggableListDummyItem");
            draggableListSelectedItem.parentNode.insertBefore(dummy, event.target);
            /* draggableListSelectedItem.parentNode.insertBefore(draggableListSelectedItem, event.target); */
        }else{
            let dummy = draggableListSelectedItem.cloneNode(true);
            dummy.style.visibility="hidden";
            dummy.style.position="static";
            dummy.classList.add("draggableListDummyItem");
            draggableListSelectedItem.parentNode.insertBefore(dummy, event.target.nextSibling);
           /*  draggableListSelectedItem.parentNode.insertBefore(draggableListSelectedItem, event.target.nextSibling); */
        }
    
    }
    }else if(!event.target.classList.contains("draggableList")){
        let el = draggableListFindAncestor(event.target);
        if(el){
        if(el.parentNode===draggableListSelectedItem.parentNode){

            draggableListSelectedItem.parentNode.getElementsByClassName("draggableListDummyItem")[0].parentNode.removeChild(draggableListSelectedItem.parentNode.getElementsByClassName("draggableListDummyItem")[0]);

/*         for(let i=0;i<document.getElementsByClassName("draggableListDummyItem").length;i++){
            document.getElementsByClassName("draggableListDummyItem")[i].parentNode.removeChild(document.getElementsByClassName("draggableListDummyItem")[i]);
        } */

        if((event.target.getBoundingClientRect().top+(parseInt(el.offsetHeight)/2))>parseInt(draggableListSelectedItem.style.top)){
            let dummy = draggableListSelectedItem.cloneNode(true);
            dummy.style.visibility="hidden";
            dummy.style.position="static";
            dummy.classList.add("draggableListDummyItem");
            draggableListSelectedItem.parentNode.insertBefore(dummy, el);
            /* draggableListSelectedItem.parentNode.insertBefore(draggableListSelectedItem, event.target); */
        }else{
            let dummy = draggableListSelectedItem.cloneNode(true);
            dummy.style.visibility="hidden";
            dummy.style.position="static";
            dummy.classList.add("draggableListDummyItem");
            draggableListSelectedItem.parentNode.insertBefore(dummy, el.nextSibling);
           /*  draggableListSelectedItem.parentNode.insertBefore(draggableListSelectedItem, event.target.nextSibling); */
        }
    
    }
}
    }
}
}

function draggableListEnded(){
    /* console.log(event.target); */
    if(draggableListSelectedItem){

    draggableListSelectedItem.style.position="static";
    draggableListSelectedItem.style.top = "";
draggableListSelectedItem.style.height = "";
draggableListSelectedItem.style.width = "";
draggableListSelectedItem.style.zIndex="";
draggableListSelectedItem.style.pointerEvents="auto";

if(event.target===draggableListSelectedItem.parentNode || event.target.parentNode===draggableListSelectedItem.parentNode){
    if(draggableListSelectedItem.parentNode.getElementsByClassName("draggableListDummyItem")[0]){
draggableListSelectedItem.parentNode.insertBefore(draggableListSelectedItem, draggableListSelectedItem.parentNode.getElementsByClassName("draggableListDummyItem")[0]);
draggableListSelectedItem.parentNode.getElementsByClassName("draggableListDummyItem")[0].parentNode.removeChild(draggableListSelectedItem.parentNode.getElementsByClassName("draggableListDummyItem")[0]);
}
}else{
    let test = draggableListFindAncestor(event.target);
    if(test){
    if(test.parentNode===draggableListSelectedItem.parentNode){
        if(draggableListSelectedItem.parentNode.getElementsByClassName("draggableListDummyItem")[0]){
            draggableListSelectedItem.parentNode.insertBefore(draggableListSelectedItem, draggableListSelectedItem.parentNode.getElementsByClassName("draggableListDummyItem")[0]);
            draggableListSelectedItem.parentNode.getElementsByClassName("draggableListDummyItem")[0].parentNode.removeChild(draggableListSelectedItem.parentNode.getElementsByClassName("draggableListDummyItem")[0]);
            }
    }
}
}
}
draggableListSelectedItem=false;
draggableListMouseLeave();



}

function disableSelect(){
    if(draggableListSelectedItem){
    event.preventDefault();
    }
}

function draggableListFindAncestor (el) {
    while ((el = el.parentElement) && !el.classList.contains("draggableItem"));
    return el;
}

function draggableListMouseLeave(){
for(let i=0;i<document.getElementsByClassName("draggableListDummyItem").length;i++){
    document.getElementsByClassName("draggableListDummyItem")[i].parentNode.removeChild(document.getElementsByClassName("draggableListDummyItem")[i]);
}
}