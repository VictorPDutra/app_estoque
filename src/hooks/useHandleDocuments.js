import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export const useHandleDocuments = () => {
  // Adicionar um documento (estoque, sessão ou produto)
  const addDocument = async (
    collectionName,
    data,
    parentId = null,
    subCollection = null
  ) => {
    try {
      let collectionRef;

      if (parentId && subCollection) {
        // Adicionando dentro de uma subcoleção dentro de outra subcoleção (produtos dentro de uma sessão)
        collectionRef = collection(
          db,
          collectionName,
          parentId,
          "sessoes",
          subCollection,
          "produtos"
        );
      } else if (parentId) {
        // Adicionando dentro de uma subcoleção (sessões dentro de um estoque)
        collectionRef = collection(db, collectionName, parentId, "sessoes");
      } else {
        // Adicionando na coleção principal (estoques)
        collectionRef = collection(db, collectionName);
      }

      const docRef = await addDoc(collectionRef, data);
      return docRef.id;
    } catch (error) {
      console.error("Erro ao adicionar documento:", error);
      return null;
    }
  };

  // Buscar documentos de uma coleção ou subcoleção específica
  const getDocuments = async (
    collectionName,
    parentId = null,
    subCollection = null
  ) => {
    try {
      let collectionRef;

      if (parentId && subCollection) {
        collectionRef = collection(
          db,
          collectionName,
          parentId,
          "sessoes",
          subCollection,
          "produtos"
        );
      } else if (parentId) {
        collectionRef = collection(db, collectionName, parentId, "sessoes");
      } else {
        collectionRef = collection(db, collectionName);
      }

      const snapshot = await getDocs(collectionRef);
      const documents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return documents;
    } catch (error) {
      console.error("Erro ao buscar documentos:", error);
      return [];
    }
  };

  // Deletar um documento (estoque, sessão ou produto)
  const deleteDocument = async (
    collectionName,
    docId,
    parentId = null,
    subCollection = null
  ) => {
    try {
      let docRef;

      if (parentId && subCollection) {
        docRef = doc(
          db,
          collectionName,
          parentId,
          "sessoes",
          subCollection,
          "produtos",
          docId
        );
      } else if (parentId) {
        docRef = doc(db, collectionName, parentId, "sessoes", docId);
      } else {
        docRef = doc(db, collectionName, docId);
      }

      await deleteDoc(docRef);
    } catch (error) {
      console.error("Erro ao deletar documento:", error);
    }
  };

  // Atualizar um documento (estoque, sessão ou produto)
  const updateDocument = async (
    collectionName,
    docId,
    parentId = null,
    data,
    subCollection = null
  ) => {
    try {
      let docRef;

      if (parentId && subCollection) {
        docRef = doc(
          db,
          collectionName,
          parentId,
          "sessoes",
          subCollection,
          "produtos",
          docId
        );
      } else if (parentId) {
        docRef = doc(db, collectionName, parentId, "sessoes", docId);
      } else {
        docRef = doc(db, collectionName, docId);
      }

      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Erro ao atualizar documento:", error);
    }
  };

  return { addDocument, getDocuments, deleteDocument, updateDocument };
};
