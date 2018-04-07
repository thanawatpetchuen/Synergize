// import { request } from "http";

// var firebase = require("https://www.gstatic.com/firebasejs/4.10.1/firebase.js");

// Set the configuration for your app
// TODO: Replace with your project's config object
// var config = {
//     apiKey: "AIzaSyAavMQyUn6O_KCKEh9-7eetoT5-bkm9rjI",
//     authDomain: "synergize-sng.firebaseapp.com",
//     databaseURL: "https://synergize-sng.firebaseio.com",
//     projectId: "synergize-sng",
//     storageBucket: "synergize-sng.appspot.com",
//     messagingSenderId: "496672867289"
// };
// firebase.initializeApp(config);

// Get a reference to the database service
// var database = firebase.database();

var productPage = false;


function getURLParameter(name) {
    productPage = true;
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

// function myFunction(x) {

// }

var x = window.matchMedia("(min-width: 768px)")

$(document).ready(function () {


    let url = window.location.href;
    console.log(url);
    var categoryParam = "";
    const dbRef = firebase.database().ref().child('products');
    var heroDiv = document.getElementById("hero");
    var categoriesDiv = document.getElementById("categories");
    var collectionsDiv = document.getElementById("collections");

    // var arr = url.split('?');
    // console.log(arr);

    var fileName = url.substring(url.lastIndexOf('/')+1).split(".")[0];
    console.log(fileName);

    if (fileName == "ups") {
        categoryParam = "UPS";
        // Parameter found
        // const categoryParam = getURLParameter("category");
        // heroDiv.style.display = "none";
        // categoriesDiv.style.display = "none";
    }else if(fileName == "dc-power-systems"){
        categoryParam = "DC Power System";
    }
    
    console.log(categoryParam, "categoryParam");
    const productRef = dbRef.child(categoryParam);

    productRef.once('value', snap => {
        var loader = document.getElementById("loader");
        loader.style.display = "none";
        console.log("ASD");
        snap.forEach(childSnap => {
            childData = childSnap.val();
            console.log(childData);

            // Loop start

            var itemDiv = document.createElement("div");
            itemDiv.className = "item col-lg-4 col-md-6 mb-4";

            var productGray = document.createElement("div");
            productGray.classList.add("product", "is-gray");

            var imgDiv = document.createElement('div');
            imgDiv.classList.add('image', 'd-flex', 'align-items-center', 'justify-content-center')

            var imgItem = document.createElement("img");
            imgItem.className = "img-fluid";
            imgItem.alt = "";
            imgItem.src = childData.img;

            var hoverOverlay = document.createElement("div");
            hoverOverlay.classList.add('hover-overlay', 'd-flex', 'align-items-center', 'justify-content-center');

            var ctaDiv = document.createElement('div');
            ctaDiv.classList.add('CTA', 'd-flex', 'align-items-center', 'justify-content-center');

            var aShoppingCart = document.createElement('a');
            aShoppingCart.href = '#';
            aShoppingCart.className = "add-to-cart";

            var iconShoppingCart = document.createElement('i');
            iconShoppingCart.classList.add('fa', 'fa-shopping-cart');

            var aView = document.createElement('a');
            var aViewText = document.createTextNode(" View");
            aView.href = fileName+'/'+childData.page+'.html';
            aView.classList.add('visit-product', "active");
            aView.appendChild(aViewText);

            var iconView = document.createElement('i');
            iconView.style.paddingLeft = "5px";
            iconView.className = "icon-search";

            var titleDiv = document.createElement('div');
            titleDiv.className = "title";

            var aDetail = document.createElement('a');
            var h3Detail = document.createElement('h3');
            var h3Text = document.createTextNode(childData.title);
            h3Detail.classList.add('h6', 'text-uppercase', 'no-margin-bottom');

            var spanPrice = document.createElement('span');
            var priceTag = document.createTextNode(childData.price);
            spanPrice.classList.add('price', 'text-muted');
            spanPrice.appendChild(priceTag);

            h3Detail.appendChild(h3Text);
            aDetail.appendChild(h3Detail);
            titleDiv.appendChild(aDetail);
            titleDiv.appendChild(spanPrice);

            aShoppingCart.appendChild(iconShoppingCart);
            aView.appendChild(iconView);

            ctaDiv.appendChild(aShoppingCart);
            ctaDiv.appendChild(aView);

            hoverOverlay.appendChild(ctaDiv);

            imgDiv.appendChild(imgItem);
            imgDiv.appendChild(hoverOverlay);
            
            productGray.appendChild(imgDiv);
            productGray.appendChild(titleDiv);

            itemDiv.appendChild(productGray);

            // Loop end

            var itemList = document.getElementById('productList');
            itemList.appendChild(itemDiv);


        });
    }).catch((err) => {
        console.log(err);
    })
    

    // if (productPage){
    //     var heroDiv = document.getElementById("hero");
    //     var categoriesDiv = document.getElementById("categories");
    //     var collectionsDiv = document.getElementById("collections");
    //     heroDiv.style.display = "none";
    //     categoriesDiv.style.display = "none";
    //     // collectionsDiv.style.display = "none";
    // }

    
});
