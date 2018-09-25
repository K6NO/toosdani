var config = {
    apiKey: "AIzaSyCINgziSR2GUof4fujxuxVIMe2Iib2fdnw",
    authDomain: "toosdani1.firebaseapp.com",
    databaseURL: "https://toosdani1.firebaseio.com",
    projectId: "toosdani1",
    storageBucket: "toosdani1.appspot.com",
    messagingSenderId: "1001590064504"
};
firebase.initializeApp(config);

function getProject (collection, id) {
    return new Promise(function(resolve, reject) {
        collection
            .where(firebase.firestore.FieldPath.documentId(), "==", id)
            .limit(1)
            .get("id")
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
                    <div class="embed-container col-12 col-md-8 order-3 order-md-3">
                        ${project.videos ? project.videos.map(function (video) {
                            return `<iframe src='${video}' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>`
                        }).join('') : ''}
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
      console.log(queryParameter);
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