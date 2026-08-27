import styled from 'styled-components'

export const Container = styled.section`
  width: 100%;
  box-sizing: border-box;
  padding: 24px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 20px rgb(75 63 53 / 8%);
`

export const Title = styled.h2`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.header2.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.header2.lineHeight};
  text-align: left;
`

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  @media (min-width: 768px) {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px 12px;
  }
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (min-width: 768px) {
    display: contents;
  }

  @media (max-width: 359px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const Item = styled.div<{ $selected: boolean }>`
  display: flex;
  width: fit-content;
  max-width: 100%;
  min-width: 0;
  min-height: 40px;
  box-sizing: border-box;
  align-items: center;
  gap: 8px;
  padding: 6px 18px;
  border: 2px solid ${({ $selected, theme }) =>
    $selected ? theme.colors.brand : 'rgb(0 0 0 / 30%)'};
  border-radius: 12px;
  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.neutral : theme.colors.background};
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.brand : theme.colors.darkColor};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ $selected, theme }) =>
    $selected ? theme.fontWeights.bold : theme.fontWeights.regular};
  text-align: left;

  svg {
    width: 24px;
    height: 24px;
    flex: 0 0 24px;

    [stroke]:not([stroke='none']) {
      stroke: currentcolor;
    }

    [fill]:not([fill='none']):not([fill='white']) {
      fill: currentcolor;
    }

    g {
      opacity: 1;
    }
  }

  span {
    min-width: 0;
  }

  @media (min-width: 768px) {
    padding: 6px 10px;
  }
`
