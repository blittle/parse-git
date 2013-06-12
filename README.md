parse-git
=========

A basic module for parsing git log files. The log file must be created with the following 
git command: `git log --name-status > someFile.txt`


Example
----------------------
```javascript

var ParseGit = require('parse-git');
var fs = require('fs');

fs.readFile('someFile.txt', 'utf8', function(err, fd) {
    if(err) throw "Cannot load file";
    
    var commits = ParseGit.parseGit(fd), // parseGit returns an array of commits
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

Command-line
-----------------------
Use the tool from the command line by installing the package globally through npm:
`npm install -g parse-git`

After installing globally, you can use the tool as follows:
`parse-git someLogOutput.txt`

TODO: Allow piping text directly from git to parse-git: `git log --name-status | parse-git`

