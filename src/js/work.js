import firebase from 'firebase/app';
import 'firebase/firestore';
import { getProject } from './database.js';
import { categoryMap } from './constants';

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
                        <h6 class="project-category">
                            <a href="/works.html?category=${Object.keys(categoryMap).find(key => categoryMap[key] === project.category)}" alt="category" class="project-category">${project.category}</a></h6>
                        <p class="p-text">${project.description}</p>
                    </div>
                </div>`
                ).join('')}`;
                resolve(htmlObject);
            }).catch(function(e) {
                reject(e);
            });
    })
}

export function workLoaded () {
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
}
