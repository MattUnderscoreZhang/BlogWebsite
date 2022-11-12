---
layout: post
title: "Adding Javascript to a Jekyll Page"
date: 2020-07-03
categories: Web
---
After [setting up my website]({% link _posts/2020-07-01-setting_up_website.md %}), I was interested in adding some interactive elements. In particular, I wanted to add some scripts written in [p5.js][p5.js].

p5.js is a Javascript library that allows you to easily add animations and interactive applications to a webpage, and I had a couple of apps already sitting around in [my GitHub repository][mcb419], from one of my courses in grad school.

To add one of these applications to my website, I created a folder in the top level of my Jekyll website directory called `scripts`, and put my Javascript files in here, from `HW_8` of my GitHub repository linked above. The website file directory now looked like this:

{% highlight bash %}
> ls

404.html     Gemfile.lock _config.yml  _site        img          scripts
Gemfile      README.md    _posts       about.md     index.md
{% endhighlight %}

{% highlight bash %}
> ls -R scripts/

2020-07-03 p5.js

scripts//2020-07-03:
Bot.js     Pellet.js  Trail.js   sketch.js  sprintf.js util419.js

scripts//p5.js:
p5.dom.min.js p5.min.js
{% endhighlight %}

After this, all I needed to do was add the following code to the Markdown file for this post:

{% highlight markdown %}
<script src="/scripts/p5.js/p5.min.js"></script>
<script src="/scripts/p5.js/p5.dom.min.js"></script>

<script src="/scripts/2020-07-03/Bot.js"></script>
<script src="/scripts/2020-07-03/Pellet.js"></script>
<script src="/scripts/2020-07-03/Trail.js"></script>
<script src="/scripts/2020-07-03/sketch.js"></script>
<script src="/scripts/2020-07-03/util419.js"></script>
<script src="/scripts/2020-07-03/sprintf.js"></script>

<div id="canvas"></div>
<select id="controller"></select>
<button id="b_reset" style="background-color: lightBlue">Reset</button>
<button id="b_run" style="background-color: lightGreen">Run/Pause</button>
<button id="b_single" style="background-color: lightCyan">Single Step</button>

<button id="b_expt">Run Experiment</button>
<pre id="stats" style="color:blue">[will be filled automatically]</pre>
{% endhighlight %}

## The Javascript

This code came from a course I took called "Brain, Behavior, and Info Processing" (MCB419), taught at the University of Illinois at Urbana-Champaign by Dr. Mark Nelson. This class used computational methods to simulate the behavior of simple organisms. In particular, the class discussed topics from how semi-intelligent foraging behavior arises at the single-cellular level through extremely simple mechanisms (i.e. the dependence of flagella rotation on chemical gradients in the environment), all the way through neural nets with several hundred neurons such as in flatworms.

This application shows how a simple finite state machine can be tuned to achieve different kinds of foraging behaviors. You can select different strategies, and watch the bug walk around and eat pellets (though playing with it now, it appears some of my weights are tuned quite poorly). Clicking "Run Experiment" will test the different strategies against each other.

<script src="/scripts/p5.js/p5.min.js"></script>
<script src="/scripts/p5.js/p5.dom.min.js"></script>

<script src="/scripts/2020-07-03/Bot.js"></script>
<script src="/scripts/2020-07-03/Pellet.js"></script>
<script src="/scripts/2020-07-03/Trail.js"></script>
<script src="/scripts/2020-07-03/sketch.js"></script>
<script src="/scripts/2020-07-03/util419.js"></script>
<script src="/scripts/2020-07-03/sprintf.js"></script>

<div id="canvas"></div>
<select id="controller"></select>
<button id="b_reset" style="background-color: lightBlue">Reset</button>
<button id="b_run" style="background-color: lightGreen">Run/Pause</button>
<button id="b_single" style="background-color: lightCyan">Single Step</button>

<button id="b_expt">Run Experiment</button>
<pre id="stats" style="color:blue">[will be filled automatically]</pre>

[p5.js]: https://p5js.org/
[mcb419]: https://github.com/BucketOfFish/MCB419
