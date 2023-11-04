import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import './App.css';

export const ACTIONS = {
  ADD : 'addition',
  DELETE : 'delete',
  CHOOSE_OPERATION : 'choose',
  EVALUATE : 'evaluate',
  CLEAR : 'clear'  
}

function reducer(state,{type, payload}){
  switch(type){
    case ACTIONS.ADD :
        if(state.overwrite)
          return {
            ...state,
            currentOperand: payload.digit,
            overwrite: false
          }
        if(state.currentOperand === "0" && payload.digit === "0")
          return state;
        if(payload.digit === "." && state.currentOperand!= null && state.currentOperand.includes("."))
          return state;
        if(state.currentOperand == null && payload.digit === ".")
        return {
          ...state,
          currentOperand : `0${payload.digit}`
        }
        return {
          ...state,
          currentOperand : `${state.currentOperand || ""}${payload.digit}`,
        }
    case ACTIONS.CLEAR :
      return {};
    case ACTIONS.CHOOSE_OPERATION :
      if(state.currentOperand == null && state.previousoperand == null)
        return state;
      if(state.currentOperand == null)
      return{
        ...state,
        operation : payload.operation
      }
      if(state.previousoperand == null)
        return {
          ...state,
          operation : payload.operation,
          previousoperand : state.currentOperand,
          currentOperand: null
        }
      return{
        ...state,
        operation : payload.operation,
        previousoperand: evaluate(state),
        currentOperand : null
      }
    case ACTIONS.EVALUATE : 
      if(state.currentOperand == null || state.operation == null || state.previousoperand == null)
        return state;
      return {
        ...state,
        overwrite: true,
        previousoperand: null,
        operation: null,
        currentOperand: evaluate(state)
      }
    case ACTIONS.DELETE : 
      if(state.currentOperand == null)
        return state;
      if(state.currentOperand.length === 1)
        return {
          ...state,
          currentOperand: null
        }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0,-1)
      }
    default: 
      console.log('This is default case');
  }
}

const evaluate = ({currentOperand,previousoperand,operation}) => {
  const prev = parseFloat(previousoperand);
  const current = parseFloat(currentOperand);
  let computation = "";
  if(isNaN(prev) || isNaN(current))
    return " ";
  switch(operation){
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev-current;
      break;
    case '*':
      computation = prev*current;
      break;
    case '/':
      computation = Math.max(prev,current)/Math.min(prev,current);
      break;
    default:
      console.log("this is default statement");
  }
  return computation.toString();
}

function App() {
  const [{currentOperand, previousoperand, operation},dispatch] = useReducer(reducer,{});

  return (
      <div className='calculator'>
        <div className='output'>
          <div style={{color: 'grey',fontSize: '1.1rem'}} className='previous-operand'>{previousoperand} {operation}</div>
          <div style={{color: 'white',fontSize: '2rem'}} className='current-operand'>{currentOperand}</div>
        </div>
        <div className='buttons'>
          <button onClick={() => dispatch({type:ACTIONS.CLEAR})} className='span-two red'>AC</button>
          <button className='red' onClick={() => dispatch({type: ACTIONS.DELETE})}>DEL</button>
          <OperationButton className='blue' operation="-" dispatch={dispatch}/>
          <DigitButton digit="1"  dispatch={dispatch} />
          <DigitButton digit="2"  dispatch={dispatch} />
          <DigitButton digit="3"  dispatch={dispatch} />
          <OperationButton className='blue' operation="+" dispatch={dispatch}/>
          <DigitButton digit="4"  dispatch={dispatch} />
          <DigitButton digit="5"  dispatch={dispatch} />
          <DigitButton digit="6"  dispatch={dispatch} />
          <OperationButton className='blue' operation="*" dispatch={dispatch}/>          
          <DigitButton digit="7"  dispatch={dispatch} />
          <DigitButton digit="8"  dispatch={dispatch} />
          <DigitButton digit="9"  dispatch={dispatch} />
          <OperationButton className='blue' operation="/" dispatch={dispatch}/>
          <DigitButton digit="."  dispatch={dispatch} />
          <DigitButton digit="0"  dispatch={dispatch} />
          <button className='span-threefour' onClick={() => dispatch({type:ACTIONS.EVALUATE})}>=</button>
        </div>
      </div>
  );
}

export default App;
