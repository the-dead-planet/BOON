/**
 * React Context implementation for services.
 * See https://reactjs.org/docs/context.html for context documentation
 */
import React, { useContext } from 'react';
import Services from './services';

export const ServicesContext = React.createContext<Services | null>(null);

/**
 * Helper function to make usage easier, kinda like `useState` and `useStyles`.
 */
export const useServices = () => useContext(ServicesContext);
