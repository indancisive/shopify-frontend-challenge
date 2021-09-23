import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { AppContext } from "../contexts/context";

const queryString = `https://api.nasa.gov/planetary/apod?api_key=hK7CbhG9XjeaNGh6flMBefqAZdlGwyWhqgAWT3cj`;
const startDate = "2021-01-01";
const endDate = "2021-01-05";

const Home = () => {
    const useApp = useContext(AppContext);
    const { images, setImages, likedImages, setLikedImages } = useApp;

    const [isLoading, setIsLoading] = useState(false);
    const [imagesIsOpen, setImagesIsOpen] = useState(false);
    const toggleImagesOpen = () => {
        setImagesIsOpen(!imagesIsOpen);
    };

    const toggleLikedImage = (url) => {
        setLikedImages((prevState) => ({
            ...prevState,
            [url]: !prevState[url],
        }));
    };

    useEffect(async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(
                queryString + `&start_date=${startDate}&end_date=${endDate}`,
                {}
            );

            setImages(data);
            console.log(data);
        } catch (e) {
            console.error(e);
        }
        setIsLoading(false);
    }, []);

    return (
        <PageContainer>
            <LandingDiv>
                <Header>
                    <GoToLikedPage href="/liked">
                        Go to liked images 👍
                    </GoToLikedPage>
                </Header>
                <HeaderWrapper>
                    <h1 className={styles.title}>Welcome to Spacestagram!</h1>

                    <p className={styles.description}>
                        Get started by clicking search below :)
                    </p>
                </HeaderWrapper>

                <SearchButton className={styles.card}>
                    <h2>Search &rarr;</h2>
                    <p>Discover a world of spacey pics 🚀</p>
                </SearchButton>
                {isLoading && <div>Loading!!!</div>}
            </LandingDiv>
            {imagesIsOpen ? (
                <ImagesDiv>
                    {images.map((image, index) => {
                        return (
                            <Card key={index}>
                                <h2>{image.title} &rarr;</h2>
                                <p>{image.explanation}</p>
                                <Image
                                    width={300}
                                    height={200}
                                    src={image.url}
                                ></Image>
                                <p>🎨: {image.copyright}</p>
                                <LikeButton
                                    onClick={() => toggleLikedImage(image.url)}
                                >
                                    {likedImages[image.url] == undefined ||
                                    likedImages[image.url] == false
                                        ? "Like"
                                        : "Unlike"}
                                </LikeButton>
                            </Card>
                        );
                    })}
                </ImagesDiv>
            ) : (
                <button onClick={toggleImagesOpen}>Expand Images!</button>
            )}
        </PageContainer>
    );
};

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 120px;
    padding-right: 120px;
`;

const LandingDiv = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LikeButton = styled.button``;

const GoToLikedPage = styled(Link)``;

const Header = styled.div`
    height: 200px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    /* align-items: center; */
`;

const HeaderWrapper = styled.div`
    height: 50vh;
`;

const ImagesDiv = styled.div`
    height: 30vh;
`;

const Card = styled.div`
    margin: 1rem;
    padding: 1.5rem;
    text-align: left;
    color: inherit;
    text-decoration: none;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    transition: color 0.15s ease, border-color 0.15s ease;
    width: 45%;
    background: white;
`;

const SearchButton = styled.button`
    margin: 1rem;
    padding: 1.5rem;
    text-align: left;
    color: inherit;
    text-decoration: none;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    transition: color 0.15s ease, border-color 0.15s ease;
    width: 45%;
    background: white;
    cursor: pointer;
`;

export default Home;
