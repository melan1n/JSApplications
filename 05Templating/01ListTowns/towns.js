function attachEvents() {
    $('#btnLoadTowns').click(renderTowns);

    function renderTowns() {
        let towns = $('#towns').val().split(', ');
        //get template
        let template = $('#towns-template').html();

        //compile template
        let compiledtemplate = Handlebars.compile(template);

        //create context
        let context = {
            towns: towns
        }

        //add to html
        let container = document.getElementById('root');
        container.innerHTML = compiledtemplate(context);
    }
}