import { useEffect, useRef, type ReactNode } from "react";
import { Animated } from "react-native";

import { motion } from "../theme/tokens";

interface EditorialEntranceProps {
  readonly children: ReactNode;
  readonly delay?: number;
}

export function EditorialEntrance({ children, delay = 0 }: EditorialEntranceProps) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: motion.slow,
      delay,
      useNativeDriver: true,
    });

    animation.start();
    return () => animation.stop();
  }, [delay, progress]);

  return <Animated.View style={{ opacity: progress, transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }] }}>{children}</Animated.View>;
}
