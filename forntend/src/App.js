
import { useEffect, useState } from 'react';
import './App.css';
function App() {
  var baseUrl = `http://localhost:4000/`
  const [getallSeats, setallSeats] = useState([])
  const[input,setinput]=useState("");
  const[id,setid]=useState("")


  const getActive = async () => {
    try {

      const getResTable = await fetch(`${baseUrl}getTrainAllSeats`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      const resData = await getResTable.json();
      setid(resData.tableData[0]?._id)
      if (resData.tableData.length) {
        const tittle = ['A', 'B', 'C', 'D', 'E', 'F', 'G','H','I','J','K','L'];
        const seatsPerRow = [7, 7, 7, 7, 7, 7, 7,7,7,7,7,3];
        const rows = [];
        for (let i = 0; i <= tittle.length; i++) {
          const cells = [];
          const row = tittle[i];
          const seats = seatsPerRow[i];
          for (let j = 1; j <= seats; j++) {
            let tableDetails=resData.tableData[0]?.train[`${row}${j}`]?<span className='text-danger'>{`booked-${row}${j}`}</span>:`Empty-${row}${j}`;
            cells.push(<button key={j} className="my-2">{tableDetails}</button>);
          }
          rows.push(<tr key={i}>{cells}</tr>);
        }
        setallSeats(rows)
      } else {
        const getRes = await fetch(`${baseUrl}setTrainSeats`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        const resFromServer = await getRes.json();
        getActive()
      }
    } catch (e) {
      console.log(e)
    }
  }

const handleSubmit=async(e)=>{
  try{
    e.preventDefault()
    if(input==0||input>7){
return alert("please input number between 1 to 7")
    }
    const update = await fetch(`${baseUrl}bookSeats`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        numSeats:input
      }),
    });
    const tream = await update.json();
    if(tream.status==1){
      setinput(" ")
      //if you are using fast network then you can remove settimeout.
      setTimeout(() => {
        getActive();
      }, 1000);
    }
  }catch(e){
    console.log(e)
  }
}

const ResetHandler=async()=>{
  const getRes = await fetch(`${baseUrl}resettable?id=${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
  const resFromServer = await getRes.json();
  getActive()
 
}


  useEffect(() => {
    getActive()
  }, [])


  return (
    <>
      <div className='container my-4'>
        <div class="row g-3 align-items-center my-4">
          <div class="col-auto">
            <label for="inputPassword6" class="col-form-label">Number</label>
          </div>
          <div class="col-auto">
            <input type="Number" value={input} id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline" onChange={(e)=>setinput(e.target.value)} />
          </div>
          <div class="col-auto">
            <span id="passwordHelpInline" class="form-text">
              <button type="button" class="btn btn-info" onClick={handleSubmit}>Submit</button>
            </span>
          </div>
        </div>


        <table class="table my-3">
          <thead>
          </thead>
          <tbody>
          {getallSeats}
          </tbody>
        </table>
      <button type='button' className='btn-danger text-center' onClick={ResetHandler}>reset table data</button>
      </div>


    </>
  );
}

export default App;
