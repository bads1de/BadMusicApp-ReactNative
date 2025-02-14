import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

interface CustomButtonProps extends TouchableOpacityProps {
  label: string;
  isActive: boolean;
  activeStyle?: any;
  inactiveStyle?: any;
  activeTextStyle?: any;
  inactiveTextStyle?: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  isActive,
  activeStyle,
  inactiveStyle,
  activeTextStyle,
  inactiveTextStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, isActive ? activeStyle : inactiveStyle]}
      {...props}
    >
      <Text
        style={[
          styles.buttonText,
          isActive ? activeTextStyle : inactiveTextStyle,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
  },
});

export default CustomButton;
