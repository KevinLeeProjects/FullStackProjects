import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, currency } = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);
    const [newBudget, setNewBudget] = useState(budget);
    const handleBudgetChange = (event) => {
        if(event.target.value > 20000)
        {
            alert("Budget should not exceed 20,000");
        }
        else
        {
            setNewBudget(event.target.value);
        }

        if(event.target.value < totalExpenses)
        {
            alert("Budget cannot be lower than spending");
        }
        
    }
    return (
<div className='alert alert-secondary'>
<span>Budget: {currency}</span>
<input type="number" step="10" value={newBudget} onChange={handleBudgetChange} max="20000"></input>
</div>
    );
};
export default Budget;
