let myTitle = document.getElementById("title");
let myPrice = document.getElementById("price");
let myTaxes = document.getElementById("taxes");
let myAds = document.getElementById("ads");
let myDiscount = document.getElementById("discount");
let myTotal = document.getElementById("total");
let myCount = document.getElementById("count");
let myCategory = document.getElementById("category");
let submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let Delete = document.getElementById("delete");
let deleteAll = document.getElementById("deleteAll");
let mood = "create";
let search = document.getElementById("search");
////// function to calculate total
function getTotal() {
  if (myPrice.value !== "") {
    myTotal.innerHTML =
      Number(myPrice.value) +
      Number(myTaxes.value) +
      Number(myAds.value) -
      Number(myDiscount.value);
    myTotal.style.background = "#040";
  } else {
    myTotal.innerHTML = "";
    myTotal.style.background = "#a00d02";
  }
}
/////////// create product
let DataPro = [];
if (localStorage.getItem("product") != null) {
  DataPro = JSON.parse(localStorage.getItem("product"));
}
submit.onclick = function () {
  let newPro = {
    title: myTitle.value.toLowerCase(),
    price: myPrice.value,
    taxes: myTaxes.value,
    ads: myAds.value,
    discount: myDiscount.value,
    total: myTotal.innerHTML,
    category: myCategory.value.toLowerCase(),
    count: myCount.value,
  };
  ////// count inputs
  if (
    myTitle.value !== "" &&
    myCategory.value !== "" &&
    myPrice.value !== "" &&
    myTaxes.value !== "" &&
    myAds.value !== "" &&
    myDiscount.value !== "" &&
    myCount.value <= 200
  ) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          DataPro.push(newPro);
        }
      } else {
        DataPro.push(newPro);
      }
    } else {
      DataPro[tmp] = newPro;
      mood = "create";
      submit.innerHTML = "Create";
      myCount.style.display = "block";
    }
  }

  ///// save in local storage
  localStorage.setItem("product", JSON.stringify(DataPro));
  console.log(localStorage.getItem("product"));
  clearData();
  showData();
};
//// clear all inputFields
function clearData() {
  myTitle.value = "";
  myAds.value = "";
  myPrice.value = "";
  myDiscount.value = "";
  myTaxes.value = "";
  myCategory.value = "";
  myTotal.innerHTML = "";
  myCount.value = "";
  myTotal.style.background = "#a00d02";
}
function showData() {
  let table = "";
  for (i = 0; i < DataPro.length; i++) {
    table += `<tr>
      <td>${i}</td>
      <td>${DataPro[i].title}</td>
      <td>${DataPro[i].price}</td>
      <td>${DataPro[i].taxes}</td>
      <td>${DataPro[i].ads}</td>
      <td>${DataPro[i].discount}</td>
      <td>${DataPro[i].total}</td>
      <td>${DataPro[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">Update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
    </tr>`;
  }
  tbody.innerHTML = table;
  if (DataPro.length > 0) {
    deleteAll.innerHTML = `<button id="DeleteAll" style="margin:20px 0" onclick="DeleteALL()">DeleteAll(${DataPro.length})</button>`;
  } else {
    deleteAll.innerHTML = "";
  }
}

////// delete
function deleteData(i) {
  DataPro.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(DataPro));
  showData();
}
function DeleteALL() {
  localStorage.clear();
  DataPro.splice(0);
  showData();
}
/////////////// upadte data
function updateData(i) {
  myTitle.value = DataPro[i].title;
  myPrice.value = DataPro[i].price;
  tmp = i;
  myCount.style.display = "none";
  myTaxes.value = DataPro[i].taxes;
  myAds.value = DataPro[i].ads;
  myDiscount.value = DataPro[i].discount;
  myCategory.value = DataPro[i].category;
  myTotal.innerHTML = DataPro[i].total;
  myTotal.style.background = "#040";
  mood = "update";
  submit.innerHTML = "Update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
///////////// search
let searchMood = "title";
function getSearchMood(id) {
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.focus();
  search.value = "";
  search.setAttribute("placeholder", `Search by ${searchMood}`);
}
showData();

function searchData(value) {
  let table = "";
  for (let i = 0; i < DataPro.length; i++) {
    if (searchMood == "title") {
      if (DataPro[i].title.includes(value.toLowerCase())) {
        table += `<tr>
        <td>${i}</td>
        <td>${DataPro[i].title}</td>
        <td>${DataPro[i].price}</td>
        <td>${DataPro[i].taxes}</td>
        <td>${DataPro[i].ads}</td>
        <td>${DataPro[i].discount}</td>
        <td>${DataPro[i].total}</td>
        <td>${DataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
      </tr>`;
      }
    } else {
      if (DataPro[i].category.includes(value.toLowerCase())) {
        table += `<tr>
        <td>${i}</td>
        <td>${DataPro[i].title}</td>
        <td>${DataPro[i].price}</td>
        <td>${DataPro[i].taxes}</td>
        <td>${DataPro[i].ads}</td>
        <td>${DataPro[i].discount}</td>
        <td>${DataPro[i].total}</td>
        <td>${DataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
      </tr>`;
      }
    }
  }
  tbody.innerHTML = table;
}
