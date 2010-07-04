Titanium.UI.setBackgroundColor('#000');

var notificationCount = 0;

var win = Titanium.UI.createWindow({  
    title:'UrbanAirship Test',
    backgroundColor:'#fff'
});

var lStatus = Titanium.UI.createLabel({
	color:'#999',
	text:'Status: Unregistered',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
	top: 20
		
});

var lDeviceToken = Titanium.UI.createLabel({
	color:'#999',
	text:'DeviceToken: Unknown',
	font:{fontSize:12,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
	top: 60
});

var lMessage = Titanium.UI.createLabel({
	color:'#999',
	text:'Waiting for Notification',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
	top: 160
});

win.add(lStatus);
win.add(lDeviceToken);
win.add(lMessage);

win.open();

//ti.modules.titanium.urbanairship.UrbanAirshipModule
Titanium.UrbanAirship.registerForPushNotifications({
	appKey: "Y2KMAbHURFmcnlrW2x2T6Q",
	debug: true,
	success: function(e){
		Ti.API.log("JS TestHarness","Sucessfully register: "+e.deviceToken);
		lStatus.text = "Status: Registered";
		lStatus.color = "#0f0";
		lDeviceToken.text = "DeviceToken: "+e.deviceToken;
	},
	callback: function(e){
		Ti.API.log("JS TestHarness","Received Push Notification");
		Ti.API.log("JS TestHarness","Push Notification Message: "+e.data.message);
		Ti.API.log("JS TestHarness","Received Push Notification: "+e.data.payload);
		
		notificationCount = notificationCount+1; 
		
		lMessage.text = "Messages Received: "+notificationCount;
		
		var a = Titanium.UI.createAlertDialog({
			title:e.data.message,
			message:e.data.payload
		});
		
		a.show();
	}
});


