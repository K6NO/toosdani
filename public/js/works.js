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

function renderProjects (projects) {
    return new Promise(function(resolve, reject) {
        projects.then(function(data) {
            let htmlObject = 
            `${data.map(function (project, index)  {
                return `
                    <div class="row">
                        <div class="col-12 col-md-8">
                            <div id="carousel${index}Id" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    ${project.images.map(function(image, index) {
                                        return `<div class="carousel-item ${index === 0 ? "active" : ""}">
                                            <img class="d-block w-100" src="${image}" alt="${project.title}">
                                        </div>`
                                    }).join('')}
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <h5 class="project-header">${project.title}</h5>
                            <h6 class="project-category">${project.category}</h6>
                            <p class="p-text">${project.description}</p>
                            <p class="read-more mb-5"><a href="work.html?project=${project.title}">Read more</a></p>
                        </div>
                    </div>`
                }).join('')}`;
                resolve(htmlObject);
            }).catch(function(e) {
                console.log('ouch renderProjects');
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

      // event listeners
      const categoryButtons = document.getElementsByClassName('dropdown-item');
      [].forEach.call(categoryButtons, function (item) {
          item.addEventListener("click", function () {
              const category = item.textContent;
              const projects = category === 'All' ? getProjects(collection) : getProjectsByCategory(collection, category);
              const htmlObject = renderProjects(projects);
              htmlObject.then(function(data) {
                document.getElementById('works').innerHTML = data;
              });
              
          });
      })
      const projects = getProjects(collection);
      let htmlObject;
      renderProjects(projects).then(function(data) {
          htmlObject = data;
          document.getElementById('works').innerHTML = htmlObject;
      });
    } catch (e) {
      console.error(e);
    }
  });