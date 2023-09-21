import React, { useState, useEffect } from "react";
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

function Test() {
    const [test, setTest] = useState("");
    const [ipAddress, setIpAddress] = useState(""); // เพิ่ม state สำหรับเก็บ IP Address
    const [userAgent, setUserAgent] = useState(""); // เพิ่ม state สำหรับเก็บ User Agent

    useEffect(() => {
        // สร้างฟังก์ชันสำหรับเรียก IP Address
        const getIpAddress = async () => {
            try {
                const response = await fetch('https://api64.ipify.org?format=json');
                const data = await response.json();
                const ip = data.ip;
                setIpAddress(ip); // อัปเดต state ด้วยค่า IP Address
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการเรียกข้อมูล IP Address: ', error);
            }
        }

        // เรียกฟังก์ชันเพื่อรับ IP Address เมื่อคอมโพเนนต์ถูกโหลด
        getIpAddress();
        
        // อ่าน User Agent และอัปเดต state
        setUserAgent(navigator.userAgent);
    }, []);

    const addTodo = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "Test"), {
                test: test,
                test1: test,
                ipAddress: ipAddress, // เพิ่ม IP Address ลงในเอกสารที่เพิ่ม
                userAgent: userAgent // เพิ่ม User Agent ลงในเอกสารที่เพิ่ม
            })
            console.log("Test ID ", docRef.id);
        } catch (e) {
            console.error("error adding document: ", e);
        }
    }

    return (
        <div>
            {/* <input
                type="text"
                onChange={(e) => setTest(e.target.value)}>
            </input>
            <button
                type="submit"
                onClick={addTodo}>
                Submit
            </button> */}
            
            <p>IP Address: {ipAddress}</p> {/* แสดงค่า IP Address */}
            <p>User Agent: {userAgent}</p> {/* แสดงค่า User Agent */}
        </div>
    )
}

export default Test;
