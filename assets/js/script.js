$('#currentDay').text(moment().format('dddd, MMMM Do'));

$('#2th-hour-textarea').val(localStorage.getItem('2th'));

$('#button-save-3th > i').removeClass();
$('#button-save-3th > i').addClass('bi-square');

$('#button-save-2th').on('click', function() {
    console.log('2th button clicked');
    localStorage.setItem('2th', $('#2th-hour-textarea').val());
})
$('#button-save-3th').on('click', function() {
    console.log('3th button clicked');
    $('#3th-hour-textarea').val(localStorage.getItem('2th'));
})

const workdayStart = 8;
const workdayEnd = 22;

for (let hr = workdayStart; hr < workdayEnd + 1; hr++) {
    let rowEl = $(`<div class="row" id="row-${hr}th"><div class="input-group" id="group-${hr}th"></div></div>`);
    $('.container').append(rowEl);

    $(`#group-${hr}th`).append(`
        <label for="textarea-${hr}th" class="input-group-text col-2">${hr}:00</label>
        <textarea id="textarea-${hr}th" class="text-center form-control bg-light" aria-label="Hour ${hr} content"></textarea>
        <button type="button" class="btn btn-secondary" id="button-save-${hr}th"><i class="bi-bookmark"></i><span class="sr-only">Save icon</span></button>
    `);

    $(`#button-save-${hr}th`).on('click', function() {
        console.log(`${hr}th button clicked`);
    });
}