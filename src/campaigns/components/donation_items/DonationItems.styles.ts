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
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.typography.header2.lineHeight};
  text-align: left;
`

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
`

export const Item = styled.div<{ $selected: boolean }>`
  width:fit-content;
  display:flex;
  flex-direction: row;
  align-items: center;
  min-height: 40px;
  box-sizing: border-box;
  gap: 8px;
  padding: 8px 12px;
  justify-content:center;
  align-items:center;
  gap:2px;
  border: 2px solid ${({ $selected, theme }) =>
    $selected ? theme.colors.brand : 'rgb(0 0 0 / 30%)'};
  border-radius: 12px;
  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.neutral : theme.colors.background};
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.brand : theme.colors.darkColor};

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
`

export const DonationItemName = styled.p<{ $selected: boolean }>`
  min-width: 0;
  width:fit-content;
  margin: 0;
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.brand : theme.colors.darkColor};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ $selected, theme }) =>
    $selected ? theme.fontWeights.bold : theme.fontWeights.regular};
  line-height: 1.2;
  text-align: left;
`
