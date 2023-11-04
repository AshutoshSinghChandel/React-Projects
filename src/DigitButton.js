import React from 'react';
import { ACTIONS } from './App';
import './App.css';

export default function DigitButton({digit,dispatch,className}){
    return (
        <button className={className} onClick={() => dispatch({type: ACTIONS.ADD, payload : {digit}})}>
            {digit}
        </button>
    );
}
