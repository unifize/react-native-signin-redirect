import React, {useState, useEffect} from 'react';

import {Text, View, ImageBackground, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {WebView} from 'react-native-webview';

import {auth} from './config/firebase';

const App = () => {
  const [show, setShow] = useState({isOpen: false, url: null});
  const [customToken, setCustomToken] = useState(null);

  const handleWebViewNavigationStateChange = newNavState => {
    const {url} = newNavState;

    if (url.includes('customToken')) {
      const token = url.split('customToken=')[1];
      setCustomToken(token);
      setShow({isOpen: false, url: null});
    }
  };

  useEffect(() => {
    // signInWithCustomToken
    if (customToken) {
      auth
        .signInWithCustomToken(customToken)
        .then(user => {
          // eslint-disable-next-line no-alert
          alert(`Logged in as ${auth.currentUser.email}`);
        })
        .catch(err => console.error(err));
    }
  }, [customToken]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={{uri: 'https://source.unsplash.com/random/400x800'}}>
        <Text style={styles.text}>Acme Limited</Text>
        <View style={styles.bar}>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() =>
              setShow({
                isOpen: true,
                url: 'https://react-login-page-ruby.vercel.app/login',
              })
            }>
            Login
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() =>
              setShow({
                isOpen: true,
                url: 'https://react-login-page-ruby.vercel.app/signup',
              })
            }>
            Signup
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => setShow({isOpen: false, url: null})}>
            Exit
          </Button>
        </View>
        {show.isOpen && (
          <WebView
            source={{uri: show.url}}
            onNavigationStateChange={handleWebViewNavigationStateChange}
          />
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 6,
    marginRight: 6,
  },
});

export default App;
