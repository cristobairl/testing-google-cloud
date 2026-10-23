(function () {
  var status = document.getElementById('sign-in-status');
  var error = document.getElementById('sign-in-error');
  var signInButton = document.getElementById('google-sign-in');
  var signOutButton = document.getElementById('sign-out');

  // The terms and privacy pages load this script too, but do not need auth UI.
  if (!status || !signInButton || !signOutButton) {
    return;
  }

  function showError(message) {
    if (!error) {
      return;
    }
    error.textContent = message;
    error.hidden = false;
  }

  function clearError() {
    if (error) {
      error.textContent = '';
      error.hidden = true;
    }
  }

  function setSignedInState(session) {
    var user = session && session.user;
    var email = user && user.email;

    if (user) {
      status.textContent = email
        ? 'Signed in as ' + email + '.'
        : 'Signed in with Google successfully.';
      signInButton.hidden = true;
      signOutButton.hidden = false;
    } else {
      status.textContent = 'Not signed in';
      signInButton.hidden = false;
      signOutButton.hidden = true;
    }
  }

  if (!window.supabase || !window.SUPABASE_CONFIG ||
      !window.SUPABASE_CONFIG.url || !window.SUPABASE_CONFIG.anonKey ||
      window.SUPABASE_CONFIG.url.indexOf('YOUR_') === 0 ||
      window.SUPABASE_CONFIG.anonKey.indexOf('YOUR_') === 0) {
    signInButton.disabled = true;
    showError('Supabase is not configured. Set the project URL and anon key in config.js.');
    return;
  }

  var client = window.supabase.createClient(
    window.SUPABASE_CONFIG.url,
    window.SUPABASE_CONFIG.anonKey
  );

  signInButton.addEventListener('click', async function () {
    clearError();
    signInButton.disabled = true;

    var result = await client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + window.location.pathname
      }
    });

    if (result.error) {
      showError('Unable to start Google sign-in: ' + result.error.message);
      signInButton.disabled = false;
    }
  });

  signOutButton.addEventListener('click', async function () {
    clearError();
    signOutButton.disabled = true;

    var result = await client.auth.signOut();
    if (result.error) {
      showError('Unable to sign out: ' + result.error.message);
      signOutButton.disabled = false;
    } else {
      signOutButton.disabled = false;
    }
  });

  client.auth.onAuthStateChange(function (_event, session) {
    setSignedInState(session);
  });

  client.auth.getSession().then(function (result) {
    if (result.error) {
      showError('Unable to restore your session: ' + result.error.message);
      return;
    }
    setSignedInState(result.data.session);
  });
})();
