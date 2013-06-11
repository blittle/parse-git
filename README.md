parse-git
=========

A basic module for parsing git log files. The log file must be created with the following 
git command: `git log --name-status > someFile.txt`


Example
----------------------
```javascript

var parseGit = require('parse-git');
var fs = require('fs');

fs.readFile('someFile.txt', 'utf8', function(err, fd) {
    if(err) throw "Cannot load file";
    
    var commits = GitVis.parseGit(fd), // parseGit returns an array of commits
        commit = commits[0];
    
    console.log(commit.id); // commit id
    
    console.log(commit.author.name);  // commit author name
    console.log(commit.author.email); // commit author email
    
    console.log(commit.date.getTime())  // commit date (JS Date)
    console.log(commit.comment)         // commit comment
    
    console.log(commit.files[0].path) // the path of the first file modified
    console.log(commit.files[0].type) // the type of file modification A, M, or D
});

```




