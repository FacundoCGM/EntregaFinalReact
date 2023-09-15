import React, { useState, useEffect } from "react"
import "./DetalleItem.css"
import CardItemDetailed from "../../components/cardItemDetailed/CardItemDetailed/"

import { collection, query, getDocs, where, documentId } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

import { useParams } from "react-router-dom"

const DetalleItem = () => {
    const [itemData, setItemData] = useState([])

    const { id } = useParams()

    useEffect(() => {
        const getItems = async () => {
            const q = query ( collection(db, "Productos"), where(documentId(), "==", id))
            const docs = []
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            })
            setItemData(docs)
        }
        getItems()
    }, [id])

    return (
        <div className="PositionContainer">
          {itemData.map((data) => {
            return (
              <div  key={data.id}>
                <CardItemDetailed item={data} key={data.id} />
              </div>
            )
          })}
        </div>
      );
}

export default DetalleItem