import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";


let transaction = [
  {
    "id": 1,
    "timestamp": "2021-03-10T15:04:02.072Z",
    "amount": 100,
    "operation": "Add"
  },
  {
    "id": 2,
    "timestamp": "2021-03-10T15:04:04.748Z",
    "amount": 500,
    "operation": "Add"
  },
  {
    "id": 3,
    "timestamp": "2021-03-10T15:04:07.443Z",
    "amount": 50,
    "operation": "Remove"
  }
]


const App = () => {
  const [balance, setBalance] = useState(0)
  const [transactionList, setTransactionList] = useState(transaction)
  const [amount, setAmount] = useState(0)

  const onChange = (event) => {
    setAmount(event.target.value)
  }

  const getTimeStamp = () => {
    const timestamp = new Date().toISOString()
    return timestamp
  }

  const addTransaction = () => {
    if (parseInt(amount) > 0) {
      let balanceAmount = parseInt(balance) + parseInt(amount);
      setBalance(balanceAmount)
      let transaction = {
        id: transactionList?.length + 1,
        timestamp: getTimeStamp(),
        amount: amount,
        operation: "Add",
      }
      setTransactionList((prevTransactionList) => { return [...prevTransactionList, transaction] })
      setAmount(0)
    } else {
      if (!amount || parseInt(amount) === 0)
        alert('please enter a amount ')
    }
  }

  const removeTransaction = () => {
    console.log(!amount, amount === 0, "Amount", amount)
    if (amount && parseInt(amount) > 0 && balance > 0 && balance >= parseInt(amount)) {
      let balanceAmount = parseInt(balance) - parseInt(amount);
      setBalance(balanceAmount)
      let transaction = {
        id: transactionList?.length + 1,
        timestamp: getTimeStamp(),
        amount: amount,
        operation: "Remove",
      }
      setTransactionList((prevTransactionList) => { return [...prevTransactionList, transaction] })
      setAmount(0)
    } else {
      if (balance === 0)
        alert('Your balance is zero rupee you cannot make any tranction')
      else if (balance < parseInt(amount))
        alert('Your balance is less than your entered amount')
      else if (!amount || parseInt(amount) === 0)
        alert('please enter a amount')
    }
  }


  useEffect(() => {
    let balanceTotal = 0
    transactionList.map((transaction) => {
      if (transaction.operation === 'Add') {
        balanceTotal = balanceTotal + transaction.amount
      } else if (transaction.operation === 'Remove') {
        balanceTotal = balanceTotal - transaction.amount
      }
    })
    setBalance(balanceTotal)
  }, [])

  return (
    <div>
      <h1 className="banner">Expense Tracker - Basic</h1>
      <fieldset className="fieldset-1">
        <p className="banner-para">
          {`Balance: ${balance}`} </p>
        <input className="banner-input" type="number" value={amount} onChange={onChange} />
        <div className="banner-button">
          <button disabled={!amount} onClick={addTransaction}>Add</button>
          <button disabled={!amount} onClick={removeTransaction}>Remove</button>
        </div>
      </fieldset>
      <fieldset className="fieldset-2">
        <h4 className="hero-heading">Transactions:</h4>
        {transactionList.map((item, index) => {
          return <div key={item.id}>{`${item.id}. ${item.timestamp} - ${item.amount} - ${item.operation}`}</div>
        })}
      </fieldset>
    </div>
  );
}

export default App;
