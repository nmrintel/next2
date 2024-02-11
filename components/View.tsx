import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { readFromFirestore } from "@/lib/FirebaseConfig";
import { Badge } from 'reactstrap';

export default function Viewer({id}:{id:string}) {
    const [profile, setProfile] = useState<{ name: string, age: string, affiliation: string, imageUrl: string,text:string, language: { C: boolean, Python: boolean, Java: boolean, Javascript: boolean, Nextjs: boolean } }>({ name: "inital", age: "", affiliation: "", imageUrl: "",text:"", language: { C: false, Python: false, Java: false, Javascript: false, Nextjs: false } });

    useEffect(() => {
        readFromFirestore("userProfile", id)
            .then((doc: any) => {
                setProfile(doc);
                console.log("Profile in Viewer:", doc.name);
                console.log(id)
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }, []);

    return (
        <div>
            <h1>プロフィール</h1>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '1' }}>
                    <img src={profile.imageUrl} alt="Image" style={{ borderRadius: '50%', width: '80%' }} />
                </div>
                <div style={{ flex: '3' }}>
                    <h2>名前: {profile.name}</h2>
                    <h2>年齢: {profile.age}</h2>
                    <h2>所属: {profile.affiliation}</h2>
                </div>
            </div>
            <div style={{ marginTop: '50px'}}>
                <h2>使用言語</h2>
                <Badge
                    {...profile.language.C ? { color: "primary" } : { color: "secondary" }}
                    pill
                >
                    C++
                </Badge>

                <Badge
                    {...profile.language.Python ? { color: "primary" } : { color: "secondary" }}
                    pill
                >
                    Python
                </Badge>

                <Badge
                    {...profile.language.Java ? { color: "primary" } : { color: "secondary" }}
                    pill
                >
                    Java
                </Badge>

                <Badge
                    {...profile.language.Javascript ? { color: "primary" } : { color: "secondary" }}
                    pill
                >
                    JavaScript
                </Badge>

                <Badge
                    {...profile.language.Nextjs ? { color: "primary" } : { color: "secondary" }}
                    pill
                >
                    Nextjs
                </Badge>
            </div>

            <div style={{ marginTop: '50px'} }>
                <h2>自己紹介</h2>
                <p>{profile.text}</p>
            </div>
        </div>
    );
}
