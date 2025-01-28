import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import InputField from "@/components/form/InputField";
import { Eye, EyeOff } from "lucide-react-native";

const AccountInfoStep = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <View style={styles.container}>
      <InputField
        label="Email"
        name="email"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />

      <View style={styles.passwordContainer}>
        <InputField
          secureTextEntry={!showPassword}
          label="Password"
          name="password"
          placeholder="Enter your password"
          autoCapitalize="none"
          autoComplete="password"
          style={styles.passwordInput}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={togglePasswordVisibility}
        >
          {showPassword ? (
            <EyeOff size={24} color="#9CA3AF" />
          ) : (
            <Eye size={24} color="#9CA3AF" />
          )}
        </TouchableOpacity>
      </View>

      <InputField
        label="Phone number"
        name="phone_number"
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  passwordInput: {
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 40,
    padding: 4,
  },
});

export default AccountInfoStep;
