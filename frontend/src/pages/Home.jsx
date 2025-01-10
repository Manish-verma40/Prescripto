import React from "react";
import Header from "../components/Header";
import SpecilalityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
const Home=()=>{
    return(
<div>
    <Header></Header>
    <SpecilalityMenu></SpecilalityMenu>
    <TopDoctors></TopDoctors>
    <Banner></Banner>
</div>
    );
}
export default Home;