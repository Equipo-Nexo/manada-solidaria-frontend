import styled from "styled-components";

export const ListContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    
    @media(min-width: 768px) {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 325px), 325px));
    }
`