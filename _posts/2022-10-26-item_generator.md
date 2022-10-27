---
layout: post
title: "Magical Item Generator"
date: 2022-10-26
categories: web
---

This is another quick webapp I made when testing out AWS services. This one uses an Aurora Serverless database, with a Lambda interface. I'm using the Function URL option on the Lambda instance, so that I don't have to go through the whole API creation process. This app allows you to either add random magical items to an inventory, or empty out the inventory. This is of course entirely useless, but there's not much you can do with a public webapp that writes to a single common database.

Note that the first time you try to perform an action, it will take about a minute. This is because the lambda instance and database both have to cold start and boot up an instance. I'm not paying money to have these stay up lol.

# The Code

[https://github.com/MattUnderscoreZhang/item-generator/](https://github.com/MattUnderscoreZhang/item-generator/)

# The App

<script>
    const url = "https://zrali44k7b4zk36qurwgxdes3m0gvnqq.lambda-url.us-east-1.on.aws/"

    async function submit() {
        var function_selection = document.getElementById("item").value;
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'function': function_selection
            })
        };

        // make waiting icon appear and disable submit button
        document.getElementById("waiting").style.display = "block";
        document.getElementById("submit").disabled = true;

        await fetch(url, params);
        await get_items();

        // make waiting icon disappear and enable submit button
        document.getElementById("waiting").style.display = "none";
        document.getElementById("submit").disabled = false;
    };

    async function get_items() {
        const params = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(url, params);
        const data = await response.json();
         
        var table = document.getElementById("table")
        fill_table(table, data);
    };

    function fill_table(table, data) {
        // table header
        const column_names = ['Item Name', 'Price (Gold)', 'Description'];
        var row = table.insertRow(-1);
        for (var i = 0; i < column_names.length; i++) {
            var headerCell = document.createElement("th");
            headerCell.innerHTML = column_names[i];
            row.appendChild(headerCell);
        }

        // table body
        const columns = ['name', 'price', 'description'];
        for (var i = 0; i < data.length; i++) {
            row = table.insertRow(-1);
            for (var j = 0; j < columns.length; j++) {
                var column = document.createElement("td");
                column.innerHTML = data[i][columns[j]];
                row.appendChild(column);
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById("submit").addEventListener("click", submit);
    });
</script>

<div align="center">
    <select id="item" onchange="get_items()">
        <option value="add_random_item">Add Random Item</option>
        <option value="delete_items">Delete All Items</option>
    </select>
    <button id="submit">Submit</button>
    <br>
    <div id="waiting" style="display: none;"><br>Waiting...</div>
    <br>
    <table id="table" border="1"></table>
</div>
