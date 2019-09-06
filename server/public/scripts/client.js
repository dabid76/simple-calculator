console.log('js');

$( document ).ready( onReady );

function onReady(){
    $( '#addBtn' ).on( 'click', bodyInput );
    $( '#minusBtn' ).on( 'click', bodyInput );
    $( '#timesBtn' ).on( 'click', bodyInput );
    $( '#divideBtn' ).on( 'click', bodyInput );
    $( '#equalBtn' ).on( 'click', bodyInput );
    $( '#refreshBtn' ).on( 'click', bodyInput );
    getNumbers();

}

function bodyInput(){
    let objectToSend = {
        first: $( '#firstN' ).val(),
        second: $( '#secondN' ).val()
    }
    $.ajax({
        type: 'POST',
        url: '/cal',
        data: objectToSend
    }).then( function( response ){
        console.log( 'back from server with:', response );
        getNumbers();
    }).catch( function( err ){
        alert( err );
    }) // end POST
    $( '#firstN' ).val(''),
    $( '#secondN' ).val('')
} // end bodyInput

function getNumbers(){
    // use AJAX to make a GET request
    $.ajax({
        type: 'GET', 
        url: '/cal'
    }).then( function( response ){
        // console log out response
        console.log( 'back from server with:', response );
        // display things on DOM
        let el = $('#numberOut');
        el.empty();
        for( let i = 0; i< response.length; i++){
            el.append( `
            <li>${response[i].first}</li>
            <li>${response[i].second}</li>`
            );
        } // end loop
    }).catch( function( err ){
        // catch errors here
        alert( err ); 
    }) // end catch
} // end getThings