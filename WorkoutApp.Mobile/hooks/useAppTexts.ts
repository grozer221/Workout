import { useAppSelector } from '../behaviour/store';

export const useAppTexts = () => useAppSelector(s => s.appTexts.appTexts);
