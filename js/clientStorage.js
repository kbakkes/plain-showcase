define([], function () {
   var projectInstance = localforage.createInstance({
       name: 'projects'
   });

   function addProjects(newProjects){
       console.log(newProjects);
       return new Promise(function (resolve, reject) {
           newProjects.map(function (project) {
               projectInstance.setItem(project.slug, project)
                   .then(function () {
                       resolve();
                   })
           });

       })
   }

   function getProjects() {
       return new Promise(function (resolve,reject) {
           projectInstance.keys().then(function (keys) {
               projectInstance.getItems(keys).then(function (results) {
                   var returnArray = Object.keys(results).map(function(k) {return results[k] });
                   resolve(returnArray);
               })

           })
       })
   }
   

   return {
       addProjects: addProjects,
       getProjects: getProjects
   }
});