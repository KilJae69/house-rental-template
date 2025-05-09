import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function useLazyLoad(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  useEffect(() => {
    
    if (inView && !isLoaded) {
      setIsInView(true);
      setIsLoaded(true);
    }
  }, [inView, isLoaded]);

  return { ref, isInView, isLoaded };
}