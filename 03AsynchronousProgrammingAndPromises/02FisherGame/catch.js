function attachEvents() {
    let loadBtn = $(".load");
    let addBtn = $(".add");
    let updateBtns = document.querySelectorAll(".update");
    console.log(updateBtns);
    let deleteBtn = $(".delete");

    let url = `https://baas.kinvey.com/appdata/kid_HJenMYMFE/biggestCatches`;
    let encodedCredentials = btoa('guest:guest');

    loadBtn.click(loadAllCatches);

    async function loadAllCatches() {
        let response = await $.ajax({
            url: url,
            method: "GET",
            success: displayAllCatches,
            headers:
            {
                "Authorization": `Basic ${encodedCredentials}`
            }
        })
    }

    updateBtns.forEach(function(btn) {
        btn.addEventListener("click", updateCatch)
    })

    function updateCatch() {
        let target = $('event.target');

        let angler = $("target > .angler").val();

        console.log(target);
        let weight = $("#addForm > .weight").val();
        let species = $("#addForm > .species").val();
        let location = $("#addForm > .location").val();
        let bait = $("#addForm > .bait").val();
        let captureTime = $('#addForm > .captureTime').val();
    }

    function displayAllCatches(response) {
        for (let item of response) {
            $('#catches').append(`
            <div class="catch" data-id="<id-goes-here>">
            <label>Angler</label>
            <input type="text" class="angler" value=${item.angler}>
            <label>Weight</label>
            <input type="number" class="weight" value=${Number(item.weight)}>
                <label>Species</label>
                <input type="text" class="species" value=${item.species}>
                    <label>Location</label>
                    <input type="text" class="location" value=${item.location}>
                        <label>Bait</label>
                        <input type="text" class="bait" value=${item.bait}>
            <label>Capture Time</label>
                        <input type="number" class="captureTime" value=${Number(item.captureTime)}>
                        <input type="hidden" class="catchid" value=${item._id} hidden="true">
                        <button class="update">Update</button>
                        <button class="delete">Delete</button>
        </div>
        `)
        updateBtns = document.querySelectorAll(".update");

        updateBtns.forEach(function(btn) {
            btn.addEventListener("click", updateCatch)
        })
        };
    }

    addBtn.click(addCatch);

    function addCatch() {
        let angler = $("#addForm > .angler").val();
        let weight = $("#addForm > .weight").val();
        let species = $("#addForm > .species").val();
        let location = $("#addForm > .location").val();
        let bait = $("#addForm > .bait").val();
        let captureTime = $('#addForm > .captureTime').val();

        let catchObj = {
            "angler": `${angler} `,
            "weight": `${weight} `,
            "species": `${species} `,
            "location": `${location} `,
            "bait": `${bait} `,
            "captureTime": `${captureTime} `
        };

        $.ajax({
            url: url,
            method: "POST",
            data: JSON.stringify(catchObj),
            success: displayCatch,
            headers:
            {
                "Content-type": "application/json",
                "Authorization": `Basic ${encodedCredentials} `
            }
        })
    }

    function displayCatch(response) {
        let catchesDiv = $('#catches');

        catchesDiv.append(`< div class="catch" data - id="<id-goes-here>" >
    <label>Angler</label>
    <input type="text" class="angler" value=${response.angler}>
        <label>Weight</label>
        <input type="number" class="weight" value=${Number(response.weight)}>
            <label>Species</label>
            <input type="text" class="species" value=${response.species}>
                <label>Location</label>
                <input type="text" class="location" value=${response.location}>
                    <label>Bait</label>
                    <input type="text" class="bait" value=${response.bait}>
                        <label>Capture Time</label>
                        <input type="number" class="captureTime" value=${Number(response.captureTime)}>
                            <button class="update">Update</button>
                            <button class="delete">Delete</button>
    </div>`)

    }

}