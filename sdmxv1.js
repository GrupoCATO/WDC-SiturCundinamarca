(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();
    const opts = { crossDomain: true};
    // Define the schema
    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "periodo",
            alias: "periodo",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "departamento",
            alias: "departamento",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "indicador",
            alias: "indicador",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "medicion",
            alias: "medicion",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "valor",
            alias: "valor",
            dataType: tableau.dataTypeEnum.float
        }
    ];

        var tableInfo = {
            id: "SDXM",
            alias: "Tableau v1.1",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };


    const createTable = function (feat) {
        tableData = [];
            // Iterate over the JSON object
            alert(feat[0].periodo)
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "periodo": feat[i].periodo,
                    "departamento": feat[i].departamento,
                    "indicador": feat[i].indicador,
                    "medicion": feat[i].medicion,
                    "valor": parseFloat((feat[i].valor))
                });
            }
            return tableData;
    }


    // Download the data
    myConnector.getData = function(table, doneCallback) {
        /**
         * el metodo get recibe la url de los datos y un callback que va a tratarlos
         */
        var dateObj = JSON.parse(tableau.connectionData)
        slug = dateObj.slug;
        $.get("http://nube.realityapp.co:1240/api/v1/estadisticas/sdmx/all/?slug=" + slug, function (resp) {
            // var feat = resp.features,
            var feat = resp // dependiendo del api el ().results puede cambiar, inclusive puede no ir, depende que devuelva el API.
            console.log(feat);
            table.appendRows(createTable(feat));
            doneCallback();
        });
    };


    tableau.registerConnector(myConnector);
    // Create event listeners for when the user submits the form
})();


$(document).ready(function() {
    $("#submitButton").click(function() {
        var dateObj = {
            slug: 'receptor'
        };
        tableau.connectionData = JSON.stringify(dateObj);
        tableau.connectionName = "Tableau v1.1"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
    });
});

$(document).ready(function() {
    $("#oferta").click(function() {
        var dateObj = {
            slug: 'oferta'
        };
        tableau.connectionData = JSON.stringify(dateObj);
        tableau.connectionName = "Tableau v1.1"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
    });
});

$(document).ready(function() {
    $("#empleo").click(function() {
        var dateObj = {
            slug: 'empleo'
        };
        tableau.connectionData = JSON.stringify(dateObj);
        tableau.connectionName = "Tableau v1.1"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
    });
});

$(document).ready(function() {
    $("#ie").click(function() {
        var dateObj = {
            slug: 'interno_emisor'
        };
        tableau.connectionData = JSON.stringify(dateObj);
        tableau.connectionName = "Tableau v1.1"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
    });
});