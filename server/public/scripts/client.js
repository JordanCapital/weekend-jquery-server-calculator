$(document).ready(handleReady);
 function handleReady() {
    console.log("jquery is loaded!");

     // event handler/listener
    $('#submitForm').on('click', calculateInputs);
    console.log('calculateInputs', calculateInputs)
}

// get values from inputs
function calculateInputs() { 
    let $number1 = $('#number1');
    let $number2 = $('#number2');

//check that inputs values are valid numbers 
if(isNaN($number1.val()) || isNaN($number2.val())) {
    alert('please enter a valid number');
    return;
}

// create inputs objects
    let input = { 
    number1:  parseFloat($number1.val()),
    number2:  parseFloat($number2.val()),
    operation: $('#operation').val(),
    result: 0
    
}
 console.log('calculate', input);

 // 'POST' ajax to server
    $.ajax({
        method: 'POST',
        url: '/calculateInputs',
        data: input,
        success: getCalculations
    });

}

// 'GET' inputs
function getCalculations() {
    $.ajax({
        url: '/calculations',
        method: 'GET',
    })
    .then((response) => {
        console.log('inputs data: ', response);
        // update the Dom
        render(response);

    });
}

function render(response) { 
    //select container and empty it
    let $container = $('#resultContainer');
    $container.empty();

    // loop through container in the response object
    for (let key in response) {
        let $row = $('<tr>');
        $row.append($('<td>').text(calculation.number1));
        $row.append($('<td>').text(calculation.operation));
        $row.append($('<td>').text(calculation.number2));
        $row.append($('<td>').text(calculation.result));
        $container.append($row); 
    }

}



