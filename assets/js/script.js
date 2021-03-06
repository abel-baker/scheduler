$('#currentDay').text(luxon.DateTime.now().toLocaleString(luxon.DateTime.DATE_HUGE));

const workdayStart = 8;
const workdayEnd = 18;

const now = luxon.DateTime.now();

for (let hr = workdayStart; hr < workdayEnd + 1; hr++) {
    let rowEl = $(`<div class="row" id="row-${hr}th"><div class="input-group" id="group-${hr}th"></div></div>`);
    $('.container').append(rowEl);

    let labelClasses = "input-group-text";
    let textareaClasses = "form-control";
    let buttonClasses = "btn btn-secondary btn-lg";

    let luxHr = luxon.DateTime.fromObject({hour: hr});
    let luxString = luxHr.toLocaleString(luxon.DateTime.TIME_24_SIMPLE);
    let luxHelpText = luxHr.toLocaleString(luxon.DateTime.DATETIME_SHORT);

    if (now.hour === hr) {
      textareaClasses += " present";
    } else if (now.hour < hr) {
      textareaClasses += " future";
    } else {
      textareaClasses += " past";
    }

    let saveIcon = "bi-bookmark";
    let saveButtonValue = `<i class="${saveIcon}"></i><span class="sr-only">Save icon</span>`;

    $(`#group-${hr}th`).append(`
        <label for="textarea-${hr}th" class="${labelClasses}" title="${luxHelpText}">${luxString}</label>
        <textarea id="textarea-${hr}th" class="${textareaClasses}" aria-label="Hour ${hr} content"></textarea>
        <button type="button" class="${buttonClasses}" id="button-save-${hr}th">${saveButtonValue}</button>
    `);

    // Display existing data
    if (localStorage.getItem(`${hr}`)) {
      console.log(`Checking for data: ${hr}`);
      $(`#textarea-${hr}th`).val(localStorage.getItem(`${hr}`));

      $(`#button-save-${hr}th > i`).removeClass();
      $(`#button-save-${hr}th > i`).addClass('bi-bookmark-fill');
      // setClearButton(hr);
    }
    
    $(`#button-save-${hr}th`).click(handleSaveButton(hr));
    $(`#textarea-${hr}th`).on('input', function() {
      $(`#button-save-${hr}th > i`).removeClass();
      $(`#button-save-${hr}th > i`).addClass('bi-bookmark-plus');
    })
}

// Changes the default button to a set of save and clear buttons
// function setClearButton(hr) {
//   let savedIcon = "bi-bookmark-fill";
//   let clearIcon = "bi-x";

//   let savedButtonValue = `<i class="${savedIcon}"></i><span class="sr-only">Saved icon</span>`;
//   let clearButtonValue = `<i class="${clearIcon}"></i><span class="sr-only">Clear icon</span>`;

//   // Remove existing button
//   $(`#button-save-${hr}th`).remove();

//   let topButtonStyle = "border-top-left-radius: 0 !important";
//   let bottomButtonStyle = "border-bottom-left-radius: 0 !important";

//   $(`#group-${hr}th`).append(`
//     <div class="btn-group-vertical flex-grow-0" id="btn-group-${hr}th">
//       <button type="button" class="btn btn-secondary" id="button-saved-${hr}th" style="${topButtonStyle}">${savedButtonValue}</button>
//       <button type="button" class="btn btn-secondary" id="button-clear-${hr}th" style="${bottomButtonStyle}">${clearButtonValue}</button>
//     </div>
//   `);
  
//   $(`#button-saved-${hr}th`).click(handleSaveButton(hr));
// }

// function setSaveButton(hr) {
//   let saveIcon = "bi-bookmark";
//   let saveButtonValue = `<i class="${saveIcon}"></i><span class="sr-only">Save icon</span>`;

//   // Remove existing button group
//   $(`#button-saved-${hr}th`).remove();
//   $(`#button-clear-${hr}th`).remove();
//   $(`#btn-group-${hr}th`).remove();

//   $(`#group-${hr}th`).append(`
//     <button type="button" class="btn btn-secondary" id="button-save-${hr}th">${saveButtonValue}</button>
//   `);

//   $(`#button-save-${hr}th`).click(handleSaveButton(hr));
// }

function handleSaveButton(hr) {
  return function(event) {
    console.log(`${hr}th button clicked`);

    // If there is no content in the associated textarea (unless there is saved data to wipe)
    if (!$.trim( $(`#textarea-${hr}th`).val() )) {
      if (!localStorage.getItem(`${hr}`)) {
        console.log(`${hr}th row is empty; not storing value`);

        // Give a little x for not-saved feedback
        $(`#button-save-${hr}th > i`).removeClass();
        $(`#button-save-${hr}th > i`).addClass('bi-bookmark-x');

        setTimeout(function() {
          // Clear the x after a tiny bit
          $(`#button-save-${hr}th > i`).removeClass();
          $(`#button-save-${hr}th > i`).addClass('bi-bookmark');
        }, 1500)

        return;

      }
    }

    console.log(`${hr} Saving: ${$(`#textarea-${hr}th`).val()}`);
    localStorage.setItem(`${hr}`, $(`#textarea-${hr}th`).val() );

    $(`#button-save-${hr}th > i`).removeClass();
    $(`#button-save-${hr}th > i`).addClass('bi-bookmark-check-fill');

    // setClearButton(hr);
  }
}