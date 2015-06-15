function pushUtil() {
}
pushUtil.utf8ByteLength = function(str) {
	if (!str)
		return 0;
	var escapedStr = encodeURI(str);
	var match = escapedStr.match(/%/g);
	return match ? (escapedStr.length - match.length * 2) : escapedStr.length;
};

pushUtil.utf8_to_b64 = function(str) {

	if (window.btoa) {
		return window.btoa(unescape(encodeURIComponent(str)));

	} else { // for <= IE9

		return jQuery.base64.encode(unescape(encodeURIComponent(str)));
	}

};

pushUtil.b64_to_utf8 = function(str) {
	return decodeURIComponent(escape(window.atob(str)));
};

pushUtil.getCurrentDayF = function() {
	var nowDate = new Date();
	var defaultFirstDay = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1);
	var nowYear = defaultFirstDay.getFullYear();
	var nowMonth = defaultFirstDay.getMonth();
	nowMonth = nowMonth * 1 + 1;
	var firstDay = defaultFirstDay.getDate();
	return nowYear + "/" + nowMonth + "/" + firstDay;
};

// getCurrent Last Da
pushUtil.getCurrentDayL = function() {
	var nowDate = new Date();
	var defaultLastDay = new Date(nowDate.getFullYear(),
			nowDate.getMonth() + 1, 0);
	var nowYear = defaultLastDay.getFullYear();
	var nowMonth = defaultLastDay.getMonth() + 1;
	var lastDay = defaultLastDay.getDate();
	// return nowYear + "/" + nowMonth + "/" + lastDay + "/23:59";
	return moment(nowYear + "/" + nowMonth + "/" + lastDay + " 23:59");
};

// setFirstDay
pushUtil.chageDateF = function(year, month) {
	var defaultFirstDay = new Date(year, month, 1);
	var nowYear = defaultFirstDay.getFullYear();
	var nowMonth = defaultFirstDay.getMonth();
	var firstDay = defaultFirstDay.getDate();
	return nowYear + "/" + nowMonth + "/" + firstDay;
};

// setLastDay
pushUtil.chageDateL = function(year, month) {
	var defaultLastDay = new Date(year, month, 0);
	var nowYear = defaultLastDay.getFullYear();
	var nowMonth = defaultLastDay.getMonth();
	nowMonth = nowMonth * 1 + 1;
	var lastDay = defaultLastDay.getDate();
	console.log('날짜 테스');
	// return nowYear + "/" + nowMonth + "/" + lastDay + "/23:59";
	return moment(nowMonth + "/" + lastDay + "/" + nowYear + " 23:59");

};

// compactTrim
pushUtil.compactTrim = function(value) {
	return value.replace(/(\s*)/g, "");
};

// dateFormating
pushUtil.dateFormating = function(value) {
	var result = pushUtil.compactTrim(value);
	var year = result.substring(0, 4);
	var month = result.substring(5, 7);
	var day = result.substring(8, 10);
	var hour = result.substring(10, 12);

	var minute = result.substring(13, 15);
	var amPm = result.substring(15, 17);
	if (amPm === 'pm') {
		hour *= 1;
		hour = hour + 12;
	}
	value = new Date(year, month - 1, day, hour, minute);
	return value;

};

pushUtil.dataURItoBlob = function(dataURI) {
	// convert base64/URLEncoded data component to raw binary data held in a
	// string
	var byteString;
	if (dataURI.split(',')[0].indexOf('base64') >= 0)
		byteString = atob(dataURI.split(',')[1]);
	else
		byteString = unescape(dataURI.split(',')[1]);

	// separate out the mime component
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	// write the bytes of the string to a typed array
	var ia = new Uint8Array(byteString.length);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	return new Blob([ ia ], {
		type : mimeString
	});
};

String.prototype.Length = function() {
	var len = 0;
	var arg = arguments[0] == undefined ? this.toString() : arguments[0];
	for (var i = 0; i < arg.length; i++) {
		var _ch = arg[i].charCodeAt();
		if (_ch >= 0x0080 && _ch <= 0xFFFF) {
			len += 2;
		} else {
			len++;
		}

	}
	return len;
};

String.Length = function(arg) {
	if (arg == undefined || arg == null) {
		throw "Property or Arguments was Nerver Null"
	} else {
		if (typeof (arg) != "string") {
			throw "Property or Arguments was not 'String' Types.";
		} else {
			return arg.Length();
		}
	}
};
