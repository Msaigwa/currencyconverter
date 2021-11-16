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
       
                const currencyAr = ["EUR"]
                for (const key in this.rates.rates) {
                    currencyAr.push(key)
                }
                this.setState({ currencies: currencyAr.sort() })
           
    }

    // Event handler for the conversion
    convertHandler = () => {
        if (this.state.fromCurrency !== this.state.toCurrency) {
          
                    const result = this.state.amount * (this.rates.rates[this.state.toCurrency]);
                    this.setState({ result: result.toFixed(5) })
              
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
                <h2><span>Shumba money Exchange Currency Converter </span> </h2>
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