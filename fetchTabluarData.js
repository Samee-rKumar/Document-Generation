function fetchTabularData(templateCode) {
    const fs = require('fs')
    const listViewJsonString = fs.readFileSync(`./json_configuration_files/${templateCode}_ListView.json`)
    const listViewJson = JSON.parse(listViewJsonString)
    console.log(listViewJson)
    var mappingJsonFileString = null;
    var mappingJsonFileStringJson = null;
    var tabularFieldSelectQuery = 'Select'

    for (var i = 0; i < listViewJson.length; i++) {

        var { view_Name, mapping_Json_File } = listViewJson[i];
        mappingJsonFileString = fs.readFileSync(`./json_configuration_files/${mapping_Json_File}`)
        mappingJsonFileStringJson = JSON.parse(mappingJsonFileString);
        for (var j = 0; j < mappingJsonFileStringJson.length; j++) {
            var { db_Col_Name } = mappingJsonFileStringJson[j]
            if (j != mappingJsonFileStringJson.length - 1) {
                tabularFieldSelectQuery = `${tabularFieldSelectQuery} ${db_Col_Name}, `
            }
            else {
                tabularFieldSelectQuery = `${tabularFieldSelectQuery} ${db_Col_Name} from ${view_Name}`
            }
        }
        console.log(tabularFieldSelectQuery)
    }
}

module.exports = fetchTabularData