var URL = "https://api.npoint.io/40079025db73e47d0aea"
var sleepData
var dateArr = []
var sleepDurArr = []
var table = document.getElementById("sleep-table");
var row ,cell1, cell2, cell3, cell4;

fetch(URL+'/sleepTrack')
  .then(response => response.json())
  .then(res =>{
    sleepData = res
    console.log(sleepData)
    addDataTable()
  },
  err=>{
    alert('Json file not found')
  })
 
function addDataTable(){
  for(let i=0; i<sleepData.length; ++i ){
    row = table.insertRow(0);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell3 = row.insertCell(2);
    cell4 = row.insertCell(3);
    cell1.innerHTML = sleepData[i].date;
    cell2.innerHTML = sleepData[i].sleepTime;
    cell3.innerHTML = sleepData[i].wakeupTime;
    cell4.innerHTML = sleepData[i].sleepDuration;
  
    dateArr.push(sleepData[i].date)
    sleepDurArr.push(sleepData[i].sleepDuration)
  }   
  drawChat(dateArr,sleepDurArr)
}


let form=document.getElementById("formSubmission");

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  submit();
})

const submit=()=>{
    var time_start = new Date();
    var time_end = new Date();
    let date = document.getElementById("date").value
    var dateArr = date.split('-')
    date = dateArr[2]+'/'+dateArr[1]+'/'+dateArr[0]

    let sleepTime = document.getElementById("sleepTime").value
    let wakeupTime = document.getElementById("wakeupTime").value

    var value_start = sleepTime.split(':')
    var value_end = wakeupTime.split(':')

    time_start.setHours(value_start[0], value_start[1], 0)
    time_end.setHours(value_end[0], value_end[1], 0)

    sleepDuration = Math.floor((time_end - time_start)/1000/60/60)


    if(sleepTime && wakeupTime && date){
        // var table = document.getElementById("sleep-table");
        row = table.insertRow(0);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell3 = row.insertCell(2);
        cell4 = row.insertCell(3);
        cell1.innerHTML = date;
        cell2.innerHTML = sleepTime;
        cell3.innerHTML = wakeupTime;
        cell4.innerHTML = sleepDuration;

        dateArr.push(date)
        sleepDurArr.push(sleepDuration)
        drawChat(dateArr,sleepDurArr)


        object = { 
          "date": date,
          "sleepTime": sleepTime,
          "wakeupTime": wakeupTime,
          "sleepDuration": sleepDuration
        }
        fetch(URL, 
          {
              method: "POST", 
              body: JSON.stringify(object),
              mode: 'cors',
              headers: {
                  'Content-Type': 'application/json',
              }
          }
        ).then(response => response.json())
        .then(data => { console.log(data)})
        .catch((err) => { console.log(err)});

    }
    else {
        alert('Please enter all the Filed!!')
    }
    form.reset(); 
    
}


//Line chart
function drawChat(dateArr,sleepDurArr){
    var ctxL = document.getElementById("lineChart").getContext('2d');
    var myLineChart = new Chart(ctxL, {
      type: 'line',
      data: {
        labels: dateArr,
        datasets: [{
            label: "Sleep Duration Track vs Date",
            data: sleepDurArr,
            backgroundColor: [
              '#a0c0efed',
            ],
            borderColor: [
              '#578edf',
            ],
            borderWidth: 2
          },
        ]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Time Duration (Hour)'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
        }
      }
    });
}
