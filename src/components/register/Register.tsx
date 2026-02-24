import React, { useState } from 'react';
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
  FooterText,
  LinkText,
  BottomSection,
  ButtonWrapper,
  KeyboardWrapper,
  LogoContainer,
  StyledScrollView,
} from './Register.styles';

const registerSchema = z
  .object({
    name: z.string().min(1, STRINGS.REGISTER_NAME_REQUIRED),
    email: z
      .string()
      .min(1, STRINGS.REGISTER_EMAIL_REQUIRED)
      .email(STRINGS.REGISTER_EMAIL_INVALID),
    password: z
      .string()
      .min(1, STRINGS.REGISTER_PASSWORD_REQUIRED)
      .min(6, STRINGS.REGISTER_PASSWORD_MIN),
    confirmPassword: z
      .string()
      .min(1, STRINGS.REGISTER_CONFIRM_PASSWORD_REQUIRED),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: STRINGS.REGISTER_PASSWORDS_MISMATCH,
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

type RegisterProps = {
  logo: React.ReactNode;
  onSubmit?: (
    values: Omit<RegisterFormValues, 'confirmPassword'>,
  ) => void | Promise<void>;
  onNavigateToLogin?: () => void;
};

const Register = ({ logo, onSubmit, onNavigateToLogin }: RegisterProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const name = watch('name');
  const email = watch('email');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const onFormSubmit = async (values: RegisterFormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const { confirmPassword: _, ...payload } = values;
      await onSubmit?.(payload);
    } finally {
      setIsSubmitting(false);
    }
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
              <Title>{STRINGS.REGISTER_TITLE}</Title>
              <Subtitle>{STRINGS.REGISTER_SUBTITLE}</Subtitle>
            </Header>

            <Form>
              <InputWrapper>
                <Label>{STRINGS.REGISTER_NAME}</Label>
                <StyledInput
                  placeholder={STRINGS.REGISTER_NAME_PLACEHOLDER}
                  placeholderTextColor={theme.color.placeholder}
                  value={name}
                  onChangeText={text =>
                    setValue('name', text, { shouldValidate: true })
                  }
                  autoCapitalize="words"
                  editable={!isSubmitting}
                />
                {errors.name?.message && (
                  <ErrorText>{errors.name.message}</ErrorText>
                )}
              </InputWrapper>

              <InputWrapper>
                <Label>{STRINGS.REGISTER_EMAIL}</Label>
                <StyledInput
                  placeholder={STRINGS.REGISTER_EMAIL_PLACEHOLDER}
                  placeholderTextColor={theme.color.placeholder}
                  value={email}
                  onChangeText={text =>
                    setValue('email', text, { shouldValidate: true })
                  }
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isSubmitting}
                  textAlign="right"
                />
                {errors.email?.message && (
                  <ErrorText>{errors.email.message}</ErrorText>
                )}
              </InputWrapper>

              <InputWrapper>
                <Label>{STRINGS.REGISTER_PASSWORD}</Label>
                <StyledInput
                  placeholder={STRINGS.REGISTER_PASSWORD_PLACEHOLDER}
                  placeholderTextColor={theme.color.placeholder}
                  value={password}
                  onChangeText={text =>
                    setValue('password', text, { shouldValidate: true })
                  }
                  secureTextEntry
                  editable={!isSubmitting}
                  textAlign="right"
                />
                {errors.password?.message && (
                  <ErrorText>{errors.password.message}</ErrorText>
                )}
              </InputWrapper>

              <InputWrapper>
                <Label>{STRINGS.REGISTER_CONFIRM_PASSWORD}</Label>
                <StyledInput
                  placeholder={STRINGS.REGISTER_CONFIRM_PASSWORD_PLACEHOLDER}
                  placeholderTextColor={theme.color.placeholder}
                  value={confirmPassword}
                  onChangeText={text =>
                    setValue('confirmPassword', text, { shouldValidate: true })
                  }
                  secureTextEntry
                  editable={!isSubmitting}
                  textAlign="right"
                />
                {errors.confirmPassword?.message && (
                  <ErrorText>{errors.confirmPassword.message}</ErrorText>
                )}
              </InputWrapper>
            </Form>
            <BottomSection>
              <ButtonWrapper>
                <PrimaryButton
                  disabled={!isValid || isSubmitting}
                  onPress={handleSubmit(onFormSubmit)}
                >
                  <PrimaryButtonText>
                    {STRINGS.REGISTER_SUBMIT}
                  </PrimaryButtonText>
                </PrimaryButton>
              </ButtonWrapper>
              <Footer>
                <FooterText>{STRINGS.REGISTER_HAS_ACCOUNT}</FooterText>
                <TouchableOpacity
                  onPress={onNavigateToLogin}
                  disabled={isSubmitting}
                >
                  <LinkText>{STRINGS.REGISTER_LOGIN_LINK}</LinkText>
                </TouchableOpacity>
              </Footer>
            </BottomSection>
          </ScrollContent>
        </StyledScrollView>
      </KeyboardWrapper>
    </Screen>
  );
};

export default Register;
