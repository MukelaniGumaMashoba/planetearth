import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { WebView } from "react-native-webview";
var md5 = require('md5');


// Style sheet
const styles = StyleSheet.create({
    webViewWrapper: {
        width: "100%",
        flex: 1
    },
    pfWrapper: {
        width: "100%",
        flex: 1
    },
    pfButton: {
        height: 40,
        width: "100%"
    }
});

const PayFastWebView = props => {
    // State constants
    const [html, setHtml] = useState("");
    const uri = props.sandbox ? "https://sandbox.payfast.co.za/eng/process" : "https://www.payfast.co.za/eng/process";

    let datas = {};

    // Adding returns url to the data
    for (const key in props.data) {
        datas[key] = props.data[key];
        if (key === "merchant_key") {
            datas.return_url = 'http://notify.infinityfreeapp.com/success.php';
            datas.cancel_url = 'http://notify.infinityfreeapp.com/error.php';
        }
    }

    //Setting the frequency
    let frequency = ""
    if (props.data.frequency) {
        if (props.data.frequency === 3) {
            frequency = "Monthly"
        } else
            if (props.data.frequency === 4) {
                frequency = "Quarterly"
            } else
                if (props.data.frequency === 5) {
                    frequency = "Biannually"
                } else
                    if (props.data.frequency === 6) {
                        frequency = "Annual"
                    }
    }

    // Functions
    const setWebViewHandler = (data) => {

        // Check if signature is required
        if (props.signature) {

            // Generating the signature
            let getString = "";
            for (const key in data) {
                getString += key + "=" + encodeURIComponent(data[key])
                    .replace(/!/g, '%21')
                    .replace(/'/g, '%27')
                    .replace(/\(/g, '%28')
                    .replace(/\)/g, '%29')
                    .replace(/\*/g, '%2A')
                    .replace(/~/g, '%7E')
                    .replace(/%20/g, '+') + '&';
            }

            //Deleting the last ampersand
            let newString = getString.slice(0, getString.length - 1)

            let signatureString = newString;

            if (props.passphrase !== null && props.passphrase !== undefined) {
                signatureString = newString + "&passphrase=" + props.passphrase;
            }
            const signature = md5(signatureString);
            getString += "signature=" + signature;

            datas = { ...data, signature: signature }
        }

        ////////////////////////////////////////////Generating html form\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        const { bodyBackground, pageBackground, showLogo, headText, bodyTextColor, headTextColor } = props.style
        let Html = `
        <html>
            <head>
                <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
                <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                    <style type="text/css">
                        body
                        {
                            width: 100%;
                            height: 100%;
                            background-color: ${pageBackground ? pageBackground : "black"};
                            opacity: 0.9
                            --smallFont: 2rem;
                            --mediumFont: 3rem;
                            --bigFont: 4rem;
                        }
                        .card{
                            width: 90%;
                            border-radius: 50px;
                            text-align: center;
                            margin: auto;
                            height: 50%;
                            position: relative;
                            top: 50%;
                            transform: translateY(-50%);
                            box-shadow: 0px 0px 35px #ccc;
                        }
        
                        .center{
                            margin: auto;
                            position: relative;
                            top: 0; left: 0; bottom: 0; right: 0;
                        }
        
                        .header{
                            background-color: #dc3545;
                            border-radius: 50px 50px 0px 0px;
                            padding: 20px;
                            height: 10vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
        
                        h1{
                            font-size: 60px;
                            color: ${headTextColor ? headTextColor : "white"}
                        }
        
                        .btn{
                            width: 35%;
                            font-size: 50px;
                            padding: 20;
                            border-radius: 60px
                        }
        
                        .outer {
                            display: table;
                            position: relative;
                            top: 0;
                            left: 0;
                            height: 80%;
                            width: 100%;
                        }
        
                        .middle {
                            display: table-cell;
                            vertical-align: middle;
                        }
                        .amount{
                            font-size: var(--mediumFont);
                        }
                        .inner {
                            margin: auto
                        }
                        .card-body{
                            background-color: ${bodyBackground ? bodyBackground : "white"}
                            border-radius: 0px 0px 50px 50px;
                        }
                        table{
                            width: 90%;
                            margin: auto auto 90px auto;
                            color: ${bodyTextColor ? bodyTextColor : "black"}
                        }
                        h2{
                            font-size: var(--mediumFont)
                        }
                        .payfast-text{
                            font-size: var(--smallFont)
                        }
                        .payfast{
                            height: 50px;
                        }
                    </style>
                </head>
                <body>
                    <div class="card">
                        <div class="header ">
                            <h1>${headText ? headText : "Almost there!"}</h1>
                        </div>
                        <div class="card-body">
                            <div class="outer">
                                <div class="middle" >
                                    <div class="inner" >`

        let logo = showLogo ? ` <div> <p class="payfast-text">Payments powered by</p>
                                        <img class="payfast" src="https://payfast.wpenginepowered.com/wp-content/uploads/2021/11/PayFast-main-logo.svg" alt="Italian Trulli"/>
                                        </div>` : `<div></div>`;
        let code = (`${Html}
                                        <table>
                                            <tr>
                                                <th><h2>Product:</h2></th>
                                                <td><h2>${datas.item_name}</h2></td>
                                            </tr>
                                            <tr>
                                                <th><h2>Due Today:</h2></th>
                                                <td><h2>R <span class="amount">${datas.amount}</span></h2></td>
                                            </tr>
                                            <tr>
                                                <th><h2>Recurring:</h2></th>
                                                <td><h2>R <span class="amount">${datas.recurring_amount ? datas.recurring_amount + " " + frequency : "0.00"}</span></h2></td>
                                            </tr>
                                        </table>
                                        <form id="myForm" action="${uri}" method="post">`);

        for (const name in datas) { code += `<input name="${name}" type="hidden" value="${datas[name]}" />` }
        code += `<input id="myBtn" class="btn btn-danger slide_from_left" onclick="myFunction()" type="submit" value="Pay Now" /></form>
                                    </div>
                                </div>
                            </div>
        ${logo}
                        </div>
                    </div>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
                    <script>
                        function myFunction() { 
                            document.getElementById("myBtn").disabled = true;
                            document.getElementById("myForm").submit();
                        }
                    </script>
                </body>
            </html>`

        setHtml(code)
        ////////////////////////////////////////////Generating html form\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    };

    useEffect(() => {
        setWebViewHandler(datas)
    }, [])

    // Render the component
    return (
        <View style={styles.pfWrapper}>
            <View style={styles.webViewWrapper}>
                <WebView
                    style={styles.webViewWrapper}
                    originWhitelist={['*']}
                    source={{ html: html }}
                    onMessage={(event) => {
                        let value = event.nativeEvent.data === "Success" ? true : false
                        props.callback(value)
                        props.onClick && props.onClick();
                    }}
                />
            </View>
        </View>
    );
}

export default PayFastWebView;