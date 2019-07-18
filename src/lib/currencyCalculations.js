export const calculateCurrencyAfterCommission = (amount, currencyRate) => {
  console.log(amount, currencyRate);
  const commissionRate = 0.01; // labeled this number (not a magic number)
  const commissionBase = Number((amount * commissionRate).toFixed(2));
  // const amountAfterCommission = Number((amount - commissionBase).toFixed(2));
  const result = Number((amount * currencyRate).toFixed(2));
  const commissionToCurrency = Number(
    (commissionBase * currencyRate).toFixed(2)
  );
  const amountAfterCommissionToCurrency = Number(
    (result - commissionToCurrency).toFixed(2)
  );

  return amountAfterCommissionToCurrency;
};

export const updateBalance = (
  currentBalance,
  baseCurrency,
  currencyTo,
  amount,
  buyedAmount
) => {
  console.log(buyedAmount);
  const checkBaseBalance = currentBalance.find(
    item => item.currency === baseCurrency
  );
  const checkToBalance = currentBalance.find(
    item => item.currency === currencyTo
  );
  console.log(checkBaseBalance, checkToBalance);
  let newCurrency;
  let balanceToUpdate;
  // This block checks if the initial endowment has selected baseCurrency
  if (!checkBaseBalance) {
    alert(`Please create ${baseCurrency} account first`);
    balanceToUpdate = currentBalance;
    // Control point before 1st buy
  } else if (currentBalance.length === 1) {
    newCurrency = [{ currency: currencyTo, value: buyedAmount }];
    balanceToUpdate = [...currentBalance, ...newCurrency];
  } else {
    // When there are more than 1 account, it checks...
    if (checkToBalance) {
      // ..if selected currency to buy is in userBalance
      balanceToUpdate = currentBalance;
      const existingObject = balanceToUpdate.find(
        item => item.currency === currencyTo
      );
      existingObject.value += buyedAmount;
      console.log(balanceToUpdate);
    } else {
      // ....if selected currency to buy is NOT in userBalance
      newCurrency = [{ currency: currencyTo, value: buyedAmount }];
      balanceToUpdate = [...currentBalance, ...newCurrency];
      console.log(currentBalance, balanceToUpdate);
    }
  }
  return balanceToUpdate.map(item => {
    if (item.currency === baseCurrency) {
      return { currency: baseCurrency, value: item.value - amount };
    }
    if (item.currency === currencyTo) {
      return {
        currency: currencyTo,
        value: item.value
      };
    } else {
      return { currency: item.currency, value: item.value };
    }
  });
};
