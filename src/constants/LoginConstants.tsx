'use client'
import {isMobile} from 'react-device-detect';

export const emailRegex = /^[a-zA-Z0-9._%+-]+@aus\.edu$/;
export const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

export const LoginIconStyles = { color: 'action.active', mr: 1, my: 0.5, position: 'fixed', padding: '0px' }
export const LoginIconSize = { fontSize: isMobile ? '1.5rem' : '2rem' }
export const ElementWidth = { width: isMobile ? "80%" : "50%", maxWidth: "450px"}