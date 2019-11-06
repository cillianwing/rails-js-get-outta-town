$(function() {
	listenForSignUpClick();
})

function listenForSignUpClick() {
	$('input#sign-up').on('click', function(event) {
		event.preventDefault();
		$('#signup-modal-display').html(signUpModal());
		$('#signupModal').modal('show');
	})
}

function signUpModal() {
	let str = `
		<div id="signupModal" class="modal fade" role="dialog">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class = "modal-header">
						<h4 class="modal-title w-100 font-weight-bold">Please Sign Up Below!</h4>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form class="new_user" id="new_user" action="/users" accept-charset="UTF-8" method="post">

							<div class="form-group px-2">
							  <label for="user_email">Email:</label>
							  <input class="form-control" type="email" name="user[email]" id="user_email">
							</div>

						  <div class="form-group px-2">
						    <label for="user_password">Password</label>
						    <input class="form-control" type="password" name="user[password]" id="user_password">
						  </div>

						  <div class="form-group px-2">
						    <label for="user_password_confirmation">Confirm Password</label><br>
						    <input class="form-control" type="password" name="user[password_confirmation]" id="user_password_confirmation">
						  </div>

							<div class="form-group px-2">
							  <label for="user_name">Name: </label>
							  <input class="form-control" type="text" name="user[name]" id="user_name">
							</div>

							<div class="form-group px-2">
							  <label for="user_location">Location: </label>
							  <input class="form-control" type="text" name="user[location]" id="user_location">
							</div>

							<div class="form-group px-2">
							  <label for="user_bio">Biography:</label>
							  <textarea class="form-control" name="user[bio]" id="user_bio"></textarea>
							</div>

		          <input type="submit" name="commit" value="Create User" class="form-group btn btn-success btn-block" data-disable-with="Update User">

			        <p class="login-callout mt-3">
			          Already have an account? <a id="login-link" href="/">Log In<a>
			        </p>

						</form>				
					</div>
				</div>
			</div>
		</div>
		`
		return str;
}