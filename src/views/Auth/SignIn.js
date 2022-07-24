import React, { useState } from 'react';

// Assets
import BgSignUp from 'assets/img/BgSignUp.png';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { auth } from './firebase-config';

function SignIn() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const provider = new GoogleAuthProvider();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  function redirect() {
    location.replace("/auth/signup");
  }

  const login = async () => {
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      // if (!user) {
      //   throw Error("User does not exits");
      // }
    } catch (error) {
      alert("Your Email or Password is incorrect");
    }
    setLoading(false);
  };

  // const logout = async() => {
  //   await signOut(auth);
  // }

  // const signWithGoogle = getAuth();
  function checkUser() {
    if (user?.email) {
      location.replace("/admin/dashboard");
    } else {
      console.log(user);
    }
  }
  checkUser();

  function signGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        // onAuthStateChanged(auth, (currentUser) => {
        //   setUser(currentUser);
        // })

        console.log(user.email);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        //
      });
  }

  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");

  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      {/* <div>
        <Box width={300} marginLeft={10} marginTop={10}>
          <Image src="https://plutoexchange.org/wp-content/uploads/2022/04/Solana-40-e1650882590935.png" />
        </Box>
      </div> */}

      <Box
        position="absolute"
        minH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        borderRadius={{ md: "15px" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={BgSignUp}
        bgSize="cover"
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}
      ></Box>
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="6.5rem"
        mb="30px"
      >
        <Text fontSize="4xl" color="white" fontWeight="bold">
          Welcome to FOMO Exchange
        </Text>
        <Text
          fontSize="l"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}
        >
          THE FUTURE OF DECENTRALIZED FINANCE
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
        <Flex
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: "100px" }}
          bg={bgColor}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
        >
          <Text
            fontSize="xl"
            color={textColor}
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            Login With
          </Text>
          <HStack spacing="15px" justify="center" mb="22px">
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="15px"
              transition="all .25s ease"
            ></Flex>
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="15px"
              border="1px solid lightgray"
              cursor="pointer"
              transition="all .25s ease"
              _hover={{ filter: "brightness(120%)", bg: bgIcons }}
            >
              <Link href="#">
                <Icon
                  as={FaGoogle}
                  w="30px"
                  onClick={signGoogle}
                  h="30px"
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="15px"
              transition="all .25s ease"
            ></Flex>
          </HStack>
          <Text
            fontSize="lg"
            color="gray.400"
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            or
          </Text>
          <FormControl>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Email
            </FormLabel>
            <Input
              // fontSize='sm'
              ms="4px"
              borderRadius="15px"
              type="email"
              placeholder="Your email address"
              mb="24px"
              size="lg"
              onChange={(e) => {
                setLoginEmail(e.target.value);
              }}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Password
            </FormLabel>
            <Input
              // fontSize='sm'
              ms="4px"
              borderRadius="15px"
              type="password"
              placeholder="Your password"
              mb="24px"
              size="lg"
              onChange={(e) => {
                setLoginPassword(e.target.value);
              }}
            />
            <FormControl display="flex" alignItems="center" mb="24px">
              <Switch id="remember-login" colorScheme="teal" me="10px" />
              <FormLabel htmlFor="remember-login" mb="0" fontWeight="normal">
                Remember me
              </FormLabel>
            </FormControl>
            <Button
              type="submit"
              bg="teal.300"
              fontSize="10px"
              color="white"
              fontWeight="bold"
              onClick={login}
              disabled={loading || user}
              id="signBtn"
              w="100%"
              h="45"
              mb="24px"
              _hover={{
                bg: "teal.200",
              }}
              _active={{
                bg: "teal.400",
              }}
            >
              SIGN IN
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              Don't have an account?
              <Link
                onClick={redirect}
                color={titleColor}
                as="span"
                ms="5px"
                href="#"
                fontWeight="bold"
              >
                Sign Up
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignIn;
