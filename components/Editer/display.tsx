import { writeToFirestore, readFromFirestore, updateFirestore, readFromFiresotre2 } from "@/lib/FirebaseConfig";
import { useAuth } from '@/lib/AuthContext';

export default function DisplayImg() {
  const DocID = useAuth().currentUser.email;
  let url = undefined;
  readFromFiresotre2("userProfile", DocID, "imageUrl")
    .then((received_url: string) => {
      url = received_url;
      console.log("URL in DisplayImg:", url);
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

    return (
      <a href={url}>{url}</a>
    );
}