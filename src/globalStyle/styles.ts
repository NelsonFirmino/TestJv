import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 62.5%; // 10px/16px = 62.5% -> 1rem = 10px
    font-family: 'Open Sans', sans-serif;
    color: inherit;
    //user-select: none;
  }

  p {
    margin: 0;
  }

  a {
    color: ${({ theme }) => theme.colors["gray/800"]};
  }

  body {
    position: relative;
    overflow: hidden;
  }

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
        theme.colors.jvrisAqua}; /* Cor da barra deslizante */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
   background: ${({ theme }) => theme.colors["gray/200"]};
  }

  .label {
  display: inline;
  padding: .2em .6em .3em;
  font-size: 80%;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25em;
  }
  a.label:hover,
  a.label:focus {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
  }
  .label:empty {
    display: none;
  }
  .btn .label {
    position: relative;
    top: -1px;
  }
  
  .label-default {
    background-color: #777;
  }
  .label-default[href]:hover,
  .label-default[href]:focus {
    background-color: #5e5e5e;
  }
  .label-primary {
    background-color: #337ab7;
  }
  .label-primary[href]:hover,
  .label-primary[href]:focus {
    background-color: #286090;
  }
  .label-success {
    background-color: #5cb85c;
  }
  .label-success[href]:hover,
  .label-success[href]:focus {
    background-color: #449d44;
  }
  .label-info {
    background-color: #5bc0de;
  }
  .label-info[href]:hover,
  .label-info[href]:focus {
    background-color: #31b0d5;
  }
  .label-warning {
    background-color: #f0ad4e;
  }
  .label-warning[href]:hover,
  .label-warning[href]:focus {
    background-color: #ec971f;
  }
  .label-danger {
    background-color: #d9534f;
  }
  .label-danger[href]:hover,
  .label-danger[href]:focus {
    background-color: #c9302c;
  }
`;

export default GlobalStyle;
