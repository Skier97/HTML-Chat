let flagUser = false;
function EnterTheOffice(id, pass)
{
	// const rest1 = fetch("https://api.kanye.rest").then( resp => resp.json()).then(data => document.getElementById('areaMessage').value = data.quote);
	let tmpListMessages;
	debugger;
	document.getElementById('idUser').disabled = true;
	document.getElementById('passUser').disabled = true;
	document.getElementById('areaMessage').value = "";
	fetch("https://localhost:44326/api/WebChat/IsUser?id=" + id + "&password=" + pass)
		.then( resp => resp.json())
		.then((data) => {
			flagUser=true;
			for (let i=0; i<data.length; i++)//TODO затем писать получение сообщения по имени, а не по айди; преобразовать на выводе дату
			{
				document.getElementById('areaMessage').value += "От кого: " + data[i].IdSend + " в "+ data[i].Time + "\n" + data[i].TextMessage+ "\n" ;
			}
		})
			
}

function CheckNewMessage(id, pass)
{
	let tmpListMessages;
	debugger;
	if (flagUser == true)
	{
		document.getElementById('areaMessage').value = "";
		fetch("https://localhost:44326/api/WebChat/IsUser?id=" + id + "&password=" + pass + "&flagUser=" + flagUser)
			.then(resp => resp.json())
			.then((data) => {
				for (let i=0; i<data.length; i++)//TODO затем писать получение сообщения по имени, а не по айди; преобразовать на выводе дату
				{
					document.getElementById('areaMessage').value += "От кого: " + data[i].IdSend + " в "+ data[i].Time + "\n" + data[i].TextMessage+ "\n" ;
				}
			})
	}
	
}

function ExitTheOffice()
{
	flagUser = false;
	document.getElementById('idUser').disabled = false;
	document.getElementById('passUser').disabled = false;
	document.getElementById('idUser').value = "";
	document.getElementById('passUser').value = "";
	document.getElementById('areaMessage').value = "";
}

function AddMessage(idSend, idRecip, textMessage)
{
	// debugger;
	// if (flagUser == true)
	// {
	// 	const options = {
	// 	  method: 'post',
	// 	  headers: { "Content-type": "application/json; charset=UTF-8" },
	// 	    body: {
	// 		  IdSend: idSend,
	// 		  IdRecip: idRecip,
	// 		  TextMessage: textMessage,
	// 		  Time: new Date,
	// 		  IsRead: false
	// 		}
	// 	}
	// 	fetch('https://localhost:44326/api/WebChat/AddMessage', options)
	// 	  	.then(response => response.json())
 //      		.then(result => alert(JSON.stringify(result, null, 2)))
		
		
	// }
}