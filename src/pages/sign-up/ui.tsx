import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Container, Header, Section } from "shared/index";
import { SignUpCard } from "widgets/sign-up-card";
import { SignUpFooter } from "features/sign-up-content";
import { InterestsCard } from "widgets/interests-card";
import { FillProfileCard } from "widgets/fill-profile-card";

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
            <SignUpFooter stage={stage} setStage={setStage} />
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
