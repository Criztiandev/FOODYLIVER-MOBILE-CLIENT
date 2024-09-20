import React, { forwardRef, ReactNode, useCallback } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  View,
} from "react-native";
import { cn } from "@/lib/utils";

interface Props extends Omit<BottomSheetModalProps, "children"> {
  className?: string;
  children: ReactNode;
}

const BottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ onChange, className, children, ...rest }, ref) => {
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      ),
      []
    );

    return (
      <BottomSheetModalProvider>
        <View className="flex-1 absolute bottom-0">
          <BottomSheetModal
            {...rest}
            ref={ref}
            onChange={onChange}
            enablePanDownToClose
            backdropComponent={renderBackdrop}
          >
            <BottomSheetView style={{ flex: 1 }}>
              <SafeAreaView className="flex-1">
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={{ flex: 1 }}
                >
                  {children}
                </KeyboardAvoidingView>
              </SafeAreaView>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    );
  }
);

BottomSheet.displayName = "BottomSheet";

export default BottomSheet;
