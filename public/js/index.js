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
            <div id="carouselId" class="carousel slide carousel-fade" data-ride="carousel">
                <div class="carousel-inner">
                    ${data.map(function(item, index) {
                    return `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <div class="overlay"></div>
                        <img class="d-block w-100" src="${item.images[0]}" alt="${item.title}" />
                        <div class="carousel-caption d-none d-md-block">
                            <h2>${item.title}</h2>
                        </div>
                    </div>
                    `
                    }).join('')}
                </div>
                <a class="carousel-control-prev" href="#carouselId" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselId" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>`; 
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
                    <h1>My Work</h1>
                </div>
                ${data.map(function(project, index) {
                    return `<div class="col-12 col-md-4">
                        <img class="img-fluid" src="${project.images[0]}" />
                        <h5>${project.title}</h5>
                            <p>${project.category}</p>
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
      let app = firebase.app();
      let features = ['firestore', 'storage'].filter(feature => typeof app[feature] === 'function');
      document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;

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
    //   const projects = getProjectsByCategory(collection, "Product Design");
    
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
    } catch (e) {
      console.error(e);
      document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
    }
  });