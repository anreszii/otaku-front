import React, { useRef, useState } from "react";
import { Layout } from "components";
import { useAuthStore } from "shared/stores";
import { useTypedNavigation } from "shared/hooks";
import { EmailStep, CodeStep, PasswordStep } from "./components";

const Forgot = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState<string[]>(Array(4).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { verifyResetCode, resetPassword, sendReset } = useAuthStore();
  const navigation = useTypedNavigation();

  const inputRefs = Array(4)
    .fill(0)
    .map(() => useRef<any>(null));

  const handleSendReset = async () => {
    if (!email) {
      setError("Введите электронную почту");
      return;
    }

    setIsLoading(true);
    try {
      const error = await sendReset(email);
      if (error) {
        setError(error);
        return;
      }
      setStep((prev) => prev + 1);
      setError("");
    } catch (err) {
      setError("Произошла ошибка при отправке кода");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitCode = async (newCode: string[]) => {
    const fullCode = newCode.join("");
    if (fullCode.length !== 4) {
      setError("Введите код полностью");
      return;
    }

    setIsLoading(true);
    try {
      const error = await verifyResetCode({ email, code: fullCode });
      if (error) {
        setError(error);
        return;
      }
      setStep((prev) => prev + 1);
      setError("");
    } catch (err) {
      setError("Неверный код подтверждения");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!password) {
      setError("Введите новый пароль");
      return;
    }

    if (password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов");
      return;
    }

    setIsLoading(true);
    try {
      const error = await resetPassword({
        email,
        code: code.join(""),
        password,
      });
      if (error) {
        setError(error);
        return;
      }
      navigation.navigate("SignIn");
    } catch (err) {
      setError("Произошла ошибка при смене пароля");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeCode = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
    if (value && index === 3) {
      inputRefs[index].current?.blur();
      handleSubmitCode(newCode);
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === "Backspace" && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
    if (code[index] && key !== "Backspace") {
      code[index] = key;
      setCode([...code]);
      if (index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <EmailStep
            email={email}
            error={error}
            isLoading={isLoading}
            onEmailChange={setEmail}
            onSubmit={handleSendReset}
          />
        );
      case 1:
        return (
          <CodeStep
            code={code}
            error={error}
            isLoading={isLoading}
            inputRefs={inputRefs}
            onCodeChange={handleChangeCode}
            onKeyPress={handleKeyPress}
            onSubmit={handleSubmitCode}
          />
        );
      case 2:
        return (
          <PasswordStep
            password={password}
            error={error}
            isLoading={isLoading}
            onPasswordChange={setPassword}
            onSubmit={handleResetPassword}
          />
        );
      default:
        return null;
    }
  };

  return <Layout>{renderStep()}</Layout>;
};

export default Forgot;
