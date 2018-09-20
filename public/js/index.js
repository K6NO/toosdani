const config = {
    apiKey: "AIzaSyCINgziSR2GUof4fujxuxVIMe2Iib2fdnw",
    authDomain: "toosdani1.firebaseapp.com",
    databaseURL: "https://toosdani1.firebaseio.com",
    projectId: "toosdani1",
    storageBucket: "toosdani1.appspot.com",
    messagingSenderId: "1001590064504"
};
firebase.initializeApp(config);

function getProjects (collection) {
    return new Promise(function(resolve, reject) {
        collection
            .get()
            .then(function(items) {
                let data = [];
                items.forEach(function(item) {
                    data.push(item.data());
            });
            resolve(data);
        })
        .catch(function (e) {
            reject(e);
        });
    });
}

function getTopProjects (collection) {
    return new Promise(function(resolve, reject) {
        collection
            .where("main", "==", true)
            .get()
            .then(function(items) {
                let data = [];
                items.forEach(function(item) {
                    data.push(item.data());
            });
            resolve(data);
        })
        .catch(function (e) {
            reject(e);
        });
    });
}

function getProjectsByCategory (collection, category) {
    return new Promise(function(resolve, reject) {
        collection
        .where("category", "==", category)
        .get()
        .then(function(items) {
            let data = [];
            items.forEach(function(item) {
                data.push(item.data());
        });
        resolve(data);
        })
        .catch(function (e) {
            reject(e);
        });
    });
}

function renderCarousel (projects) {
    return new Promise(function(resolve, reject) {
        projects.then(function(data) {
            let htmlObject = `
                    ${data.map(function(item, index) {
                    return `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <div class="overlay"></div>
                        <img class="d-block w-100" src="${item.images[0]}" alt="${item.title}" />
                        <div class="carousel-caption d-block">
                            <h2 class="carousel-title"><a class="${item.dark ? 'title-dark' : 'title-light'}" href="/work.html?project=${item.title}">${item.title}</a></h2>
                        </div>
                    </div>
                    `
                    }).join('')}
                `; 
            resolve(htmlObject);
        }).catch(function(e) {
            console.log('ouch renderCarousel');
            reject(e);
        });
    })
}

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
          }
      )
      .catch(function(e) {
        console.log('ouch in carousel rendering');
        console.log(e);
      });
      ;
    
    // handle contact form
    const form = document.querySelector('#contactForm');
    const name = form.elements['name'];
    const senderEmail = form.elements['email'];
    const message = form.elements['message'];
    form.elements['name'].value = '';
    form.elements['email'].value = '';
    form.elements['message'].value = '';

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if(!name.value) {
            alert('Please add your name.')
        } else if (!senderEmail.value) {
            alert('Please add your email.')
        } else if (!message.value) {
            alert('Please write a message.')
        } else {
            $.ajax({
                url: ' https://us-central1-toosdani.cloudfunctions.net/sendMail',
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
                console.log(data);
            })
            .fail(function(error) {
                alert('Error. Message not sent.');
                console.log(error);
            });
        }
    });
    } catch (e) {
      console.error(e);
      document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
    }
  });