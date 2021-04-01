import { QUOTES } from '../constants/data';

export const getRandomQuote = () => QUOTES[Math.floor(Math.random() * QUOTES.length)];
