$(() => {
    renderCatTemplate();

    async function renderCatTemplate() {

        //get template
        let template = await $.ajax({
            url: './catsTemplate.html'
        });

        //compile template
        let compiledtemplate = Handlebars.compile(template);

        //create context
        let context = {
            cats: window.cats
        }

        //add to html
        $('#allCats').html(compiledtemplate(context));
    }

})

function showInfo(id){
    $(`#${id}`).toggle();
}