import React, { useState } from "react";
import { Container, Button } from "../../globalStyles";
import logo from "./logo.webp";
import { Button as ButtonBtn, ButtonSmall } from "../Button";
import {
  InfoSec,
  InfoRow,
  InfoColumn,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  ImgWrapper,
  Img,
} from "./InfoSectionElements";
import { useEthers } from "@usedapp/core";
import WalletConnectButton from "../WalletConnectButton";

function InfoSection({
  primary,
  lightBg,
  lightTopLine,
  lightText,
  lightTextDesc,
  alt,
  imgStart,
  start,
}) {
  const { account } = useEthers();

  return (
    <>
      <InfoSec lightBg={lightBg}>
        <Container>
          <InfoRow imgStart={imgStart}>
            <InfoColumn>
              <TextWrapper>
                <TopLine lightTopLine={lightTopLine}>MINT</TopLine>
                <TopLine lightTopLine={lightTopLine}>HERE</TopLine>

                <Heading lightText={lightText}></Heading>
                <Subtitle lightTextDesc={lightTextDesc}>
                  7777 NFT's at 0.06 Eth presale & 0.07 Eth main sale. Max 5 per
                  transaction.
                </Subtitle>
                <div>
                  {account ? (
                    <>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "flexStart",
                          justifyContent: "center",
                          alignItems: "center",
                          alignSelf: "left",
                        }}
                      >
                        <ButtonSmall>-</ButtonSmall>
                        <ButtonBtn>MINT jkjk</ButtonBtn>
                        <ButtonSmall style={{ marginLeft: "10px" }}>
                          +
                        </ButtonSmall>
                      </div>
                    </>
                  ) : (
                    <WalletConnectButton />
                  )}
                </div>
              </TextWrapper>
            </InfoColumn>
            <InfoColumn>
              <ImgWrapper start={start}>
                <Img src={logo} alt={alt} />
              </ImgWrapper>
            </InfoColumn>
          </InfoRow>
        </Container>
      </InfoSec>
    </>
  );
}

export default InfoSection;
