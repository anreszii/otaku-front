import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import { LinearGradient } from "expo-linear-gradient";
import Typography from "./Typography";

export default function CodeInput({
  value,
  setValue,
  getCellOnLayoutHandler,
  CELL_COUNT,
  ref,
  ...props
}: any) {
  return (
    <View>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <>
            {isFocused ? (
              <LinearGradient
                key={index}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#7210FF", "#9D59FF"]}
                style={
                  index === 3
                    ? {
                        width: 40,
                        height: 45,
                        borderRadius: 25,
                      }
                    : {
                        width: 40,
                        height: 45,
                        borderRadius: 25,
                        marginRight: 16,
                      }
                }
              >
                <View
                  style={{
                    borderRadius: 25,
                    flex: 1,
                    margin: 2,
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: 14,
                    paddingRight: 14,
                  }}
                >
                  <Text style={styles.cell}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              </LinearGradient>
            ) : (
              <View
                key={index}
                style={
                  index === 3
                    ? {
                        borderRadius: 25,
                        flex: 1,
                        margin: 2,
                        backgroundColor: "#fff",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: 14,
                        paddingRight: 14,
                        paddingTop: 5,
                        width: 40,
                        height: 45,
                      }
                    : {
                        borderRadius: 25,
                        flex: 1,
                        margin: 2,
                        backgroundColor: "#fff",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: 14,
                        paddingRight: 14,
                        marginRight: 16,
                        paddingTop: 5,
                        width: 40,
                        height: 45,
                      }
                }
              >
                <Text style={styles.cell}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  codeFieldRoot: { marginTop: 20, marginBottom: 20 },
  cell: {
    width: 40,
    height: 45,
    lineHeight: 38,
    fontSize: 24,
    textAlign: "center",
    borderRadius: 25,
  },
});
