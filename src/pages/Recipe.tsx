import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useParams} from 'react-router-dom'

function Recipe() {
    const [details, setDetails] = useState<any>({})
    const [activeTab, setActiveTab] = useState('instructions')
    let params:any = useParams();

    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const detailData = await data.json();
        setDetails(detailData);
        console.log(detailData)
    }

    useEffect(() => {
        fetchDetails();
    }, [params.name])
    return (
        <DetailWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} alt="" />
            </div>
            <Info>
                <Button className={activeTab === 'instructions'?'active':''} onClick={() => setActiveTab('instructions')}>Instructions</Button>
                <Button className={activeTab === 'ingredients'?'active':''} onClick={() => setActiveTab('ingredients')}>Ingredients</Button>
                {activeTab === 'instructions' && (
                    <div>
                        <h3 dangerouslySetInnerHTML={{ __html:details.sumary }}></h3>
                        <h3 dangerouslySetInnerHTML={{ __html:details.instructions }}></h3>
                    </div>
                )}
                {activeTab === 'ingredients' && (
                    <ul>
                        {details.extendedIngredients.map((ingredient:any) =>
                            <li key={ingredient.id}>{ingredient.original}</li>
                        )}
                    </ul>
                )}
            </Info>
        </DetailWrapper>
    )
}
const DetailWrapper = styled.div`
    margin-top: 5rem;
    margin-bottom: 3rem;
    display: flex;
    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h2{
        margin-bottom: 1rem;
    }
    li{
        font-size: 0.8rem;
        line-height: 1rem;
    }
    ul{
        margin-top: 1rem;
    }
    img{
        width: 20vw;
    }
`
const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
`
const Info = styled.div`
    margin-left: 5rem;
`

export default Recipe