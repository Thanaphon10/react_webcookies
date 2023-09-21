import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const SetCookiesData = ({open}) => {
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);
  console.log("open",open)

  const [test, setTest] = useState("");
  const [ipAddress, setIpAddress] = useState(""); // เพิ่ม state สำหรับเก็บ IP Address
  const [userAgent, setUserAgent] = useState(""); // เพิ่ม state สำหรับเก็บ User Agent


  // สร้างฟังก์ชันสำหรับเรียก IP Address
  const getIpAddress = async () => {
    try {
      const response = await fetch("https://api64.ipify.org?format=json");
      const data = await response.json();
      const ip = data.ip;
      setIpAddress(ip); // อัปเดต state ด้วยค่า IP Address
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเรียกข้อมูล IP Address: ", error);
    }
  };

  useEffect(() => {
    // เรียกฟังก์ชันเพื่อรับ IP Address เมื่อคอมโพเนนต์ถูกโหลด
    getIpAddress();
    //console.log("99999999");
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
        userAgent: userAgent, // เพิ่ม User Agent ลงในเอกสารที่เพิ่ม
      });
      console.log("Test ID ", docRef.id);
    } catch (e) {
      console.error("error adding document: ", e);
    }
  };

  //    const handle = () => {
  //       setCookie('Name', name, { path: '/' });
  //       setCookie('Password', pwd, { path: '/' });
  //    };

  return (
    <div>
      {cookies.Name && open &&(
        <div>
          <p>Name: {cookies.Name}</p>
        </div>
      )}
      {cookies.Password && open &&(
        <div>
          <p> Password: {cookies.Password}</p>
        </div>
      )}
      <p>IP Address: {ipAddress}</p>
      <p>User Agent: {userAgent}</p>
    </div>
  );
};
export default SetCookiesData;
