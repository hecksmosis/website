export async function parse(request: Request) {
	let reqText = await request.text();
	console.log(reqText);
	let params: string[] = reqText.split('&');

	if (params[0].startsWith('--')) return null;

	let retVal: { [key: string]: string } = {};
	for (let i = 0; i < params.length; i++) {
		let param = params[i].split('=');
		retVal[param[0]] = param[1];
	}

	console.log(retVal);

	return retVal;
}
