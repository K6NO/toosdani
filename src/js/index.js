// Firebase App is always required and must be first
import firebase from "firebase/app";
import { config } from './config.js';
import { indexLoaded } from './landing.js';
import { worksLoaded } from './works.js';
import { workLoaded } from './work.js';
firebase.initializeApp(config);

if(window.location.pathname.indexOf('works.html') !== -1 ) {
    // show works page
    worksLoaded();
} else if (window.location.pathname.indexOf('work.html') !== -1 ) {
    // show individual work page
    workLoaded();
} else {
    // show index page
    indexLoaded();
}