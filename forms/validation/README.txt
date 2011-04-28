

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

function validateForm() { ... }