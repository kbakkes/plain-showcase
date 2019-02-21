var projectService = require('./projectService.js');

window.pageEvents = {
    loadProjectPage: function (projectId) {
        projectService.loadProjectPage(projectId);
    }
};
projectService.loadProjects();