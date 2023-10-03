// // Initialize Facebook Login button
// callbackManager = CallbackManager.Factory.create()

// buttonFacebookLogin.setReadPermissions("email", "public_profile")
// buttonFacebookLogin.registerCallback(
//     callbackManager,
//     object : FacebookCallback<LoginResult> {
//         override fun onSuccess(loginResult: LoginResult) {
//             Log.d(TAG, "facebook:onSuccess:$loginResult")
//             handleFacebookAccessToken(loginResult.accessToken)
//         }

//         override fun onCancel() {
//             Log.d(TAG, "facebook:onCancel")
//         }

//         override fun onError(error: FacebookException) {
//             Log.d(TAG, "facebook:onError", error)
//         }
//     },
// )
// // ...
// override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
//     super.onActivityResult(requestCode, resultCode, data)

//     // Pass the activity result back to the Facebook SDK
//     callbackManager.onActivityResult(requestCode, resultCode, data)
// // }