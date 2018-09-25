import firebase from 'firebase';

export function getTopProjects (collection) {
    return new Promise(function(resolve, reject) {
        collection
            .where("main", "==", true)
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

export function getProjectsByCategory (collection, category) {
    return new Promise(function(resolve, reject) {
        collection
        .where("category", "==", category)
        .get()
        .then(function(items) {
            let data = [];
            items.forEach(function(item) {
                let project = item.data();
                project['id'] = item.id;
                data.push(project);
            });
            data.sort(function(a,b) {
                if (a.rank > b.rank) return 1;
                if(b.rank > a.rank) return -1;
                else return 0;
            });
            resolve(data);
        })
        .catch(function (e) {
            reject(e);
        });
    });
}

export function getProject (collection, id) {
    return new Promise(function(resolve, reject) {
        collection
            .where(firebase.firestore.FieldPath.documentId(), "==", id)
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