import { auth, db } from "../firebase/setup";
import {
  setDoc,
  doc,
  updateDoc,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { toast } from "react-toastify";

// Function to update name and surname
export async function updateNameProfile(name, surname, setNameInput) {
    const user = auth.currentUser;
    if (user) {
      try {
        // Save name and surname in Firestore for the authenticated user
        await setDoc(
          doc(db, "Users", user.uid),
          {
            name: name,
            surname: surname,
          },
          { merge: true }
        );
        toast.success("Profile updated successfully!");

        console.log("User profile saved in Firestore");
        setNameInput(false);
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    } else {
      console.log("No user is signed in");
    }
  }

// Function to delete an article
export async function deleteArticle(articleToDelete, setDataArticles) {
    const user = auth.currentUser;
    if (user) {    

      const articleRef = doc(db, "Users", user.uid); // Reference to the user's document in Firestore

      try {
        // Remove the article based on its unique identifier (e.g., title)
        await updateDoc(articleRef, {
          savedArticles: arrayRemove(articleToDelete),
        });
        console.log("Article deleted successfully!");
        // Update the local state to remove the deleted article
        setDataArticles((prevArticles) =>
          prevArticles.filter(
            (article) => article.title !== articleToDelete.title
          )
        );
      } catch (error) {
        console.error("Error deleting article: ", error);
      }
    } else {
      console.log("No user is signed in");
    }
  }

// Function to delete user data
export async function deleteUserData(uid) {
    try {
      await deleteDoc(doc(db, "Users", uid));
      console.log("User data deleted successfully from Firestore!");
    } catch (error) {
      console.error("Error deleting user data:", error);
    }
  }

// Function to delete user account
export const deleteUserAccount = async (navigate) => {

    const user = auth.currentUser;
    
    if (user) {
      try {
        // Delete user data from Firestore
        await deleteUserData(user.uid);

        // Delete the user from Firebase Authentication
        await deleteUser(user);

        console.log("User account and data deleted successfully!");
        toast.success("User account deleted successfully!");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        console.error("Error deleting user or user data:", error);

        if (error.code === "auth/requires-recent-login") {
          alert("Please log in again to delete your account.");
        }
      }
    } else {
      console.log("No user is signed in.");
    }
  };