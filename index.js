var clusterActive = require('../../../config/params/project').data.cluster;

if(clusterActive){

    module.exports = require('./lib/cluster');
}
else{

    module.exports = require('./lib/caradoc-server');
}