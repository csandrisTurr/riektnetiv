import Input from "@/components/input";
import Button from "@/components/button";
import React, { useContext } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Logo from "@/components/logo";
import config from "@/config";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import { useUser } from "@/contexts/user";
import { useRouteNode } from "expo-router/build/Route";

function doLogin(email: string, password: string): Promise<string | null> {
  return axios.post(`${config.API_BASE_URL}/auth/login`, {
    email,
    password,
  }).then(res => {
    return res.data['jwt'] as string;
  }).catch(err => {
    alert(`ERROR: ${err.response.data.message}`);
    return null;
  });
}

const Login: React.FC = () => {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const user = useUser();
  const router = useRouter();

  return (
    <View
      style={styles.page}
    >
      <View style={{ position: 'absolute', top: 24, left: 24 }}>
        <Logo />
      </View>
      <View style={styles.inner}>
        <Text style={[styles.title, styles.gabarito]}>Welcome back!</Text>
        <Text style={[styles.description, styles.inter]}>Let's continue where you left off. Forgot your password? Click here to start the password reset process.</Text>
        <View style={styles.divider} />
        <Input onChangeText={onChangeEmail} text={email} placeholder="Email"></Input>
        <Input onChangeText={onChangePassword} text={password} placeholder="Password"></Input>
        <View style={styles.divider} />
        { /* need to double-wrap this (i hate react native) */ }
        <View>
          <View style={styles.actions}>
            <Button text={'Log in'} onPress={async () => {
              user.setUser({ jwt: await doLogin(email, password) as string})
              router.navigate('/(logged_in)/bios');
              }} />
            <Button text={'Print jwt'} onPress={() => alert(user.user?.jwt)} />
            <Link href="/register">
              <Text style={styles.description}>- or Create an account</Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#18181B',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
    padding: 24,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    gap: 6,
    maxWidth: 500,
  },
  title: {
    color: '#F4F4F5',
    fontSize: 40,
  },
  description: {
    color: '#52525B',
  },
  divider: {
    height: 32,
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  inter: {
    fontFamily: "Inter_400Regular",
  },
  gabarito: {
    fontFamily: "Gabarito_400Regular"
  }
});

export default Login;