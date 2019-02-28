var projectService = require('./projectService.js');
var swRegister = require('../swRegister.js');

window.pageEvents = {
    loadProjectPage: function (projectId) {
        projectService.loadProjectPage(projectId);
    },
    loadFromClientStorage: function () {
        projectService.loadFromClientStorage();
    },
    fetchTags: function () {
        projectService.fetchTags();
    }
};
projectService.loadProjects();