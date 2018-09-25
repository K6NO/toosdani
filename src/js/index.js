// Firebase App is always required and must be first
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';

import { config } from './config.js';
import { indexLoaded } from './landing.js';
import { worksLoaded } from './works.js';
import { workLoaded } from './work.js';
firebase.initializeApp(config);

if(window.location.pathname.indexOf('works.html') !== -1 ) {
    // show works page
    worksLoaded();
} else if (window.location.pathname.indexOf('work.html') !== -1 ) {
    workLoaded();
} else {
    indexLoaded();
}
