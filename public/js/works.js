var config = {
    apiKey: "AIzaSyCINgziSR2GUof4fujxuxVIMe2Iib2fdnw",
    authDomain: "toosdani1.firebaseapp.com",
    databaseURL: "https://toosdani1.firebaseio.com",
    projectId: "toosdani1",
    storageBucket: "toosdani1.appspot.com",
    messagingSenderId: "1001590064504"
};
firebase.initializeApp(config);

function getProjectsByCategory (collection, category) {
    return new Promise(function(resolve, reject) {
        collection
        .where("category", "==", category)
        .get("id")
        .then(function(items) {
            let data = [];
            items.forEach(function(item) {
                let project = item.data();
                project['id'] = item.id;
                data.push(project);
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
                        ${!project.single ? (
                            `<div id="carousel${index}Id" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    ${project.images.map(function(image, index) {
                                        return `<div class="carousel-item ${index === 0 ? "active" : ""}">
                                            <a href="work.html?project=${project.id}">
                                            <img class="d-block w-100" src="${image}" alt="${project.title}" />
                                            </a>
                                        </div>`
                                    }).join('')}
                                </div>
                            </div>`
                        )
                    : (
                        `<div class="carousel">
                            <a href="work.html?project=${project.id}">
                                <img class="d-block w-100" src="${project.images[0]}" alt="${project.title}" />
                            </a>
                        </div>`
                    )}
                        </div>
                        <div class="col-12 col-md-4">
                            <a href="work.html?project=${project.id}"><h5 class="project-header">${project.title}</h5></a>
                            <h6 class="project-category">${project.category}</h6>
                            <p class="p-text">${project.description}</p>
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
      
      // get category from url parameter
      const collection = database.collection('projects');
      const queryString = location.search.split('=')[1];
      const categoryMap = {
          'product' : 'Product Design',
          'form' : 'Form Study',
          'graphic' : 'Graphic Design'
      }
      const category = categoryMap[queryString];
      
      let projects = getProjectsByCategory(collection, category);
      let htmlObject;
      renderProjects(projects).then(function(data) {
        htmlObject = data;
        document.getElementById('works').innerHTML = htmlObject;
        $('.carousel').carousel({
            ride: true,
            interval: 10000,
        });

        // event listener of the category sub-heading clicks
        document.querySelector('.project-category').addEventListener('click', (e) => {
            let newCategory = e.target.textContent;
            projects = getProjectsByCategory(collection, newCategory);
            renderProjects(projects).then(function(data) {
                htmlObject = data;
                document.getElementById('works').innerHTML = htmlObject;
                $('.carousel').carousel({
                    ride: true,
                    interval: 10000,
                });
            });
        });
      });

      
      
    } catch (e) {
      console.error(e);
    }
  });