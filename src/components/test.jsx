import React, {useState,useEffect} from "react";
import {collection, addDoc} from 'firebase/firestore'
import { db } from '../firebase'

function Test (){
    const [test,setTest] = useState("");

    const addTodo = async (e) =>{
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "Test"),{
                test: test
            })
            console.log("Test ID ", docRef.id);
        }catch(e){
            console.error("error adding document: ", e);
        }
    }


    return (

        <div>
            <input
            type="text"
            onChange={(e) => setTest(e.target.value)}>
            </input>
            <button 
            type="submit"
            onClick={addTodo}>
                Submit
            </button>
        </div>

    )
}

export default Test;