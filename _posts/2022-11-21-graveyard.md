---
layout: post
title: "Graveyard of Abandoned Projects"
date: 2022-11-21
categories: [Misc]
---

As somebody whose ambitions overshadow his abilities, I think up a lot of projects that I don't have time to work on. This continuously updated graveyard contains all my abandoned projects. Hit randomize to see new projects. Feel free to take any of these ideas, as they're of no use to me and are also generally pretty poorly thought out.

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {
    var currentIndex = -1;
    var newIndex = -1;

    function get_random_project() {
        var directory = "/data/graveyard_of_abandoned_projects/"
        <!--var xmlHttp = new XMLHttpRequest();-->
        <!--xmlHttp.open('GET', directory, false); // false for synchronous request-->
        <!--xmlHttp.send(null);-->
        <!--var ret = xmlHttp.responseText;-->
        <!--var fileList = ret.split('\<A HREF=\"').slice(5);-->
        <!--for (var i = 0; i < fileList.length; i++) {-->
            <!--fileList[i] = fileList[i].split('\"')[0];-->
        <!--}-->
        <!--while (newIndex == currentIndex) {-->
            <!--newIndex = Math.floor(Math.random() * fileList.length);-->
        <!--}-->
        <!--var randomFile = fileList[newIndex];-->
        <!--currentIndex = newIndex;-->
        var randomFile = "life_calendar.txt";
        $("#output").load(directory + randomFile);
    };

    get_random_project();
    $("#randomize").click(get_random_project);
});
</script>

<br>
<button id="randomize">Random Project</button>
<br>
<br>
<textarea id="output" rows="50" style="width: 100%; max-width: 100%; padding: 10px" readonly></textarea>
