import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { STRINGS } from '../../strings/hebrew';
import { theme } from '../../theme/theme';
import {
  Screen,
  ScrollContent,
  Header,
  Title,
  Subtitle,
  Form,
  InputWrapper,
  Label,
  StyledInput,
  ErrorText,
  PrimaryButton,
  PrimaryButtonText,
  Footer,
  FooterRow,
  LinkText,
  ButtonWrapper,
  LogoContainer,
  TitlesContainer,
  StyledScrollView,
  BottomSection,
  KeyboardWrapper,
} from './Login.styles';
import { AuthStackParamsType } from '../../navigation/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, STRINGS.LOGIN_EMAIL_REQUIRED)
    .email(STRINGS.LOGIN_EMAIL_INVALID),
  password: z.string().min(1, STRINGS.LOGIN_PASSWORD_REQUIRED),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type LoginProps = {
  logo: React.ReactNode;
  onSubmit?: (values: LoginFormValues) => void | Promise<void>;
};

const Login = ({ logo, onSubmit }: LoginProps) => {
  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const email = watch('email');
  const password = watch('password');

  const navigation =
    useNavigation<NavigationProp<AuthStackParamsType, 'Login'>>();
  const onNavigateToRegister = () => {
    navigation.navigate('Register');
  };

  const onFormSubmit = async (values: LoginFormValues) => {
    if (isSubmitting) return;
    await onSubmit?.(values);
  };

  return (
    <Screen>
      <KeyboardWrapper
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <StyledScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ScrollContent>
            <Header>
              <LogoContainer>{logo}</LogoContainer>
              <TitlesContainer>
                <Title>{STRINGS.LOGIN_TITLE}</Title>
                <Subtitle>{STRINGS.LOGIN_SUBTITLE}</Subtitle>
              </TitlesContainer>
            </Header>

            <Form>
              <InputWrapper>
                <Label>{STRINGS.LOGIN_EMAIL}</Label>
                <StyledInput
                  placeholder={STRINGS.LOGIN_EMAIL_PLACEHOLDER}
                  placeholderTextColor={theme.color.placeholder}
                  value={email}
                  onChangeText={text =>
                    setValue('email', text, { shouldValidate: true })
                  }
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isSubmitting}
                />
                {errors.email?.message ? (
                  <ErrorText>{errors.email.message}</ErrorText>
                ) : null}
                <Label>{STRINGS.LOGIN_PASSWORD}</Label>
                <StyledInput
                  placeholder={STRINGS.LOGIN_PASSWORD_PLACEHOLDER}
                  placeholderTextColor={theme.color.placeholder}
                  value={password}
                  onChangeText={text =>
                    setValue('password', text, { shouldValidate: true })
                  }
                  secureTextEntry
                  editable={!isSubmitting}
                />
                {errors.password?.message ? (
                  <ErrorText>{errors.password.message}</ErrorText>
                ) : null}
              </InputWrapper>
              <BottomSection>
                <ButtonWrapper>
                  <PrimaryButton
                    disabled={!isValid || isSubmitting}
                    onPress={handleSubmit(onFormSubmit)}
                  >
                    <PrimaryButtonText>
                      {STRINGS.LOGIN_SUBMIT}
                    </PrimaryButtonText>
                  </PrimaryButton>
                </ButtonWrapper>
                <Footer>
                  <FooterRow>
                    <TouchableOpacity
                      onPress={onNavigateToRegister}
                      disabled={isSubmitting}
                    >
                      <LinkText>{STRINGS.LOGIN_REGISTER_LINK}</LinkText>
                    </TouchableOpacity>
                  </FooterRow>
                </Footer>
              </BottomSection>
            </Form>
          </ScrollContent>
        </StyledScrollView>
      </KeyboardWrapper>
    </Screen>
  );
};

export default Login;
