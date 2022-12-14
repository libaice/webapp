import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { VStack, Heading, Box, LinkOverlay, LinkBox } from "@chakra-ui/layout";
import { Text, Button } from "@chakra-ui/react";
import ReadERC20 from "../components/ReadERC20";
import TransferERC20 from "../components/TransferERC20";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
declare let window: any;

const Home: NextPage = () => {
  const [balance, setBalance] = useState<string | undefined>();
  const [currentAccount, setCurrentAccount] = useState<string | undefined>();
  const [chainId, setChainId] = useState<number | undefined>();
  const [chainname, setChainName] = useState<string | undefined>();

  useEffect(() => {
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return;
    //client side code
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getBalance(currentAccount).then((result) => {
      setBalance(ethers.utils.formatEther(result));
    });
    provider.getNetwork().then((result) => {
      setChainId(result.chainId);
      setChainName(result.name);
    });
  }, [currentAccount]);

  const onClickConnect = () => {
    //client side code
    if (!window.ethereum) {
      console.log("please install MetaMask");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) setCurrentAccount(accounts[0]);
      })
      .catch((e) => console.log(e));
  };

  const onClickDisconnect = () => {
    console.log("onClickDisConnect");
    setBalance(undefined);
    setCurrentAccount(undefined);
  };

  return (
    <>
      <Head>
        <title>My DAPP</title>
      </Head>

      <Heading as="h3" my={4}>
        Explore Web3
      </Heading>

      <VStack>
        <Box w="100%" my={4}>
          {currentAccount ? (
            <Button type="button" w="100%" onClick={onClickDisconnect}>
              Account:{currentAccount}
            </Button>
          ) : (
            <Button type="button" w="100%" onClick={onClickConnect}>
              Connect MetaMask
            </Button>
          )}
        </Box>

        <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
          <Heading my={4} fontSize="xl">
            Read ClassToken Info
          </Heading>
          <ReadERC20
            addressContract="0x5FbDB2315678afecb367f032d93F642f64180aa3"
            currentAccount={currentAccount}
          />
        </Box>

        <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
          <Heading my={4} fontSize="xl">
            Transfer Classtoken
          </Heading>
          <TransferERC20
            addressContract="0x5FbDB2315678afecb367f032d93F642f64180aa3"
            currentAccount={currentAccount}
          />
        </Box>

        {currentAccount ? (
          <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
            <Heading my={4} fontSize="xl">
              Account info
            </Heading>
            <Text>ETH Balance of current account: {balance}</Text>
            <Text>
              Chain Info: ChainId {chainId} name {chainname}
            </Text>
          </Box>
        ) : (
          <></>
        )}

        <Box my={4} p={4} w="100%" borderWidth="1px" borderRadius="lg">
          <Heading my={4} fontSize="xl">
            Task 1
          </Heading>
          <Text>local chain with hardhat</Text>
        </Box>

        <Box my={4} p={4} w="100%" borderWidth="1px" borderRadius="lg">
          <Heading my={4} fontSize="xl">
            Task 2
          </Heading>
          <Text>DAPP with React/NextJS/Chakra</Text>
        </Box>

        <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
          <Heading my={4} fontSize="xl">
            Transfer Classtoken
          </Heading>
          <TransferERC20
            addressContract="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
            currentAccount={currentAccount}
          />
        </Box>

        <LinkBox my={4} p={4} w="100%" borderWidth="1px" borderRadius="lg">
          <NextLink
            href="https://github.com/NoahZinsmeister/web3-react/tree/v6"
            passHref
          >
            <LinkOverlay>
              <Heading my={4} fontSize="xl">
                Task 3 with link
              </Heading>
              <Text>Read docs of Web3-React V6</Text>
            </LinkOverlay>
          </NextLink>
        </LinkBox>
      </VStack>
    </>
  );
};

export default Home;
