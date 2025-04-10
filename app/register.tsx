import Input from "@/components/input";
import Button from "@/components/button";
import React, { useContext } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Logo from "@/components/logo";
import config from "@/config";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import { useUser } from "@/contexts/user";

async function doRegister(displayName: string, email: string, password: string): Promise<string | null> {
  return axios.post(`${config.API_BASE_URL}/auth/register`, {
    displayName,
    email,
    password,
  }).then(res => {
    return res.data['jwt'] as string;
  }).catch(err => {
    alert(`ERROR: ${err.response.data.message}`);
    return null;
  });
}

export default function Register() {
  const [displayName, onChangeDisplayName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [passwordConfirmation, onChangePasswordConfirmation] = React.useState('');
  
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
        <Text style={[styles.title, styles.gabarito]}>Create an account</Text>
        <Text style={[styles.description, styles.inter]}>Welcome to revi.bio! You can start by completing the form below to register your account.</Text>
        <View style={styles.divider} />
        <Input onChangeText={onChangeDisplayName} text={displayName} placeholder="Display name"></Input>
        <Input onChangeText={onChangeEmail} text={email} placeholder="Email"></Input>
        <Input onChangeText={onChangePassword} text={password} placeholder="Password"></Input>
        <Input onChangeText={onChangePasswordConfirmation} text={passwordConfirmation} placeholder="Confirm password"></Input>
        <View style={styles.divider} />
        { /* need to double-wrap this (i hate react native) */ }
        <View>
          <View style={styles.actions}>
            <Button text={'Register'} onPress={async () => {
              const jwt = await doRegister(displayName, email, password);
              if (jwt) {
                user.setUser({ jwt });
                router.navigate('/(logged_in)/bios');
              }
            }} />
            <Link href="/login">
              <Text style={styles.description}>- or Log In</Text>
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
