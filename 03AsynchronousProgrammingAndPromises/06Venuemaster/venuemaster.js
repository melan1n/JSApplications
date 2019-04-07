function attachEvents() {
    let appID = 'kid_BJ_Ke8hZg';
    let user = `guest`;
    let password = `pass`;

    let encodedCredentials = btoa(`${user}:${password}`);
    
    $('#getVenues').click(getVenues);

    async function getVenues() {
        let date = $('#venueDate').val();

        let url = `https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/calendar?query=${date}`;

        let response = await $.ajax({
            url: url,
            method: "POST",
            data: {
                date: `${date}`
            },
            headers:
            {
                "Authorization": `Basic ${encodedCredentials}`
            }
        })
        for (let venueId of response) {
            //appendVenueDiv(venueId);
            getEvent(venueId);
        }
    }

    // function appendVenueDiv(venueId) {
    //     $('#venue-info').append(
    //         `
    //         <div class="venue" id="${venueId}">
    //         <span class="venue-name"><input class="info" type="button" value="More info"></span>
    //         <div class="venue-details" style="display: none;">
    //           <table>
    //             <tr><th>Ticket Price</th><th>Quantity</th><th></th></tr>
    //             <tr>
    //               <td class="venue-price"></td>
    //               <td><select class="quantity">
    //                 <option value="1">1</option>
    //                 <option value="2">2</option>
    //                 <option value="3">3</option>
    //                 <option value="4">4</option>
    //                 <option value="5">5</option>
    //               </select></td>
    //               <td><input class="purchase" type="button" value="Purchase"></td>
    //             </tr>
    //           </table>
    //           <span class="head">Venue description:</span>
    //           <p class="description"></p>
    //           <p class="description"></p>
    //         </div>
    //       </div>
    //         `
    //     )
    
    //     $(`#${venueId} > .info`).click(showDetails);
    // };

    async function getEvent(venueId) {
        let url = `https://baas.kinvey.com/appdata/kid_BJ_Ke8hZg/venues/${venueId}`;
        let response = await $.ajax({
            url: url,
            method: "GET",
            success: displayVenue,
            headers:
            {
                "Authorization": `Basic ${encodedCredentials}`
            }
        })
    }

    function displayVenue(venueObj) {
        $('#venue-info').append(
            `<div class="venue" id="${venueObj._id}">
            <span class="venue-name"><input class="info" type="button" value="More info">${venueObj.name}</span>
            <div class="venue-details" style="display: none;">
              <table>
                <tr><th>Ticket Price</th><th>Quantity</th><th></th></tr>
                <tr>
                  <td class="venue-price">${venueObj.price} lv</td>
                  <td><select class="quantity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select></td>
                  <td><input class="purchase" type="button" value="Purchase"></td>
                </tr>
              </table>
              <span class="head">Venue description:</span>
              <p class="description">${venueObj.description}</p>
              <p class="description">Starting time: ${venueObj.startingHour}</p>
            </div>
          </div>
            ` );
        console.log($(`#${venueObj._id}`));
         //$(`#${venueObj._id} > .info`).click(showDetails);
//        console.log($(`#${venueId} > .info`))
    }
    function showDetails() {
        console.log('show details clicked')
        //$(target).css("style", "display: block");
    }
}
