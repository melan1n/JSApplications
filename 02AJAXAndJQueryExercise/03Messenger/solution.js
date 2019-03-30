function attachEvents(){
    $('#refresh').click(function (){
        $.ajax({
            url: 'https://messenger-d81df.firebaseio.com/.json',
            method: "GET",
            success: visualizeMessages
        })

        function visualizeMessages(data){
            $('#messages').empty();
            Object.keys(data).forEach(function (message) {
                $('#messages').text($('#messages').text() + `${data[message].author}: ${data[message].content}\n`);
                console.log(message);
                console.log(data[message])
            })   
        }
    })

    $('#submit').click(function () {
        let obj = {
            author: $('#author').val(),
            content: $('#content').val(),
            timestamp: Date.now()
        };
        
        $.ajax({
            method: "POST",
            url: "https://messenger-d81df.firebaseio.com/.json",
            data: JSON.stringify(obj)
          })
            .done(function() {
                $('#author').val("");
                $('#content').val("");
               
            });
    })
    
}