import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import axios from "axios";

const liked = () => {
    return (
        <div>
            <Link href="/">Go Back</Link>
        </div>
    );
};

export default liked;
