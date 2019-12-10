let flagUser = false;
let nameUser = "";
function EnterTheOffice(id, pass)
{
	// const rest1 = fetch("https://api.kanye.rest").then( resp => resp.json()).then(data => document.getElementById('areaMessage').value = data.quote);
	let tmpListMessages;

	document.getElementById('idUser').disabled = true;
	document.getElementById('passUser').disabled = true;
	document.getElementById('areaMessage').value = "";
	fetch("https://localhost:44326/api/WebChat/IsUser?id=" + id + "&password=" + pass)
		.then( resp => resp.json())
		.then((data) => {
			flagUser=true;
			let i=4;

			document.getElementById('doneEnter').style.visibility = 'visible';
			var timer = setInterval(function () {
				i--;
				
				if (i == 0) {
				    document.getElementById('doneEnter').style.visibility = 'hidden';
				    clearInterval(timer);
				}
			}, 1000)
			nameUser = data;
		})
			
}

function CheckNewMessage(id, pass)
{
	let tmpListMessages;
	if (flagUser == true)
	{
		document.getElementById('areaMessage').value = "";
		fetch("https://localhost:44326/api/WebChat/IsUser?id=" + id + "&password=" + pass + "&flagUser=" + flagUser)
			.then(resp => resp.json())
			.then((data) => {
				for (let i=0; i<data.length; i++)
				{
					var date = data[i].Time.slice(0, 10);
					var time = data[i].Time.slice(11,16);
					document.getElementById('areaMessage').value += "От пользователя " + data[i].NameSend + " в "+ time + " " + date + "\n" + data[i].TextMessage+ "\n" ;
				}
				if (data.length == 0)
				{
					let i=4;
					document.getElementById('checkMess').style.visibility = 'visible';
					var timer = setInterval(function () {
				        i--;
				        
				        if (i == 0) {
				            document.getElementById('checkMess').style.visibility = 'hidden';
				            clearInterval(timer);
					        }
					    }, 1000)
					
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
	document.getElementById('idRecip').value = "";
	document.getElementById('newMessage').value = "";
	document.getElementById('doneEnter').style.visibility = 'hidden';
	document.getElementById('doneSend').style.visibility = 'hidden';
	document.getElementById('checkMess').style.visibility = 'hidden';
	nameUser = "";
}

function AddMessage(idSend, idRecip, textMessage)
{
	if (flagUser == true)
	{
		var message = {
			  IdSend: idSend,
			  NameSend: nameUser,
			  IdRecip: idRecip,
			  TextMessage: textMessage,
			  Time: new Date,
			  IsRead: false
			};
		const options = {
		  method: 'post',
		  headers: { "Content-type": "application/json" },
		    body: JSON.stringify(message)
		};
		fetch('https://localhost:44326/api/WebChat/AddMessage', options);
		document.getElementById('idRecip').value = "";
		document.getElementById('doneSend').style.visibility = 'visible';
		let i=4;
		var timer = setInterval(function () {
			i--;
			
			if (i == 0) {
			    document.getElementById('doneSend').style.visibility = 'hidden';
			    clearInterval(timer);
			}
		}, 1000)
	}
}

function CheckValid()
{
	debugger;
	if ((document.getElementById('idUser').value != "")&&(document.getElementById('passUser').value != ""))
	{
		document.getElementById('idEnter').removeAttribute("disabled");
	}
	else
	{
		document.getElementById('idEnter').setAttribute("disabled", "true");
	}
}