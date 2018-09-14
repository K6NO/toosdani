var config = {
    apiKey: "AIzaSyCMfO7V9ylKXpZnHv3JJxvRAFMBQFfmxaI",
    authDomain: "toosdani.firebaseapp.com",
    databaseURL: "https://toosdani.firebaseio.com",
    projectId: "toosdani",
    storageBucket: "toosdani.appspot.com",
    messagingSenderId: "726538280366"
  };
firebase.initializeApp(config);


function writeProjects (project, collection) {
    return collection.add(project);
}

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

function getTopProjects (collection, limit) {
    return new Promise(function(resolve, reject) {
        collection
            .limit(limit)
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
                            <h2 class="carousel-title">${item.title}</h2>
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

function renderTopProjects (projects) {
    return new Promise (function(resolve, reject) {
        projects.then(function(data) {
            let htmlObject = `
            <div class="container text-center">
                <div class="row">
                <div class="col-12">
                    <h1 class="work-header">My Work</h1>
                </div>
                ${data.map(function(project, index) {
                    return `<div class="col-12 col-md-4">
                        <img class="img-fluid" src="${project.images[0]}" />
                        <h5 class="project-header">${project.title}</h5>
                            <p class="project-category">${project.category}</p>
                    </div>`
                }).join('')}
                </div>
            </div>`;
            resolve(htmlObject)
        }).catch(function(e) {
            console.log('ouch renderTopProjects');
            reject(e);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    try {
      const database = firebase.firestore();
      const firestoreSettings = {timestampsInSnapshots : true};
      database.settings(firestoreSettings);
      const collection = database.collection('projects');
      let carouselHTML, topProjectsHTML;
      
      // render carousel
      const topProjects = getTopProjects(collection, 3);
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
    
    // render My Work section
      renderTopProjects(topProjects).then(
          function(data) {
            topProjectsHTML = data;
            document.getElementById('work').innerHTML = topProjectsHTML;
          }
      )
      .catch(function(e) {
        console.log('ouch in topProjects rendering');
        console.log(e);
      });
    // render form 

    // handle contact form
    const form = document.querySelector('#contactForm');
    const name = form.elements['name'];
    const senderEmail = form.elements['email'];
    const message = form.elements['message'];
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log(
            name.value, senderEmail.value, message.value
        );
        if(!name.value) {
            alert('Please add your name.')
        } else if (!senderEmail.value) {
            alert('Please add your email.')
        } else if (!message.value) {
            alert('Please write a message.')
        } else {
            console.log(
                name, senderEmail, message
            );
            $.ajax({
                url: ' https://us-central1-toosdani.cloudfunctions.net/sendMail',
                type: 'POST',
                dataType: 'json',
                data: {
                    "name" : name.value,
                    "email" : senderEmail.value,
                    "message" : message.value,
                },
                success: function(response) {
                    if(!response.error) {
                        console.log(response.message);
                    } else {
                        console.log(response.error);
                    }
            }})
            .fail(function(data) {
                alert(data);
            });
        }
        
  
    });
    } catch (e) {
      console.error(e);
      document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
    }
  });