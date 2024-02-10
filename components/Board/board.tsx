import React, { useEffect, useContext, useState, useRef, use } from 'react';
import { Button, Card, CardBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Placeholder, PlaceholderButton } from 'reactstrap';
import { getDocumentIds, readFromFirestore } from "@/lib/FirebaseConfig";
import 'firebase/firestore';
import { get } from 'http';
import { set } from 'firebase/database';

const PageNum = React.createContext({ currentPage: 1, maxPage: 1, setMaxPage: (page: number) => { }, idsList: Array<string>() });


export default function Board() {
    const [currentPage, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [idsList, setIdsList] = useState<string[]>([]);

    useEffect(() => {
        const getIds = async () => {
            const returned = await getDocumentIds("userProfile");
            setMaxPage(idsList.length / 9 + 1);
        }
        getIds();
    }, [currentPage]);

    return (
        <div>
            <PageNum.Provider value={{ currentPage, maxPage, idsList, setMaxPage }}>
                <BoardContent />
            </PageNum.Provider>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={() => { setPage(currentPage - 1) }} style={{ margin: '10px' }} disabled={currentPage === 1}>&lt;</Button>
                <Button disabled>{currentPage}</Button>
                <Button onClick={() => { setPage(currentPage + 1) }} style={{ margin: '10px' }} disabled={currentPage == maxPage}>&gt;</Button>
            </div>
        </div>

    );
}


const BoardContent = () => {
    return (
        <div style={{ margin: "100px" }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
                    <div key={id} style={{ flex: '10 0 33.33%', padding: '10px' }}>
                        {userCard(id)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export const userCard = (id: number) => {
    const [profile, setProfile] = useState<{ name: string, age: string, affiliation: string, imageUrl: string, text: string, language: { C: boolean, Python: boolean, Java: boolean, Javascript: boolean, Nextjs: boolean } }>({ name: "inital", age: "", affiliation: "", imageUrl: "", text: "", language: { C: false, Python: false, Java: false, Javascript: false, Nextjs: false } });
    const [imageLoaded, setImageLoaded] = useState(false);
    const [pageloaded, setPageLoaded] = useState(false);
    const { currentPage, maxPage, idsList, setMaxPage } = useContext(PageNum);

    useEffect(() => {
        getDocumentIds("userProfile").then((ids) => {
            setMaxPage(ids.length / 9 + 1);
            const docId = ids[(currentPage - 1) * 9 + id - 1];
            readFromFirestore("userProfile", docId).then((doc: any) => {
                setProfile(doc);
                setPageLoaded(true);
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
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
                            Some quick example text to build on the card title and make up the bulk of the card‘s content.
                        </CardText>
                        <Button>
                            Button
                        </Button>
                    </CardBody>
                </Card>
            )}
        </>
    )
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
