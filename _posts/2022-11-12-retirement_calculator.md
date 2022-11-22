---
layout: post
title: "Retirement Calculator"
date: 2022-11-12
categories: [Python, Finance]
---

<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
        TeX: { equationNumbers: { autoNumber: "AMS" } }
    });
</script>
<script type="text/javascript" async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
<style type="text/css">
    .MathJax {
        font-size: 1.1em !important;
    }
</style>

Here's a simple calculator that lets you know how long you have to work before you can retire. We assume that you have the same inflation-adjusted cost of living throughout your whole life, and that your earnings likewise stay constant (adjusted for inflation) until retirement.

To figure out how long you have to work, we solve a simple equality between the net present value (NPV) of the money you will save between now and retirement, and the amount you will spend after retirement.

We use the following variables. All monetary values are in current dollars.

$$ S_0 = $$ current savings

$$ I = $$ after-tax income per year

$$ E = $$ expenditures per year

$$ L = $$ expected remaining life expectancy

$$ y_B = $$ years before retirement, from now

$$ y_A \equiv L - y_B = $$ years to live after retirement

$$ r = $$ average rate of return on investments

$$ i = $$ average inflation

$$ R = $$ expected annual retirement money (401k, social security, medicare, etc.)

## The amount you will save

This is a simple $$y_B$$-year growing annuity where income and expenditures keep pace with inflation.

We keep the equations simple by assuming that money is deposited or withdrawn at the end of every year. In order to model a more realistic constant withdraw/deposit rate, we could simply replace the $$r$$ and $$i$$ values with the continuously compounded rates.

$$ NPV = S_0 + \frac{(I - E)}{r - i} (1 - (\frac{1 + i}{1 + r}) ^ {y_B}) $$ 

## The amount you will spend

This is a $$y_A$$-year growing annuity, starting with an expenditure of $$E (1 + i) ^ {y_B}$$ on the first year, and with the final result shifted back by $$y_B$$ years.

$$ NPV = \frac{(E - R) (1 + i) ^ {y_B}}{r - i} (1 - (\frac{1 + i}{1 + r}) ^ {y_A}) (\frac{1 + i}{1 + r}) ^ {y_B} $$

## Solving for $$y_B$$

Now we can figure out the number of years you will need to work before retiring:

Define $$ x \equiv \frac{1 + i}{1 + r} $$.

$$ S_0 + \frac{(I - E)}{r - i} (1 - x ^ {y_B}) = \frac{(E - R) (1 + i) ^ {y_B}}{r - i} (1 - x ^ {y_A}) x ^ {y_B} $$

$$ x ^ {y_A} \equiv x ^ L / x ^ {y_B} $$

$$ S_0 + \frac{(I - E)}{r - i} (1 - x ^ {y_B}) = \frac{(E - R) (1 + i) ^ {y_B}}{r - i} (x ^ {y_B} - x ^ L) $$

$$ S_0 + \frac{(I - E)}{r - i} = \frac{(E - R) (1 + i) ^ {y_B}}{r - i} (x ^ {y_B} - x ^ L) + \frac{(I - E)}{r - i} x ^ {y_B}$$

$$ S_0 + \frac{(I - E)}{r - i} = (\frac{(I - E)}{r - i} + \frac{(E - R) (1 + i) ^ {y_B}}{r - i}) x ^ {y_B} - \frac{(E - R) (1 + i) ^ {y_B}}{r - i} x ^ L $$

$$ S_0 (r - i) + (I - E) = ((I - E) + (E - R) (1 + i) ^ {y_B}) x ^ {y_B} - (E - R) (1 + i) ^ {y_B} x ^ L $$

$$ S_0 (r - i) + (I - E) = (I - E) x ^ {y_B} + (E - R) (x + i x) ^ {y_B} - (E - R) x ^ L (1 + i) ^ {y_B} $$

We see this is a polynomial of order y_B, meaning there should be $$ y_B $$ solutions to this equation. Common sense tells us that exactly one of those solutions should be purely real (assuming you are able to retire). We can solve for $$ y_B $$ using a simple Newton-Raphson method.

## The Calculator

Please input all values in current dollars.

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/brython@3.8.9/brython.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/brython@3.8.9/brython_stdlib.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<body onload="brython()"></body>

<script type="text/python" src="/scripts/2022-11-12/retirement.py"></script>

<div class="form-group">
    <table style="width:100%">
        <tr>
            <td>
                <label for="I">Annual Income After Tax and Retirement Funds</label>
            </td>
            <td>
                <input type="text" class="form-control" id="I" value="130000">
            </td>
        </tr>
        <tr>
            <td>
                <label for="E">Annual Expenditures</label>
            </td>
            <td>
                <input type="text" class="form-control" id="E" value="80000">
            </td>
        </tr>
        <tr>
            <td>
                <label for="R">Expected Annual Retirement Income</label>
            </td>
            <td>
                <input type="text" class="form-control" id="R" value="20000">
            </td>
        </tr>
        <tr>
            <td>
                <label for="i">Average Inflation</label>
            </td>
            <td>
                <input type="text" class="form-control" id="i" value="0.025">
            </td>
        </tr>
        <tr>
            <td>
                <label for="r">Average Return on Investments</label>
            </td>
            <td>
                <input type="text" class="form-control" id="r" value="0.075">
            </td>
        </tr>
        <tr>
            <td>
                <label for="Le">Expected Lifespan</label>
            </td>
            <td>
                <input type="text" class="form-control" id="Le" value="100">
            </td>
        </tr>
        <tr>
            <td>
                <label for="Lo">Current Age</label>
            </td>
            <td>
                <input type="text" class="form-control" id="Lo" value="33">
            </td>
        </tr>
        <tr>
            <td>
                <label for="S0">Current Savings</label>
            </td>
            <td>
                <input type="text" class="form-control" id="S0" value="50000">
            </td>
        </tr>
        <tr>
            <td>
                <label for="continuous">Continuous Deposits and Withdraws (vs. End-of-Year)</label>
            </td>
            <td>
                <input type="checkbox" class="form-control" id="continuous">
            </td>
        </tr>
    </table>
</div>
<button id="submit">Submit</button>
<textarea id="output" rows="4" style="width: 90%; max-width: 90%" readonly>
Output
</textarea>
