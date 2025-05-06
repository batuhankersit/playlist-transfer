import {authorize, revoke} from 'react-native-app-auth';

const spotifyConfig = {
  clientId: 'dd95cb828a374d6f9b8493e93c01f89d',
  clientSecret: '32df1b4a5a21472d863617a5d8758fc8',
  redirectUrl: 'music-transfer-app-login://callback-url',
  scopes: [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-library-read',
    'user-library-modify',
    'user-follow-read',
    'user-follow-modify',
    'user-read-recently-played',
    'user-read-currently-playing',
    'user-top-read',
  ],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
    revocationEndpoint: 'https://accounts.spotify.com/api/token/revoke',
  },
};

const googleConfig = {
  issuer: 'https://accounts.google.com',
  clientId: 'GOOGLE_CLIENT_ID.apps.googleusercontent.com',
  redirectUrl: 'com.yourapp:/oauth2redirect/google',
  scopes: [
    'openid',
    'profile',
    'email',
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/youtube',
  ],
};

export async function disconnectSpotify(token: string) {
  try {
    await revoke(spotifyConfig, {tokenToRevoke: token, sendClientId: true});
    // Token'ı sil
    return {success: true};
  } catch (e) {
    return {success: false, error: e};
  }
}

export async function connectYouTubeMusic() {
  try {
    const result = await authorize(googleConfig);
    return {success: true, token: result.accessToken};
  } catch (e) {
    return {success: false, error: e};
  }
}

export async function disconnectYouTubeMusic(token: string) {
  try {
    await revoke(googleConfig, {tokenToRevoke: token, sendClientId: true});
    return {success: true};
  } catch (e) {
    return {success: false, error: e};
  }
}
