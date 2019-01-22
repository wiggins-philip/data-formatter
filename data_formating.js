"use strict";

/*********************************************************
  Format phone number from int to ###-###-#### format
  @parm number
**********************************************************/
function format_phone_number(number) {
    var num;
    if (number !== undefined) {
        num = number.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, '$1-$2-$3');
    }

    //if for any reason undefined string is return from regex return a blank value
    if (typeof num !== 'undefined') {
        return num;
    } else {
        return "";
    }
}


/******************************************************
  function will take database YYYY-MM-DD date and convert to MM-DD-YYYY
  @param date
******************************************************/
function format_date_to_standard(date) {
    var new_datestring = new Date(date);
    var date_yyyy = new_datestring.getFullYear().toString();
    var date_mm = (new_datestring.getMonth() + 1).toString();
    var date_dd = new_datestring.getDate().toString();
    // CONVERT mm AND dd INTO chars
    var date_mmChars = date_mm.split('');
    var date_ddChars = date_dd.split('');
    // CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
    var datestring = (date_mmChars[1] ? date_mm : "0" + date_mmChars[0]) + '-' + (date_ddChars[1] ? date_dd : "0" + date_ddChars[0]) + '-' + date_yyyy;

    return datestring;
}

/******************************************************
  function will convert date from format MM-DD-YYYY to database format YYYY-MM-DD
  @param date
******************************************************/
function format_date_to_database(date) {
    var new_datestring = new Date(date);
    var date_yyyy = new_datestring.getFullYear().toString();
    var date_mm = (new_datestring.getMonth() + 1).toString();
    var date_dd = new_datestring.getDate().toString();
    // CONVERT mm AND dd INTO chars
    var date_mmChars = date_mm.split('');
    var date_ddChars = date_dd.split('');
    // CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
    var datestring = date_yyyy + '-' + (date_mmChars[1] ? date_mm : "0" + date_mmChars[0]) + '-' + (date_ddChars[1] ? date_dd : "0" + date_ddChars[0]);

    return datestring;

}

/******************************************************
  enforce YYYY-MM-DD
  @parm element_id
******************************************************/
function input_date_masking(element_id) {
    var date = 0;
    $(element_id) .keydown(function (e) {
        if ($(element_id).val().length == 0) {
            date = 0;
        } else if ($(element_id).val().length <= 9) {
            var key = e.charCode || e.keyCode || 0;
            date = $(this);

            // Auto-format- do not expose the mask as the user begins to type
            if (key !== 8 && key !== 9 && key !== 127) {
                if (date.val().length === 4) {
                    date.val(date.val() + '-');
                }
                if (date.val().length === 7) {
                    date.val(date.val() + '-');
                }
            }

            // Allow numeric, dash, tab, backspace, delete) keys only
            return (key == 8 || key == 9 || key == 45 || key == 127 ||
            (key >= 48 && key <= 57));
        } else {
            var key = e.charCode || e.keyCode || 0;
            return (key == 8 || key == 9 || key == 45 || key == 127);
        }
    })

    .bind('focus click', function () {
        date = $(this);
    });
}

//Used to do number masking on input boxes for (###) ###-#### format
function input_phone_number_masking(element_id) {
    var phone = 0;
    $(element_id)
        .keydown(function (e) {
            if ($(element_id).val().length == 0) {
                phone = 0;
            } else if ($(element_id).val().length <= 11) {
                var key = e.charCode || e.keyCode || 0;
                phone = $(this);

                // Auto-format- do not expose the mask as the user begins to type
                if (key !== 8 && key !== 9) {
                    if (phone.val().length === 3) {
                        phone.val(phone.val() + '-');
                    }
                    if (phone.val().length === 7) {
                        phone.val(phone.val() + '-');
                    }
                }

                // Allow numeric (and tab, backspace, delete) keys only
                return (key == 8 ||
                key == 9 ||
                key == 46 ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
            } else {
                var key = e.charCode || e.keyCode || 0;
                return (key == 8 ||
                key == 9 || key == 46);
            }
        })

        .bind('focus click', function () {
            phone = $(this);

        });
}

/********************************************
 * ZIP CODE MASKING
 * @param element_id
 * @param selected_country
 *
 * will mask zip code based on country selected.
 */
function input_zip_code_masking(element_id, selected_country) {
    var zip = 0;

    $(element_id)
        .keydown(function (e) {
            var country = $(selected_country).val();
            var key = e.charCode || e.keyCode || 0;
            zip = $(this);
            if ($(element_id).val().length == 0) {
                zip = 0;

            } else if ($(element_id).val().length <= 9 && country == "USA") { // USA zip format example 1234-1234
                var key = e.charCode || e.keyCode || 0;
                zip = $(this);

                if (key !== 8 && key !== 9) {
                    if (zip.val().length === 5) {
                        zip.val(zip.val() + '-');
                    }
                }
                // Restict keys based on country
                return (key == 8 || key == 9 || key == 46 ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));

            } else if ($(element_id).val().length <= 8 && country == "Brazil") { // Brazil zip example 15890-xxx
                var key = e.charCode || e.keyCode || 0;
                zip = $(this);

                if (key !== 8 && key !== 9) {
                    if (zip.val().length === 5) {
                        zip.val(zip.val() + '-');
                    }
                }
                // Restict keys based on country
                return (key == 8 || key == 9 || key == 46 ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));

            } else if ($(element_id).val().length <= 6 && country == "Canada") { // Canada zip example K1A 0B1
                var key = e.charCode || e.keyCode || 0;
                zip = $(this);

                if (key !== 8 && key !== 9) {
                    if (zip.val().length === 3) {
                        zip.val(zip.val() + ' ');
                    }
                }

            } else if ($(element_id).val().length <= 6 && country == "Chile") { // Chile zip example 1234567
                var key = e.charCode || e.keyCode || 0;
                zip = $(this);

                // Restict keys based on country
                return (key == 8 || key == 9 || key == 46 ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
            } else if ($(element_id).val().length <= 12 && country == "China") { // China zip example 123456-123456
                var key = e.charCode || e.keyCode || 0;
                zip = $(this);
                if (key !== 8 && key !== 9) {
                    if (zip.val().length === 6) {
                        zip.val(zip.val() + '-');
                    }
                }

                // Restict keys based on country
                return (key == 8 || key == 9 || key == 46 ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));

            } else if ($(element_id).val().length <= 8 && country == "Denmark") { // Denmark zip example 1234-1234
                var key = e.charCode || e.keyCode || 0;
                zip = $(this);
                if (key !== 8 && key !== 9) {
                    if (zip.val().length === 4) {
                        zip.val(zip.val() + '-');
                    }
                }

                // Restict keys based on country
                return (key == 8 || key == 9 || key == 46 ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));

            } else if($(element_id).val().length <= 4 && country == "Germany") { // Germany zip example 12345
                var key = e.charCode || e.keyCode || 0;
                zip = $(this);
                // Restict keys based on country
                return (key == 8 || key == 9 || key == 46 ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));

            } else if($(element_id).val().length <= 3 && country == "Latvia") { // Latvia zip example 1234
                var key = e.charCode || e.keyCode || 0;
                zip = $(this);
                // Restict keys based on country
                return (key == 8 || key == 9 || key == 46 ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));

            } else if($(element_id).val().length <= 10 && country == "Mexico") { // Mexico zip example 12345-12345
                var key = e.charCode || e.keyCode || 0;
                zip = $(this);

                if (key !== 8 && key !== 9) {
                    if (zip.val().length === 5) {
                        zip.val(zip.val() + '-');
                    }
                }

                // Allow numeric (and tab, backspace, delete) keys only
                return (key == 8 ||
                key == 9 ||
                key == 46 ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));


            } else if($(element_id).val().length <= 3 && country == "New Zeal") { // New Zealand zip example 12345-12345
                var key = e.charCode || e.keyCode || 0;
                zip = $(this);

                // Allow numeric (and tab, backspace, delete) keys only
                return (key == 8 ||
                key == 9 ||
                key == 46 ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));


            } else if($(element_id).val().length <= 5 && country == "Russia") { // Russia zip example 12345-12345
                var key = e.charCode || e.keyCode || 0;
                zip = $(this);

                // Allow numeric (and tab, backspace, delete) keys only
                return (key == 8 ||
                key == 9 ||
                key == 46 ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));


            } else if($(element_id).val().length <= 7 && country == "UK") { // United Kingdom zip example 12345-12345
                var key = e.charCode || e.keyCode || 0;
                zip = $(this);



            } else {
                var key = e.charCode || e.keyCode || 0;
                return (key == 8 ||
                key == 9 || key == 46);
            }
        })

        .bind('focus click', function () {
            zip = $(this);

        });
}

/*************************************************************
 *
 * @param id_type
 * @param element_id
 *
 * masking for input tax. GET type "ein" or "ssn" and the id of the element to mask for Tax format.
 *******************************************************/
function input_tax_id_masking(id_type_id, element_id) {
    var id = ""
    $(element_id)
        .keydown(function (e) {
            var selected_id_type = $(id_type_id).val();
            if ($(element_id).val().length <= 9 && selected_id_type == "ein") {
                var key = e.charCode || e.keyCode || 0;
                id = $(this);

                // Auto-format- expose as user get to tax id location
                if (id.val().length === 2) {
                    id.val(id.val() + '-');
                }

                // Allow numeric (and tab, backspace, delete, left and right arrows) keys only
                return (key == 8 ||
                key == 9 ||
                key == 46 ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105 || key == 37 || key == 39 ));

            } else if ($(element_id).val().length <= 10 && selected_id_type == "ssn") {
                var key = e.charCode || e.keyCode || 0;
                id = $(this);

                // Auto-format- expose as user get to tax id location
                if (id.val().length === 3) {
                    id.val(id.val() + '-');
                }

                if (id.val().length === 6) {
                    id.val(id.val() + '-');
                }

                // Allow numeric (and tab, backspace, delete, left and right arrows) keys only
                return (key == 8 ||
                key == 9 ||
                key == 46 ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105 || key == 37 || key == 39 ));

            } else {
                var key = e.charCode || e.keyCode || 0;

                return (key == 8 || key == 9 || key == 46 || key == 37 || key == 39 );
            }
        })

        .bind('focus click', function () {
            id = $(this)
        });
}

/****************************************
 * Only allow numbers and modifying keys
 * @parm element_id
 *******************************************/
function input_allow_numbers_only(element_id) {
    $(element_id)
        .keydown(function (e) {
            var key = e.charCode || e.keyCode || 0;

            return (key == 8 ||
            key == 9 ||
            key == 46 ||
            (key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105) || key == 37 || key == 39);
        });
}

/******************************************
 * DECIMAL FORMATING
 *
 * --pass element id and number of decimal allowed.
 * -- will restrict to numbers
 *
 * @param element_id
 * @param decimal_places
 *******************************************************/
function input_allow_decimals(element_id, decimal_places){
    $(element_id)
        .keypress(function (e) {
            if ((event.which != 46 || $(this).val().indexOf('.') != -1) &&
                ((event.which < 48 || event.which > 57) &&
                (event.which != 0 && event.which != 8))) {
                event.preventDefault();
            }

            var text = $(this).val();

            if ((text.indexOf('.') != -1) &&
                (text.substring(text.indexOf('.')).length > decimal_places) &&
                (event.which != 0 && event.which != 8) &&
                ($(this)[0].selectionStart >= text.length - decimal_places)) {
                event.preventDefault();
            }

        });
}

/******************************************************
  will validate email in form and add class of danger if not correct format remove if correct format
  @param element_id
  @param form_group
******************************************************/
function form_email_validator(element_id, form_group){
    $(element_id)
        .focusout(function (e) {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            var input_text = $(element_id).val();
            var element_id_hash_removed = element_id.substring(1);
            if (input_text == ""){
                $(form_group).removeClass("has-error has-success has-feedback");
                $(element_id + "_warning_glyphcon").remove();
            } else if (input_text.match(mailformat)) {
                $(form_group).removeClass("has-error has-feedback");
                $(element_id + "_warning_glyphcon").remove();
                $(form_group).addClass("has-success has-feedback");
                $(form_group).append('<span class="glyphicon glyphicon-ok text-success" id="' + element_id_hash_removed + '_warning_glyphcon"> valid</span>');

            }
            else {
                $(form_group).removeClass("has-error has-success has-feedback");
                $(element_id + "_warning_glyphcon").remove();

                $(form_group).addClass("has-error has-feedback");
                $(form_group).append('<span class="glyphicon glyphicon-warning-sign text-danger" id="' + element_id_hash_removed + '_warning_glyphcon"> invalid</span>');

            }
        });
}
