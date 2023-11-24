import React from "react";
import styled from "styled-components";


const Weather = ({ weather }) => {
    return (
        <HeaderContainer>
            <div class="rain front-row"></div>
            <div class="rain back-row"></div>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
`
export default Weather