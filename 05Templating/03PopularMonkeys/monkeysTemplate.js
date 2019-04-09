$(() => {
    renderMonkeys();
    
    async function renderMonkeys() {

        //get template
        let template = await $.ajax({
            url: './monkeysTemplate.html'
        });

        //compile template
        let compiledtemplate = Handlebars.compile(template);

        //create context
        let context = {
            monkeys: monkeys
        }
      
        //add to html
        $('.monkeys').html(compiledtemplate(context));
    }
})

function showInfo(event){
    console.log(event);
    let display = event.target.nextElementSibling.style.cssText;
    console.log(event.target.nextElementSibling);

    if ( display === "display: none;" ) {
        event.target.nextElementSibling.style.display = "block";
              } else if (display === "display: block;") {
        event.target.nextElementSibling.style.display = "none";
       }
}