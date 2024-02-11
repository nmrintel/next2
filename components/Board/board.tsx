import React, { useEffect, useContext, useState, useRef, use } from 'react';
import { Button, Card, CardBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Placeholder, PlaceholderButton } from 'reactstrap';
import { getDocumentIds, readFromFirestore } from "@/lib/FirebaseConfig";
import 'firebase/firestore';
import { set } from 'firebase/database';
import Example from "./modal"
import Fedin from "@/components/motion"

const PageNum = React.createContext({ currentPage: 1, maxPage: 1, loaded:false,setloaded:(loaded:boolean) => {},setMaxPage: (page: number) => { } });

const whitespaceLoop = (length: number) => {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += ' ';
    }
    return result;
};

const formatText = (text: string) => {
    const maxLength = 15; // Maximum number of characters before line break
    if (text && text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    } else if (text) {
        return text + whitespaceLoop(maxLength - text.length);
    } else {
        return '自己紹介未設定';
    }
}

const imgPlaceholder = () => {
    return (
        <Placeholder
            animation='wave'
            title='Loading...'
            style={{
                width: '100%',
                height: '200px'
            }}
        />
    )
}

export default function Board() {
    console.log("Board");
    const [currentPage, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(10);
    const [loaded,setloaded] = useState(false)

    return (
        <div>
            <PageNum.Provider value={{ currentPage, maxPage, loaded,setloaded,setMaxPage }}>
                <BoardContent />
            </PageNum.Provider>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {loaded&&
                <>
                <Button onClick={() => { setPage(currentPage - 1) }} style={{ margin: '10px' }} disabled={currentPage === 1}>&lt;</Button>
                <Button disabled>{currentPage}</Button>
                <Button onClick={() => { setPage(currentPage + 1) }} style={{ margin: '10px' }} disabled={currentPage === Math.floor(maxPage / 9) + 1}>&gt;</Button>
                </>}
            </div>
        </div>
    );
}


const BoardContent = () => {
    const { currentPage, maxPage, setMaxPage } = useContext(PageNum);

    useEffect(() => {
        // Add code here to handle the re-render logic
    }, [currentPage]);

    return (
        <div style={{ marginLeft: "250px",marginRight: "150px" }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
                    <div key={(currentPage-1)*9+id} style={{ flex: '100 100 33.33%', padding: '10px' }}>
                        <Fedin>
                            <UserCard id={id} currentPage={currentPage}/>
                        </Fedin>
                    </div>
                ))}
            </div>
        </div>
    );
}

export const UserCard = ({id,currentPage}:{id:number,currentPage:number}) => {
    const [profile, setProfile] = useState<{ name: string, age: string, affiliation: string, imageUrl: string, text: string, language: { C: boolean, Python: boolean, Java: boolean, Javascript: boolean, Nextjs: boolean } }>({ name: "inital", age: "", affiliation: "", imageUrl: "", text: "", language: { C: false, Python: false, Java: false, Javascript: false, Nextjs: false } });
    const [imageLoaded, setImageLoaded] = useState(false);
    const [pageloaded, setPageLoaded] = useState(false);
    const { maxPage, setMaxPage ,setloaded} = useContext(PageNum);
    const [Id,setId] = useState("");


    useEffect(() => {
        getDocumentIds("userProfile").then((ids:any) => {
            setMaxPage(ids.length);
            if (((currentPage - 1) * 9 + id) <= ids.length) {
                const docId = ids[(currentPage - 1) * 9 + id - 1];
                setId(docId)
                readFromFirestore("userProfile", docId).then((doc: any) => {
                    setProfile(doc);
                    setPageLoaded(true);
                    setloaded(true)
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            }
            else{
                console.log("no document!!!!!!!",currentPage,id);
                setPageLoaded(false);
            }
        })
    }, [currentPage]);

    const handle = () => {
        setImageLoaded(true);
    }

    return (
        <>
            {pageloaded && (
                <Card
                    style={{
                        width: '18rem',
                    }}
                >
                    {imageLoaded ? null : imgPlaceholder()}
                    <img
                        alt="Sample"
                        src={profile.imageUrl}
                        onLoad={handle}
                        style={{ width: '100%', height: '200px' }}
                    />

                    <CardBody>
                        <CardTitle tag="h5">
                            {profile.name}
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            {profile.affiliation}
                        </CardSubtitle>
                        <CardText>
                            {formatText(profile.text)}
                        </CardText>
                        <Example id={Id}/>

                    </CardBody>
                </Card>
            )}
            
        </>
    )
}



