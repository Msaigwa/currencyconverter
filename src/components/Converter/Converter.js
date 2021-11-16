import React, { Component } from "react";
import axios from "axios";

import "./Converter.css";

class Converter extends Component {
    state = {
        result: null,
        fromCurrency: "USD",
        toCurrency: "ZWL",
        amount: 1,
        currencies: [],
    };


     rates = {
        "base":"EUR",
        "date":"2018-05-25",
        "rates": {

            "USD": 0.1675,
            "EUR": 3.1675,
            "ZWL": 1.1675
        
        }
        
     }

    // Initializes the currencies with values from the api
    componentDidMount() {
        /* axios
            .get("http://api.openrates.io/latest")
            .then(response => { */
                // Initialized with 'EUR' because the base currency is 'EUR'
                // and it is not included in the response
                const currencyAr = ["EUR"]
                for (const key in this.rates.rates) {
                    currencyAr.push(key)
                }
                this.setState({ currencies: currencyAr.sort() })
            /* })
            .catch(err => {
                console.log("Opps", err.message);
            }); */
    }

    // Event handler for the conversion
    convertHandler = () => {
        if (this.state.fromCurrency !== this.state.toCurrency) {
           /*  axios
                .get(`http://api.openrates.io/latest?base=${this.state.fromCurrency}&symbols=${this.state.toCurrency}`)
                .then(response => { */
                    const result = this.state.amount * (this.rates.rates[this.state.toCurrency]);
                    this.setState({ result: result.toFixed(5) })
               /*  })
                .catch(err => {
                    console.log("Opps", err.message);
                }); */
        } else {
            this.setState({ result: "You cant convert the same currency!" })
        }
    };

    // Updates the states based on the dropdown that was changed
    selectHandler = (event) => {
        if (event.target.name === "from") {
            this.setState({ fromCurrency: event.target.value })
        }
        if (event.target.name === "to") {
            this.setState({ toCurrency: event.target.value })
        }
    }

    render() {
        return (
            <div className="Converter">
                <h2><span>Currency Converter </span> </h2>
                <div className="Form">
                    <input
                        name="amount"
                        type="text"
                        value={this.state.amount}
                        onChange={event =>
                            this.setState({ amount: event.target.value })
                        }
                    />
                    <select
                        name="from"
                        onChange={(event) => this.selectHandler(event)}
                        value={this.state.fromCurrency}
                    >
                        {this.state.currencies.map(cur => (
                            <option key={cur}>{cur}</option>
                        ))}
                    </select>
                    <select
                        name="to"
                        onChange={(event) => this.selectHandler(event)}
                        value={this.state.toCurrency}
                    >
                        {this.state.currencies.map(cur => (
                            <option key={cur}>{cur}</option>
                        ))}
                    </select>
                    <button onClick={this.convertHandler}>Convert</button>
                </div>
                {this.state.result && 
                    <h3>{this.state.result}</h3>
                }
            </div>
        );
    }
}

export default Converter;