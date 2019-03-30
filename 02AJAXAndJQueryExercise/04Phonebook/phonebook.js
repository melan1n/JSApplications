function attachEvents() {
    $('#btnLoad').click(retrievePhonebook);

    function retrievePhonebook(){
        $.ajax({
            url: 'https://phonebook-nakov.firebaseio.com/phonebook.json',
            method: "GET",
            crossDomain: true,
            dataType: 'jsonp',
            success: loadPhones
        })

        function loadPhones(data) {
            $('#phonebook').empty();
            Object.keys(data).forEach((personKey) => {
                let li = $('<li>');
                li.text(`${data[personKey].person}: ${data[personKey].phone}`)
                let deleteBtn = $('<button>');
                deleteBtn.attr("id", `${personKey}`);
                deleteBtn.text('Delete');
                li.append(deleteBtn);
                $('#phonebook').append(li);
    
                deleteBtn.click(function() {
                    $.ajax({
                        url: `https://phonebook-nakov.firebaseio.com/phonebook/${personKey}.json`,
                        method: "Delete",
                        success: retrievePhonebook
                    })
                })
            })
            
        }
    }

    

    $('#btnCreate').click(function(){
        let personName = $('#person').val();
        let personPhone = $('#phone').val();

        let obj = {
            person: personName,
            phone: personPhone
        }
        $.ajax ({
            url: 'https://phonebook-nakov.firebaseio.com/phonebook.json',
            method: "POST",
            data: JSON.stringify(obj),
            success: clearFields
        })

        function clearFields(){
            $('#person').val("");
            $('#phone').val("");
            retrievePhonebook();
        }
    })
 }
 