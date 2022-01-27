const express = require("express");
const { accounts, writeJSON } = require("../data");

const router = express.Router();

router.get('/transfer', function(req, res){
    res.render('transfer');
});

router.post("/transfer", function(req, res){
    const fromBalance = accounts[req.body.from].balance;
    const toBalance = accounts[req.body.to].balance
    accounts[req.body.from].balance = fromBalance - parseInt(req.body.amount);
    accounts[req.body.to].balance = toBalance + parseInt(req.body.amount);

    writeJSON();

    res.render("transfer", {
        message: "Transfer Completed"
    });
});

router.get("/payment", function(req, res){
    res.render("payment", {
        account: accounts.credit
    });
});

router.post("/payment", function(req, res){
    accounts.credit.balance = parseInt(accounts.credit.balance) - parseInt(req.body.amount);
    accounts.credit.available = parseInt(accounts.credit.available) + parseInt(req.body.amount);

    writeJSON();

    res.render("payment", {
        message: "Payment Successful",
        account: accounts.credit
    });
});

module.exports = router;
