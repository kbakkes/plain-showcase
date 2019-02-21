define([], function () {
   var  projectInstance = localforage.createInstance({
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


   return {
       addProjects: addProjects
   }
});