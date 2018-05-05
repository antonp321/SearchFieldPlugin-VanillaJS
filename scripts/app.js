const getRequest = async (url) => {
    let response = await fetch(url);
    return await response.json();
};

let listPos = 0;
let lfcPlayers;

function navigateWithKeyboard(e){
    let itemsList = document.getElementsByClassName("listItems");
    let inputField = document.getElementById("mySearch");

    if(e.keyCode === 40){

        itemsList[listPos].style.backgroundColor = "dimgray";
        itemsList[listPos].style.color = "white";
        inputField.value = itemsList[listPos].innerText;

        if(listPos > 0) {
            itemsList[listPos - 1].style.backgroundColor = "white";
            itemsList[listPos - 1].style.color = "black";
        }

        if(listPos < itemsList.length - 1){
            listPos++;
            list.style.display = 'inline';
        }
    }
    else if(e.keyCode === 38){
        list.style.display = 'inline';

        if(listPos > 0){
            listPos--;
        }

        itemsList[listPos].style.backgroundColor = "dimgray";
        itemsList[listPos].style.color = "white";
        inputField.value = itemsList[listPos].innerText;

        if(listPos >= 0 && itemsList.length > 1) {
            itemsList[listPos + 1].style.backgroundColor = "white";
            itemsList[listPos + 1].style.color = "black";
        }
    }
    else if(e.keyCode === 13){
        list.style.display = "none";
        itemsList[listPos].style.backgroundColor = "white";
        itemsList[listPos].style.color = "black";
        listPos = 0;
        inputField.blur();
    }
}

function fillTheListWithFoundItemsOnly(obj, listElement, e){
    listElement.innerHTML = '';

    listElement.style.display = "inline";
    for(let k in obj){

        let putLabel = false;
        let stringsToAppend = [];

        if (obj.hasOwnProperty(k)) {
            for(let i = 0; i < obj[k].length; i++){

                let currentPlayer = obj[k][i].toLowerCase();

                if(currentPlayer.includes(e.target.value.toLowerCase())){
                    stringsToAppend.push(obj[k][i]);
                    putLabel = true;
                }
            }

            if(putLabel){
                listElement.innerHTML += "<li class='listLabels'><strong>" + k + "</strong></li>";

                for(let i = 0; i < stringsToAppend.length; i++){
                    listElement.innerHTML += "<li class='listItems'>" + stringsToAppend[i] + "</li>";
                }
            }
        }
    }

    let itemsList = document.getElementsByClassName("listItems");

    for(let i = 0; i < itemsList.length; i++){
        itemsList[i].addEventListener('click', function(e){
            document.getElementById("mySearch").value = e.target.innerText;
        });
    }
}

function fillTheFullList(obj, listElement){
    listElement.innerHTML = '';

    listElement.style.display = "inline";

    for(let k in obj){

        if (obj.hasOwnProperty(k)) {
            listElement.innerHTML += "<li class='listLabels'><strong>" + k + "</strong></li>";

            for(let i = 0; i < obj[k].length; i++){
                listElement.innerHTML += "<li class='listItems'>" + obj[k][i] + "</li>";
            }
        }
    }

    let itemsList = document.getElementsByClassName("listItems");

    for(let i = 0; i < itemsList.length; i++){
        itemsList[i].addEventListener('click', function(e){
            document.getElementById("mySearch").value = e.target.innerText;
        });
    }
}

getRequest('https://api.myjson.com/bins/udktu').then(function(response){
    lfcPlayers = response.lfcPlayersNationalities;
});

let list = document.getElementById('hiddenSearchList');

document.getElementById("mySearch").addEventListener('focusout', function(){
    setTimeout(function(){
        list.style.display = "none";
        listPos = 0;
    }, 200);
});

document.getElementById("mySearch").addEventListener('click', function(e){
    if(e.target.value.length === 0) {
        fillTheFullList(lfcPlayers, list);
    }
    else{
        fillTheListWithFoundItemsOnly(lfcPlayers, list, e);
    }
});

document.getElementById("mySearch").addEventListener('input', function (e) {
    if(e.target.value.length > 0) {
        fillTheListWithFoundItemsOnly(lfcPlayers, list, e);
    }
    else{
        fillTheFullList(lfcPlayers, list);
    }
});

document.getElementById("mySearch").addEventListener('keyup', function (e) {
    navigateWithKeyboard(e);
});