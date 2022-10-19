import React, { useState } from "react";
import axios from "axios";


const User = () => {
  const [fullname, setFullname] = useState([]);
  const [tempContainer, setTempContainer] = useState([]);
  const [total,setTotal]=useState(0);
  


  const Adduser = () => {


    axios.get("https://randomuser.me/api/").then((response) => {
      setFullname((current) => [
        ...current,{'name':        response.data.results[0].name.first +
        " " +
        response.data.results[0].name.last,'wealth': Math.floor(Math.random() * 1000000)}
      ]);

      setTempContainer((current) => [
        ...current,{'name':        response.data.results[0].name.first +
        " " +
        response.data.results[0].name.last,'wealth': Math.floor(Math.random() * 1000000)}
      ]);

    });
  };



  const printUser = () => {
   
    return tempContainer.map((value)=>{
      return (
        <tr>
        <td>{value.name}</td>
        <td>${value.wealth}</td>
      </tr>
      )
    })
  };

  const doubleData = ()=>{
setTempContainer([])

 fullname.map((item)=>{
    setTempContainer((current) => [
      ...current,{'name':item.name,'wealth':item.wealth*2}
    ]);
  
    setFullname((current) => [
      ...current,{'name':item.name,'wealth':item.wealth*2}
    ]);
    })

  }

  const showMillionaires=()=>{
    setTempContainer([])
 fullname.filter((item)=>{
  if(item.wealth>1000000){
    setTempContainer((current) => [
      ...current,{'name':item.name,'wealth':item.wealth}
    ]);
  }
    })
  }



  const sortData=()=>{
    const numDescending = [...tempContainer].sort((a, b) => b.wealth - a.wealth);
    setTempContainer([])
    numDescending.map((item)=>{
      setTempContainer((current) => [
        ...current,{'name':item.name,'wealth':item.wealth}
      ]);
      })

  }
  
const totalAmount=()=>{
let amount = 0;
  tempContainer.map((item)=>{
amount= amount+item.wealth
    })
    setTotal(amount)
}


  

  return (
    <div className="container mt-5">
      <div className="row">
        <div class="d-grid gap-2 col-4 border-end  border-2  border-dark">
          <button
            class="btn btn-light border border-dark mt-2"
            type="button"
            onClick={Adduser}
          >
            Add User &#128104;
          </button>
          <button onClick={doubleData} class="btn btn-light border border-dark mt-2" type="button">
            Double Money &#128176;
          </button>
          <button onClick={showMillionaires} class="btn btn-light border border-dark mt-2" type="button">
            Show Only Millionaires &#128181;
          </button>
          <button onClick={sortData} class="btn btn-light border border-dark mt-2" type="button">
            Sort by Richest &#11015;
          </button>
          <button onClick={totalAmount} class="btn btn-light border border-dark mt-2" type="button">
            Calculate entrie Wealth &#127980;
          </button>
        </div>

        <div className="col-4 ">
          <div className="d-flex  justify-content-between m-3 border-bottom border-2  border-dark ">
          <table class="table">
          <thead>
            <tr>
              <th scope="col">user</th>
              <th scope="col">wealth</th>
            </tr>
          </thead>
          <tbody>
            {printUser()}


            <tr>
            <td>Total :</td>
            <td>{total}</td>
            </tr>
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
