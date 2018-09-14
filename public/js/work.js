var config = {
    apiKey: "AIzaSyCINgziSR2GUof4fujxuxVIMe2Iib2fdnw",
    authDomain: "toosdani1.firebaseapp.com",
    databaseURL: "https://toosdani1.firebaseio.com",
    projectId: "toosdani1",
    storageBucket: "toosdani1.appspot.com",
    messagingSenderId: "1001590064504"
};
firebase.initializeApp(config);

function writeProjects (project, collection) {
    return collection.add(project);
}

function getProject (collection, title) {
    const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
    return new Promise(function(resolve, reject) {
        collection
            .where("title", "==", capitalizedTitle)
            .limit(1)
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

function renderProject (projects) {
    return new Promise(function(resolve, reject) {
        projects.then(function(data) {
            let htmlObject = 
            `${data.map((project) => `
                <div class="row">
                    <div class="col-12 col-md-8 order-2 order-md-1">
                        ${project.images.map(function(image) {
                            return `<img class="img-fluid mb-4" src="${image}" alt="${project.title}" />`
                        }).join('')}
                    </div>
                    <div class="col-12 col-md-4 order-1 order-md-2">
                        <h5 class="project-header">${project.title}</h5>
                        <h6 class="project-category">${project.category}</h6>
                        <p class="p-text">${project.description}</p>
                    </div>
                </div>`
                ).join('')}`;
                resolve(htmlObject);
            }).catch(function(e) {
                console.log('ouch individual renderProject');
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

      const queryParameter = window.location.search.split('=')[1];
      const project = getProject(collection, queryParameter);
      let htmlObject;
      renderProject(project).then(function(data) {
          htmlObject = data;
          document.getElementById('work').innerHTML = htmlObject;
      });
    } catch (e) {
      console.error(e);
    }
  });