---
layout: post
title: "Unicode Obfuscator webapp with AWS Lambda"
date: 2022-10-22
categories: web
---

This is a quick webapp I created to test out AWS Lambda. The purpose is to take an input string and obfuscate it by inserting zero-width unicode characters, and by replacing letters with lookalike characters.

{% highlight markdown %}
Example:
- Input: "This is a test sentence."
- Output: "This⁯ is a t⁩est seոtеnсе."
- Output with unicode characters marked:
  "This<u206f> is a t<u2069>est se<u0578>t<u0435>n<u0441><u0435>."
{% endhighlight %}

Depending on the environment in which you're seeing the strings, the output should look pretty much identical to the input. You will get a randomized result each time you generate an output.

What is this useful for? Why malware of course! Or pranking your friends. Maybe a combination of both? I renounce any legal liability.

# The Code

[https://github.com/MattUnderscoreZhang/UnicodeObfuscation/](https://github.com/MattUnderscoreZhang/UnicodeObfuscation/)

# The App

<style>
    textarea {
        font-family: courier new;
    }
</style>

<script>
    async function obfuscateInput() {
        const url = "https://kvywb88030.execute-api.us-east-1.amazonaws.com/default/"
        var input = document.getElementById("input").value;
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({input: input})
        };
        const result = await fetch(url, params);
        const data = await result.json();
        document.querySelector("#output").innerHTML = data.body
    };
    async function copyOutput() {
        const output = document.querySelector("#output").innerHTML;
        window.navigator.clipboard.writeText(output);
    };
    document.addEventListener("DOMContentLoaded", function() {
        document.querySelector("#submit").addEventListener("click", obfuscateInput);
        document.querySelector("#copy").addEventListener("click", copyOutput);
    });
</script>

<textarea id="input" rows="4" style="width: 100%; max-width: 100%">
Enter text to obfuscate here.
</textarea>
<button id="submit">Submit</button>
<textarea id="output" rows="4" style="width: 100%; max-width: 100%" readonly>
Output
</textarea>
<button id="copy">Copy to Clipboard</button>
