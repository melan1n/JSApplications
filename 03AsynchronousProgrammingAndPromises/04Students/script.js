function solution() {
    let url = `https://baas.kinvey.com/appdata/kid_BJXTsSi-e/students`;
    let encodedCredentials = btoa('guest:guest');

    loadStudents();
    addNewForm();

    let addBtn = $('.add');
    addBtn.click(addStudent);

    function addNewForm() {
        $('body').append(
            `<div id="aside">
             <fieldset id="addForm">
                <legend>Add Student</legend>
                <label>ID</label>
                <input type="number" class="id"/>
                <label>First Name</label>
                <input type="text" class="firstname"/>
                <label>Last Name</label>
                <input type="text" class="lastname"/>
                <label>Faculty Number</label>
                <input type="text" class="facultynumber"/>
                <label>Grade</label>
                <input type="number" step="0.01" class="grade"/>
                <button class="add">Add</button>
            </fieldset>
        </div>`
        )
    }

    async function loadStudents() {
        let response = await $.ajax({
            url: url,
            method: "GET",
            success: displayAllStudents,
            headers:
            {
                "Authorization": `Basic ${encodedCredentials}`
            }
        })
    };

    function displayAllStudents(response) {
        for (let item of response) {
            $('#results tr:last').after(`
            <tr>
               <td>${item.ID}</td>
               <td>${item.FirstName}</td>
               <td>${item.LastName}</td>
               <td>${item.FacultyNumber}</td>
               <td>${item.Grade}</td>
            </tr>
        `)
        }
    }

    function addStudent() {
        let id = $("#addForm > .id").val();
        let firstName = $("#addForm > .firstname").val();
        let lastName = $("#addForm > .lastname").val();
        let facultyNumber = $("#addForm > .facultynumber").val();
        let grade = $("#addForm > .grade").val();
        
        let studentObj = {
            "ID": `${Number(id)}`,
            "FirstName": `${firstName}`,
            "LastName": `${lastName}`,
            "FacultyNumber": `${facultyNumber}`,
            "Grade": `${Number(grade)}`,
        };

        $.ajax({
            url: url,
            method: "POST",
            data: JSON.stringify(studentObj),
            success: displayAllStudents,
            headers:
            {
                "Content-type": "application/json",
                "Authorization": `Basic ${encodedCredentials} `
            }
        })
    }

}