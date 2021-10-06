function chgPeriod() {
  var Period = parseInt(document.getElementById("Period").value);
  var year;

  var i;
  for (i = 1; i <= 15; i++) {
    year = document.getElementById("year" + i);

    if (i <= Period) year.style.display = "";
    else year.style.display = "none";
  }
}
window.onload = chgPeriod;

function newValue(form, timeHorizonTXT, CFiTXT, CFoTXT, NCFTXT) {
  var CFi = 0; //CF in
  var CFo = 0; //CF out
  var NCF = 0; //Net CF
  var timeHorizon = 0;

  timeHorizon = timeHorizonTXT.value;
  CFi = CFiTXT.value.replace("\,",".");
  CFo = CFoTXT.value.replace("\,",".");
  NCF = Math.abs(CFi) - Math.abs(CFo);

  NCFTXT.value = NCF;

  var investment = Math.abs(document.getElementById("CFo0").value.replace("\,","."));
  var Period = parseInt(document.getElementById("Period").value);
  var TotalIN = 0;
  var TotalOUT = 0;
  var j;
  for (j = 0; j <= 15; j++) {
    TotalIN  += (1.0 * document.getElementById('CFi'+j).value.replace("\,","."));
    TotalOUT += (1.0 * document.getElementById('CFo'+j).value.replace("\,","."));
  }  var flows = new Array(Period);
  var i;
  for (i = 0; i < Period; i++) {
      flows[i] = new Array(2);
      flows[i]['cashFlow'] = document.getElementById("NCF" + (i+1)).value.replace("\,",".");
      flows[i]['timeHorizon'] = document.getElementById("timeHorizon" + (i+1)).value.replace("\,",".");
    }

  var npv;
  var found = false;

  if (TotalOUT == 0 || TotalOUT>TotalIN) irr=0;
  else {
	for (irr = 0; irr < 100; irr = irr + 0.000001) {
		  npv = 0;
		  for (i = 0; i < Period; i++) {
		npv = npv + flows[i]['cashFlow'] / Math.pow(1+irr, flows[i]['timeHorizon']);
		  }

		  if (npv <= investment) {
		found = true;
		break;
		  }
	}  
  }  

  calcTotals(form);

  var IRR = document.getElementById("IRR");
  if (TotalOUT == 0 || TotalOUT>TotalIN) IRR.value = "-";
  else IRR.value = round(irr*100, 4);
}
function calcTotals (form)
{
  var TotalIN = 0;
  var TotalOUT = 0;
  var TotalNET = 0;
  var i;
  for (i = 0; i <= 15; i++) {
    TotalIN  += (1.0 * document.getElementById('CFi'+i).value.replace("\,","."));
    TotalOUT += (1.0 * document.getElementById('CFo'+i).value.replace("\,","."));
    TotalNET += (1.0 * document.getElementById('NCF'+i).value.replace("\,","."));
  }
  form.totalCFi.value = round(TotalIN, 2);
  form.totalCFo.value = round(TotalOUT, 2);
  form.totalNCF.value = round(TotalNET, 2);
}
function resetValues(form)
{
  for (i = 0; i <= 15; i++) {
    document.getElementById('CFi'+i).value="";
    document.getElementById('CFo'+i).value="";
    document.getElementById('NCF'+i).value="";
  }
  for(var i = 0; i < form.elements.length; i++) {
  if(form.elements[i].type == "text") { form.elements[i].value = "";}
  }
}

function round(n,dec)
{
    X = n * Math.pow(10,dec);
    X= Math.round(X);
    return (X / Math.pow(10,dec)).toFixed(dec);
}
