function loadRepos() {
    // //the function below is fine
    // let username = $('#username').val();
    // let req = new XMLHttpRequest;
    // let url = `http://api.github.com/users/${username}/repos`;
    // req.open("GET", url, true);
    // req.send();


    // let reposList = $('#repos');

    // req.onreadystatechange = function () {
    //     if (this.onreadystatechange == 4 && this.status == 200) {
    //         responseObj = JSON.parse(req.responseText);
    //         Object.keys(responseObj).map(function (objectKey, index) {
    //             let name = responseObj[objectKey].full_name;
    //             let link = responseObj[objectKey].html_url;
    //             let li = $('<li>');
    //             let a = $('<a>', {
    //                 href: link,
    //                 text: name
    //             });
    //             li.append(a);

    //             reposList.append(li);
    //         })
    //     } else {
    //         let li = $('<li>', {
    //             text: "Error"
    //         });

    //         li.append(a);

    //             reposList.append(li);
    //     }
    // }

    let reposList = $('#repos');
    reposList.empty();
    let username = $('#username').val();
    let url = `http://api.github.com/users/${username}/repos`;
    $.ajax({
        url,
        success: displayRepos,
        error: displayError
    });

    function displayRepos(repos) {
        Object.keys(repos).map(function (objectKey, index) {
            let name = repos[objectKey].full_name;
            let link = repos[objectKey].html_url;
            let li = $('<li>');
            let a = $('<a>', {
                href: link,
                text: name
            });
            li.append(a);

            reposList.append(li);
        });
    }
    

    function displayError(err) {
        let li = $('<li>', {
            text: "Error"
        });

        reposList.append(li);
    }

}