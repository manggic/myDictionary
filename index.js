// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

$(document).ready(function () {
  // jQuery methods go here...
  $(".modal").on("hidden.bs.modal", function () {
    console.log("hi");
    $(".input").val("");
    $(".boxs").html("");
  });
});

let localStorageData = {};

// This function runs on page load
function myFunction() {
  // This for loop will add button from A to Z with Plus(+) button beside it
  for (let i = 97; i <= 122; i++) {
    code = String.fromCharCode(i).toUpperCase();
    document.getElementById("myContainer").innerHTML += `<div id=${
      i - 96
    } class="buttons"><button class="button grow" data-toggle='modal' data-target='#exampleModal${
      i - 96
    }' >${code}</button>
     <button id=${code}${code}    data-toggle='modal' data-target='#exampleModal${code}${code}' class="miniButton">+</button></div>`;
  }

  // Add modal to button (A to Z)
  for (let i = 1; i <= 26; i++) {
    let string = String.fromCharCode(96 + i).toUpperCase();
    document.getElementById(
      "modals"
    ).innerHTML += `<div class="modal fade" id="exampleModal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content ">
            <div class="modal-header">
              <h5 class="modal-title"  id="exampleModalLabel">Content</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
               <table id=${string} style='background:aliceblue' class="table ">
                 <thead>
                   <tr>
                       <th>English</th>
                       <th>Meaning</th>
                       <th>Delete</th>
                   </tr>
                   </thead>  
               </table>
            </div>
            <div class="modal-footer">
              <button type="button" onclick='deleteAll("${string}")' class="btn btn-secondary" data-dismiss="modal">Delete All</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>`;
  }

  // plusbutton popup
  for (let i = 1; i <= 26; i++) {
    let string = String.fromCharCode(96 + i).toUpperCase();
    document.getElementById(
      "plusButton"
    ).innerHTML += `<div class="modal fade" id="exampleModal${string}${string}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content elementModal ">
              <div class="modal-header text-white">
                <h5 class="inbox" id="exampleModalLabel">Inbox</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div style='display:flex;align-items: center;
              justify-content: space-between;
          ' class="modal-body">
               <h5 style='font-size:15px'  > how many element u want to add ??</h5>
               <input style='width:30%'  type="number" class='input'  oninput="changeinput('${string}')"  id="input${string}" placeholder="Type Number" >
              </div>
              <div  class="boxs"  id="inputs${string}" style="">
      
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
                <button type="button" onclick="OnSubmit('${string}')" class="btn btn-dark ">Submit</button>
              </div>
            </div>
          </div>
        </div>`;
  }

  // onload updation from localstorage
  for (let j = 97; j <= 122; j++) {
    let string = String.fromCharCode(j).toUpperCase();
    if (localStorage.getItem(string) !== null) {
      // let obj ={}
      // obj[string.toString()] =  localStorage.getItem( string )
      localStorageData[string] = JSON.parse(localStorage.getItem(string));
      dataInString = localStorage.getItem(string);
      dataInObject = JSON.parse(dataInString);
      console.log(" typeof LS data without parse :", typeof dataInString);
      console.log(" typeof LS data after parse :", typeof dataInObject);
      // localStorageData.push(dataInObject)
      console.log(dataInObject, "length", dataInObject.length);
      let len = dataInObject.length;

      for (let i = 0; i < len; i++) {
        let dict = dataInObject[i];
        document.getElementById(
          string
        ).innerHTML += `<tbody><tr><td>${dict["key"]}</td> 
                                 <td>${dict["value"]}</td>
                                 <td><button onclick="deleteOne(id, name)"  name=${dict["key"]}   id=${string} class="btn btn-danger btn-sm">X</button></td></tr></boody>`;
      }
    } else {
      localStorageData[string] = [];
    }
  }
  console.log("global", localStorageData);
}

const deleteOne = (string, keys) => {
  let got = JSON.parse(localStorage.getItem(string));
  console.log(got);

  let willStore = got.filter((dict) => dict["key"] !== keys);
  localStorage.removeItem(string);
  localStorage.setItem(string, JSON.stringify(willStore));
  location = location;
};

// on input change on PLUS+ button popUp
function changeinput(letter) {
  console.log("selected", letter);
  console.log("input selected", document.getElementById(`input${letter}`));
  // alert(document.getElementById(`input${letter}`).value)
  console.log("letter", letter);
  let element = document.getElementById(`input${letter}`).value;
  fullinput = ``;
  for (let i = 1; i <= element; i++) {
    fullinput += `<div class='single'><div class="row" >
                  <div class="col-3 form-group">
                  <label for="">English </label>
                   </div>
                  <div class="col-8">
                  <input type="text" name="English" class="form-control" id="formGroupExampleInput" aria-describedby="emailHelp" placeholder="Enter English word">  
                  </div>
               </div>
               <div class="row" >
                  <div class="col-3 form-group">
                  <label for="">Meaning </label>
                   </div>
                  <div class="col-8">
                  <input type="text"  name="meaning" class="form-control" id="formGroupExampleInput" aria-describedby="emailHelp" placeholder="Enter Meaning">  
                  </div>
               </div></div>`;
  }
  console.log("fullinput", fullinput);
  console.log(document.getElementById(`inputs${letter}`).innerHTML);
  document.getElementById(`inputs${letter}`).innerHTML = fullinput;
  // document.getElementById(letter).innerHTML =  fullinput
}

function OnSubmit(letter) {
  //console.log(document.getElementsByName('meaning'))
  meaning = document.getElementsByName("meaning");
  English = document.getElementsByName("English");
  len = document.getElementsByName("meaning").length;
  console.log("meaning", meaning);
  console.log("English", English);
  console.log("length", len);
  let localStorageDat = [];
  for (let i = 0; i < len; i++) {
    let meaningValue = meaning[i].value;
    let englishValue = English[i].value;

    if (meaningValue && englishValue) {
      document.getElementById(
        letter
      ).innerHTML += `<tbody><tr><td>${English[i].value}</td> 
          <td>${meaning[i].value}</td>
          <td><button onclick="deleteOne(id, name)"  name=${English[i].value}   id=${letter} class="btn btn-danger btn-sm">X</button></td></tr></boody>`;

      console.log("all Thhree", meaningValue, englishValue, localStorageDat);

      localStorageDat.push({ key: englishValue, value: meaningValue });
    }

    // console.log(final)
  }
  console.log("letter", letter);
  console.log("global", localStorageData[letter]);
  console.log("local", localStorageDat);
  if (localStorageData[letter] !== undefined)
    localStorage.setItem(
      letter,
      JSON.stringify(localStorageData[letter].concat(localStorageDat))
    );
  else if (localStorageDat.length !== 0)
    localStorage.setItem(letter, JSON.stringify(localStorageDat));

  document.getElementById(`inputs${letter}`).innerHTML = "";
}

function deleteAll(letter) {
  console.log(letter);
  localStorage.removeItem(letter);
  location = location;
}
