async function getPosition () {
	console.log('Hey......am  here')
	// return (await fetch('http://api.open-notify.org/iss-now.json')
	// 	.then(res => res.json())
	// 	.then((data) => {
	// 		console.log(data.iss_position)
	// 		if(data.message && data.message === "success") {
	// 			return data.iss_position;
	// 		}
	// 	}).catch(err => console.error(err))
	// );
    let response = await fetch('http://api.open-notify.org/iss-now.json')
	if (response.ok) {
		data = await response.json();
		console.log("DAta: ", data)
		return data.iss_position;
	} else {
		throw new Error(response.status)
	}
}

