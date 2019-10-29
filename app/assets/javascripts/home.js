$(function() {
	listenForSignUpClick();
})

function listenForSignUpClick() {
	$('input#sign-up').on('click', function() {
		$('#modal-display').html(signUpModal());
		$('#myModal').modal('show');
	})
}

function signUpModal() {
	return (`
		<div id="myModal" class="modal fade" role="dialog">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class = "modal-header">
						<h4 class="modal-title w-100 font-weight-bold">Please Sign Up Below!</h4>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<%= form_for @user do |f| %>

						  <div class="form-group">
						    <%= f.label :email %><br />
						    <%= f.email_field :email, class: "form-control" %>
						  </div>

						  <div class="form-group">
						    <%= f.label :password %>
						    <%= f.password_field :password, class: "form-control" %>
						  </div>

						  <div class="form-group">
						    <%= f.label :password_confirmation, "Confirm Password" %><br />
						    <%= f.password_field :password_confirmation, class: "form-control" %>
						  </div>

						  <div class="form-group">
						    <%= f.label :name %>
						    <%= f.text_field :name, class: "form-control" %>
						  </div>

						  <div class="form-group">
						    <%= f.label :location %>
						    <%= f.text_field :location, class: "form-control" %>
						  </div>

						  <div class="form-group">
						    <%= f.label :bio %>
						    <%= f.text_area :bio, class: "form-control" %>
						  </div>

						  <%= f.submit "Sign up", class: "btn btn-success" %>
						<% end %>
					</div>
				</div>
			</div>
		</div>
		`)
}