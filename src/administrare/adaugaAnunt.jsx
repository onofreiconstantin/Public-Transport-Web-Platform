import {useNavigate } from 'react-router-dom';
import React, {useEffect,useState} from "react";
import ContainerPagina from "../componente/containerPagina";
import { axiosJWT } from '../componente/axiosJWT';



const AdaugaAnunt = ()  => {
  let navigate = useNavigate();
  const[titlu,setTitlu] = useState(null);
  const[tip,setTip] = useState(null);
  const[text,setText] = useState(null);
  const[activ,setActiv] = useState(null);
  const[imagine,setImagine] = useState(null);
  const[esteActiv1,setEsteActiv1] = useState(false);

  useEffect(() => {
    if(!localStorage.getItem("authToken")||!localStorage.getItem("authRefreshToken"))
    {
      navigate('/')
    }
  }, [navigate]);


  const handleAdaugare = async (e)=>{
        e.preventDefault();
        try {
            const config = {
                headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            };

            await axiosJWT.post('http://localhost:3001/private/anunturiAdauga',{titlu:titlu,tip:tip,text:text,activ:activ,imagine:imagine},config);

            navigate('/anunuri-admin');
        } catch (error) {
            console.log(error)
        }
    }

    const fileSelectedHandler = (event)=>
    {
        if(event.target.files && event.target.files.length>0)
            {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener("load", ()=>{
                setImagine(reader.result);
            })
        }
    } 

    return  (
      <ContainerPagina>
          <div >
            <form onSubmit={handleAdaugare}>
                <h1>Anunturi Adauga</h1>
                <div>
                    <label htmlFor="titlu">Titlu:</label>
                    <input
                        type="text"
                        required
                        id="titlu"
                        placeholder="Introdu titlu"
                        onChange={(e) => setTitlu(e.target.value)}
                        value={titlu||''}
                    />
                </div>
                <div>
                    <label htmlFor="tip">Tip:</label>
                    <input
                        type="text"
                        required
                        id="tip"
                        placeholder="Introdu tip"
                        onChange={(e) => setTip(e.target.value)}
                        value={tip||''}
                    />
                </div>
                <div>
                    <label htmlFor="text">Text:</label>
                    <input
                        type="text"
                        required
                        id="text"
                        placeholder="Introdu text"
                        onChange={(e) => setText(e.target.value)}
                        value={text||''}
                    />
                </div>
                <div>
                    <label htmlFor="activ">Activ:</label>
                    <div onClick={()=>{setEsteActiv1(!esteActiv1)}}>Alege una: {activ!=null ? activ.toString() :''}</div>
                    {esteActiv1 && (<div>
                        <div onClick={()=>{setActiv(true);setEsteActiv1(false)}}>Activ</div>
                        <div onClick={()=>{setActiv(false);setEsteActiv1(false)}}>Inactiv</div>
                    </div>)}
                </div>
                <div>
                    <label htmlFor="imagine">Imagine:</label>
                    <input type="file" onChange={fileSelectedHandler}/>
                    <img src={imagine} alt='' style={{width:"500px"}}/>
                </div>
                <button type='submit'>Adauga</button>
            </form>
          </div>
      </ContainerPagina>
    );
}

export default AdaugaAnunt;
