
let draggableListSelectedItem;

for(let i=0; i<document.getElementsByClassName("draggableList").length; i++){
    
    document.getElementsByClassName("draggableList")[i].addEventListener("dragstart", draggableListDragged);
    document.getElementsByClassName("draggableList")[i].addEventListener("dragover", draggableListEntered);
    document.getElementsByClassName("draggableList")[i].addEventListener("drop", draggableListEnded);
    document.getElementsByClassName("draggableList")[i].addEventListener("dragend", draggableListLeave);
}

for(let i=0; i<document.getElementsByClassName("draggableItem").length; i++){
    document.getElementsByClassName("draggableItem")[i].draggable = true;
}

function draggableListDragged(){
    draggableListSelectedItem=event.target;
}

function draggableListEntered(){
    event.preventDefault();

    if(event.target.classList.contains("draggableItem")){

        for(let i=0;i<document.getElementsByClassName("draggableListDummyItem").length;i++){
            document.getElementsByClassName("draggableListDummyItem")[i].parentNode.removeChild(document.getElementsByClassName("draggableListDummyItem")[i]);
        }

        if((event.target.getBoundingClientRect().top+(parseInt(event.target.offsetHeight)/2))>event.clientY){
            let dummy = draggableListSelectedItem.cloneNode(true);
            dummy.style.visibility="hidden";
            dummy.classList.add("draggableListDummyItem");
            console.log("1");
            draggableListSelectedItem.parentNode.insertBefore(dummy, event.target);
            /* draggableListSelectedItem.parentNode.insertBefore(draggableListSelectedItem, event.target); */
        }else{
            let dummy = draggableListSelectedItem.cloneNode(true);
            dummy.style.visibility="hidden";
            dummy.classList.add("draggableListDummyItem");
            console.log("2");
            draggableListSelectedItem.parentNode.insertBefore(dummy, event.target.nextSibling);
           /*  draggableListSelectedItem.parentNode.insertBefore(draggableListSelectedItem, event.target.nextSibling); */
        }
    

    }
}

function draggableListEnded(){
if(event.target===draggableListSelectedItem.parentNode || event.target.parentNode===draggableListSelectedItem.parentNode){
    if(draggableListSelectedItem.parentNode.getElementsByClassName("draggableListDummyItem")[0]){
draggableListSelectedItem.parentNode.insertBefore(draggableListSelectedItem, draggableListSelectedItem.parentNode.getElementsByClassName("draggableListDummyItem")[0]);
}
}

for(let i=0;i<document.getElementsByClassName("draggableListDummyItem").length;i++){
    document.getElementsByClassName("draggableListDummyItem")[i].parentNode.removeChild(document.getElementsByClassName("draggableListDummyItem")[i]);
}
}

function draggableListLeave(){
    for(let i=0;i<document.getElementsByClassName("draggableListDummyItem").length;i++){
        document.getElementsByClassName("draggableListDummyItem")[i].parentNode.removeChild(document.getElementsByClassName("draggableListDummyItem")[i]);
    }
}