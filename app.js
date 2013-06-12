var _ = require('lodash');
var _s = require('underscore.string');

function parseGit( data ) {

    var commits = [];

    data = data.split('\n');

    var commit;
    
    _.each(data, function(line) {
        if(line.substring(0,6) === 'commit') {
           commit = {id: line.substring(7), files: []};
           commits.push(commit);
           return;
        }

        if(line.substring(0,5) === 'Merge') {
            //@todo - do something with the merge references
            return;
        }

        if(line.substring(0,6) === 'Author') {
            commit.author = {
                name: line.substring(line.indexOf(':')+2, line.indexOf('<')-1),
                email: line.substring(line.indexOf('<')+1, line.indexOf('>'))
            }
            return;
        }

        if(line.substring(0,4) === 'Date') {
            commit.date = new Date(_s.trim(line.substring(5)));
            return;
        }

        if(line.substring(0,4) === '    ') {
            if(!_s.trim(line).length) return;
            commit.comment = commit.comment ? commit.comment + '\n' + _s.trim(line) : _s.trim(line); 
            return;
        }
        
        line = _s.trim(line);

        if(line.length) {
            commit.files.push({
                type : line.charAt(0),
                path : _s.trim(line.substring(1))
            });
        }

    });

    return commits;
}

exports.parseGit = parseGit;

