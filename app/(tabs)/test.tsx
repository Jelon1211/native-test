import React, { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authUrl = "https://api.workos.com/sso/authorize";
const tokenUrl = "https://api.workos.com/sso/token";

const LoginScreen = () => {
  const [request, setRequest] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: "yourapp",
      useProxy: Constants.appOwnership === "expo",
    });

    console.log(redirectUri);

    const config = {
      clientId: "client_01HYRSNX7DY96KFJRW7MX5Y1CA",
      redirectUri,
      responseType: "code",
      scopes: [],
      extraParams: {
        organization: "org_01HYRSNX28J5JQYW7RSBMXMFCW",
      },
    };

    const discovery = {
      authorizationEndpoint: authUrl,
    };

    const request = new AuthSession.AuthRequest(config);
    request.makeAuthUrlAsync(discovery).then(() => setRequest(request));
  }, []);

  useEffect(() => {
    if (result && result.type === "success") {
      const { code } = result.params;
      handleTokenExchange(code);
    }
  }, [result]);

  const handleLogin = async () => {
    const authResult = await request.promptAsync();
    setResult(authResult);
  };

  const handleTokenExchange = async (code: any) => {
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: "yourapp",
      useProxy: Constants.appOwnership === "expo",
    });

    try {
      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: "client_01HYRSNX7DY96KFJRW7MX5Y1CA",
          client_secret: "YOUR_CLIENT_SECRET",
          code,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
      });

      const data = await response.json();

      if (data.access_token) {
        console.log("Token received:", data.access_token);
      }
    } catch (error) {
      console.error("Token exchange failed", error);
    }
  };

  return (
    <View>
      <Text className="mt-16">Login</Text>
      <Button title="Log in with SSO" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
