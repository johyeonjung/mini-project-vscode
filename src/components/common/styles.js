import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const frame = css`
    display: flex;
    box-sizing: border-box;
    border: 3px solid #747474;
    border-radius: 30px;
    padding: 30px;
    width: 1000px;
    height: 650px;
    background-color: #000000;
`;

export const frameContainer = css`
    position: relative;
    box-sizing: border-box;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    background-color: #f3f5f7;
    overflow: hidden;
`;

///////////////////////////////////////////////////////////////////
export const loadingBox = css`
    position: absolute;
    display:flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    background-color : #00000066;
`
///////////////////////////////////////////////////////////////////
export const sideBarLayout = css`
position: relative;
    display: flex;
    width: 100%;
    height: 100%;
`;
export const sideBarContainer = css`
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 100%;
    background-color: #ffffff;
    & > h1 {
        margin:20px;
        font-size: 20px;
        text-align: center;
        text-shadow: 0 0 20px #00000000;
        cursor: default;
        transition: all 0.3s ease-in-out;
        &:hover {
            transform: scale(105%);
        }

    }
    & > ul {
        list-style-type:none ;
        display: flex;
        padding: 0;
        margin: 0;
        flex-direction: column;
        gap: 8px;
        flex-grow: 1;

        & > a {
            text-decoration: none;
            color : #222222;
        }
    }

    & > div {
        display: flex;
        justify-content: center;
       padding: 10px;

       & > a {
        text-decoration: none;
        color: #222222;
        font-weight: 500;
        text-shadow: 0 0 10px #00000088;

       }
    }
`;

export const menuListItem = (isSelected) => css`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 5px 15px;
    width:100%;
    height: 35px;
    font-weight: 500;
    transition: all 0.1s ease-in-out;
    box-shadow: 0 0 ${isSelected ? "10px 10px" : "0 0"} #0000000f inset;
    &:hover {
        text-shadow: 0 0 15px #00000055;
    }

    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right:5px;
        width: 30px;
        height: 100%;
        font-size:20px;
    }
`;

export const profileImg = (url) => css` 
    border-radius:50%;
    width:25px;
    height:25px;
    overflow: hidden;
    background-image: url(${url});
    background-position:center;
    background-size:cover;
`;
