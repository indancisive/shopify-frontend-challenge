import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import axios from "axios";
import { AppContext } from "../contexts/context";

const Liked = () => {
    const useApp = useContext(AppContext);
    const { likedImages } = useApp;
    return (
        <div>
            <Link href="/">Go Back</Link>
            {Object.keys(likedImages).map((url) => {
                return <div key={"LikedCard." + url}>{url}</div>;
            })}
        </div>
    );
};

export default Liked;
