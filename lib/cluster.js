var cluster = require('cluster');


exports.start = function(){

    if(cluster.isMaster){
        //count the CPU
        var cpuCount = require('os').cpus().length;

        // Create a worker for each CPU
        for (var i = 0; i < cpuCount; i += 1) {
            cluster.fork();
        }
    }
    else{
        var server = require('./caradoc-server');
        server.start();
    }
};