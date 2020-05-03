import firebase from "firebase/app";
import "firebase/firestore";
import { getProjectsByCategory } from "./database.js";
import { categoryMap } from "./constants";

function renderProjects(projects) {
  return new Promise(function (resolve, reject) {
    projects
      .then(function (data) {
        let htmlObject = `${data
          .map(function (project, index) {
            return `
                    <div class="row">
                        <div class="col-12 col-md-8">
                        ${
                          !project.single
                            ? `<div id="carousel${index}Id" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    ${project.images
                                      .map(function (image, index) {
                                        return `<div class="carousel-item ${
                                          index === 0 ? "active" : ""
                                        }">
                                            <a href="work.html?project=${
                                              project.id
                                            }">
                                            <img class="d-block w-100" src="${image}" alt="${project.title}" />
                                            </a>
                                        </div>`;
                                      })
                                      .join("")}
                                </div>
                            </div>`
                            : `<div class="carousel">
                            <a href="work.html?project=${project.id}">
                                <img class="d-block w-100" src="${project.images[0]}" alt="${project.title}" />
                            </a>
                        </div>`
                        }
                        </div>
                        <div class="col-12 col-md-4">
                            <a href="work.html?project=${
                              project.id
                            }"><h5 class="project-header">${project.title}</h5></a>
                            <h6 class="project-category">${
                              project.category
                            }</h6>
                            ${
                              window.innerWidth < 540
                                ? `<p class="p-text">${project.description}</p>`
                                : ""
                            }
                        </div>
                    </div>`;
          })
          .join("")}`;
        resolve(htmlObject);
      })
      .catch(function (e) {
        reject(e);
      });
  });
}
export function worksLoaded() {
  document.addEventListener("DOMContentLoaded", function () {
    try {
      const database = firebase.firestore();
      const firestoreSettings = { timestampsInSnapshots: true };
      database.settings(firestoreSettings);

      // get category from url parameter
      const collection = database.collection("projects");
      const queryString = location.search.split("=")[1];

      const category = categoryMap[queryString];

      let projects = getProjectsByCategory(collection, category);
      let htmlObject;
      renderProjects(projects).then(function (data) {
        htmlObject = data;
        document.getElementById("works").innerHTML = htmlObject;
        $(".carousel").carousel({
          ride: true,
          interval: 5000,
        });

        // event listener of the category sub-heading clicks
        document
          .querySelector(".project-category")
          .addEventListener("click", (e) => {
            let newCategory = e.target.textContent;
            projects = getProjectsByCategory(collection, newCategory);
            renderProjects(projects).then(function (data) {
              htmlObject = data;
              document.getElementById("works").innerHTML = htmlObject;
              $(".carousel").carousel({
                ride: true,
                interval: 5000,
              });
            });
          });
      });
    } catch (e) {
      reject(e)   
    }
  });
}
