import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
export default function CardRev() {
    const [rev, setRev] = useState([])
    async function getRev() {
        try {
            const response = await axios({
                url: 'http://34.143.204.34/reviews',
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('token')
                }
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
            <div className="container mx-auto flex flex-wrap justify-evenly bg-blue-200">
                <button className="bg-orange-200">MAKE YOUR OWN REVIEW! SUBSRIBE FOR PREMIUM</button>
                <h3 className="text-4xl">WELCOME FOOD LOVERS</h3>
            </div>
            {
                rev.map(item => {
                    return (
                        <div className="container mx-auto flex flex-wrap justify-evenly">
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src={item.Food.imgUrl} alt="hei" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{item.title}</h2>
                                    <p>{item.Food.title}</p>
                                    <div className="card-actions justify-end">
                                        <h1>{item.desc}</h1>
                                        <button className="btn btn-primary">
                                            <Link to={`/maps/${item.Food.Restaurant.id}`}>Location</Link>
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