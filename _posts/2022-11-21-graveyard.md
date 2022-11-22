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
    /* randomize array in-place using Durstenfeld shuffle algorithm */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    var indices = null;
    var index_n = 0;

    function get_random_project() {
        const directory = "/data/graveyard_of_abandoned_projects/"
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', directory, false); // false for synchronous request
        xmlHttp.send(null);
        var ret = xmlHttp.responseText;
        const fileNames = ret.split('\<A HREF=\"').slice(5);
        for (var i = 0; i < fileNames.length; i++) {
            fileNames[i] = fileNames[i].split('\"')[0];
        }
        if (indices == null) {
            indices = Array.from(Array(fileNames.length).keys());
            shuffleArray(indices);
        }
        const randomFile = fileNames[indices[index_n]];
        index_n = (index_n + 1) % indices.length;
        $("#output").load(directory + randomFile);
    };

    async function get_random_project_github_pages() {
        // can't get the xmlHttp method to work on Github Pages
        const directory = "/data/graveyard_of_abandoned_projects/"
        const response = await fetch('https://api.github.com/repos/MattUnderscoreZhang/MattUnderscoreZhang.github.io/contents' + directory);
        const files = await response.json();
        var fileNames = files.map(function(file) {return file.name});
        if (indices == null) {
            indices = Array.from(Array(fileNames.length).keys());
            shuffleArray(indices);
        }
        const randomFile = fileNames[indices[index_n]];
        index_n = (index_n + 1) % indices.length;
        $("#output").load(directory + randomFile);
    };

    get_random_project_github_pages();
    $("#randomize").click(get_random_project_github_pages);
});
</script>

<br>
<button id="randomize">Random Project</button>
<br>
<br>
<textarea id="output" rows="50" style="width: 90%; max-width: 90%; padding: 10px" readonly></textarea>
