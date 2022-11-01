---
layout: post
title: "Using Brython to Run Python in the Browser"
date: 2020-07-06
categories: web, python
---
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/brython@3.8.9/brython.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/brython@3.8.9/brython_stdlib.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<body onload="brython()"></body>

Since most of my code is written in Python, I wanted a way of displaying it interactively on my website. For this purpose, I checked out the [Brython package][brython]. Brython emulates Python 3 in the browser, allowing you to run your code without major modifications.

Using this package is pretty simple. All you need to do is add the following two lines to your Markdown file in Jekyll. Note that I'm including a standalone `<body>` tag because we need the browser to autorun Brython once the page is loaded.

{% highlight html %}
<script type="text/javascript"
    src="https://cdn.jsdelivr.net/npm/brython@3.8.9/brython.min.js">
</script>
<script type="text/javascript"
    src="https://cdn.jsdelivr.net/npm/brython@3.8.9/brython_stdlib.js">
</script>
<body onload="brython()"></body>
{% endhighlight %}

After this, you can import your Python code by either typing your code in between `<script>` tags or by importing it using `<script src>`:

{% highlight html %}
<script type="text/python" src="/scripts/example.py"></script>
{% endhighlight %}

or

{% highlight html %}
<script type="text/python">
from browser import document

def say_hi(event):
    document["display"].innerHTML = "Hello world!"

document["mybutton"].bind("click", say_hi)
</script>
{% endhighlight %}

Note that we've imported a library called browser, which contains web-specific functionality and is a part of Brython. Specifically, we're using browser.document, which allows us to access HTML elements from the webpage and edit them. To find out more, check out the [Brython tutorial][tutorial].

Also add the following HTML code, so that your page knows there's a button called "mybutton" and a pre-formatted text area called "display".

{% highlight html %}
<button id="mybutton">Say hi!</button>
<pre id="display" style="color:blue">[Click the button!]</pre>
{% endhighlight %}

## The Button

<script type="text/python">
from browser import document
from browser import timer

def say_hi(event):
    document["display"].innerHTML = "Hello world!"

document["mybutton"].bind("click", say_hi)
</script>

<button id="mybutton">Say hi!</button>
<pre id="display" style="color:blue">[Click the button!]</pre>

## Watching Soccer

As a more relevant case, take a look at the soccer script I posted below. You can watch a real time game of soccer in the browser, with an announcer! The soccer game goes until a side scores 10 points, because I don't know how soccer works. The two teams are the Flying Gorillas vs. the One Eyed Snakes, with the Gorillas at an advantage. There are three players on each team, one goalie, one defender, and one attacker. The names on one team all start with A and the names on the other team all start with B.

Note that instead of print statements, I use HTML manipulation. Also, instead of using Python packages I use Javascript libraries (also included with Brython). Plus, note the use of the Brython-specific keyword "async", which is necessary to make the script sleep.

<pre id="code" style="height:500px"></pre>
<script type="text/javascript">
    $("#code").load("/scripts/2020-07-06/soccer.py");
</script>

<script type="text/python" src="/scripts/2020-07-06/soccer.py"></script>
<button id="playsoccer">Play soccer!</button>
<textarea id="soccergame" style="resize:none; width:100%" rows="20">[Game will show up here.]</textarea>

[brython]: https://github.com/brython-dev/brython
[tutorial]: https://brython.info/static_tutorial/en/index.html
