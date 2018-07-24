//get the domain of current page
var domain = window.location.hostname; 

//get the whole url to check for symbols
var url = window.location.href;

//listA object to store list of malware URL, listB object to store list of trusted URL
var listA, listB;
var listBuffer;

//to get the list of malware URL from chrome localstorage
chrome.storage.local.get("malwareList", function(items){
	listA = items;
});

//to get the list of trusted URL from chrome localstorage
chrome.storage.local.get("normalList", function(items){
	listB = items;
});

//to get the list of trusted URL from chrome localstorage
chrome.storage.local.get("bufferList", function(items){
	listBuffer = items;
});

//to store the value of list object
var malwareList, normalList, bufferList;

//array of solicited symbols
var malwareSymbol = [" ", "<>", "[]", "{}", "|", "\\", "^"]

//when page ready, do function
$(document).ready(function(){
	malwareList = listA.malwareList;
	normalList = listB.normalList;
	bufferList = listBuffer.bufferList;

	console.log("MALWARE LIST:" + malwareList);
	console.log("NORMAL LIST:" + normalList);
	console.log("BUFFER LIST:" + bufferList);

	//init list
	if(malwareList == null)
		initiateMalwareList();

	if(normalList == null)
		initiateNormalList();

	if(bufferList == null)
		initiateBufferList();

	//check if url contains solicited symbols [" ", "<>", "[]", "{}", "|", "\\", "^"]
	if(contains(url, malwareSymbol))
	{
		if(confirm("THIS SITE IS SUSPICIOUS, IT MAY CONTAINS MALICIOUS ELEMENTS! CONTINUE?")){

		}
		else
		{
			window.location.assign("https://www.google.com");
		}
		malwareList = malwareList + "\n" + url;
		updateMalwareList(malwareList);

		console.log("ENTERED SUSPICIOUS");
	}
	else if(normalList.includes(domain.replace("http",""))) //check if domain from normal list
	{
		console.log("ENTERED SAFE");
	}
	else if(malwareList.includes(domain.replace("http",""))) //check if domain from blacklist
	{
		if(confirm("This web site is MALICIOUS! Press OK to return to a safe web page. We do not responsible for your machine if you press CANCEL."))
		{
			window.location.assign("https://www.google.com");
		}
		else
		{
			if(confirm("Are you sure? Press OK to proceed to MALICIOUS web site. CANCEL to go back to safe web page."))
			{

			}
			else
			{
				window.location.assign("https://www.google.com");
			}
		}
		console.log("ENTERED MALWARE");
	}
	else if(bufferList.includes(domain.replace("http",""))) //check if domain was accessed atleast once
	{
		bufferList = bufferList.replace(domain,"");
		normalList = normalList + " " + domain;
		updateNormalList(normalList);
		updateBufferList(bufferList);
		console.log("ENTERED NORMAL ATTEMPT 2");
	}
	else //all non suspicious domain will be stored in buffer for once
	{
		bufferList = bufferList + " " + domain;
		updateBufferList(bufferList);
		console.log("ENTERED NORMAL ATTEMPT 1");
	}

	
});

function contains(target, pattern){
    var value = 0;
    pattern.forEach(function(word){
      value = value + target.includes(word);
    });
    return (value === 1)
}

function initiateMalwareList (){
	var content, ret, blacklist;

	$.get("https://www.malwaredomainlist.com/hostslist/hosts.txt", function(data, status){
			content = data;
	        ret = content.replace('#               MalwareDomainList.com Hosts List           #','');
	        ret = ret.replace('#   http://www.malwaredomainlist.com/hostslist/hosts.txt   #','');
	        blacklist = ret.replace('#         Last updated: Tue, 03 Apr 18 20:39:48 +0000      #','');
			chrome.storage.local.set({ "malwareList": blacklist }, function(items){
   				console.log(items);
			});
		});
}

//
function initiateNormalList(){
	var whitelist;

	whitelist = "www.facebook.com www.google.com www.instagram.com";
	chrome.storage.local.set({ "normalList": whitelist }, function(items){
   		console.log(items);
	});
}

function initiateBufferList(){
	var buffer;

	buffer = "empty";
	chrome.storage.local.set({ "bufferList": buffer }, function(items){
   		console.log(items);
	});
}

function updateMalwareList(newList){
	chrome.storage.local.set({ "malwareList": newList }, function(items){
   		console.log(items);
	});
}

function updateNormalList(newList){
	chrome.storage.local.set({ "normalList": newList }, function(items){
   		console.log(items);
	});
}

function updateBufferList(newList){
	chrome.storage.local.set({ "bufferList": newList }, function(items){
   		console.log(items);
	});
}