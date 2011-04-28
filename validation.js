

/*----------------------------------------------*/
/*		JavaScript Form Validation				*/
/*		Developer: Tim Keir						*/
/*----------------------------------------------*/
/*		Created: 26/03/2008						*/
/*		Modified: 10/08/2009					*/
/*		Version: 0.3							*/
/*----------------------------------------------*/



/*----- CHANGE LOG ------------------/

	v 0.1	-	26/03/2008 	-	Added validation for all form fields
	v 0.2	-	12/06/2009	-	Updated documentation
	v 0.3	-	10/08/2009	-	Fixed global string replace and appended
								Documentation

/*----------------------------------------------*/



/*----- DESCRIPTION -----------------/

	Simple form validation based on class names.
	Incorrect fields will have their styles changed
	allowing for a user friendly way of highlighting
	the fields requiring attention.

/*----------------------------------------------*/



/*----- INSTRUCTIONS ----------------/

	To use this validation, call the validateForm
	function within your form. e.g.


	<form onSubmit="return validateForm()" />


	The available validation types are:

	"Req" = Required. You must enter or select a value.

	"Email" = Validates as a valid email address only if input has been entered.

	"EmailReq" = Required, then validates as a valid email address.

	"Num" = Validates as a number only if input has been entered.

	"NumReq" = Required, then validates as a number.

	"Login" = Validates a username or password, numbers, letters, underscores, and hyphens.

	"LoginReq" = Required, then validates as a numbers, letters, and dividers listed above.

	To enable the colour feedback using CSS
	simply wrap each form input with a container
	div and specify which type of validation you
	require as the class name (see above). e.g.


	<div class="EmailReq">
		<input name="email" type="text" />
	</div>
	
	
	Error messages are based on the validation type specified 
	and the inputs name attribute. Input names are auto-capitalized.
	Using the above code example the default error message would be:
	
		alert('Please specify Email');
	
	For multi word inputs it is recommended to using the following
	naming convention. Name the inputs replacing spaces with underscores e.g. 
	
	
	<div class="Req">
		<input name="first_name" type="text" />
	</div>
	
	
	This would have the following error message:
	
		alert('Please specify First Name');
	
	
	Please note that usage with Select boxes is slightly different.
	You must set the default option to a null value e.g.
		
	<div class="NumReq">
		<select name="existing_member">
			<option value="">---</option>
			<option value="Y">Yes</option>
			<option value="N">No</option>
		</select>
	</div>
	
	
	You may also set multiple fields as required using a single div e.g.
	
	<div class="NumReq">
		<select name="birthday_day" tabindex="7">
			<option value="">---</option>
			<option value="01">01</option>
			<option value="31">31</option>
		</select>
		<select name="birthday_month" tabindex="7">
			<option value="">---</option>
			<option value="01">01</option>
			<option value="12">12</option>
		</select>
		<select name="birthday_year" tabindex="7">
			<option value="">------</option>
			<option value="1984">1984</option>
			<option value="2009">2009</option>
		</select>
	</div>

/*----------------------------------------------*/





/*----- CSS STYLES ------------------/

	Change these styles to reflect your desired
	look and feel for both default and highlighted
	form text inputs.

/*----------------------------------------------*/



var cssAttentionBorder = "1px solid #FF0000";

var cssAttentionBackground = "#FFEAEA";

var cssDefaultBorder = "1px solid #999999";

var cssDefaultBackground = "#FFFFFF";





/*----- FORM VALIDATION -------------/

	This function validates the form before submitting.
	It runs through all the form fields on the page
	and checks against the appropriate validation
	rules specified by each items parent className (see above).

/*----------------------------------------------*/



function validateForm() {

	// Set initial variables

	var result = true;

	var errorObj = '';

	var errorString = '';

	var req = false;

	var type = '';

	var prev= false;

	var val = false;

	// Types of form objects

	var activeXObjTypes = new Array("input", "textarea", "select");

	// Loop through form objects

  	for (var i=0; i < activeXObjTypes.length; i++) {

    	var xObj = document.getElementsByTagName(activeXObjTypes[i]);

    	var num = xObj.length;

		// Loop through each type of form objects

		for(var j=0; j < num; j++) {

			// Check form input type, string, email, integer

			if(new String(xObj[j].parentNode.className).indexOf("Email") != -1) type = "email";

			else if(new String(xObj[j].parentNode.className).indexOf("Num") != -1) type = "numeric";

			else if(new String(xObj[j].parentNode.className).indexOf("Login") != -1) type = "userpass";

			else type = '';	

			// Check whether form field is required based on class name

			if(new String(xObj[j].parentNode.className).indexOf("Req") != -1) req = true;

			else req = false;

			// Validate data types

			if(xObj[j].type == "text" || xObj[j].type == "password" || xObj[j].type == "file") {

				val = validateTextField(xObj[j], req, type);

				if(val != null) {

					errorString += val + "\n";

					result = false;

					if(errorObj == '') { errorObj = xObj[j]; }

				}

			}

			if(xObj[j].type == "radio") {

				if(prev != xObj[j].name) {

					// NOTE: xObj[j] references a single instance of the radio button set so we re-target the radio set for validation

					var radioSet = document.getElementsByName(xObj[j].name);

					val = validateRadioButton(radioSet, req);

					if(val != null) {

						errorString += val + "\n";

						result = false;

					}

				}

			}

			if(xObj[j].type == "checkbox") {

				val = validateCheckBox(xObj[j], req);

				if(val != null) {

					errorString += val + "\n";

					result = false;

				}

			}
			
			if(xObj[j].type == "select-one" || xObj[j].type == "select-multiple") {

				val = validateSelectBox(xObj[j], req);

				if(val != null) {

					errorString += val + "\n";

					result = false;

				}

			}

			if(xObj[j].type == "textarea") {

				val = validateTextArea(xObj[j], req);

				if(val != null) {

					errorString += val + "\n";

					result = false;

				}

			}

			prev = xObj[j].name;

    	}

  	}

	// Display error messages

	if(errorString != '') alert(errorString);

	if(errorObj != '') errorObj.focus();

	if(result) { 

		// Disable form (for user feedback purposes to indicate the ajax call is loading)

		document.adminForm.submit();

		document.adminForm.disabled = true;

		//return true;

		return false;

	}

	else { return false; }

}





/*----- FORM FIELD VALIDATION ---------/

	These functions validate against the different
	data types within a form. They are each called
	from within validateForm (see above).

/*----------------------------------------------*/



// Validate a text field input

function validateTextField(obj, req, type) {

	if(req) {

		if(obj.value == "") {

			obj.style.border = cssAttentionBorder;

			obj.style.background = cssAttentionBackground;
			
			return 'Please specify ' + ucwords(obj.name);

		}

	}

	// Check email address

	if(type == "email" && obj.value != "") {

		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

		if(reg.test(obj.value) == false) {

			obj.style.border = cssAttentionBorder;

			obj.style.background = cssAttentionBackground;
			
			return 'Please specify a valid email address for ' + ucwords(obj.name);

		}

	}

	// Check numbers e.g. phone

	else if(type == "numeric" && obj.value != "") {

		if(!obj.value.match(/^[0-9 ./]+$/)) {

			obj.style.border = cssAttentionBorder;

			obj.style.background = cssAttentionBackground;

			return ucwords(obj.name) + ' may only contain numbers and spaces';

		}

	}

	// Check usernames and passwords

	else if(type == "userpass") {

		if(!obj.value.match(/^[A-Za-z0-9_\-/]+$/)) {

			obj.style.border = cssAttentionBorder;

			obj.style.background = cssAttentionBackground;

			return ucwords(obj.name) + ' may only contain letters, numbers, underscores, and hyphens';

		}

	}

	obj.style.border = cssDefaultBorder;

	obj.style.background = cssDefaultBackground;

	return null;

}



// Validate a radio button input

function validateRadioButton(obj, req) {

	if(req) {

		var selected = -1;

		for(var i = obj.length - 1; i > -1; i--) {

			if(obj[i].checked) {

				selected = i;

				i = -1;

			}

		}

		if(selected > -1) { return null; } else { return 'Please select an option for ' + ucwords(obj[0].name); }

	} else {

		return null;

	}

}



// Validate a check box input

function validateCheckBox(obj, req) {

	if(req) {

		if(!obj.checked) return 'Please tick ' + ucwords(obj.name);	

		else return null;

	} else {

		return null;	

	}

}



// Validate a select box

function validateSelectBox(obj, req, minOptions, maxOptions) {

	if(req) {

		if(obj.value == '') {

			obj.style.border = cssAttentionBorder;

			obj.style.background = cssAttentionBackground;

			return 'Please select an option for ' + ucwords(obj.name);

		}

	}

	if(obj.type == "select-multiple") {

		if(minOptions == null) { minOptions = 1; }

		if(maxOptions == null) { maxOptions = obj.length; }

		var numSelected = 0;

		for(var i = obj.length - 1; i > -1; i--) {

			if(obj[i].selected) {

				numSelected ++;

				if(numSelected > maxOptions) {

					i = -1;

					obj.style.border = cssAttentionBorder;

					obj.style.background = cssAttentionBackground;

					return 'Please select between ' + minOptions + ' and ' + maxOptions + ' options  for ' + ucwords(obj.name);

				}

			}

		}

	}	

	obj.style.border = cssDefaultBorder;

	obj.style.background = cssDefaultBackground;

	return null;

}



// Validate a text area

function validateTextArea(obj, req) {

	if(req) {

		if(obj.value == "") {

			obj.style.border = cssAttentionBorder;

			obj.style.background = cssAttentionBackground;

			return 'Please specify ' + ucwords(obj.name);

		}

	}

	obj.style.border = cssDefaultBorder;

	obj.style.background = cssDefaultBackground;

	return null;

}



/*----- GENERAL FUNCTIONS -------------/

	These functions are used throughout various
	other functions within this script

/*----------------------------------------------*/



// Capitalize a string

function ucwords(string) {

    newVal = '';

	val = string.replace(/_/g, ' ');

    val = val.split(' ');

    for(var c=0; c < val.length; c++) {

    	newVal += val[c].substring(0,1).toUpperCase() + val[c].substring(1,val[c].length) + ' ';

    }

    return newVal;

}


