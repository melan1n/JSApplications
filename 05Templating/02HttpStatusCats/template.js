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

// function showInfo(id){
//     //$(`#${id}`).toggle();
//     let display = $(`#${id}`).find("div").prevObject['0'].attributes['0'].value;
   
//     if ( display === "display: none" ) {
//         $(`#${id}`).css("display", "block");
//         $(`#${id}`).prev().html("Hide status code")
//       } else if (display === "display: block") {
//         $(`#${id}`).css("display", "none");
//         $(`#${id}`).prev().html("Show status code")

//       }
// }

function showInfo(event){
    let display = $(`#${event}`)['0'].style.cssText;
  
    if ( display === "display: none;" ) {
        $(`#${event}`).css("display", "block");
        $(`#${event}`).prev().html("Hide status code")
      } else if (display === "display: block;") {
        $(`#${event}`).css("display", "none");
        $(`#${event}`).prev().html("Show status code")

      }
}