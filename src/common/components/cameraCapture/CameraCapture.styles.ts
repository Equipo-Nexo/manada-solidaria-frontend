import styled from 'styled-components'

export const Backdrop = styled.div`
  position: fixed; inset: 0; z-index: 200; display: grid; place-items: center; background: #000;
`
export const Dialog = styled.div`
  position: relative; width: 100%; height: 100%; overflow: hidden; background: #000;
  @media (min-width: 768px) { width: min(92vw, 720px); height: min(92vh, 900px); border-radius: 16px; }
`
export const Preview = styled.video`
  width: 100%; height: 100%; object-fit: cover;
`
export const CloseButton = styled.button`
  position: absolute; top: max(16px, env(safe-area-inset-top)); right: 16px; display: grid;
  width: 44px; height: 44px; place-items: center; border: 0; border-radius: 50%;
  background: rgb(0 0 0 / 55%); color: white; cursor: pointer;
  svg { width: 24px; height: 24px; }
`
export const Controls = styled.div`
  position: absolute; right: 0; bottom: 0; left: 0; display: flex; flex-direction: column; gap: 20px;
  padding: 18px 24px max(24px, env(safe-area-inset-bottom)); background: linear-gradient(transparent, rgb(0 0 0 / 80%));
`
export const ZoomControl = styled.div`
  display: flex; flex-direction: column; gap: 8px; color: white;
  input { width: 100%; accent-color: ${({ theme }) => theme.colors.brand}; }
`
export const ZoomLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize}; text-align: center;
`
export const Actions = styled.div`
  display: grid; grid-template-columns: 56px 72px 56px; align-items: center; justify-content: space-between;
`
export const SideButton = styled.button`
  display: grid; width: 48px; height: 48px; place-items: center; border: 0; border-radius: 50%;
  background: rgb(255 255 255 / 22%); color: white; cursor: pointer;
  &:disabled { visibility: hidden; } svg { width: 24px; height: 24px; }
`
export const CaptureButton = styled.button`
  display: grid; width: 72px; height: 72px; place-items: center; border: 5px solid white; border-radius: 50%;
  background: ${({ theme }) => theme.colors.brand}; color: white; cursor: pointer;
  svg { width: 30px; height: 30px; }
`
export const Spacer = styled.span`
  width: 56px;
`
