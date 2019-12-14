let flagUser = false;
let nameUser = "";
let idUser = 0;
let passUser = "";
function EnterTheOffice(id, pass)
{
	// const rest1 = fetch("https://api.kanye.rest").then( resp => resp.json()).then(data => document.getElementById('areaMessage').value = data.quote);
	let tmpListMessages;

	document.getElementById('idUser').disabled = true;
	document.getElementById('passUser').disabled = true;
	document.getElementById('areaMessage').value = "";
	fetch("https://localhost:44326/api/WebChat/EnterUser?id=" + id + "&password=" + pass)
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
			idUser = id;
			passUser = pass;
			var outText = "<h3>Привет, " + data + "!</h3>";
			var outElem = document.getElementById('enterHead');
			outElem.innerHTML = outText;
			document.getElementById('idUser').style.display = 'none';
			document.getElementById('passUser').style.display = 'none';
			document.getElementById('idEnter').style.display = 'none';
			document.getElementById('idReg').style.display = 'none';
			document.getElementById('idExit').style.display = 'inline';
		})
			
}

function CheckNewMessage()
{
	let tmpListMessages;
	if (flagUser == true)
	{
		document.getElementById('areaMessage').value = "";
		fetch("https://localhost:44326/api/WebChat/IsUser?id=" + idUser + "&password=" + passUser + "&flagEnterUser=" + flagUser)
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
	var outText = "<h3>Вход в кабинет</h3>";
	var outElem = document.getElementById('enterHead');
	outElem.innerHTML = outText;
	document.getElementById('idUser').style.display = 'inline';
	document.getElementById('passUser').style.display = 'inline';
	document.getElementById('idEnter').style.display = 'inline';
	document.getElementById('idReg').style.display = 'inline';
	document.getElementById('idExit').style.display = 'none';
	idUser = 0;
	passUser = "";
	nameUser = "";
}

function AddMessage(idRecip, textMessage)
{
	if (flagUser == true)
	{
		var message = {
			  IdMessage: `f${(~~(Math.random()*1e8)).toString(16)}`,
			  IdSend: idUser,
			  IdRecip: idRecip,
			  TextMessage: textMessage,
			  Time: new Date,
			  IsRead: 0
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
	if ((document.getElementById('idUser').value != "")&&(document.getElementById('passUser').value != "") && 
		(document.getElementById('idName').style.display == 'none'))
	{
		document.getElementById('idEnter').removeAttribute("disabled");
	}
	else if ((document.getElementById('idUser').value != "")&&(document.getElementById('passUser').value != "") && 
		(document.getElementById('idName').style.display == 'inline')&&(document.getElementById('idName').value != ""))
	{
		document.getElementById('idNewUser').removeAttribute("disabled");
	}
	else 
	{
		document.getElementById('idEnter').setAttribute("disabled", "true");
		document.getElementById('idNewUser').setAttribute("disabled", "true");
	}
}

function Registration()
{
	debugger;
	var outText = "<h3>Регистрация</h3>";
	var outElem = document.getElementById('enterHead');
	outElem.innerHTML = outText;
	let newIdUser;
	document.getElementById('idName').style.display = 'inline';
	document.getElementById('idNewUser').style.display = 'inline';
	document.getElementById('idEnter').style.display = 'none';
	document.getElementById('idReg').style.display = 'none';
	
	fetch("https://localhost:44326/api/WebChat/GetIdNewUser")
			.then(resp => resp.json())
			.then((data) => {document.getElementById('idUser').value = data})
	// document.getElementById('idUser').value = newIdUser;
	document.getElementById('idUser').setAttribute("disabled", "true");
}

function AddNewUser(id, name, password)
{
	debugger;
	var user = {
			  IdUser: id,
			  NameUser: name,
			  Password: password
			};
		const options = {
		  method: 'post',
		  headers: { "Content-type": "application/json" },
		    body: JSON.stringify(user)
		};
		fetch('https://localhost:44326/api/WebChat/AddUser', options);
		document.getElementById('idUser').value = "";
		document.getElementById('idName').value = "";
		document.getElementById('passUser').value = "";
		var outText = "<h5>Новый пользователь добавлен!</h5>";
		var outElem = document.getElementById('doneEnter');
		outElem.innerHTML = outText;
		document.getElementById('doneEnter').style.visibility = 'visible';
		let i=4;
		var timer = setInterval(function () {
			i--;
			
			if (i == 0) {
			    document.getElementById('doneEnter').style.visibility = 'hidden';
			    outText = "<h5>Вход успешно выполнен!</h5>";
				var outElem = document.getElementById('doneEnter');
				outElem.innerHTML = outText;
			    clearInterval(timer);
			}
		}, 1000)
		
		document.getElementById('idName').style.display = 'none';
		document.getElementById('idNewUser').style.display = 'none';
		document.getElementById('idEnter').style.display = 'inline';
		document.getElementById('idReg').style.display = 'inline';
		document.getElementById('idUser').removeAttribute("disabled");
		var outText = "<h3>Вход в кабинет</h3>";
		var outElem = document.getElementById('enterHead');
		outElem.innerHTML = outText;
}