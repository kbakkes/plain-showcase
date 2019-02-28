define([], function () {

    function generateProjectCards(project){
        var template = document.querySelector('#project-card').innerHTML;
        template = template.replace('{{title}}', project.title);
        template = template.replace('{{details-id}}', 'http://cmgt.hr.nl:8000/api/projects/' + project.slug);
        template = template.replace('{{image}}', 'https://cmgt.hr.nl:8000/' + project.headerImage);
        template = template.replace('{{year}}', project.year);
        return template;

    }



    function appendProjects(projects){
        document.getElementById('first-load').innerHTML = '';
        var cardHTML = "";
        projects.map(function (project) {
            return cardHTML += generateProjectCards(project);
        });
        document.querySelector('.mdl-grid').insertAdjacentHTML('beforeend', cardHTML);

        //fix voor IE
        document.querySelector('.mdl-layout__content').style.display = 'none';
        document.querySelector('.mdl-layout__content').style.display = 'inline-block';
    }

    function appendTags(tags){
        console.log(tags);
        var tagsHTML = "";


        tags.map(function (tag) {
            return tagsHTML += generateTagChips(tag);

        });

        document.querySelector('.tags').insertAdjacentHTML('beforeend',tagsHTML)
    }

    function generateTagChips(tag){
        var template = document.querySelector('#tag-chip').innerHTML;
        template = template.replace('{{tag}}', tag);

        return template;
    }


    return {
        appendProjects: appendProjects,
        appendTags: appendTags
    }
});