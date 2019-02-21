define(['./template.js', './clientStorage.js'], function(template, clientStorage){
   var url = 'https://cmgt.hr.nl:8000/api/projects/';
   var detailUrl = url + 'project.slug';


   function loadProjects(){
       fetch(url)
           .then(function (response) {
               return response.json();
           }).then(function (data) {
               clientStorage.addProjects(data.projects)
                   .then(function () {
                       template.appendProjects(data.projects);
               });
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
       loadProjectPage: loadProjectPage
   }


});