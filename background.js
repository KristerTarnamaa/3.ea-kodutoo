var feed  = localStorage.getItem('Feed');
var elem = document.getElementById("myDiv");

if (feed == ""){
	document.getElementById('titles').innerHTML += "<a href='"+"About:addons"+"' target='"+"_blank"+"' style=color:#f9c052>"+"<b>"+"Please go to about:addons and set your Novelupdates Feed, Feed is empty string"+"</b>"+"</a>"+
	"";
	elem.remove();
} else if (feed == null) {
document.getElementById('titles').innerHTML += "<a href='"+"About:addons"+"' target='"+"_blank"+"' style=color:#f9c052>"+"<b>"+"Please go to about:addons and set your Novelupdates Feed, Feed is null"+"</b>"+"</a>"+
"";
elem.remove();
} else {
/* "http://www.novelupdates.com/rss.php?uid=17670&unq=56ea8c3a00624&type=read*/
function createCORSRequest(method = "get", url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        // XHR has 'withCredentials' property only if it supports CORS

        xhr.open(method, url, true);

    } else if (typeof XDomainRequest != "undefined"){ // if IE use XDR
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

var raw = document.createElement('div');
var container = document.getElementById('container');
var print = function(item) {
    var title = document.createElement('div');
    title.innerHTML = document.createTextNode(item.getElementsByTagName('title')[0].value);
    //Loeme descriptioni ka sisse kuigi ei tee esialgu sellega midagi
    var description = item.getElementsByTagName('description')[0].value;
    //misiganes su wrapper div on kuhu kylge kuvatavat appendid - n2ites container
    container.appendChild(title);

}

var request = createCORSRequest("get", feed  );
if ( request ){
// Define a callback function
	request.onload = function(){
	    var update = xmlToJson(StringToXML(request.responseText));
		
		raw.innerHTML = request.responseText;
		/*
		var x = document.createElement('div');
		x.innerHTML =raw.innerHTML;
		var descriptions = x.getElementsByTagName('description');
		var links = x.getElementsByTagName('link');
		var titles = x.getElementsByTagName('title');
		var pubDate = x.getElementsByTagName('pubDate');*/

		//original color E8C37C

		for (var i=0; i<8; i++){

			var link = update.rss.channel.item[i].link["#text"];
			var pubDate = update.rss.channel.item[i].pubDate["#text"].slice(-0,-5);
			var title = update.rss.channel.item[i].title["#text"];
		
			document.getElementById('titles').innerHTML += "<a href='"+link+"' target='"+"_blank"+"' style=color:#f9c052>"+"<b>"+title+"</b>"+"</a>"+
															""+"<br>"+
															pubDate+"<br>";
			
		}
		
		};
request.send();

}

function StringToXML(oString) {
 //code for IE
 if (window.ActiveXObject) { 
 var oXML = new ActiveXObject("Microsoft.XMLDOM"); oXML.loadXML(oString);
 return oXML;
 }
 // code for Chrome, Safari, Firefox, Opera, etc. 
 else {
 return (new DOMParser()).parseFromString(oString, "text/xml");
 }
}

function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}


	elem.remove();
	return obj;
};

};
