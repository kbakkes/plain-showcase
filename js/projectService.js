define(['./template.js', './clientStorage.js'], function(template, clientStorage){
   var url = 'https://cmgt.hr.nl:8000/api/projects/';
   var detailUrl = url + 'project.slug';


   function loadProjects(){
       fetchPromise()
           .then(function (status) {
               document.getElementById('connection-status').innerHTML = status;
               loadFromClientStorage();
           })
   }

   function fetchPromise(){
       return new Promise(function (resolve,reject) {

           fetch(url)
               .then(function (response) {
                   return response.json();
               }).then(function (data) {
               clientStorage.addProjects(data.projects)
                   .then(function () {
                       template.appendProjects(data.projects);
                       resolve('Goede Connection, je krijgt nu via het netwerk projecten te zien. ')
                   });
           }).catch(function (error) {
               console.log(error);

               resolve('Geen connection, resultaten uit de cache');
           })
       })
    }


    function loadFromClientStorage(){
       clientStorage.getProjects().then(function (projects) {
           template.appendProjects(projects);
       })
    }

   function loadProjectPage(projectSlug){
       fetch(projectSlug)
           .then(function (response) {
               console.log(response);
           }).then(function (data) {
               document.body.insertAdjacentHTML('beforeend', data);
       }).catch(function (reason) {
           console.log('Shit het lukt niet door: ', reason);
       })
   }

   return {
       loadProjects: loadProjects,
       loadProjectPage: loadProjectPage,
       loadFromClientStorage: loadFromClientStorage
   }


});