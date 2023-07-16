import { useEffect, EffectCallback, DependencyList } from 'react';
import { useIsFocused } from '@react-navigation/native';

export const useAppEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused){
      effect();
    }
  }, [isFocused]);
}
