const normal = /[\w*+\-./@]/

function dec2hecks(code, length) {
	let result = code.toString(16)
	while (result.length < length) {
		result
			= '0'
			+ result
	}
	return result.toUpperCase()
}

// pointlessly adding this here because it's deprecated in the browser, but
// honestly it will never be removed
function escape(string) {
	let str = string.toString()
	let result = ''
	let length = str.length
	let index = 0
	let chr
	let code
	while (index < length) {
		chr = str.charAt(index++)
		if (normal.exec(chr)) {
			result += chr
		} else {
			code = chr.charCodeAt(0)
			if (code < 256) {
				result += '%' + dec2hecks(code, 2)
			} else {
				result += '%u' + dec2hecks(code, 4)
			}
		}
	} return result
}

browser.browserAction.onClicked.addListener(function (tab) {
	window.location =
		'notebooks://grab/'
		+ escape(tab.url)
		+ '&title='
		+ encodeURIComponent(tab.title)
})
