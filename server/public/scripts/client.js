console.log('js');

$(document).ready(function() {
    console.log('JQ');
    // Establish Click Listeners
    setupClickListeners();
    // load existing koalas on page load
    getKoalas();
    $("#viewKoalas").on("click", ".transfer-button", updateReadyToTransfer);
    $("#viewKoalas").on("click", ".delete-button", deleteKoala);
}); // end doc ready

function setupClickListeners() {
    $('#addButton').on('click', function() {
        console.log('in addButton on click');
        // get user input and put in an object
        // using a test object
        if ($('#nameIn').val() === "" ||
            $('#ageIn').val() === "" ||
            $('#genderIn').val() === "" ||
            $('#readyForTransferIn').val() ==="" ||
            $('#notesIn').val() === ""
            ){
                alert("you have empty inputs!");
                return false;
            };
        let koalaToSend = {
            name: $('#nameIn').val(),
            age: $('#ageIn').val(),
            gender: $('#genderIn').val(),
            readyForTransfer: $('#readyForTransferIn').val(),
            notes: $('#notesIn').val()
        };
        // call saveKoala with the new object
        saveKoala(koalaToSend);
        $('#nameIn').val('');
        $('#ageIn').val('');
        $('#genderIn').val('');
        $('#readyForTransferIn').val('');
        $('#notesIn').val('');
    });
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
            //default case: no transfer button
            let transferButton = "";
            //if ready_for_transfer is false, add html for button
            if (i.ready_to_transfer === false) {
                transferButton = `<button class="transfer-button" data-id=${i.id}>Mark as ready for Transfer</button>`;

            } else {
                transferButton = `<button class="transfer-button" data-id=${i.id}>Mark as *NOT* ready for Transfer</button>`;
            }
            $('#viewKoalas').append(`
                <tr>
                    <td>${i.name}</td>
                    <td>${i.age}</td>
                    <td>${i.gender}</td>
                    <td>${i.ready_to_transfer}</td>
                    <td>${i.notes}</td>
                    <td>${transferButton}</td>
                    <td><button class="delete-button" data-id=${i.id}>Delete</button></td>
                </tr>
            `);
        }
    });

} // end getKoalas

function saveKoala(koalaToSend) {
    console.log('in saveKoala', koalaToSend);
    // ajax call to server to get koalas
    $.ajax({
        type: 'POST',
        url: '/koalas',
        data: koalaToSend
    }).then(function(response) {
        console.log('getting back Koalas');
        getKoalas();
    })
}


function deleteKoala() {
    let koalaId = $(this).data('id');
    if (confirm("Are you sure you want to delete this koala?")){
        if (confirm("Take this seriously. A koala's life is in your hands. Are you sure you want to delete?")) {
            $.ajax({
                    method: 'DELETE',
                    url: `/koalas/${koalaId}`
                })
                .then((response) => {
                    console.log('Koala deleted');
                    getKoalas();
                })
                .catch((error) => {
                    alert('Could not delete koala', error);
                });
        }
    }
}

function updateReadyToTransfer() {
    let koalaId = $(this).data('id');
    $.ajax({
            method: 'PUT',
            url: `/koalas/${koalaId}`
        })
        .then((response) => {
            console.log('ready to transfer state updated');
            getKoalas();
        })
        .catch((error) => {
            console.log('There was an issue updating the ready to transfer state!', error);
            alert('There was an issue updating the ready to transfer state');
        });
} //end updateReadyToTransfer