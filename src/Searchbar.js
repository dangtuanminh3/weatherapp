import React from 'react';
import styled from 'styled-components';

const Searchbar = ({ searchChange, onButtonClicked, textError }) => {
    return (
        <HeaderContainer>
            <input type="search"
                placeholder='Enter city here...'
                class="bar"
                onChange={searchChange}
            ></input>
            <button class="button"
                onClick={onButtonClicked}
            >Search</button>
            <br></br>{textError ? <p>Enter a valid location.</p> : <br></br>}
        </HeaderContainer>
    );
}





const HeaderContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

.bar{
    appearance: none;
    border-bottom: 3px solid grey;
    border-radius: 5px;
    outline: none;
    background: none;
    padding: .4em;
    color: white;
}

.button{
    margin: .5em;
    padding: 5px 8px;
    appearance: none;
    border: 1px solid grey;
    border-radius: 5px;
    outline: none;
    background: none;
    color: grey;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
}

.button:hover{
    background-color: grey;
    color: rgba(0, 0, 0, 0.65);
    transition-duration: 0.3s;
    transition-timing-function: ease-in;
    cursor: pointer;
}

p{
    color: rgb(255,25,25,0.6);
    margin: 0px;
}
`
export default Searchbar;