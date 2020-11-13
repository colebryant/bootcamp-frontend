const newArray = customers.map(customer => {
    return customer.contacts.email.join(", ");
});

console.log(newArray);