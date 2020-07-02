---
layout: post
title:  "Setting Up a Website with GitHub and Jekyll"
date:   2020-07-01 12:54:23 -0500
categories: web misc
---
I made this website because I wanted a place to put my projects and code snippets. It's also a great resume booster to have all your stuff in one place like this. Plus, having your own website is a great conversation starter at parties, maybe? If I ever get invited to a party I'll test it out and let you know!

Luckily, setting up a GitHub website is super simple, and only takes a few minutes. I'll guide you through the steps.

## The Tools

**GitHub** - I'll assume you know how to use [git][git-tutorial] and have an account on [GitHub][github]. In case you're unfamiliar, you can learn from the interactive git tutorial I linked, and make yourself an account on GitHub. Git basically acts as a giant save / undo button for your code, and stores your code's entire revision history on the cloud. GitHub is a commonly used cloud hosting service for git, and is completely free.

**Ruby** - I know nothing about Ruby except that it's an interpreted Python-like language. Ruby on Rails is a popular framework written in Ruby that people use to develop web applications. Ruby packages are called gems, and Jekyll is a Ruby gem. [Setting up Ruby][ruby-install] on your system should be a one-line terminal process for most operating systems, or a simple installer process if you're using Windows.

**Bundler** - Ruby has a built-in gem manager (like pip for Python), but Bundler is better at managing dependencies. For example, if you have multiple gems that each depend on other gem versions, Bundler can deal with it nicely. It can also install gems in your project folder instead of in the system folder, if you want to keep things isolated.

**Jekyll** - This Ruby gem takes pages written in Markdown (basically plain text) and makes a website out of them. You can change how your website looks just by downloading a different theme. Jekyll is great for people who want to have a website but don't want to learn any web programming.

## Set Up Your Website Locally

First use Ruby to download Bundler. Type the following in your terminal:

{% highlight bash %}
gem install bundler
{% endhighlight %}

Next, create a folder where you want your website stuff to live, and use Bundler to initialize a project in there.

{% highlight bash %}
mkdir ~/Projects/Website
cd ~/Projects/Website
bundle init
{% endhighlight %}

This should create a file called `Gemfile`. This file tells Bundler which versions of gems need to be present for this project to compile.

If you want Bundler to install gems to your project folder instead of the system directory, for use in this project only, you can set the following, where `project_gems` is the subfolder that you want gems to be installed to. Ignore this if you want to install gems system-wide:

{% highlight bash %}
bundle config set --local path 'project_gems'
{% endhighlight %}

Now install Jekyll:

{% highlight bash %}
bundle add jekyll
{% endhighlight %}

Your `Gemfile` should have changed to note that you want to use Jekyll as a dependency for this project. In addition, you should have another file now, `Gemfile.lock`. This one lists which gem versions are already installed on your system. Don't edit `Gemfile.lock` manually.

Now the following commands should use Jekyll to set up a new website in this folder, and install all necessary dependencies:

{% highlight bash %}
bundle exec jekyll new --force --skip-bundle .
bundle install
{% endhighlight %}

`bundle exec jekyll` means that we are using the version of jekyll installed with bundle. It's actually also ok to just use `jekyll`.

You can now type the following to start up your website (visit it at [http://127.0.0.1:4000](http://127.0.0.1:4000) in your browser!):

`bundle exec jekyll serve`

Keep this terminal running, and it will automatically update your website as you make changes to it. Your website will shut down when you close this terminal.

## Hosting Your Website on GitHub

So far your website only exists on your local server. In other words, it's not actually on the web yet. You can attach it to your GitHub profile though, and GitHub will host it for you for free.

To do this, simply create a new GitHub repository and name it `<user>.github.io`, where `<user>` is your username. For example, my repository is named `bucketoffish.github.io`.

Then, add your website folder to your new repository.

{% highlight bash %}
git init
git remote add origin https://github.com/<user>/<user>.github.io.git
git add *
git commit -m "First commit of Jekyll website"
git push -u origin master
{% endhighlight %}

Now you can go to http://\<user\>.github.io/ to see your new website! It may take a minute or two to show up.

## Editing Your Website

To add new posts to your website, just add files to the `_posts` folder. There is already an example file in there to show you how it's done. All files in here should be written in Markdown, which is essentially just plain text with some [formatting options][markdown].

You can also edit the home page of your website by replacing `about.md` and `index.md`. Furthermore, change site-wide settings (like your website name) in `_config.yml`. That's it! Have fun with your new website!

![look at him go](/img/2020-07-01/dancing_baby.gif)
![surfing the web](/img/2020-07-01/win_explorer.gif)
![don't do drugs thx](/img/2020-07-01/smiley.gif)

[git-tutorial]: https://learngitbranching.js.org/
[github]: https://github.com/
[ruby-install]: https://www.ruby-lang.org/en/documentation/installation/
[markdown]: https://www.markdownguide.org/cheat-sheet/
