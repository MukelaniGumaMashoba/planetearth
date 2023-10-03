import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Add a new document in collection "cities"
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
            return null;  // doc.data() will be undefined in this case
        }
    } catch (error) {
        return error;
    }
}

export { addScore, getScore };