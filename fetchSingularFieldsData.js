const con = require('./connection')
var replacementJson = {}

function fetchSingularFieldsData(templateCode) {
    const fs = require('fs')
    const singularFieldCofigurationJsonString = fs.readFileSync(`./json_configuration_files/${templateCode}.json`)
    const singularFieldCofigurationJson = JSON.parse(singularFieldCofigurationJsonString)
    console.log(singularFieldCofigurationJson)

    const propertiesReader = require('properties-reader')

    let properties = propertiesReader(`./properties_files/${templateCode}.properties`);
    let linearFieldsViewName = properties.get('viewName')

    console.log(properties.get('viewName'))
    let singularFieldsSelectQuery = 'select'

    for (var i = 0; i < singularFieldCofigurationJson.length; i++) {
        if (i != singularFieldCofigurationJson.length - 1) {
            singularFieldsSelectQuery = singularFieldsSelectQuery + ' ' + singularFieldCofigurationJson[i].db_col_name + ','
            replacementJson[singularFieldCofigurationJson[i].macro_Name] = ""
        }
        else {
            singularFieldsSelectQuery = singularFieldsSelectQuery + ' ' + singularFieldCofigurationJson[i].db_col_name + ` from ${linearFieldsViewName}`
            replacementJson[singularFieldCofigurationJson[i].macro_Name] = ""
        }

    }
    con.query(singularFieldsSelectQuery, (err, result) => {
        if (err) throw err;
        replacementJsonKeys = Object.keys(replacementJson)
        for (var i = 0; i < replacementJsonKeys.length; i++) {
            replacementJson[replacementJsonKeys[i]] = Object.values(result[0])[i]
        }
        console.log(replacementJson)
    })


}

fetchSingularFieldsData('2')
// module.exports = fetchSingularFieldsData