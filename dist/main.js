!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";firebase.initializeApp({apiKey:"AIzaSyCINgziSR2GUof4fujxuxVIMe2Iib2fdnw",authDomain:"toosdani1.firebaseapp.com",databaseURL:"https://toosdani1.firebaseio.com",projectId:"toosdani1",storageBucket:"toosdani1.appspot.com",messagingSenderId:"1001590064504"}),document.addEventListener("DOMContentLoaded",function(){try{var e=firebase.firestore();e.settings({timestampsInSnapshots:!0});var t=e.collection("projects"),n=void 0;(function(e){return new Promise(function(t,n){e.then(function(e){var n="\n                    "+e.map(function(e,t){return'\n                    <div class="carousel-item '+(0===t?"active":"")+'">\n                        <div class="overlay"></div>\n                        <img class="d-block w-100" src="'+e.images[0]+'" alt="'+e.title+'" />\n                        <div class="carousel-caption d-block">\n                            <h2 class="carousel-title"><a class="'+(e.dark?"title-dark":"title-light")+'" href="/work.html?project='+e.title+'">'+e.title+"</a></h2>\n                        </div>\n                    </div>\n                    "}).join("")+"\n                ";t(n)}).catch(function(e){console.log("ouch renderCarousel"),n(e)})})})(function(e){return new Promise(function(t,n){e.where("main","==",!0).get().then(function(e){var n=[];e.forEach(function(e){n.push(e.data())}),t(n)}).catch(function(e){n(e)})})}(t)).then(function(e){n=e,document.getElementById("renderCarousel").innerHTML=n,$("#carouselId").on("slid.bs.carousel",function(){$(".carousel-item.active .carousel-caption").addClass("move-in"),$(".carousel-item .carousel-caption").removeClass("move-out"),setTimeout(function(){$(".carousel-item.active .carousel-caption").removeClass("move-in").addClass("move-out")},4e3)})}).catch(function(e){console.log("ouch in carousel rendering"),console.log(e)});var o=document.querySelector("#contactForm"),a=o.elements.name,r=o.elements.email,i=o.elements.message;o.addEventListener("submit",function(e){o.elements.name.value="",o.elements.email.value="",o.elements.message.value="",function(e,t,n,o){e.preventDefault(),t.value?n.value?o.value?$.ajax({url:" https://us-central1-toosdani.cloudfunctions.net/sendMail",type:"POST",dataType:"json",data:{name:t.value,email:n.value,message:o.value}}).done(function(e){alert(e.message),console.log(e)}).fail(function(e){alert("Error. Message not sent."),console.log(e)}):alert("Please write a message."):alert("Please add your email."):alert("Please add your name.")}(e,a,r,i)})}catch(e){console.error(e),document.getElementById("load").innerHTML="Error loading the Firebase SDK, check the console."}})}]);