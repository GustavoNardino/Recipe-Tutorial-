import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useParams} from 'react-router-dom'

type RecipeType = {
    setModalData: React.Dispatch<React.SetStateAction<any>>
}


function Recipe(props: RecipeType) {
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
                <AddCart onClick={() => props.setModalData(details)}>Adicionar ao carrinho</AddCart>
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
    margin-top: 2rem;
    margin-bottom: 3rem;
    display: flex;
    border: 1px solid #c3c3c3;
    padding: 3rem;
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
    cursor: pointer;
`
const Info = styled.div`
    margin-left: 5rem;
`
  const AddCart = styled.div`
    padding: 1rem;
    cursor: pointer;
    color: #313131;
    background: #8fdd8f;
    border: 1px solid black;
    text-align: center;
    font-weight: 600;
    :hover{
      opacity: 80%;
    }
`
export default Recipe