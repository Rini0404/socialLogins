const _iosOpenWebBrowser = async () => {

    let result = await WebBrowser.openAuthSessionAsync(
      "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=510294674624-53piel3odbpo4nonht6nkme34cbu0h4f.apps.googleusercontent.com&redirect_uri=https://dev.devusol.net/expoAuth/signin&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&state=1234_purpleGoogle&prompt=consent",
      "https://dev.devusol.net/expoAuth/signin"
    );

    if (result.type === "success") {
      console.log("success", result);
      // get the token from the url
      const token = Linking.parse(result.url).queryParams.token;

        // get tjr noProf param
        const noProf = Linking.parse(result.url).queryParams.noProf;

        console.log("noProf", noProf)

        if(noProf === "noProfile" && token) {

          // alert not a user and go to sign up page
          navigation.navigate("BuildProfile", { token });
          alert("Looks like you do not have a profile. Please make one to continue.");
        } else {

        // if error in params, show error message
        if (Linking.parse(result.url).queryParams.error) {
          console.log("error", Linking.parse(result.url).queryParams.error);
          // alert not a user and go to sign up page
          navigation.push("SignUp");
          alert("Not a user! Please sign up.");
        }

        // store the token in secure store
        await SecureStore.setItemAsync("token", token)
          .then(() => {
            console.log("token stored");
            setStoredCredentials(token)
            
          })
          .catch((error) => {
            console.log("error storing token", error);  
          });

          fetch("https://dev.devusol.net/keys", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
              },
            })
              .then((response) => response.json())
              .then((responseJson) => { 

                const { cfToken, cfID, cfImgPost, cfVidGet, cfVidPost, cfImgGet } = responseJson;

                let cloufFlareInf = {
                  cfToken,
                  cfID, 
                  cfImgPost,
                  cfVidGet,
                  cfVidPost,
                  cfImgGet
                }

                SecureStore.setItemAsync("cloudFlare", JSON.stringify(cloufFlareInf))
                .then(() => {
                  console.log("cloudFlare keys stored");
                  navigation.push("AddNavBar");

                }
                )
                .catch((error) => {
                  console.log(error);
                }
                );
                 
              }
              )
              .catch((error) => {
                console.log(error);
              }
              );
      }

    } else {
      console.log("error", result);
    }
  };

  export default _iosOpenWebBrowser;