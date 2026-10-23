function handleCredentialResponse(response) {
  var status = document.getElementById('sign-in-status');
  if (!status) {
    return;
  }

  if (response && response.credential) {
    status.textContent = 'Signed in with Google successfully.';
  } else {
    status.textContent = 'Google sign-in failed. Please try again.';
  }
}

window.handleCredentialResponse = handleCredentialResponse;
