import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
export default function CardRev() {
    const [rev, setRev] = useState([])
    async function getRev() {
        try {
            const response = await axios({
                url: 'http://localhost:3000/foods',
                method: 'GET'
            })
            setRev(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getRev()
    }, [])
    console.log(rev);
    return (
        <>
            {
                rev.map(item => {
                    return (
                        <div className="container mx-auto flex flex-wrap justify-evenly">
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src={item.imgUrl} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{item.title}</h2>
                                    <p>{item.description}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">
                                            <Link to={`/`}>REVIEW</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}