import styled from "styled-components";


export const Content = styled.section`

`
export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    
    @media(min-width: 768px) {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 325px), 325px));
    }
`


export const FiltersContainer = styled.div`
  margin: 0px 0px 16px 0px;
  padding: 0 16px;
`;
