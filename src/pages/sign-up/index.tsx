import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Header } from "components/layouts/header";
import { Container } from "components/layouts/container";
import { SignUpFooter } from "modules/sign-up-form/components/sign-up/sign-up-footer";
import { Section } from "components/layouts/section";
import { SignUpCard } from "modules/sign-up-form/components/sign-up";
import { InterestsCard } from "modules/sign-up-form/components/interests";
import { FillProfileCard } from "modules/sign-up-form/components/fill-profile";

export const SignUp = () => {
  const [stage, setStage] = useState(1);

  return (
    <>
      <Header
        back
        onPress={stage >= 2 && (() => setStage((prev) => prev - 1))}
        title={
          stage >= 2
            ? stage === 2
              ? "Выберите ваши интересы"
              : "Заполните профиль"
            : ""
        }
      />
      <Container style={styles.container}>
        {stage === 1 && (
          <>
            <SignUpCard />
            <SignUpFooter stage={stage} setStage={setStage} />
          </>
        )}
        {stage === 2 && (
          <Section contentContainerStyle={styles.content}>
            <InterestsCard />
            <SignUpFooter stage={stage} setStage={setStage} />
          </Section>
        )}
        {stage === 3 && (
          <>
            <FillProfileCard />
            <SignUpFooter />
          </>
        )}
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
});
