console.log('js');

$(document).ready(function() {
    console.log('JQ');
    // Establish Click Listeners
    setupClickListeners()
        // load existing koalas on page load
    getKoalas();

}); // end doc ready

function setupClickListeners() {
    $('#addButton').on('click', function() {
        console.log('in addButton on click');
        // get user input and put in an object
        // NOT WORKING YET :(
        // using a test object
        let koalaToSend = {
            name: $('#nameIn').val(),
            age: $('#ageIn').val(),
            gender: $('#genderIn').val(),
            readyForTransfer: $('#readyForTransferIn').val(),
            notes: $('notesIn').val(),
        };
        // call saveKoala with the new obejct
        saveKoala(koalaToSend);
    });
    $('#nameIn').val(''),
        $('#ageIn').val(''),
        $('#genderIn').val(''),
        $('#readyForTransferIn').val(''),
        $('notesIn').val('')
}

function getKoalas() {
    console.log('in getKoalas');
    // ajax call to server to get koalas
    $('#viewKoalas').empty();
    $.ajax({
        type: 'GET',
        url: '/koalas',
    }).then(response => {
        console.log('Got data from the server', response);

        for (let i of response) {
            $('#viewKoalas').append(`
      <tr>
      <td>${i.name}</td>
      <td>${i.age}</td>
      <td>${i.gender}</td>
      <td>${i.ready_for_transfer}</td>
      <td>${i.notes}</td>
      <td><button class="transfer-button" data-id=${i.id}>Ready for Transfer</button> </td>
      <td><button class="delete-button" data-id=${i.id}>Delete</button></td>
      </tr>
      `)
        }
    });

} // end getKoalas

function saveKoala(newKoala) {
    console.log('in saveKoala', newKoala);
    // ajax call to server to get koalas

}