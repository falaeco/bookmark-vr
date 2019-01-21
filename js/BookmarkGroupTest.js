$('#add-bookmark-option').click(() => {
    console.log('add-bookmark clicked')
});

var colorPicker = document.getElementById('DefaultColourInput');
$(colorPicker).change(() => {console.log('updated to: ' + colorPicker.value)});

function printGroup(element) {

    //console.log($(element).siblings('.element-name').val());
}
function editGroup(element){
    $('.element-info-mode').hide();
    $('.element-edit-mode').show();
}
function updateGroup(element) {
    $('.element-edit-mode').hide();
    $('.element-info-mode').show();
}

