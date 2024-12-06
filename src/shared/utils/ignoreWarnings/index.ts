import { LogBox } from "react-native";

if (__DEV__) {
  const ignoreWarns = [
    "EventEmitter.removeListener",
    "[fuego-swr-keys-from-collection-path]",
    "Setting a timer for a long period of time",
    "ViewPropTypes will be removed from React Native",
    "AsyncStorage has been extracted from react-native",
    "exported from 'deprecated-react-native-prop-types'.",
    "Non-serializable values were found in the navigation state.",
    "VirtualizedLists should never be nested inside plain ScrollViews",
    "Require cycle:",
    "[MobX] Since strict-mode is enabled",
    "Warning: TextInput.Icon",
    "[Reanimated] Tried to modify key",
    "In React 18, SSRProvider",
    "react-native-snap-carousel:",
    "Warning: Failed prop type: Pagination: prop type",
    "Warning: Failed prop type: Carousel: prop type",
    "Warning: Failed prop type: RNImageVideoGridViewer",
    "An internal error occurred",
    "Flush triggered but queue",
    "Error: Seeking interrupted",
  ];

  const warn = console.warn;
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return;
      }
    }
    warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);
}
