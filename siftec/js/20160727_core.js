//--------------------------------------------------------------------------------------------------
//
// CASTELPORZIANO
// 
// Copyright © 2011 EFFETRESEIZERO srl (info@f360.it). Tutti i diritti sono riservati.
// 
// Questo programma Ë tutelato dalle leggi sul copyright, dalle leggi sui diritti díautore e dalle disposizioni dei trattati internazionali. La riproduzione o distribuzione non autorizzata di questo programma, o di parte di esso, sar‡ perseguibile civilmente e penalmente nella misura massima consentita dalla legge in vigore.
// 
// Copyright © 2011 EFFETRESEIZERO srl (info@f360.it). All rights reserved.
//  
// This work is protected by copyright law and international treaties. Unauthorized reproduction or distribution of this program, or any portion of it, may result in severe civil and criminal penalties, and will be prosecuted to the maximum extent possible under the law.
// 
//---------------------------------------------------------------------------------------------------


L.TileLayer.MBTiles = L.TileLayer.extend({
	mbTilesDB: null,
    tileImageFormat: null,
	initialize: function(url, options, db, image_format) {
		this.mbTilesDB = db;
        this.tileImageFormat = image_format;
		L.Util.setOptions(this, options);
	},

	_loadTile: function (tile, tilePoint) {

		tile._layer  = this;
		tile.onload  = this._tileOnLoad;
		tile.onerror = this._tileOnError;

		this._adjustTilePoint(tilePoint);

		var z = this._getZoomForUrl();
		var x = tilePoint.x;
		var y = tilePoint.y;

		var base64Prefix = 'data:image/'+this.tileImageFormat+';base64,';

		this.mbTilesDB.transaction(function(tx) {
			tx.executeSql("select * from tiles where zoom_level = ? and tile_column = ? and tile_row = ?;", [z, x, y], function (tx, res) {
				tile.src = base64Prefix + res.rows.item(0).tile_data;

				this.fire('tileloadstart', {
					tile: tile,
					url: tile.src
				});
			}, function (e) {
				console.log('error with executeSql: ', e.message);
			});
		});
	},
});



var L_WMS_CRS;

var L_MAP=null;
var MAP_ACTIVE="nessuna";

var L_MINZOOM= 13;
var L_MAXZOOM= 17;
var L_MAXBOUNDS =  [[41.65519756659454, 12.342123046117457],[41.78412376786726, 12.452353096028347]];

var L_OSM;

var L_OFD_2010;
var L_DTM_HILLSHADE;
var L_CHM_0_30;

var L_CP_UFOR;
var L_CP_TOPONIMI;
var L_CP_PARTICELLARE;
var L_CP_PARTICELLARE_ETICHETTE;
var L_CP_VIABILITA;
var L_CP_GEONOTE;
var L_CP_PERIMETRO;

var L_LOCATION_CIRCLE;

var LEGEND_CTRL;

var L_MAP_LAYERS;
var L_MAP_PANELLAYERS;


var L_INFO;

var L_MAP_CANVAS;

var UFOR_FIELD_ARRAY = new Array("N_UFOR","AREA_HA", "V_HA", "V_TOT", "PS_HA", "PS_TOT", "USO_FOR", "SPEC_USO", "T_FOR", "GOV", "STR_VER", "DIS_OR", "FERT", "STR2", "H_SEP_S", "PIA_STR2", "COP_STR1", "COP_STR2", "CRON_MBS", "CRON_BI", "CRON_CED", "PRES_RIN", "RIN_S1S", "RIN_S1P", "RIN_S2S", "RIN_S2P", "RIN_S3S", "RIN_S3P", "RIN_S4S", "RIN_S4P", "RIN_S5S", "RIN_S5P", "CON_EST1", "CON_EST2", "CON_EST3", "CON_EST4", "NOTE");
var UFOR_FIELD_ARRAY_TITLE = new Array("ID UFOR","Superificie (ha)", "Volume/ha (m3/ha)", "Volume Tot. (m3)", "Biomassa/ha (t/ha)", "Biomassa Tot. (t)", "Uso Suolo Forestale", "Specifica Uso Suolo", "Tipo forestale", "Governo", "Struttura verticale", "Distribuzione orizzontale", "Fertilità", "Presenza strato secondario", "Altezza separazione strati", "Piano strato secondario", "Copertura strato principale", "Copertura strato secondario", "Cronologia Monoplano/Biplano sup.", "Cronologia biplano inf.", "Cronologia ceduo", "Presenza rinnovazione", "Specie 1", "Rinnovazione", "Specie 2", "Rinnovazione", "Specie 3", "Rinnovazione", "Specie 4", "Rinnovazione", "Specie 5", "Rinnovazione", "Condizionamento esterno 1", "Condizionamento esterno 2", "Condizionamento esterno 3", "Condizionamento esterno 4", "Note");

var BIGPLOT_FIELD_ARRAY = new Array("ID_BP","CLASSIFY","G_M2_HA","V_M3_HA","P_T_HA","AREA","DATA","NOTE");
var BIGPLOT_FIELD_ARRAY_TITLE = new Array("ID","Classificazione","G (m2/ha)","V (m3/ha)","P (t/ha)","Area (m2)","Data rilievo","Note");



/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        console.log("homePageLoad");
        Leaflet_initlayers();
        Leaflet_initMap();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();



// Orientation change event handler
// Detect whether the #map_canvas is showing, and if so trigger a resize
// Leaflet needs this so it can correct its display, e.g. when changing pages within the app
function resizeMapIfVisible() {
    if ( L_MAP && $(L_MAP_CANVAS).is(':visible') ){
        $(L_MAP_CANVAS).height( $(window).height() - 75 );
        $(L_MAP_CANVAS).width( $(window).width() - 30);
        L_MAP.invalidateSize();
    }
}

$(window).bind('orientationchange pageshow resize', resizeMapIfVisible);


//function homePageLoad(){
$( document ).on( "pageinit", "#home", function( event ) {
    //console.log("homePageLoad");
    //Leaflet_initlayers();
    //Leaflet_initMap();
    
});

$(document).on('vclick', '#go2SIFTeC', function(){ 
    
    goToMap("UFOR","STRATI_2014");
    
    $.mobile.changePage( $("#map_page"), {allowSamePageTransition:true,transition:"fade"} );
});

$(document).on('vclick', '#map_location', function(){
    locatePositionOnMAP();
});

$(document).on('vclick', '#layer_select', function(){
    $.mobile.activePage.find('#layer_panel').panel("open"); 
});

function Leaflet_initlayers(){
    console.log("Leaflet_initlayers");
     
    //
    // STRATI LAYER 
    //
    L_CP_STRATI = new L.geoJson(strati_2014, {
        style: STRATI_style
    });
    
    
    //
    // UFOR LAYER 
    //
    L_CP_UFOR = new L.GeoJSON(ufor,{
        onEachFeature: UFOR_onEachFeature
    });
    
   
    //
    // BIGPLOT LAYER 
    //
    L_CP_BIGPLOT = new L.GeoJSON(bigplot,{
        onEachFeature: BIGPLOT_onEachFeature,
        style: BIGPLOT_style
    });
    
	//
    // PARTICELLARE LAYER
    //
    
    L_CP_PARTICELLARE = new L.geoJson(particellare_2014, {
        style: PARTICELLARE_style
    });
	
	//
    // PARTICELLARE ETICHETTE LAYER
    //
    
    L_CP_PARTICELLARE_ETICHETTE = new L.geoJson(particellare_etichette_2014, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, ParticellareEtichetteMarkerOptions);
        },
        onEachFeature: ParticellareEtichette_onEachFeature
    });
	
    L_CP_PARTICELLARE_ETICHETTE.eachLayer(function(l) { l.showLabel();});
	
	
	//
    // VIABILITA LAYER
    //
    
    L_CP_VIABILITA = new L.geoJson(viabilita_2014, {
        style: VIABILITA_style
    });
	
	//
    // TOPONIMI LAYER
    //
    
    L_CP_TOPONIMI = new L.geoJson(toponimi_2014, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, ToponimiMarkerOptions);
        },
        onEachFeature: Toponimi_onEachFeature,
        'clickable': 'false'
    });
	
    L_CP_TOPONIMI.eachLayer(function(l) { l.showLabel();});
    
    //
    // TOPONIMI LAYER
    //
    
    L_CP_GEONOTE = new L.geoJson(geonote, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.FOTO_1 != null){
                var geonoteIconUrl= 'js/icons/geonote_photo_27.png';
            }else{
                var geonoteIconUrl= 'js/icons/geonote_text_27.png';
            }
            var smallIcon = L.icon({
                          iconSize: [27, 27],
                          iconAnchor: [13, 27],
                          popupAnchor:  [1, -24],
                          iconUrl: geonoteIconUrl
                });
            return L.marker(latlng, {icon: smallIcon});
            
            
            //return L.circleMarker(latlng, GeonoteMarkerOptions);
        },
        onEachFeature: Geonote_onEachFeature,
        'clickable': 'false'
    });
	
    //
    // PERIMETRO LAYER
    //
    
    L_CP_PERIMETRO = new L.geoJson(perimetro_2014, {
        style: PERIMETRO_style,
        'clickable': 'false'
    });
    
    
        // 
	// INIZIO OFD  LAYER 
    //
            
    var db_ofd_2010 = window.sqlitePlugin.openDatabase(
        {
            name: "ofd_2010.mbtiles",
            createFromLocation: 1,
            location: 2,
            androidDatabaseImplementation: 2
        },
        function(db) {
            db.transaction(
                function(tx) {
                    // ...
                },
                function(err) {
                    console.log('Open database ERROR: ' + JSON.stringify(err));
                }
            );
        }
    );
    
    L_OFD_2010 = new L.TileLayer.MBTiles('', {
        minZoom : L_MINZOOM,
        maxZoom : L_MAXZOOM,
        tms : true
    }, db_ofd_2010, "jpg");
    
    
    //
    // DTM HILLSHADE
    //
    var db_dtm_hillshade = window.sqlitePlugin.openDatabase(
        {
            name: "dtm_hillshade.mbtiles",
            createFromLocation: 1,
            location: 2,
            androidDatabaseImplementation: 2
        },
        function(db) {
            db.transaction(
                function(tx) {
                    // ...
                },
                function(err) {
                    console.log('Open database ERROR: ' + JSON.stringify(err));
                }
            );
        }
    );
    
    L_DTM_HILLSHADE = new L.TileLayer.MBTiles('', {
        minZoom : L_MINZOOM,
        maxZoom : L_MAXZOOM,
        tms : true,
        attribution: 'DTM Hillshade',
    }, db_dtm_hillshade, "png");
    
    //
    // CHM
    //
    var db_chm_0_30 = window.sqlitePlugin.openDatabase(
        {
            name: "chm_0_30.mbtiles",
            createFromLocation: 1,
            location: 2,
            androidDatabaseImplementation: 2
        },
        function(db) {
            db.transaction(
                function(tx) {
                    // ...
                },
                function(err) {
                    console.log('Open database ERROR: ' + JSON.stringify(err));
                }
            );
        }
    );
    
    L_CHM_0_30 = new L.TileLayer.MBTiles('', {
        minZoom : L_MINZOOM,
        maxZoom : L_MAXZOOM,
        tms : true,
        attribution: 'CHM',
    }, db_chm_0_30, "png");
    

      
    //
    // OFD_1943
    //
    var db_ofd_1943 = window.sqlitePlugin.openDatabase(
        {
            name: "ofd_1943.mbtiles",
            createFromLocation: 1,
            location: 2,
            androidDatabaseImplementation: 2
        },
        function(db) {
            db.transaction(
                function(tx) {
                    // ...
                },
                function(err) {
                    console.log('Open database ERROR: ' + JSON.stringify(err));
                }
            );
        }
    );
    
    L_OFD_1943 = new L.TileLayer.MBTiles('', {
        minZoom : L_MINZOOM,
        maxZoom : L_MAXZOOM,
        tms : true,
        attribution: 'Ortofoto 1943',
    }, db_ofd_1943, "jpg");
    

    
    //
    // OFD_1967
    //
    var db_ofd_1967 = window.sqlitePlugin.openDatabase(
        {
            name: "ofd_1967.mbtiles",
            createFromLocation: 1,
            location: 2,
            androidDatabaseImplementation: 2
        },
        function(db) {
            db.transaction(
                function(tx) {
                    // ...
                },
                function(err) {
                    console.log('Open database ERROR: ' + JSON.stringify(err));
                }
            );
        }
    );
    
    L_OFD_1967 = new L.TileLayer.MBTiles('', {
        minZoom : L_MINZOOM,
        maxZoom : L_MAXZOOM,
        tms : true,
        attribution: 'Ortofoto 1967',
    }, db_ofd_1967, "jpg");
    

    //
    // OFD_1980
    //
    var db_ofd_1980 = window.sqlitePlugin.openDatabase(
        {
            name: "ofd_1980.mbtiles",
            createFromLocation: 1,
            location: 2,
            androidDatabaseImplementation: 2
        },
        function(db) {
            db.transaction(
                function(tx) {
                    // ...
                },
                function(err) {
                    console.log('Open database ERROR: ' + JSON.stringify(err));
                }
            );
        }
    );
    
    L_OFD_1980 = new L.TileLayer.MBTiles('', {
        minZoom : L_MINZOOM,
        maxZoom : L_MAXZOOM,
        tms : true,
        attribution: 'Ortofoto 1980',
    }, db_ofd_1980, "jpg");
    

    //
    // OFD_1985
    //
    var db_ofd_1985 = window.sqlitePlugin.openDatabase(
        {
            name: "ofd_1985.mbtiles",
            createFromLocation: 1,
            location: 2,
            androidDatabaseImplementation: 2
        },
        function(db) {
            db.transaction(
                function(tx) {
                    // ...
                },
                function(err) {
                    console.log('Open database ERROR: ' + JSON.stringify(err));
                }
            );
        }
    );
    
    L_OFD_1985 = new L.TileLayer.MBTiles('', {
        minZoom : L_MINZOOM,
        maxZoom : L_MAXZOOM,
        tms : true,
        attribution: 'Ortofoto 1985',
    }, db_ofd_1985, "jpg");
    

    
    //
    // OFD_1998
    //
    var db_ofd_1998 = window.sqlitePlugin.openDatabase(
        {
            name: "ofd_1998.mbtiles",
            createFromLocation: 1,
            location: 2,
            androidDatabaseImplementation: 2
        },
        function(db) {
            db.transaction(
                function(tx) {
                    // ...
                },
                function(err) {
                    console.log('Open database ERROR: ' + JSON.stringify(err));
                }
            );
        }
    );
    
    L_OFD_1998 = new L.TileLayer.MBTiles('', {
        minZoom : L_MINZOOM,
        maxZoom : L_MAXZOOM,
        tms : true,
        attribution: 'Ortofoto 1998',
    }, db_ofd_1998, "jpg");
    


    //
    // VOLUMI
    //
    var db_volumi = window.sqlitePlugin.openDatabase(
        {
            name: "volumi.mbtiles",
            createFromLocation: 1,
            location: 2,
            androidDatabaseImplementation: 2
        },
        function(db) {
            db.transaction(
                function(tx) {
                    // ...
                },
                function(err) {
                    console.log('Open database ERROR: ' + JSON.stringify(err));
                }
            );
        }
    );
    
    L_VOLUMI = new L.TileLayer.MBTiles('', {
        minZoom : L_MINZOOM,
        maxZoom : L_MAXZOOM,
        tms : true,
        attribution: 'Volume/ha',
    }, db_volumi, "png");
    
    
    //
    // BIOMASSE
    //
    var db_biomasse = window.sqlitePlugin.openDatabase(
        {
            name: "biomasse.mbtiles",
            createFromLocation: 1,
            location: 2,
            androidDatabaseImplementation: 2
        },
        function(db) {
            db.transaction(
                function(tx) {
                    // ...
                },
                function(err) {
                    console.log('Open database ERROR: ' + JSON.stringify(err));
                }
            );
        }
    );
    
    L_BIOMASSE = new L.TileLayer.MBTiles('', {
        minZoom : L_MINZOOM,
        maxZoom : L_MAXZOOM,
        tms : true,
        attribution: 'Biomassa/ha',
    }, db_biomasse, "png");
	


    

}

function Leaflet_initMap()
{
    console.log("Leaflet_initMap");
    L_MAP = new L.Map('map_canvas', {
                    zoom: L_MINZOOM,
                    maxBounds: L_MAXBOUNDS,
                    minZoom: L_MINZOOM,
                    maxZoom: L_MAXZOOM,
    });
    
    attribution = L_MAP.attributionControl;
    attribution.setPrefix('');
    
    L_MAP.fitBounds(L_MAXBOUNDS);


    L_OFD_2010.addTo(L_MAP);
    L_CP_PERIMETRO.addTo(L_MAP);
    
        
    //
    // LEGEND CONTROL
    //
    
    LEGEND_CTRL = new L.control({position: 'bottomleft'});

	
	LEGEND_CTRL.onAdd = function (L_MAP) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [],
			labels = [];

		// loop through our density intervals and generate a label with a colored square for each interval
		for (var i = 0; i < grades.length; i++) {
			div.innerHTML += '<i></i> ' + labels[i] + (grades[i + 1] ? '<br>' : '');
		}

		return div;
	};
	
	LEGEND_CTRL.addTo(L_MAP);
    
    //
    // LAYER CONTROL 
    //
    var baseMaps = {
        "Ortofoto 2010":L_OFD_2010,
    };
    
    var overlayMaps = {
        "Geonote":L_CP_GEONOTE,
        "Toponimi":L_CP_TOPONIMI,
        "Viabilità":L_CP_VIABILITA,
        "Particellare":L_CP_PARTICELLARE,
        "Perimetro":L_CP_PERIMETRO,
        "Unità forestali": L_CP_UFOR,
        "Bigplot": L_CP_BIGPLOT,
    };
    
    L.Control.CustomLayers = L.Control.Layers.extend({
        onAdd: function (map) {
            this._initLayout();
            this._update();
            map
                .on('layeradd', this._onLayerChange, this)
                .on('layerremove', this._onLayerChange, this);
            L.DomUtil.addClass(this._container, 'leaflet-control-layers-expanded');
            
            return this._container;

        },
        _collapse: function () {
            //this._container.className = this._container.className.replace(' leaflet-control-layers-expanded', '');
        }
    });
    
    L_MAP_LAYERS = new L.Control.CustomLayers(baseMaps, overlayMaps, {
        //'autoZIndex': false
    });
    
    L_MAP_LAYERS.addTo(L_MAP);
    
	
	L_MAP.on('overlayadd', function (eventLayer) {
        switch (eventLayer.name)
        {
            case "Particellare":
                L_MAP.addLayer(L_CP_PARTICELLARE_ETICHETTE);
                break;
            default:
        }
        
    });
	
	L_MAP.on('overlayremove', function (eventLayer) {
        switch (eventLayer.name)
        {
            case "Particellare":
                L_MAP.removeLayer(L_CP_PARTICELLARE_ETICHETTE);
                break;
            default:
        }
        
    });
    
    
    L_MAP.on('zoomend', function (e) {
        var current_zoom = L_MAP.getZoom();
        console.log('zoom: '+current_zoom);
        switch (current_zoom){
            case 13:
                if (L_MAP.hasLayer(L_CP_GEONOTE)){
                    L_MAP.removeLayer(L_CP_GEONOTE);
                }
                if (L_MAP.hasLayer(L_CP_TOPONIMI)){
                    L_MAP.removeLayer(L_CP_TOPONIMI);
                }
            case 14:
            case 15:
                if (L_MAP.hasLayer(L_CP_PARTICELLARE_ETICHETTE)){
                    L_MAP.removeLayer(L_CP_PARTICELLARE_ETICHETTE);
                }
                break;
            case 16:
            case 17:
                if (L_MAP.hasLayer(L_CP_PARTICELLARE)){
                    L_MAP.addLayer(L_CP_PARTICELLARE_ETICHETTE);
                }
                break;
            default:
        
        }
        
    });
    
    function onLocationFound(e) {
        var radius = e.accuracy / 2;
        
        var locationIcon = L.icon({
            iconUrl: 'images/location.png',
            //shadowUrl: 'leaf-shadow.png',

            iconSize:     [22, 22], // size of the icon
            //shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [11, 11], // point of the icon which will correspond to marker's location
            //shadowAnchor: [4, 62],  // the same for the shadow
            //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        //L.marker(e.latlng).addTo(L_MAP)
        //    .bindPopup("You are within " + radius + " meters from this point").openPopup();
        
        if (L_MAP.hasLayer(L_LOCATION_CIRCLE)) {
           L_MAP.removeLayer(L_LOCATION_CIRCLE);
        }
        
        
        
        //L_LOCATION_CIRCLE = new L.circle(e.latlng, radius);
        L_LOCATION_CIRCLE = new L.marker(e.latlng, {icon: locationIcon});
        L_LOCATION_CIRCLE.addTo(L_MAP);
        console.log(e.latlng);
    }

    L_MAP.on('locationfound', onLocationFound);
    
    function onLocationError(e) {
        console.log(e.message);
    }

    L_MAP.on('locationerror', onLocationError);
    
    L_MAP.locate({watch:true, setView: false, maxZoom: 16,enableHighAccuracy:true});
    
    L_MAP_CANVAS = '#map_canvas';
    
    
}

function locatePositionOnMAP(){
    L_MAP.setView(L_LOCATION_CIRCLE.getLatLng());
}

$(document).on('vclick', '#switch_legenda', function(){
    if ($('.legend').css('visibility')=='visible'){
        $('.legend').css('visibility', 'hidden');
    }else{
        $('.legend').css('visibility', 'visible');
    }
});


$(document).on('vclick', '#switch_layers', function(){
    if ($('.leaflet-control-layers').css('visibility')=='visible'){
        $('.leaflet-control-layers').css('visibility', 'hidden');
    }else{
        /*if !($('.leaflet-control-layers').hasClass('leaflet-control-layers-expanded')){
            $('.leaflet-control-layers').addClass('leaflet-control-layers-expanded');
        }*/
        $('.leaflet-control-layers').css('visibility', 'visible');
    }
});


/*******************************************************************
/
/ LAYER SWITCH
/
/*******************************************************************/



$(document).on('vclick', '#cartografie_menu div ul li a', function(){ 
    
    goToMap($(this).attr('map_id'),$(this).attr('param_id'));
    
});

function goToMap(map_name,layer_name){
    switch (map_name)
    {
        case "UFOR":
            goToMap_UFOR(layer_name);
            break;
        case "LIDAR":
            goToMap_LIDAR();
            break;
        case "VOLUME_CONTINUO":
            goToMap_VOLUME_CONTINUO();
            break;
        case "VOLUME_UFOR":
            goToMap_VOLUME_UFOR();
            break;
        case "BIOMASSA_CONTINUO":
            goToMap_BIOMASSA_CONTINUO();
            break;
        case "BIOMASSA_UFOR":
            goToMap_BIOMASSA_UFOR();
            break;
        case "OFD_STORICHE":
            goToMap_OFD_STORICHE();
            break;
        default:
    }
}


function goToMap_LIDAR(map_name){
    console.log(MAP_ACTIVE);
    if (MAP_ACTIVE!="LIDAR"){
        Leaflet_initMap_LIDAR();
        MAP_ACTIVE="LIDAR";
        console.log(MAP_ACTIVE);
    }
    L_CP_UFOR.setStyle(BASIC_style);
        
    LEGEND_CTRL.onAdd = function (L_MAP) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 30],
            labels = ["0 m","30+ m"];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += '<i style="background:' + LIDAR_getColor(grades[i]) + '"></i> ' + labels[i] + (grades[i + 1] ? '<br>' : '');
        }

        return div;
    };

    LEGEND_CTRL.removeFrom(L_MAP);
    LEGEND_CTRL.addTo(L_MAP);
    
    //$.mobile.changePage( $("#map_page"), {allowSamePageTransition:true,transition:"fade"} );
}

function goToMap_VOLUME_CONTINUO(){
    console.log(MAP_ACTIVE);
    if (MAP_ACTIVE!="VOLUMI"){
        Leaflet_initMap_VOLUMI();
        MAP_ACTIVE="VOLUMI";
        console.log(MAP_ACTIVE);
    }
    
    L_CP_UFOR.setStyle(BASIC_style);

    LEGEND_CTRL.onAdd = function (L_MAP) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 100, 200, 300, 400, 500, 600, 700, 850],
            labels = [  "0 mc/ha",
                        "0 - 100 mc/ha",
                        "100 - 200 mc/ha",
                        "200 - 300 mc/ha",
                        "300 - 400 mc/ha",
                        "400 - 500 mc/ha",
                        "500 - 600 mc/ha",
                        "600 - 700 mc/ha",
                        "700 - 850 mc/ha"];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += '<i style="background:' + VOLUMI_HA_getColor(grades[i]) + '"></i> ' + labels[i] + (grades[i + 1] ? '<br>' : '');
        }

        return div;
    };

    LEGEND_CTRL.removeFrom(L_MAP);
    LEGEND_CTRL.addTo(L_MAP);
            
    if (!L_MAP.hasLayer(L_CP_UFOR)){
        L_MAP.addLayer(L_CP_UFOR);
    }
    
    //$.mobile.changePage( $("#map_page"), {allowSamePageTransition:true,transition:"fade"} );
}

function goToMap_VOLUME_UFOR(){
    console.log(MAP_ACTIVE);
    if (MAP_ACTIVE!="VOLUMI"){
        Leaflet_initMap_VOLUMI();
        MAP_ACTIVE="VOLUMI";
        console.log(MAP_ACTIVE);
    }
    
    L_CP_UFOR.setStyle(VOLUMI_HA_style);

    LEGEND_CTRL.onAdd = function (L_MAP) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 100, 200, 300, 400, 500, 600, 700, 850],
            labels = [  "0 mc/ha",
                        "0 - 100 mc/ha",
                        "100 - 200 mc/ha",
                        "200 - 300 mc/ha",
                        "300 - 400 mc/ha",
                        "400 - 500 mc/ha",
                        "500 - 600 mc/ha",
                        "600 - 700 mc/ha",
                        "700 - 850 mc/ha"];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += '<i style="background:' + VOLUMI_HA_getColor(grades[i]) + '"></i> ' + labels[i] + (grades[i + 1] ? '<br>' : '');
        }

        return div;
    };

    LEGEND_CTRL.removeFrom(L_MAP);
    LEGEND_CTRL.addTo(L_MAP);
            
    if (!L_MAP.hasLayer(L_CP_UFOR)){
        L_MAP.addLayer(L_CP_UFOR);
    }
    
    //$.mobile.changePage( $("#map_page"), {allowSamePageTransition:true,transition:"fade"} );
}


function goToMap_BIOMASSA_CONTINUO(){
    console.log(MAP_ACTIVE);
    if (MAP_ACTIVE!="BIOMASSE"){
        Leaflet_initMap_BIOMASSE();
        MAP_ACTIVE="BIOMASSE";
        console.log(MAP_ACTIVE);
    }
    
    L_CP_UFOR.setStyle(BASIC_style);

    LEGEND_CTRL.onAdd = function (L_MAP) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 100, 200, 300, 400, 500, 600, 700],
            labels = [  "0 t/ha",
                        "0 - 100 t/ha",
                        "100 - 200 t/ha",
                        "200 - 300 t/ha",
                        "300 - 400 t/ha",
                        "400 - 500 t/ha",
                        "500 - 600 t/ha",
                        "600 - 700 t/ha"];
        
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += '<i style="background:' + BIOMASSE_HA_getColor(grades[i]) + '"></i> ' + labels[i] + (grades[i + 1] ? '<br>' : '');
        }

        return div;
    };

    LEGEND_CTRL.removeFrom(L_MAP);
    LEGEND_CTRL.addTo(L_MAP);
    
    if (!L_MAP.hasLayer(L_CP_UFOR)){
        L_MAP.addLayer(L_CP_UFOR);
    }
            
    
    //$.mobile.changePage( $("#map_page"), {allowSamePageTransition:true,transition:"fade"} );
}

function goToMap_BIOMASSA_UFOR(){
    console.log(MAP_ACTIVE);
    if (MAP_ACTIVE!="BIOMASSE"){
        Leaflet_initMap_BIOMASSE();
        MAP_ACTIVE="BIOMASSE";
        console.log(MAP_ACTIVE);
    }
    
    L_CP_UFOR.setStyle(BIOMASSE_HA_style);

    LEGEND_CTRL.onAdd = function (L_MAP) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 100, 200, 300, 400, 500, 600, 700],
            labels = [  "0 t/ha",
                        "0 - 100 t/ha",
                        "100 - 200 t/ha",
                        "200 - 300 t/ha",
                        "300 - 400 t/ha",
                        "400 - 500 t/ha",
                        "500 - 600 t/ha",
                        "600 - 700 t/ha"];
        
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += '<i style="background:' + BIOMASSE_HA_getColor(grades[i]) + '"></i> ' + labels[i] + (grades[i + 1] ? '<br>' : '');
        }

        return div;
    };

    LEGEND_CTRL.removeFrom(L_MAP);
    LEGEND_CTRL.addTo(L_MAP);
    
    if (!L_MAP.hasLayer(L_CP_UFOR)){
        L_MAP.addLayer(L_CP_UFOR);
    }
            
    
    //$.mobile.changePage( $("#map_page"), {allowSamePageTransition:true,transition:"fade"} );
}


function goToMap_OFD_STORICHE(){
    console.log(MAP_ACTIVE);
    if (MAP_ACTIVE!="OFD_STORICHE"){
        Leaflet_initMap_OFD_STORICHE();
        MAP_ACTIVE="OFD_STORICHE";
        console.log(MAP_ACTIVE);
    }
    L_CP_UFOR.setStyle(BASIC_style);
        

    LEGEND_CTRL.onAdd = function (L_MAP) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [],
                    labels = [];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML += '<i style="background:' + T_FOR_P_getColor(grades[i]) + '"></i> ' + labels[i] + (grades[i + 1] ? '<br>' : '');
                }

                return div;
            };

        LEGEND_CTRL.removeFrom(L_MAP);

        LEGEND_CTRL.addTo(L_MAP);
    
    //$.mobile.changePage( $("#map_page"), {allowSamePageTransition:true,transition:"fade"} );
}


function goToMap_UFOR(map_name){
    console.log(MAP_ACTIVE);
    if (MAP_ACTIVE!="UFOR"){
        Leaflet_initMap_UFOR();
        MAP_ACTIVE="UFOR";
        console.log(MAP_ACTIVE);
    }

    switch(map_name)
    {
        case "BASIC_style":
            L_CP_UFOR.setStyle(BASIC_style);
        
    
            LEGEND_CTRL.removeFrom(L_MAP);
            
            break;
            
        case "STRATI_2014":        
            L_CP_UFOR.setStyle(UFOR_STRATI_2014_style);
    
    
            LEGEND_CTRL.onAdd = function (L_MAP) {

            var div = L.DomUtil.create('div', 'info legend'),
                grades = ["P1","Q1","L1","S1","AL","PS1","M", "ACQ",  "IMP"],
                labels = [
                    "Pineta",
                    "Querceto",
                    "Lecceta",
                    "Sughereta",
                    "Altre latifoglie",
                    "Piantagioni speciali",
                    "Macchia mediterranea",
                    "Zone umide",
                    "Improduttivi e zone di rispetto",
                ];


                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML += '<i style="background:' + UFOR_STRATI_2014_getColor(grades[i]) + '"></i> ' + labels[i] + (grades[i + 1] ? '<br>' : '');
                }

                return div;
            };

            LEGEND_CTRL.removeFrom(L_MAP);
            LEGEND_CTRL.addTo(L_MAP);

    
            break;
            
        case "T_FOR_P":        
            L_CP_UFOR.setStyle(T_FOR_P_style);
    
    
            LEGEND_CTRL.onAdd = function (L_MAP) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [100430, 100431, 100432, 100438, 100439],
                    labels = ["Formazioni a dominanza di Pino domestico",	
                                "Formazioni a prevalenza di Pino domestico con Leccio",
                                "Formazioni a prevalenza di Pino domestico con querce caducifoglie",
                                "Formazioni a prevalenza di Pino domestico con altre specie",
                                "Formazioni miste a Pino domestico"];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML += '<i style="background:' + T_FOR_P_getColor(grades[i]) + '"></i> ' + labels[i] + (grades[i + 1] ? '<br>' : '');
                }

                return div;
            };

            LEGEND_CTRL.removeFrom(L_MAP);

            LEGEND_CTRL.addTo(L_MAP);
            break;
            
        case "T_FOR_Q":
            L_CP_UFOR.setStyle(T_FOR_Q_style);
            
    
            LEGEND_CTRL.onAdd = function (L_MAP) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [103001, 103002, 103003, 103009],
                    labels = ["Formazioni a prevalenza di cerro e/o farnetto",	
                                "Formazioni miste a farnia cerro, farnetto e sughera",
                                "Formazioni miste di querce caducifoglie e altre latifoglie decidue",
                                "Formazioni a prevalenza di querce caducifoglie con altre specie"];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML += '<i style="background:' + T_FOR_Q_getColor(grades[i]) + '"></i> ' + labels[i] + (grades[i + 1] ? '<br>' : '');
                }

                return div;
            };
            
            
            LEGEND_CTRL.removeFrom(L_MAP);

            LEGEND_CTRL.addTo(L_MAP);
            break;
            
            case "T_FOR_QL":
            L_CP_UFOR.setStyle(T_FOR_QL_style);
            
            
        
            LEGEND_CTRL.onAdd = function (L_MAP) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [103110, 103111, 103112],
			        labels = ["Formazioni a dominanza di leccio",	
						"Formazioni a prevalenza di leccio con altre specie",
						"Formazioni miste di leccio"];
                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML += '<i style="background:' + T_FOR_QL_getColor(grades[i]) + '"></i> ' + labels[i] + (grades[i + 1] ? '<br>' : '');
                }

                return div;
            };
            
            LEGEND_CTRL.removeFrom(L_MAP);

            LEGEND_CTRL.addTo(L_MAP);
            break;
            
            case "T_FOR_S":
            L_CP_UFOR.setStyle(T_FOR_S_style);
            
            
        
            LEGEND_CTRL.onAdd = function (L_MAP) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [103130, 103131, 103132],
			        labels = ["Formazioni a dominanza di sughera",	
						"Formazioni a prevalenza di Sughera con altre specie",
						"Formazioni miste a Sughera"];
                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML += '<i style="background:' + T_FOR_S_getColor(grades[i]) + '"></i> ' + labels[i] + (grades[i + 1] ? '<br>' : '');
                }

                return div;
            };
            
            LEGEND_CTRL.removeFrom(L_MAP);

            LEGEND_CTRL.addTo(L_MAP);
            break;
            
            case "T_FOR_AL":
            L_CP_UFOR.setStyle(T_FOR_AL_style);
            
            
        
            LEGEND_CTRL.onAdd = function (L_MAP) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [104190, 103500, 105000],
			        labels = ["Formazioni a prevalenza o dominanza di pioppo",	
						"Formazioni a prevalenza o dominanza di Frassino",
						"Formazioni miste di altre latifoglie"];
                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML += '<i style="background:' + T_FOR_AL_getColor(grades[i]) + '"></i> ' + labels[i] + (grades[i + 1] ? '<br>' : '');
                }

                return div;
            };
            
            LEGEND_CTRL.removeFrom(L_MAP);

            LEGEND_CTRL.addTo(L_MAP);
            break;
            
            case "T_FOR_PFS":
            L_CP_UFOR.setStyle(T_FOR_PFS_style);
            
            
        
            LEGEND_CTRL.onAdd = function (L_MAP) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [204190, 204900, 204901, 203130,203131,203135],
			        labels = ["Pioppeto",	
						"Formazioni lineari a dominanza o prevalenza di Eucalitto",
						"Altre formazioni a dominanza o prevalenza di Eucalitto",
						"Formazioni lineari a dominanza o prevalenza di Sughera",
						"PIANT. SPEC Lineari Sughera Eucalitto al. Q",
						"PIANT. SPEC a Sughera"];
                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML += '<i style="background:' + T_FOR_PFS_getColor(grades[i]) + '"></i> ' + labels[i] + (grades[i + 1] ? '<br>' : '');
                }

                return div;
            };
            
            LEGEND_CTRL.removeFrom(L_MAP);

            LEGEND_CTRL.addTo(L_MAP);
            break;
            
            case "T_FOR_MM":
            L_CP_UFOR.setStyle(T_FOR_MM_style);
            
            
        
            LEGEND_CTRL.onAdd = function (L_MAP) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [303110, 303119, 309000],
			        labels = ["A prevalenza di leccio",	
						"A prevalenza di altre sclerofille mediterranee",
						"Altre formazioni a macchia"];
                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML += '<i style="background:' + T_FOR_MM_getColor(grades[i]) + '"></i> ' + labels[i] + (grades[i + 1] ? '<br>' : '');
                }

                return div;
            };
            
            LEGEND_CTRL.removeFrom(L_MAP);

            LEGEND_CTRL.addTo(L_MAP);
            break;
            
            case "GOV_P":
            L_CP_UFOR.setStyle(GOV_P_style);
            
            
        
            LEGEND_CTRL.onAdd = function (L_MAP) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [1, 2],
			        labels = ["Pineta - Fustaia",	
						"Pineta - Governo misto"];
                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML += '<i style="background:' + GOV_P_getColor(grades[i]) + '"></i> ' + labels[i] + (grades[i + 1] ? '<br>' : '');
                }

                return div;
            };
            
            LEGEND_CTRL.removeFrom(L_MAP);

            LEGEND_CTRL.addTo(L_MAP);
            break;
            
            case "GOV_Q":
            L_CP_UFOR.setStyle(GOV_Q_style);
            
            
        
            LEGEND_CTRL.onAdd = function (L_MAP) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [1, 2, 3],
			        labels = ["Querceto - Fustaia",	
						"Querceto - Governo misto",
						"Querceto - Ceduo"];
                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML += '<i style="background:' + GOV_Q_getColor(grades[i]) + '"></i> ' + labels[i] + (grades[i + 1] ? '<br>' : '');
                }

                return div;
            };
            
            LEGEND_CTRL.removeFrom(L_MAP);

            LEGEND_CTRL.addTo(L_MAP);
            break;
            
            case "FILARI":
            L_CP_UFOR.setStyle(FILARI_style);
            
            
        
            LEGEND_CTRL.onAdd = function (L_MAP) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [9560, 9565, 9570],
			        labels = ["Fasce di rispetto/protezione non arborate",	
						"Fasce di rispetto/protezione arborate",
						"Filari"];
                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML += '<i style="background:' + FILARI_getColor(grades[i]) + '"></i> ' + labels[i] + (grades[i + 1] ? '<br>' : '');
                }

                return div;
            };
            
            LEGEND_CTRL.removeFrom(L_MAP);

            LEGEND_CTRL.addTo(L_MAP);
            break;
            
        default:
        
    }
    
    if (!L_MAP.hasLayer(L_CP_UFOR)){
        L_MAP.addLayer(L_CP_UFOR);
    }
    
    //$.mobile.changePage( $("#map_page"), {allowSamePageTransition:true,transition:"fade"} );
}




function Leaflet_initMap_STRATI()
{ 
    console.log("Leaflet_initMap_STRATI");
    
    L_MAP_LAYERS.removeLayer(L_DTM_HILLSHADE);
    L_MAP.removeLayer(L_DTM_HILLSHADE);
    L_MAP_LAYERS.removeLayer(L_CHM_0_30);
    L_MAP.removeLayer(L_CHM_0_30);
    
    L_MAP_LAYERS.removeLayer(L_OFD_1943);
    L_MAP.removeLayer(L_OFD_1943);
    L_MAP_LAYERS.removeLayer(L_OFD_1967);
    L_MAP.removeLayer(L_OFD_1967);
    L_MAP_LAYERS.removeLayer(L_OFD_1980);
    L_MAP.removeLayer(L_OFD_1980);
    L_MAP_LAYERS.removeLayer(L_OFD_1985);
    L_MAP.removeLayer(L_OFD_1985);
    L_MAP_LAYERS.removeLayer(L_OFD_1998);
    L_MAP.removeLayer(L_OFD_1998);
    
    L_MAP_LAYERS.removeLayer(L_VOLUMI);
    L_MAP.removeLayer(L_VOLUMI);
    L_MAP_LAYERS.removeLayer(L_BIOMASSE);
    L_MAP.removeLayer(L_BIOMASSE);
        
    
    //resizeMapIfVisible();

};

function Leaflet_initMap_CLEAR_BASELAYERS()
{
    L_MAP_LAYERS.removeLayer(L_DTM_HILLSHADE);
    L_MAP.removeLayer(L_DTM_HILLSHADE);
    L_MAP_LAYERS.removeLayer(L_CHM_0_30);
    L_MAP.removeLayer(L_CHM_0_30);
    
    L_MAP_LAYERS.removeLayer(L_OFD_1943);
    L_MAP.removeLayer(L_OFD_1943);
    L_MAP_LAYERS.removeLayer(L_OFD_1967);
    L_MAP.removeLayer(L_OFD_1967);
    L_MAP_LAYERS.removeLayer(L_OFD_1980);
    L_MAP.removeLayer(L_OFD_1980);
    L_MAP_LAYERS.removeLayer(L_OFD_1985);
    L_MAP.removeLayer(L_OFD_1985);
    L_MAP_LAYERS.removeLayer(L_OFD_1998);
    L_MAP.removeLayer(L_OFD_1998);
    
    L_MAP_LAYERS.removeLayer(L_VOLUMI);
    L_MAP.removeLayer(L_VOLUMI);
    L_MAP_LAYERS.removeLayer(L_BIOMASSE);
    L_MAP.removeLayer(L_BIOMASSE);
    
    L_MAP_LAYERS.removeLayer(L_CP_STRATI);
    L_MAP.removeLayer(L_CP_STRATI);
    

};

function Leaflet_initMap_UFOR()
{ 
    console.log("Leaflet_initMap_UFOR");
    
    Leaflet_initMap_CLEAR_BASELAYERS();
    

};


function Leaflet_initMap_LIDAR()
{ 
    console.log("Leaflet_initMap_LIDAR");
    
    Leaflet_initMap_CLEAR_BASELAYERS();
        
    L_MAP_LAYERS.addBaseLayer(L_DTM_HILLSHADE,"DTM Hillshade");
    L_MAP_LAYERS.addBaseLayer(L_CHM_0_30,"CHM LiDAR");
    
    
    //resizeMapIfVisible();

};

function Leaflet_initMap_VOLUMI()
{ 
    console.log("Leaflet_initMap_BIOMASSE");
    
    Leaflet_initMap_CLEAR_BASELAYERS();
    
    L_MAP_LAYERS.addBaseLayer(L_VOLUMI,"Volume/ha");

    
    //resizeMapIfVisible();

};

function Leaflet_initMap_BIOMASSE()
{ 
    console.log("Leaflet_initMap_BIOMASSE");
    
    Leaflet_initMap_CLEAR_BASELAYERS();
    
    L_MAP_LAYERS.addBaseLayer(L_BIOMASSE,"Biomassa/ha");

    
    //resizeMapIfVisible();

};

function Leaflet_initMap_OFD_STORICHE()
{ 
    console.log("Leaflet_initMap_OFD_STORICHE");
    
    Leaflet_initMap_CLEAR_BASELAYERS();
    
    L_MAP_LAYERS.addBaseLayer(L_OFD_1943,"Ortofoto 1943");
    L_MAP_LAYERS.addBaseLayer(L_OFD_1967,"Ortofoto 1967");
    L_MAP_LAYERS.addBaseLayer(L_OFD_1980,"Ortofoto 1980");
    L_MAP_LAYERS.addBaseLayer(L_OFD_1985,"Ortofoto 1985");
    L_MAP_LAYERS.addBaseLayer(L_OFD_1998,"Ortofoto 1998");

    
    
    //resizeMapIfVisible();

};




function Leaflet_updateMap(){
    resizeMapIfVisible();
};

//////////////////////////////////////////////////////////////////////
//
//					STRATI STYLING
//
//////////////////////////////////////////////////////////////////////


function CP_getFillOpacity(d,bottom,top){
    return d >= bottom && d <= top ? 1 : // NULL
    			    0.0 ; // VALUE
}



function STRATI_getColor(d) {
    return  d == "ACQ" ? '#99f4f5' : // Abbeveratoi e stagni
            d == "AGR" ? '#faf09a' : // Zone agrarie
            d == "IMP" ? '#ffffff' : // Improduttivi e zone di rispetto
            d == "M" ? '#dffcdd' : // Macchia mediterranea
            d == "P" ? '#addeed' : // Pineta 
            d == "PAS" ? '#efdaaf' : // Pascoli
            d == "PS" ? '#faf364' : // Piantagioni speciali
            d == "QL" ? '#a6fdc8' : // Querceto e boschi misti di latifoglie
            d == "S" ? '#d6d789' : //  Sughereta
            d == "URB" ? '#cccccc' : //  Zone urbanizzate
    			    '#FFFFFF';
}


function STRATI_style(feature) {
    return {
        fillColor: STRATI_getColor(feature.properties.strati_2006),
        fillOpacity: 1,
        weight: 1,
        opacity: 1,
        color: STRATI_getColor(feature.properties.strati_2006),
        //dashArray: '3',
    };
}



//////////////////////////////////////////////////////////////////////
//
//					GEONOTE STYLING
//
//////////////////////////////////////////////////////////////////////


var GeonoteMarkerOptions = {
        radius: 3,
        fillColor: "#FFFFFF",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
};

function Geonote_onEachFeature(feature, layer) {
    param_value = feature.properties["ID"]
    layer.bindLabel(("Geonota :"+String(param_value)), {noHide:false});
    
    layer.on({
        click: GeoNote_goToFeature
    });
}

//////////////////////////////////////////////////////////////////////
//
//					TOPONIMI STYLING
//
//////////////////////////////////////////////////////////////////////


var ToponimiMarkerOptions = {
        radius: 8,
        fillColor: "#FFFFFF",
        color: "#000",
        weight: 2,
        opacity: 0,
        fillOpacity: 0
};

function Toponimi_onEachFeature(feature, layer) {
    param_value = feature.properties["TOPONIMO"]
    layer.bindLabel((String(param_value)), {noHide:true});
}

//////////////////////////////////////////////////////////////////////
//
//					PARTICELLARE STYLING
//
//////////////////////////////////////////////////////////////////////


function PARTICELLARE_style(feature) {
    return {
        fillColor: '#FFFFFF',
        fillOpacity: 0,
        weight: 2,
        opacity: 1,
        color: 'red'
        //dashArray: '5,10'
        
    };
}

// function Particellare_onEachFeature(feature, layer) {
//     param_value = feature.properties["PART"]
//     layer.bindLabel((String(param_value)), {noHide:true});
// }


//////////////////////////////////////////////////////////////////////
//
//					PARTICELLARE STYLING
//
//////////////////////////////////////////////////////////////////////



var ParticellareEtichetteMarkerOptions = {
        radius: 0,
        fillColor: "red",
        color: "red",
        weight: 0,
        opacity: 0,
        fillOpacity: 0
};

function ParticellareEtichette_onEachFeature(feature, layer) {
    param_value = feature.properties["PAV_NPR"]
    layer.bindLabel((String(param_value)), {noHide:true});
}


//////////////////////////////////////////////////////////////////////
//
//					BIGPLOT STYLING
//
//////////////////////////////////////////////////////////////////////


function BIGPLOT_style(feature) {
    return {
        fillColor: '#17CAEB',
        fillOpacity: 0.2,
        weight: 2,
        opacity: 1,
        color: '#17CAEB'
        //dashArray: '5,10'
        
    };
}


//////////////////////////////////////////////////////////////////////
//
//					PERIMETRO STYLING
//
//////////////////////////////////////////////////////////////////////


function PERIMETRO_style(feature) {
    return {
        fillColor: '#000000',
        fillOpacity: 0,
        weight: 4,
        opacity: 1,
        color: 'black'
        //dashArray: '5,10'
        
    };
}


//////////////////////////////////////////////////////////////////////
//
//					VIABILITA STYLING
//
//////////////////////////////////////////////////////////////////////

function VIABILITA_getDash(d) {
    return d == 1 ? '0' : // Viabilità principale
           d == 5 ? '5,10' : // Viabilità forestale
           d == 10 ? '1,10' : // Viabilità secondaria
           d == 50 ? '5,10,1,10' : // Antincendio
    			    '#FFBF00';
}


function VIABILITA_style(feature) {
    return {
        weight: 3,
        opacity: 1,
        color: '#FFBF00',
        dashArray: VIABILITA_getDash(feature.properties.UTILIZZO)
    };
}



//////////////////////////////////////////////////////////////////////
//
//				UFOR	STILI
//
//////////////////////////////////////////////////////////////////////





//
//					INTERROGAZIONE POLIGONI UFOR
//


function UFOR_onEachFeature(feature, layer) {
    param_value = feature.properties["N_UFOR"]
    if(param_value){
        layer.bindLabel(("UFOR "+String(param_value)), {noHide:true});
        layer.on({
            click: UFOR_goToFeature
        });
    }
}

//
//					INTERROGAZIONE POLIGONI BIGPLOT
//


function BIGPLOT_onEachFeature(feature, layer) {
    param_value = feature.properties["ID_BP"]
    if(param_value){
        layer.bindLabel(("BIGPLOT "+String(param_value)), {noHide:true});
        layer.on({
            click: BIGPLOT_goToFeature
        });
    }
}



//////////// DUPLICARE CON NOME FUNZ, VALORI e COLORI ATTRIBUTO


//
//					BASIC
//


/////////// USO_FOR KULER QUAXIM



function BASIC_style(feature) {
    return {
        fillColor: 'white',
        fillOpacity: 0,
        weight: 2,
        opacity: 1,
        color: 'white'
        //color: '#17CAEB'
        //dashArray: '3',
        
    };
}

//
//					STRATI
//



/*
function STRATI_getColor(d) {
    return d == "ACQ" ? '#99f4f5' : // bosco
           d == "AGR" ? '#faf09a' : // piantagioni speciali
           d == "IMP" ? '#ffffff' : // macchia
           d == "M" ? '#dffcdd' : // formazione arbustive
           d == "P" ? '#addeed' : // improduttivi temporanei 
           d == "PAS" ? '#efdaaf' : // U - zone umide
           d == "PS" ? '#faf364' : // A -acque interne
           d == "QL" ? '#a6fdc8' : // text="IPN - improduttivi permanenti per natura"/>
           d == "S" ? '#d6d789' : //  text="IPD - improduttivi permanenti per destinazione"/>
            d == "URB" ? '#cccccc' : //  text="IPD - improduttivi permanenti per destinazione"/>
   			    '#FFFFFF';
}
*/



        
        
        
        
        
        
        
        
        


//
//					CARTA LIDAR
//


/////////// CARTA LIDAR 

function LIDAR_getColor(d) {
    return d == 0 ? '#000000' : // bosco
           d == 30 ? '#FFFFFF' : // piantagioni speciali
             			    '#FFFFFF';
}

//
//					CARTA VOLUMI
//


/////////// CARTA VOLUMI 

function VOLUMI_HA_getColor(d) {
    return d <= 0 ? '#CCCCCC' : // bosco
           d <= 100 ? '#6bb0af' : // piantagioni speciali
           d <= 200 ? '#abdda4' : // macchia
           d <= 300 ? '#d5eeb1' : // formazione arbustive
           d <= 400 ? '#ffffbf' : // improduttivi temporanei 
           d <= 500 ? '#fed690' : // U - zone umide
           d <= 600 ? '#fdae61' : // A -acque interne
           d <= 700 ? '#ea633e' : // text="IPN - improduttivi permanenti per natura"/>
           d <= 850 ? '#d7191c' : //  text="IPD - improduttivi permanenti per destinazione"/>
    			    '#FFFFFF';
}

/////////// CARTA MASSE 

function BIOMASSE_HA_getColor(d) {
    return d <= 0 ? '#CCCCCC' : // bosco
           d <= 100 ? '#6bb0af' : // piantagioni speciali
           d <= 200 ? '#abdda4' : // macchia
           d <= 300 ? '#d5eeb1' : // formazione arbustive
           d <= 400 ? '#fed690' : // U - zone umide
           d <= 500 ? '#fdae61' : // A -acque interne
           d <= 600 ? '#ea633e' : // text="IPN - improduttivi permanenti per natura"/>
           d <= 700 ? '#d7191c' : //  text="IPD - improduttivi permanenti per destinazione"/>
    			    '#FFFFFF';
}

//
//					USO FORESTALE
//


/////////// USO_FOR KULER QUAXIM

function USO_FOR_getColor(d) {
    return d == 10 ? '#01665E' : // bosco
           d == 20 ? '#962713' : // piantagioni speciali
           d == 30 ? '#F6E8C3' : // macchia
           d == 40 ? '#9EBE59' : // formazione arbustive
           d == 70 ? '#F5F5F5' : // improduttivi temporanei 
           d == 80 ? '#2166AC' : // U - zone umide
           d == 85 ? '#053061' : // A -acque interne
           d == 90 ? '#BABABA' : // text="IPN - improduttivi permanenti per natura"/>
           d == 95 ? '#878787' : //  text="IPD - improduttivi permanenti per destinazione"/>
    			    '#FFFFFF';
}


function USO_FOR_style(feature) {
    return {
        fillColor: USO_FOR_getColor(feature.properties.USO_FOR),
        fillOpacity: CP_getFillOpacity(feature.properties.USO_FOR,1,100),
        weight: 1,
        opacity: 1,
        color: 'white'
        //dashArray: '3',
        
    };
}

//////// FINE DUPLICAZIONE


//////////// UFOR STILI VOLUMI

function VOLUMI_HA_style(feature) {
    return {
        fillColor: VOLUMI_HA_getColor(feature.properties.V_HA),
        fillOpacity:  1,
        weight: 1,
        opacity: 1,
        color: 'white'
        //dashArray: '3',
        
    };
}

//////////// UFOR STILI BIOMASSE

function BIOMASSE_HA_style(feature) {
    return {
        fillColor: BIOMASSE_HA_getColor(feature.properties.PS_HA),
        fillOpacity:  1,
        weight: 1,
        opacity: 1,
        color: 'white'
        //dashArray: '3',
        
    };
}




//////////// UFOR STILI STRATO 2014

function UFOR_STRATI_2014_style(feature) {
    return {
        fillColor: UFOR_STRATI_2014_getColor(feature.properties.STR_2014),
        fillOpacity: feature.properties.STR_2014 == null ?0:0.5 ,
        weight: 1,
        opacity: 1,
        color: 'white'
        //dashArray: '3',
        
    };
}

function UFOR_STRATI_2014_getColor(d) {
    var color;
    switch (d){
        case "P1":
        case "P2":
        case "P3":
            color = '#814000';
            break;
        case "Q1":
        case "Q2":
        case "Q3":
            color = '#315e31';
            break;
        case "L1":
        case "L2":
            color = '#70dd03';
            break;
        case "S1":
        case "S2":
            color = '#fcab55';
            break;
        case "AL":
            color = '#bfff00';
            break;
        case "PS1":
        case "PS2":
            color = '#4e4568';
            break;
        case "M":
        case "FAB":
            color = '#fdf43f';
            break;
        case "IMP":
            color = '#fcfcfc';
            break;
        case "ACQ":
            color = '#002ebd';
            break;
        default:  
            color = 'white';
            break;
    }
    return color;
}


//////////// UFOR STILI STRATO 2006

function UFOR_STRATI_2006_style(feature) {
    return {
        fillColor: UFOR_STRATI_2006_getColor(feature.properties.STR_2006),
        fillOpacity: feature.properties.STR_2006 == null ?0:1 ,
        weight: 1,
        opacity: 1,
        color: '#17CAEB'
        //dashArray: '3',
        
    };
}

function UFOR_STRATI_2006_getColor(d) {
    return  d == "ACQ" ? '#99f4f5' : // Abbeveratoi e stagni
            d == "AGR" ? '#faf09a' : // Zone agrarie
            d == "IMP" ? '#ffffff' : // Improduttivi e zone di rispetto
            d == "M" ? '#dffcdd' : // Macchia mediterranea
            d == "P" ? '#addeed' : // Pineta 
            d == "PAS" ? '#efdaaf' : // Pascoli
            d == "PS" ? '#faf364' : // Piantagioni speciali
            d == "QL" ? '#a6fdc8' : // Querceto e boschi misti di latifoglie
            d == "S" ? '#d6d789' : //  Sughereta
            d == "URB" ? '#cccccc' : //  Zone urbanizzate
    			    '#FFFFFF';
}


//////////// T_FOR PINETE

function T_FOR_P_getColor(d) {
    return d == 100430 ? '#30583D' : // Formazioni a dominanza di Pino domestico
           d == 100431 ? '#9EBE59' : // Formazioni a prevalenza di Pino domestico con Leccio
           d == 100432 ? '#962713' : // Formazioni a prevalenza di Pino domestico con querce caducifoglie
           d == 100438 ? '#BD9439' : // Formazioni a prevalenza di Pino domestico con altre specie
           d == 100439 ? '#FFFCC8' : // Formazioni miste a Pino domestico (4)
    			    '#FFFFFF';
}


function T_FOR_P_style(feature) {
    return {
        fillColor: T_FOR_P_getColor(feature.properties.T_FOR),
        fillOpacity: CP_getFillOpacity(feature.properties.T_FOR,100430,100439),
        weight: 1,
        opacity: 1,
        color: 'white'
        //dashArray: '3',
        
    };
}


//////////// T_FOR_Q QUERCETE KULER BOLD AUTUMN

function T_FOR_Q_getColor(d) {
    return d == 103001 ? '#803200' : // Formazioni a prevalenza di cerro e/o farnetto
           d == 103002 ? '#FFA400' : // Formazioni miste a farnia cerro, farnetto e sughera
           d == 103003 ? '#806300' : // Formazioni miste di querce caducifoglie e altre latifoglie decidue
           d == 103009 ? '#CCBD00' : // Formazioni a prevalenza di querce caducifoglie con altre specie
    			    '#FFFFFF';
}


function T_FOR_Q_style(feature) {
    return {
        fillColor: T_FOR_Q_getColor(feature.properties.T_FOR),
        fillOpacity: CP_getFillOpacity(feature.properties.T_FOR,103001,103009),
        weight: 1,
        opacity: 1,
        color: 'white'
        //dashArray: '3',
        
    };
}


//////////// T_FOR_QL QUERCETE DI LECCIO


function T_FOR_QL_getColor(d) {
    return d == 103110 ? '#317883' : // Formazioni a dominanza di leccio
           d == 103111 ? '#A59E61' : // Formazioni a prevalenza di leccio con altre specie
           d == 103112 ? '#FFECBE' : // Formazioni miste di leccio
    			    '#FFFFFF';
}


function T_FOR_QL_style(feature) {
    return {
        fillColor: T_FOR_QL_getColor(feature.properties.T_FOR),
        fillOpacity: CP_getFillOpacity(feature.properties.T_FOR,103110,103112),
        weight: 1,
        opacity: 1,
        color: 'white'
        //dashArray: '3',
        
    };
}




//////////// T_FOR_S SUGHERETE STYLE Copy of Autumns Coming


function T_FOR_S_getColor(d) {
    return d == 103130 ? '#B33D11' : // Formazioni a dominanza di sughera
           d == 103131 ? '#FFB900' : // Formazioni a prevalenza di Sughera con altre specie
           d == 103132 ? '#FFF891' : // Formazioni miste a Sughera
    			    '#FFFFFF';
}


function T_FOR_S_style(feature) {
    return {
        fillColor: T_FOR_S_getColor(feature.properties.T_FOR),
        fillOpacity: CP_getFillOpacity(feature.properties.T_FOR,103130,103132),
        weight: 1,
        opacity: 1,
        color: 'white'
        //dashArray: '3',
        
    };
}






//////////// T_FOR_AL ALTRE LATIFOGLIE


function T_FOR_AL_getColor(d) {
    return d == 104190 ? '#CCDA58' : // Formazioni di altre latifoglie	Formazioni a prevalenza o dominanza di pioppo
           d == 103500 ? '#97AACB' : // Formazioni a prevalenza o dominanza di Frassino
           d == 105000 ? '#4A775E' : // Formazioni miste di altre latifoglie
    			    '#FFFFFF';
}


function T_FOR_AL_style(feature) {
    return {
        fillColor: T_FOR_AL_getColor(feature.properties.T_FOR),
        fillOpacity: CP_getFillOpacity(feature.properties.T_FOR,103500,105000),
        weight: 1,
        opacity: 1,
        color: 'white'
        //dashArray: '3',
        
    };
}




//////////// T_FOR_PFS PIANTAGIONI FORESTALI SPECIALI


function T_FOR_PFS_getColor(d) {
    return  d == 204190 ? '#C3FF5E' : // Pioppeto
            d == 204900 ? '#7ACCAD' : // Formazioni lineari a dominanza o prevalenza di Eucalitto
            d == 204901 ? '#7E41A1' : // Altre formazioni a dominanza o prevalenza di Eucalitto
            d == 203130 ? '#6E78B3' : // Formazioni lineari a dominanza o prevalenza di Sughera
    	    d == 203131 ? '#B35CA1' : // PIANT. SPEC Lineari Sughera Eucalitto al. Q
            d == 203135 ? '#FF5858' : // PIANT. SPEC a Sughera

    			    '#FFFFFF';
}

function T_FOR_PFS_style(feature) {
    return {
        fillColor: T_FOR_PFS_getColor(feature.properties.T_FOR),
        fillOpacity: CP_getFillOpacity(feature.properties.T_FOR,203130,204901),
        weight: 1,
        opacity: 1,
        color: 'white'
        //dashArray: '3',
        
    };
}





//////////// T_FOR_MM FORMAZIONI A MACCHIA MEDITERRANEA ALTA

function T_FOR_MM_getColor(d) {
    return d == 303110 ? '#E8D845' : // A prevalenza di leccio
           d == 303119 ? '#FFB723' : // A prevalenza di altre sclerofille mediterranee
           d == 309000 ? '#FF4A00' : // Altre formazioni a macchia
    			    '#FFFFFF';
}

function T_FOR_MM_style(feature) {
    return {
        fillColor: T_FOR_MM_getColor(feature.properties.T_FOR),
        fillOpacity: CP_getFillOpacity(feature.properties.T_FOR,303110,309000),
        weight: 1,
        opacity: 1,
        color: 'white'
        //dashArray: '3',
        
    };
}



//
//					GOVERNO
//


/////////// USO_FOR KULER QUAXIM

function GOV_P_getColor(d,g) {
    return d == 1 ? '#01665E' : // Pineta - Fustaia
           d == 2 ? '#962713' : // Pineta - Governo misto
    			    '#FFFFFF';
}


function GOV_P_style(feature) {
    return {
        fillColor: GOV_P_getColor(feature.properties.GOV),
        fillOpacity: CP_getFillOpacity(feature.properties.T_FOR,100430,100439),
        weight: 1,
        opacity: 1,
        color: 'white'
        //dashArray: '3',
        
    };
}


/////////// USO_FOR KULER QUAXIM

function GOV_Q_getColor(d,g) {
    return  d == 1 ? '#AB9500' : // Querceto - Fustaia
            d == 2 ? '#B84800' : // Querceto - Governo misto
            d == 3 ? '#FFA400' : // Querceto - Ceduo
    			    '#FFFFFF';
}


function GOV_Q_style(feature) {
    return {
        fillColor: GOV_Q_getColor(feature.properties.GOV),
        fillOpacity: CP_getFillOpacity(feature.properties.T_FOR,103001,103112),
        weight: 1,
        opacity: 1,
        color: 'white'
        //dashArray: '3',
        
    };
}


//
//					SPEC USO FOR
//



function FILARI_getColor(d,g) {
    return  d == 9560 ? '#B3DAF2' : // Fasce di rispetto/protezione non arborate
            d == 9565 ? '#D9CE96' : // Fasce di rispetto/protezione arborate
            d == 9570 ? '#8C545E' : // Filari
    			    '#FFFFFF';
}


function FILARI_style(feature) {
    return {
        fillColor: FILARI_getColor(feature.properties.SPEC_USO),
        fillOpacity: CP_getFillOpacity(feature.properties.SPEC_USO,9560,9570),
        weight: 1,
        opacity: 1,
        color: 'white'
        //dashArray: '3',
        
    };
}





//////////////////////////////////////////
//
//  UFOR SCHEDE PAGE
//
//////////////////////////////////////////


function UFOR_goToFeature(e) {
    var layer = e.target;
    var props = layer.feature.properties;
    
    UFOR_SELECTED = layer.feature.properties.K_UFOR;
    

    // 
	// INIZIO OFD  LAYER 
    //
        
    
    $("#ufor_panel_id").html('UFOR: '+ UFOR_SELECTED);
    
    // populate ufor data array
    
    var r = new Array(), j = -1;
    
    for(i in UFOR_FIELD_ARRAY)
            {
                key = UFOR_FIELD_ARRAY[i];
                value = props[key];
                r[++j] ='<tr>';
                r[++j] ='<td>';
                r[++j] = UFOR_FIELD_ARRAY_TITLE[i];
                r[++j] = '</td>';
                r[++j] ='<td>';
                r[++j] = ufor_field_decode(key,value);
                r[++j] = '</td>';
                r[++j] ='</tr>';
            }
    
    var uforTable = '<table data-role="table" id="ufor-table"  class="ui-responsive table-stroke" style="width:100%;text-align:left;"><thead><tr><th>Parametro</th><th>Valore</th></tr></thead><tbody>'+r.join('')+"</tbody></table>";
    
    $("#ufor_panel_table").html(uforTable);
    
    //composizione table
    
    r = new Array(), j = -1;
    

    for (i = 0; i < ufor_sch_comp_2014.features.length; i++) {
        if (ufor_sch_comp_2014.features[i].properties.ID_SCHEDA == UFOR_SELECTED){
            
            r[++j] ='<tr>';
            r[++j] ='<td>';
            r[++j] = ufor_field_decode("ID_SPECIE",ufor_sch_comp_2014.features[i].properties.ID_SPECIE);
            r[++j] = '</td>';
            r[++j] ='<td>';
            r[++j] = ufor_field_decode("COMP_COP_STR1",ufor_sch_comp_2014.features[i].properties.COP_STR1);
            r[++j] = '</td>';
            r[++j] ='<td>';
            r[++j] = ufor_field_decode("COMP_COP_STR2",ufor_sch_comp_2014.features[i].properties.COP_STR2);
            r[++j] = '</td>';
            r[++j] ='</tr>';
            
        }
                
    }
    
    r[++j] ='<tr>';
    r[++j] ='<td colspan="2">';
    r[++j] ='Dominante: oltre 80% copertura nello strato<br>';
    r[++j] ="Prevalente: tra il 50% e l'80% <br>";
    r[++j] ='Presente maggioritaria: sotto il 50%<br>';
    r[++j] ='Presente: sotto il 50%<br>';
    r[++j] ='Sporadica: sotto il 10%<br>';
    r[++j] = '</td>';
    r[++j] ='</tr>';
    
    var compTable = '<table data-role="table" id="comp-table"  class="ui-responsive table-stroke" style="width:100%;text-align:left;"><thead><tr><th>Specie</th><th>Cop STR1</th><th>Cop STR2</th></tr></thead><tbody>'+r.join('')+"</tbody></table>";
    
    $("#comp_panel_table").html(compTable);
    
    // go to page
    
    $.mobile.changePage( $("#ufor_page"), {allowSamePageTransition:true,transition:"flip"} );
}


/*function UFOR_goToFeature(e) {
    var layer = e.target;
    var props = layer.feature.properties;
    
    UFOR_SELECTED = layer.feature.properties.K_UFOR;
    
    // populate data array
    
    var r = new Array(), j = -1;
    
    for(i in UFOR_FIELD_ARRAY)
            {
                key = UFOR_FIELD_ARRAY[i];
                value = props[key];
                r[++j] ='<tr>';
                r[++j] ='<td>';
                r[++j] = UFOR_FIELD_ARRAY_TITLE[i];
                r[++j] = '</td>';
                r[++j] ='<td>';
                r[++j] = ufor_field_decode(key,value);
                r[++j] = '</td>';
                r[++j] ='</tr>';
            }
            

    
    $("#ufor_panel_id").html('UFOR: '+ UFOR_SELECTED);
    $("#comp_button").attr("k_ufor",UFOR_SELECTED);
    
    //var comp_button = '<br><a href="#" id="comp_button" k_ufor="'+layer.feature.properties.K_UFOR+'" class="ui-btn ui-shadow ui-corner-all ui-btn-a ui-mini">Composizione</a>';
    
    var uforTable = '<table data-role="table" id="ufor-table"  class="ui-responsive table-stroke" style="width:100%;text-align:left;"><thead><tr><th>Parametro</th><th>Valore</th></tr></thead><tbody>'+r.join('')+"</tbody></table>";
    
    $("#ufor_panel_table").html(uforTable);
    
    $.mobile.activePage.find('#ufor_panel').panel("open"); 
    $("#ufor_panel" ).trigger( "updatelayout" );
}


$(document).on('vclick', '#comp_button', function(){
    ufor_comp_open_panel($(this).attr('k_ufor'));
});


//////////////////////////////////////////
//
//  COMPOSIZIONE PANEL
//
//////////////////////////////////////////

function ufor_comp_open_panel(key){
    var r = new Array(), j = -1;
    

    for (i = 0; i < ufor_sch_comp_2014.features.length; i++) {
        if (ufor_sch_comp_2014.features[i].properties.ID_SCHEDA == key){
            
            r[++j] ='<tr>';
            r[++j] ='<td>';
            r[++j] = ufor_field_decode("ID_SPECIE",ufor_sch_comp_2014.features[i].properties.ID_SPECIE);
            r[++j] = '</td>';
            r[++j] ='<td>';
            r[++j] = ufor_field_decode("COMP_COP_STR1",ufor_sch_comp_2014.features[i].properties.COP_STR1);
            r[++j] = '</td>';
            r[++j] ='<td>';
            r[++j] = ufor_field_decode("COMP_COP_STR2",ufor_sch_comp_2014.features[i].properties.COP_STR2);
            r[++j] = '</td>';
            r[++j] ='</tr>';
            
        }
                
    }
    
    r[++j] ='<tr>';
    r[++j] ='<td colspan="2">';
    r[++j] ='Dominante: oltre 80% copertura nello strato<br>';
    r[++j] ="Prevalente: tra il 50% e l'80% <br>";
    r[++j] ='Presente maggioritaria: sotto il 50%<br>';
    r[++j] ='Presente: sotto il 50%<br>';
    r[++j] ='Sporadica: sotto il 10%<br>';
    r[++j] = '</td>';
    r[++j] ='</tr>';
    
    $("#comp_panel_id").html('UFOR: '+ UFOR_SELECTED);
    $("#sch_button").attr("k_ufor",UFOR_SELECTED);
    
    var compTable = '<table data-role="table" id="comp-table"  class="ui-responsive table-stroke" style="text-align:left;"><thead><tr><th>Specie</th><th>Cop STR1</th><th>Cop STR2</th></tr></thead><tbody>'+r.join('')+"</tbody></table>";
    
    $("#comp_panel_table").html(compTable);
    
    $.mobile.activePage.find('#comp_panel').panel("open"); 
    $("#comp_panel" ).trigger( "updatelayout" );
    
};

$(document).on('vclick', '#sch_button', function(){
    $.mobile.activePage.find('#ufor_panel').panel('open');
});
*/


function ufor_field_decode(key,d){

    switch (key)
    {
        case "N_UFOR":
            return d;
            break;
        case "ID_SCHEDA":
            return d;
            break;
        case "USO_FOR":
            return d == 10 ? 'Boschi' : // bosco
                   d == 20 ? 'Piantagioni forestali speciali' : // piantagioni speciali
                   d == 30 ? 'Macchia mediterranea alta' : // macchia
                   d == 40 ? 'Formazioni arbustive basse' : // formazione arbustive
                   d == 70 ? 'Improduttivi temporanei' : // improduttivi temporanei 
                   d == 80 ? 'Zone umide' : // U - zone umide
                   d == 85 ? 'Acque interne' : // A -acque interne
                   d == 90 ? 'Improduttivi permanenti per natura' : // text="IPN - improduttivi permanenti per natura"/>
                   d == 95 ? 'Improduttivi permanenti per destinazione' : //  text="IPD - improduttivi permanenti per destinazione"/>
                    '---';
    	    break;
    	
    	case "SPEC_USO":
    	    return  d == 4010 ? 'Macchia mediterranea bassa' :
                    d == 4090 ? 'Altre formazioni arbustive basse' :
                    d == 7010 ? 'Radure o incolti NPPSSF(1)' :
                    d == 7020 ? 'Aree TPS_eventi meteorici (2)' :
                    d == 7030 ? 'Aree TPS_percorse fuoco' :
                    d == 7090 ? 'Aree TPS_altri casi' :
                    d == 8010 ? 'Piscine permanenti' :
                    d == 8020 ? 'Piscine temporanee' :
                    d == 8510 ? 'Alvei fiumi/torrenti/ruscelli' :
                    d == 8520 ? 'Acque ferme naturali/artificiali' :
                    d == 9010 ? 'Del substrato_macereti/pietraie' :
                    d == 9020 ? 'Del substrato_affioramenti rocciosi' :
                    d == 9030 ? 'Del substrato_arenili' :
                    d == 9040 ? 'Del substrato_zone erose/dissestate in genere' :
                    d == 9050 ? 'Del substrato_altri motivi' :
                    d == 9060 ? 'Estranea al substrato' :
                    d == 9510 ? "A servizio forestale_piazzali d'imposto" :
                    d == 9530 ? 'A servizio forestale_altri casi' :
                    d == 9540 ? 'Non forestale_suolo NPPSSF' :
                    d == 9550 ? 'Non forestale_suolo PSSF (3)' :
                    d == 9560 ? 'Fascie di rispetto/ protezione non arborate' :
                    d == 9565 ? 'Fascie di rispetto/protezione arborate' :
                    d == 9570 ? 'Filari' :
                    '---';
        break;
    	    
    	case "CON_EST1":
    	case "CON_EST2":
    	case "CON_EST3":
    	case "CON_EST4":
    	    return  d == 1 ? 'Assenti' :
                    d == 10 ? 'Pascolo animali domestici' :
                    d == 21 ? 'Fauna: alterazione terreno' :
                    d == 22 ? 'Fauna: rinnovazione e novellame' :
                    d == 23 ? 'Fauna: soggetti arborei' :
                    d == 30 ? 'Danni da utilizzazioni forestali' :
                    d == 41 ? 'Erosione superficiale/dilavamento' :
                    d == 42 ? 'Frane/smottamenti' :
                    d == 43 ? 'Erosione marina' :
                    d == 50 ? 'Incendio' :
                    d == 60 ? 'Aerosol marino' :
                    d == 90 ? 'Altri condizionamenti' :
                        '---';
            break;
    	
    	case "T_FOR":
    	    return  d == 100430 ? 'Formazioni a dominanza di Pino domestico (2)' :
                    d == 100431 ? 'Formazioni a prevalenza di Pino domestico con Leccio (3)' :
                    d == 100432 ? 'Formazioni a prevalenza di Pino domestico con querce caducifoglie' :
                    d == 100438 ? 'Formazioni a prevalenza di Pino domestico con altre specie' :
                    d == 100439 ? 'Formazioni miste a Pino domestico (4)' :
                    d == 103001 ? 'Formazioni a prevalenza di cerro e/o farnetto' :
                    d == 103002 ? 'Formazioni miste a farnia cerro, farnetto e sughera' :
                    d == 103003 ? 'Formazioni miste di querce caducifoglie e altre latifoglie decidue' :
                    d == 103009 ? 'Formazioni a prevalenza di querce caducifoglie con altre specie' :
                    d == 103110 ? 'Formazioni a dominanza di Leccio' :
                    d == 103111 ? 'Formazioni a prevalenza di Leccio con altre specie' :
                    d == 103112 ? 'Formazioni miste a Leccio' :
                    d == 103130 ? 'Formazioni a dominanza di sughera' :
                    d == 103131 ? 'Formazioni a prevalenza di Sughera con altre specie' :
                    d == 103132 ? 'Formazioni miste a Sughera' :
                    d == 104190 ? 'Formazioni a prevalenza o dominanza di pioppo' :
                    d == 103500 ? 'Formazioni a prevalenza o dominanza di Frassino' :
                    d == 105000 ? 'Formazioni miste  di altre latifoglie' :
                    d == 204190 ? 'Pioppeto' :
                    d == 204900 ? 'Formazioni lineari a dominanza o prevalenza di Eucalitto' :
                    d == 204901 ? 'Altre formazioni a dominanza o prevalenza di Eucalitto' :
                    d == 203130 ? 'Formazioni lineari a dominanza o prevalenza di Sughera' :
                    d == 203131 ? 'PIANT. SPEC Lineari Sughera Eucalitto al. Q' :
                    d == 203135 ? 'PIANT. SPEC a Sughera' :
                    d == 303110 ? 'A prevalenza di leccio' :
                    d == 303119 ? 'A prevalenza di altre sclerofille mediterranee' :
                    d == 309000 ? 'Altre formazioni a macchia' :
                    '---';
            break;
        case "GOV":
            return d == 1 ? 'Fustaia' : // fustaia
                   d == 2 ? 'Misto' : // ceduo
                   d == 3 ? 'Ceduo' :	// misto
                            '---';
            break;
        case "DIS_OR":
            return  d == 1 ? 'Regolare' : // 	regolare
                    d == 2 ? 'Lacunosa' : //	lacunosa
                    d == 3 ? 'Aggregata' : // 	aggregata
                    d == 4 ? 'A filari' :	//	a filari
                    d == 5 ? 'A fascia' : //	a fascia 
                                    '---';
            break;
        case "STR_VER":
            return d == 1 ? 'Monoplano' : // 	monoplano
                   d == 2 ? 'Biplano' : //	biplano
                   d == 3 ? 'Multiplano' :	//	multiplano
                            '---';
            break;
        case "FERT":
            return d == 10 ? 'Scarsa' : // scarsa 
                   d == 20 ? 'Media' : // media
                   d == 30 ? 'Buona' : // buona
                            '---';
            break;
        case "STR2":
            return d == 1 ? 'Assente' : 
                   d == 5 ? 'Presente' : 
                            '---';
            break;
        case "PIA_STR2":
            return d == 1 ? 'Inferiore' : 
                   d == 5 ? 'Superiore' : 
                            '---';
            break;
        case "H_SEP_S":
            return d>0 ? d: "---";
            break;
        case "COP_STR1":
            return d>0 ? String(d) + " %": "---";
            break;
        case "COP_STR2":
            return d>0 ? String(d) + " %": "---";
            break;
            
        case "PRES_RIN":
            return '';
            break;    
        
        case "ID_SPECIE":
        case "RIN_S1S":
        case "RIN_S2S":
        case "RIN_S3S":
        case "RIN_S4S":
        case "RIN_S5S":
            return  d == 1311 ? '*Quercus ilex' :
                    d == 1043 ? '*Pinus pinea' :
                    d == 1300 ? '*Quercus cerris ' :
                    d == 1301 ? '*Quercus frainetto ' :
                    d == 1302 ? '*Quercus robur' :
                    d == 1307 ? '*Quercus petraea ' :
                    d == 1308 ? '*Quercus pubescens ' :
                    d == 1313 ? '*Quercus suber ' :
                    d == 1310 ? '*Quercus crenata' :
                    d == 1251 ? '*Carpinus orientalis' :
                    d == 1490 ? '*Eucalyptus sp.' :
                    d == 1695 ? '*Acacia sp.' :
                    d == 1201 ? '*Acer campestre' :
                    d == 1204 ? '*Acer gr. opalus ' :
                    d == 1205 ? '*Acer monspessulanum' :
                    d == 1200 ? '*Acer negundo' :
                    d == 1495 ? '*Aesculus hippocastanum' :
                    d == 1210 ? '*Ailanthus altissima' :
                    d == 1401 ? '*Alnus cordata ' :
                    d == 1402 ? '*Alnus glutinosa ' :
                    d == 1635 ? '*Amelanchier ovalis' :
                    d == 1725 ? '*Calicotome sp.' :
                    d == 1250 ? '*Carpinus betulus ' :
                    d == 1285 ? '*Catalpa bignonioides' :
                    d == 1030 ? '*Cedrus sp.' :
                    d == 1230 ? '*Celtis sp.' :
                    d == 1270 ? '*Ceratonia siliqua' :
                    d == 1220 ? '*Cercis siliquastrum' :
                    d == 1070 ? '*Chamaecyparis lawsoniana' :
                    d == 1765 ? '*Chamaerops humilis' :
                    d == 1566 ? '*Cornus mas' :
                    d == 1565 ? '*Cornus sanguinea' :
                    d == 1625 ? '*Corylus sp.' :
                    d == 1665 ? '*Cotinus coggygria' :
                    d == 1568 ? '*Cotoneaster sp.' :
                    d == 1540 ? '*Crataegus sp. ' :
                    d == 1061 ? '*Cupressus arizonica' :
                    d == 1060 ? '*Cupressus sempervirens' :
                    d == 1059 ? '*Cupressus sp.' :
                    d == 1714 ? '*Erica sp.' :
                    d == 1580 ? '*Euonymus sp.' :
                    d == 1720 ? '*Euphorbia dendroides' :
                    d == 1719 ? '*Euphorbia sp.' :
                    d == 1340 ? '*Ficus carica' :
                    d == 1574 ? '*Frangula sp.' :
                    d == 1352 ? '*Fraxinus ornus' :
                    d == 1351 ? '*Fraxinus oxycarpa ' :
                    d == 1595 ? '*Genista sp.' :
                    d == 1630 ? '*Hippophae rhamnoides' :
                    d == 1470 ? '*Ilex aquifolium ' :
                    d == 1381 ? '*Juglans nigra' :
                    d == 1380 ? '*Juglans regia' :
                    d == 1523 ? '*Juniperus oxycedrus' :
                    d == 1614 ? '*Laburnum sp.' :
                    d == 1481 ? '*Laurus nobilis' :
                    d == 1610 ? '*Ligustrum vulgare' :
                    d == 1365 ? '*Maclura pomifera' :
                    d == 1360 ? '*Malus sp.' :
                    d == 1370 ? '*Mespilus germanica' :
                    d == 1354 ? '*Morus sp.' :
                    d == 1756 ? '*Olea europaea' :
                    d == 1260 ? '*Ostrya carpinifolia ' :
                    d == 1405 ? '*Paulownia tomentosa' :
                    d == 1733 ? '*Phillyrea latifolia' :
                    d == 1041 ? '*Pinus brutia' :
                    d == 1044 ? '*Pinus excelsa (P.wallichiana)' :
                    d == 1042 ? '*Pinus halepensis' :
                    d == 1050 ? '*Pinus radiata' :
                    d == 1039 ? '*Pinus sp.' :
                    d == 1681 ? '*Pistacia lentiscus' :
                    d == 1680 ? '*Pistacia terebinthus' :
                    d == 1430 ? '*Platanus hybrida' :
                    d == 1431 ? '*Platanus orientalis ' :
                    d == 1421 ? '*Populus canescens' :
                    d == 1424 ? '*Populus tremula' :
                    d == 1291 ? '*Prunus avium' :
                    d == 1290 ? '*Prunus cerasifera' :
                    d == 1294 ? '*Prunus cocomilia' :
                    d == 1608 ? '*Prunus laurocerasus' :
                    d == 1295 ? '*Prunus mahaleb' :
                    d == 1292 ? '*Prunus padus' :
                    d == 1293 ? '*Prunus serotina' :
                    d == 1289 ? '*Prunus sp.' :
                    d == 1296 ? '*Prunus spinosa' :
                    d == 1409 ? '*Pyrus sp.' :
                    d == 1306 ? '*Quercus rubra' :
                    d == 1299 ? '*Quercus sp.' :
                    d == 1647 ? '*Rhamnus alaternus' :
                    d == 1646 ? '*Rhamnus catharticus' :
                    d == 1667 ? '*Rhus sp.' :
                    d == 1440 ? '*Robinia pseudacacia' :
                    d == 1451 ? '*Salix alba' :
                    d == 1452 ? '*Salix caprea' :
                    d == 1450 ? '*Salix sp.' :
                    d == 1455 ? '*Salix sp.' :
                    d == 1660 ? '*Sambucus nigra' :
                    d == 1324 ? '*Sorbus aria' :
                    d == 1321 ? '*Sorbus aucuparia' :
                    d == 1322 ? '*Sorbus domestica' :
                    d == 1319 ? '*Sorbus sp.' :
                    d == 1320 ? '*Sorbus torminalis' :
                    d == 1781 ? '*Tamarix sp.' :
                    d == 1100 ? '*Taxus baccata' :
                    d == 1105 ? '*Thuja sp.' :
                    d == 1461 ? '*Tilia cordata' :
                    d == 1462 ? '*Tilia platyphyllos' :
                    d == 1460 ? '*Tilia sp.' :
                    d == 1103 ? '*Tsuga sp.' :
                    d == 1600 ? '*Ulex europaeus' :
                    d == 1390 ? '*Ulmus minor ' :
                    d == 1389 ? '*Ulmus sp.' :
                    d == 1690 ? '*Vitis sp. ' :
                    d == 1636 ? '*Yucca aloifolia' :
                    d == 1110 ? '*altra conifera' :
                    d == 1500 ? '*altra latifoglia arborea' :
                    d == 2314 ? 'Quercus ilex' :
                    d == 2710 ? 'Arbutus unedo' :
                    d == 2715 ? 'Erica arborea' :
                    d == 2716 ? 'Erica multiflora' :
                    d == 2732 ? 'Phillyrea latifolia' :
                    d == 2730 ? 'Phillyrea angustifolia' :
                    d == 2681 ? 'Pistacia lentiscus' :
                    d == 2745 ? 'Myrtus communis' :
                    d == 2540 ? 'Crataegus sp. ' :
                    d == 2647 ? 'Rhamnus alaternus' :
                    d == 2522 ? 'Juniperus communis' :
                    d == 2481 ? 'Laurus nobilis' :
                    d == 2585 ? 'Spartium junceum' :
                    d == 2600 ? 'Ulex europaeus' :
                    d == 2596 ? 'Adenocarpus complicatus' :
                    d == 2635 ? 'Amelanchier ovalis' :
                    d == 2637 ? 'Amorpha fruticosa' :
                    d == 2639 ? 'Anagyris foetida' :
                    d == 2642 ? 'Anthyllis barba-jovis' :
                    d == 2535 ? 'Arctostaphylos uva-ursi' :
                    d == 2537 ? 'Artemisia arborescens' :
                    d == 2557 ? 'Arundo donax' :
                    d == 2539 ? 'Atriplex halimus' :
                    d == 2569 ? 'Berberis sp.' :
                    d == 2553 ? 'Bupleurum fruticosum' :
                    d == 2544 ? 'Buxus sp.' :
                    d == 2725 ? 'Calicotome sp.' :
                    d == 2251 ? 'Carpinus orientalis' :
                    d == 2271 ? 'Ceratonia siliqua' :
                    d == 2220 ? 'Cercis siliquastrum' :
                    d == 2765 ? 'Chamaerops humilis' :
                    d == 2215 ? 'Cinnamomum camphora' :
                    d == 2705 ? 'Cistus sp. ' :
                    d == 2703 ? 'Clematis sp.' :
                    d == 2787 ? 'Cneorum tricoccon' :
                    d == 2685 ? 'Colutea arborescens' :
                    d == 2566 ? 'Cornus mas' :
                    d == 2565 ? 'Cornus sanguinea' :
                    d == 2562 ? 'Coronilla sp.' :
                    d == 2625 ? 'Corylus sp.' :
                    d == 2665 ? 'Cotinus coggygria' :
                    d == 2568 ? 'Cotoneaster sp.' :
                    d == 2590 ? 'Cytisus sp.' :
                    d == 2571 ? 'Daphne sp.' :
                    d == 2573 ? 'Ephedra sp.' :
                    d == 2717 ? 'Erica scoparia' :
                    d == 2714 ? 'Erica sp.' :
                    d == 2580 ? 'Euonymus sp.' :
                    d == 2720 ? 'Euphorbia dendroides' :
                    d == 2719 ? 'Euphorbia sp.' :
                    d == 2574 ? 'Frangula sp.' :
                    d == 2594 ? 'Genista sp.' :
                    d == 2670 ? 'Gleditsia triacanthos' :
                    d == 2572 ? 'Hedera helix' :
                    d == 2727 ? 'Hibiscus syriacus' :
                    d == 2630 ? 'Hippophae rhamnoides' :
                    d == 2612 ? 'Humulus lupulus' :
                    d == 2638 ? 'Hypericum sp.' :
                    d == 2471 ? 'Ilex aquifolium' :
                    d == 2520 ? 'Juniperus nana' :
                    d == 2523 ? 'Juniperus oxycedrus' :
                    d == 2524 ? 'Juniperus phoenicea' :
                    d == 2521 ? 'Juniperus sabina' :
                    d == 2526 ? 'Juniperus virginiana' :
                    d == 2614 ? 'Laburnum sp.' :
                    d == 2735 ? 'Lavandula sp. ' :
                    d == 2617 ? 'Lavatera sp.' :
                    d == 2708 ? 'Lembotropis nigricans' :
                    d == 2555 ? 'Lonicera sp.' :
                    d == 2668 ? 'Lycium europaeum' :
                    d == 2598 ? 'Medicago arborea' :
                    d == 2371 ? 'Mespilus germanica' :
                    d == 2750 ? 'Nerium oleander' :
                    d == 2755 ? 'Olea europaea' :
                    d == 2763 ? 'Ononis sp.' :
                    d == 2764 ? 'Opuntia ficus-indica' :
                    d == 2597 ? 'Osyris alba' :
                    d == 2620 ? 'Paliurus spina-christi' :
                    d == 2692 ? 'Parthenocissus sp.' :
                    d == 2767 ? 'Periploca graeca' :
                    d == 2657 ? 'Phlomis sp.' :
                    d == 2558 ? 'Phragmites australis' :
                    d == 2680 ? 'Pistacia terebinthus' :
                    d == 2641 ? 'Pittosporum tobira' :
                    d == 2786 ? 'Prasium majus' :
                    d == 2294 ? 'Prunus cocomilia' :
                    d == 2608 ? 'Prunus laurocerasus' :
                    d == 2295 ? 'Prunus mahaleb' :
                    d == 2293 ? 'Prunus serotina' :
                    d == 2296 ? 'Prunus spinosa' :
                    d == 2367 ? 'Punica granatum' :
                    d == 2640 ? 'Pyracantha coccinea' :
                    d == 2646 ? 'Rhamnus catharticus' :
                    d == 2667 ? 'Rhus sp.' :
                    d == 2650 ? 'Rosa sp. ' :
                    d == 2775 ? 'Rosmarinus officinalis' :
                    d == 2774 ? 'Rubia peregrina' :
                    d == 2655 ? 'Rubus idaeus ' :
                    d == 2654 ? 'Rubus sp.' :
                    d == 2656 ? 'Ruscus aculeatus' :
                    d == 2455 ? 'Salix sp.' :
                    d == 2660 ? 'Sambucus nigra' :
                    d == 2669 ? 'Sarcopoterium spinosum' :
                    d == 2677 ? 'Sideritis sp.' :
                    d == 2676 ? 'Smilax aspera' :
                    d == 2513 ? 'Solanum dulcamara' :
                    d == 2323 ? 'Sorbus aria' :
                    d == 2319 ? 'Sorbus sp.' :
                    d == 2675 ? 'Staphylea pinnata' :
                    d == 2666 ? 'Syringa vulgaris' :
                    d == 2780 ? 'Tamarix sp.' :
                    d == 2100 ? 'Taxus baccata' :
                    d == 2709 ? 'Teline sp.' :
                    d == 2784 ? 'Teucrium sp.' :
                    d == 2105 ? 'Thuja sp.' :
                    d == 2726 ? 'Thymelaea sp.' :
                    d == 2605 ? 'Viburnum lantana' :
                    d == 2606 ? 'Viburnum opalus' :
                    d == 2607 ? 'Viburnum tinus' :
                    d == 2700 ? 'Vitex agnus-castus' :
                    d == 2690 ? 'Vitis sp. ' :
                    d == 2636 ? 'Yucca aloifolia' :
                    d == 2800 ? 'altra specie arbustiva' :
                            '---';
            break;
    	case "RIN_S1P":
        case "RIN_S2P":
        case "RIN_S3P":
        case "RIN_S4P":
        case "RIN_S5P":
            return d == 10 ? 'Scarsa' : 
                   d == 20 ? 'Buona' : 
                            '---';
            break;
        case "CRON_MBS":
            return  d == 1 ? 'Temporaneamente privo di soprassuolo' :
                    d == 10 ? 'In rinnovazione' :
                    d == 20 ? 'In accresimento attivo' :
                    d == 30 ? 'In accrescimento ordinario' :
                    d == 40 ? 'In stasi accrescimentale' :
                    '---';
            break;
        case "CRON_BI":
            return  d == 1 ? 'Temporaneamente privo di soprassuolo' :
                    d == 10 ? 'In rinnovazione' :
                    '---';
            break;
        case "CRON_CED":
            return  d == 1 ? 'Temporaneamente privo di soprassuolo' :
                    d == 20 ? 'Ceduo a regime' :
                    d == 30 ? 'Ceduo invecchiato' :
                    d == 40 ? 'Ceduo invecchiato oltre 2T' :
                    '---';
            break;
        case "NOTE":
            return d;
            break;
            
            
            
            
        case "COMP_COP_STR1":
        case "COMP_COP_STR2":   
            return  d == 10 ? 'DOMINANTE' :
                    d == 20 ? 'PREVALENTE' :
                    d == 30 ? 'Maggioritario':
                    d == 40 ? 'Presente':
                    d == 50 ? 'Sporadico':
                    '---';
            break;
        case "AREA_HA":
            return  d;
        case "PERIMETER":
            return  Math.round(d);
        case "V_HA":
            return  d;
        case "V_TOT":
            return  d;
        case "PS_HA":
            return  d;
        case "PS_TOT":
            return  d;
        
            
            
        default:
            return 'CAMPO NON DEFINITO';
    }
}




//////////////////////////////////////////
//
//  GEONOTE SCHEDE PAGE
//
//////////////////////////////////////////


function GeoNote_goToFeature(e) {
    var layer = e.target;
    var props = layer.feature.properties;
    
    $("#geonote_page_header").text('GEONOTA: '+layer.feature.properties.ID);
    
    // populate data array
    
    var r = new Array(), j = -1;
    
    r[++j] ='<h3>';
    r[++j] = "GEONOTA: "+props.NOTA;
    r[++j] = '</h3>';
    
    r[++j] ='<h4>';
    r[++j] = "Data: "+props.DATA;
    r[++j] = '</h4>';
    r[++j] = '<div id="geonote_photo_list">';
    var block_array = new Array("a","b","a","b");
    for(var i=1;i<=4;i++)
    {
        key = "FOTO_"+String(i);
        value = props[key];
        if (value)
        {
            // r[++j] ='<tr>';
//             r[++j] ='<td>';
//             r[++j] = "FOTO: "+value;
//             r[++j] = '</td>';
//             r[++j] ='<td>';
//             r[++j] = '<img src=\"images\\foto_geonote\\' + value + '\">';
//             r[++j] ='</td>';
//             r[++j] ='</tr>';
            r[++j] ='<div class="ui-block-a"><a photo_name="' + value + '"><img src=\"images\\foto_geonote\\' + value + '\" width="100%"></a></div>';
        }
    }
    r[++j] = '</div>';
    //var geonoteTable = '<table data-role="table" id="geonote-table"  class="ui-responsive table-stroke" style="text-align:left;padding:10px;"><thead><tr><th></th><th></th></tr></thead><tbody>'+r.join('')+"</tbody></table>";
            
    var geonoteTable = '<div class="ui-grid-solo">'+r.join('')+"</div>";
        
    $("#geonote_panel_table").html(geonoteTable);
    
    $.mobile.activePage.find('#geonote_panel').panel("open");
    //$.mobile.changePage( $("#geonote_page"), {allowSamePageTransition:true,transition:"fade"} );
}

$(document).on('vclick', '#geonote_photo_list div a', function(){
    geonote_openPhoto($(this).attr('photo_name'));
});


function geonote_openPhoto(e) {
         
    var photo = '<img src=\"images\\foto_geonote\\' + e + '\" style="max-width:512px;">';
        
    $("#popup_image").html(photo);
    $("#popup_photo").popup("open");
    //$.mobile.changePage( $("#photo_page"), {allowSamePageTransition:true,transition:"fade"} );
}



//////////////////////////////////////////
//
//  BIGPLOT SCHEDE PAGE
//
//////////////////////////////////////////


function BIGPLOT_goToFeature(e) {
    var layer = e.target;
    var props = layer.feature.properties;
    
    $("#bigplot_page_header").text('BIGPLOT: '+layer.feature.properties.ID_BP);
    
    // populate data array
    
    var r = new Array(), j = -1;
    
    for(i in BIGPLOT_FIELD_ARRAY)
            {
                key = BIGPLOT_FIELD_ARRAY[i];
                value = props[key];
                r[++j] ='<tr>';
                r[++j] ='<td>';
                r[++j] = BIGPLOT_FIELD_ARRAY_TITLE[i];
                r[++j] = '</td>';
                r[++j] ='<td>';
                r[++j] = value;
                r[++j] = '</td>';
                r[++j] ='</tr>';
            }
    var img_array = new Array(), j = -1;
    for(var i=1;i<=5;i++)
    {
        key = "FOTO_"+String(i);
        value = props[key];
        if (value)
        {
            img_array[++j] ='<div class="ui-block-a"><a photo_name="' + value + '"><img src=\"images\\foto_bigplot\\' + value + '\" width="70%"></a></div>';
        }
    }
    var bigplotTable = '<b>BIGPLOT: '+ layer.feature.properties.ID_BP + '</b>'+'<table data-role="table"  id="bigplot-table"  class="ui-responsive table-stroke" style="text-align:left;"><thead><tr><th>Parametro</th><th>Valore</th></tr></thead><tbody>'+r.join('')+"</tbody></table>"+'<div id="bigplot_photo_list" class="ui-grid-solo">'+img_array.join('')+"</div>";
    
    $("#bigplot_panel_table").html(bigplotTable);
    
    $.mobile.activePage.find('#bigplot_panel').panel("open"); 
    $("#bigplot_panel" ).trigger( "updatelayout" );
}


$(document).on('vclick', '#bigplot_photo_list div a', function(){
    bigplot_openPhoto($(this).attr('photo_name'));
});


function bigplot_openPhoto(e) {
         
    var photo = '<img src=\"images\\foto_bigplot\\' + e + '\" style="max-width:512px;">';
        
    $("#popup_image").html(photo);
    $("#popup_photo").popup("open");
    //$.mobile.changePage( $("#photo_page"), {allowSamePageTransition:true,transition:"fade"} );
}


