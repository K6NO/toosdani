import firebase from 'firebase/app';
import 'firebase/firestore';
import { getTopProjects } from './database.js';

function renderCarousel (projects) {
    return new Promise(function(resolve, reject) {
        projects.then(function(data) {
            let htmlObject = `
                    ${data.map(function(item, index) {
                    return `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img class="d-block w-100" src="${item.images[0]}" alt="${item.title}" />
                        <div class="carousel-caption d-block">
                            <h2 class="carousel-title"><a class="${item.dark ? 'title-dark' : 'title-light'}" href="/work.html?project=${item.id}">${item.title}</a></h2>
                        </div>
                    </div>
                    `
                    }).join('')}
                `; 
            resolve(htmlObject);
        }).catch(function(e) {
            
            reject(e);
        });
    })
}

function sendEmail (e, name, senderEmail, message) {
    e.preventDefault();
    if(!name.value) {
        alert('Please add your name.')
    } else if (!senderEmail.value) {
        alert('Please add your email.')
    } else if (!message.value) {
        alert('Please write a message.')
    } else {
        $.ajax({
            url: 'https://us-central1-toosdani1.cloudfunctions.net/sendEmail',
            type: 'POST',
            dataType: 'json',
            data: {
                "name" : name.value,
                "email" : senderEmail.value,
                "message" : message.value,
            }
            })
        .done(function(data) {
            alert(data.message);
            const form = document.querySelector('#contactForm');
            form.elements['name'].value = '';
            form.elements['email'].value = '';
            form.elements['message'].value = '';
        })
        .fail(function(error) {
            alert('Error. Message not sent. Please try again.');
            console.error(error);
        });
    }
}
export function indexLoaded () {
    document.addEventListener('DOMContentLoaded', function() {
        try {
          const database = firebase.firestore();
          const firestoreSettings = {timestampsInSnapshots : true};
          database.settings(firestoreSettings);
          const collection = database.collection('projects');
        
          // render carousel
          let carouselHTML;
          const topProjects = getTopProjects(collection);
          renderCarousel(topProjects).then(
              function(data) {
                  carouselHTML = data;
                  document.getElementById('renderCarousel').innerHTML = carouselHTML;
    
                  // add event listener to carousel slid event
                $('#carouselId').on('slid.bs.carousel', function () {
                    $('.carousel-item.active .carousel-caption').addClass('move-in')
                    $('.carousel-item .carousel-caption').removeClass('move-out');
                    setTimeout(function () {
                        $('.carousel-item.active .carousel-caption').removeClass('move-in').addClass('move-out');
                    }, 4000);
                });
              }
          )
          .catch(function(e) {
            console.error(e);
            
          });
        
        // handle contact form
        const form = document.querySelector('#contactForm');
        const name = form.elements['name'];
        const senderEmail = form.elements['email'];
        const message = form.elements['message'];
    
    
        form.addEventListener('submit', function(e) {
            sendEmail(e, name, senderEmail, message);
        });
        } catch (e) {
          console.error(e);
          document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
        }
      });
}