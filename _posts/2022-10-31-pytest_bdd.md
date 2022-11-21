---
layout: post
title: "Behavior Driven Development with pytest-bdd"
date: 2022-10-31
categories: Python
---

When I first heard about test driven development I wasn't entirely sold on it. I mean, writing the unit tests for a project before you start writing the code? Unit tests are time consuming, have to cover a million different edge cases, and often depend on the exact structure of the code, I thought. However, I recently watched a [video on YouTube](https://www.youtube.com/watch?v=Bq_oz7nCNUA) that changed the way I saw things.

<style>
.embed-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}

.embed-container iframe, .embed-container object, .embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
{% include jekyll-embed-video/youtubePlayer.html id="Bq_oz7nCNUA" %}

Basically, the gentleman in the video argues that the problems associated with test driven development often occur because people are using the technique incorrectly. If you have to know the structure of your code in order to write tests, then your tests are coupled too strongly to your implementation. Similarly, if you find that changing code affects many unit tests, then the tests are not abstract enough. In this situation you've built an ossified shell of tests around your code that ensures the code can not change in implementation details. In his words, you're now simply testing that the code you've written is in fact the code that you've written.

Behavior driven development is an alternate approach to software design that attempts to do test driven development the right way. With the help of packages like `pytest-bdd`, we describe what we want our code to do in simple English. We then tell the machine what each English-language sentence means, and the necessary tests are pieced together and auto-run for us.

## A Test Project

Here we create a simple killbot that travels to and destroys cities. The bot should be able to be given a list of targets, and should eliminate them one at a time. If it ever gets a target that doesn't exist, it just removes it from its list.

We will first describe this behavior in plain language using the Gherkin markdown language, and then write the code to make the tests pass.

Before doing anything else, we install `pytest-bdd` with either `pip install pytest-bdd` or `poetry add pytest-bdd`.

## Gherkin

The Gherkin language is very easy to understand, and its advantages can be summed up by the following shitpost-like images from [this tutorial](https://www.guru99.com/gherkin-test-cucumber.html), which I encourage you to read.

![average_unit_test_fan](/img/2022-10-31/before_gherkin.webp)
*Before Gherkin*

![least_chad_gherkin_enjoyer](/img/2022-10-31/after_gherkin.webp)
*After Gherkin*

Here's what our Gherkin code, `destroy_cities.feature`, looks like:

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<pre id="feature" style="height:500px"></pre>
<script type="text/javascript">
    $("#feature").load("/scripts/2022-10-31/destroy_cities.feature");
</script>

The keyword `And` basically adds a second instance of whatever goes before it, whether it's `Given`, `When`, or `Then`.

This file is in plain English, and hopefully easy to understand.

## Pytest-BDD

We now need to write a corresponding file in Python, `test_destroy_cities.py`, that explains what all the Gherkin components mean. What does it mean to be `Given` some condition? Once I have that condition, how do I execute each of these `When` triggers? After that, how do I check that the results I'm expecting in the `Then` conditions are met?

The `@given`, `@when`, and `@then` decorators in the following code are used to define the conditions, triggers, and results of each test. The `@given` decorator is used to define the initial conditions of the test. The `@when` decorator is used to define the triggers that will be executed. The `@then` decorator is used to define the results that are expected.

You can decorate a function multiple times, in case the same condition, trigger, or result is described in different ways in the Gherkin file. You can also parametrize a function, which I've done in two different ways in the example code.

The `@scenario` decorator is used to define the Gherkin feature file that each test is based on. These `@scenario` functions also behave like normal tests, and are run after all scenario steps are completed. However, these shouldn't necessary if your `Then` conditions cover all effects.

Note that tests use fixtures which are defined by `@pytest` functions at the top. However, individual `@given` functions can overwrite fixtures when called, allowing you to use different fixtures in different tests. For example, `set_n_cities()` is decorated with `target_fixture='killbot'`, so all scenarios which begin with `Given I have a list of {n_cities} cities` will use the return value of `set_n_cities()` for function inputs instead of the `killbot` fixture defined at the top of the script. In this case this was not strictly required, as we could have just had `set_n_cities()` modify the existing killbot fixture, as in `set_nonexistent_next_city()`. Fixtures objects are created at the beginning of each scenario, and are affected sequentially by the functions in the scenario.

<pre id="test_code" style="height:500px"></pre>
<script type="text/javascript">
    $("#test_code").load("/scripts/2022-10-31/test_destroy_cities.py");
</script>

## The App

This is `killbot.py`. It was written last, meaning that behavior driven development has tricked me into writing good code.

<pre id="killbot" style="height:500px"></pre>
<script type="text/javascript">
    $("#killbot").load("/scripts/2022-10-31/killbot.py");
</script>

There's a ton more that can be done with `pytest-bdd`, which you can check out in the [official docs](https://pytest-bdd.readthedocs.io/en/latest/). For example, you can automatically bind all the scenarios found in a test folder, instead of manually writing out those useless scenario functions.

## Testing

You can run the tests via the command line with `pytest test_destroy_cities.py`. You should see the following.

```
collected 4 items                                                                        

test_destroy_cities.py ....                                                        [100%]

=================================== 4 passed in 0.02s ====================================
```
