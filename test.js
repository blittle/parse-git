var assert = require('assert');
var GitVis = require('./app.js');
var fs = require('fs');

describe('GitParser', function() {
    var commits;

    beforeEach(function(done) {
        fs.readFile('temp.txt', 'utf8', function(err, fd) {
            if(err) throw "Cannot load file";
            commits = GitVis.parseGit(fd);
            done();
        });       
    });

    it("Should should parse 12 commits", function() {
        assert.equal(34, commits.length);    
    });

    it("Should parse the name of a commiter", function() {
        assert.equal("Bret Little", commits[0].author.name);
        assert.equal("Bret Little", commits[1].author.name);
        assert.equal("Bret Little", commits[2].author.name);
        assert.equal("Patrick Mulder", commits[3].author.name);
    });

    it("Should parse the email of a commiter", function() {
        assert.equal("bret.little@gmail.com", commits[0].author.email);
        assert.equal("bret.little@gmail.com", commits[1].author.email);
        assert.equal("bret.little@gmail.com", commits[2].author.email);
        assert.equal("mulder.patrick@gmail.com", commits[3].author.email);
    });

    it("Should parse the git history id", function() {
        assert.equal("50e034d30cf83859c3d7146906f375dc41aa836d", commits[0].id);
        assert.equal("c7c9323a7e37df70c72050ca16a124eb6fd5f19b", commits[1].id);
    });

    it("Should parse the date", function() {
        assert.equal(1370276864000, commits[0].date.getTime());
        assert.equal(1369584539000, commits[2].date.getTime());
        assert.equal(1366065129000, commits[5].date.getTime());
    });

    it("Should parse the comment", function() {
        assert.equal("Fix race condition error when installing to long paths, path folders would be deleted and recreated in time for installing files. Also support bower.json and component.json files (bower.json taking precedence)", commits[0].comment);
        assert.equal("Add add the ability to install to multiple paths", commits[10].comment);
        assert.equal("Remove unneeded files", commits[20].comment);
    });

    it("Should parse the files that changed from a commit", function() {
        assert.equal("bower-installer.js", commits[0].files[0].path);
        assert.equal("M", commits[0].files[0].type);

        assert.equal("package.json", commits[8].files[1].path);
        assert.equal("A", commits[commits.length-1].files[0].type);
    });
});



