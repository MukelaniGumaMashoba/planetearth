import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

//Ngiqala a new document in collection "scores" abantu abawatholile kwi game
const addScore = async (user_id, score) => {
    try {
        await setDoc(doc(db, "scores", user_id), {
            score
        });
        return true;
    } catch (error) {
        return error;
    }
}

const getScore = async (user_id) => {
    try {
        const docRef = doc(db, "scores", user_id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;  //Njengoba ngisebenzisa u doc.data() will be undefined in this case so ngizokwazi ukuyi run 
        }
    } catch (error) {
        return error;
    }
}

export { addScore, getScore };