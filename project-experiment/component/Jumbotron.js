import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import ball from '../ball.jpg';

const Styles = styled.div`
    .jumbo {
        background: url(${ball}) no-repeat center;
        background-size: 1200px 200px;
        color: #ccc;
        height: 200px;
        position: relative;
        z-index: -2;
    }

    .overlay {
        background-color: #000;
        opacity: 0.6;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
    }

`;

export const Jumbotron = () => {
    return (
        <Styles>
            <Jumbo fluid className="jumbo">
                <div className="overlay"></div>
                <Container>
                    <h1>Alive-n-Kickin!</h1>
                    <p>Welcome to all things Soccer!!</p>
                </Container>
            </Jumbo>
        </Styles>
    )
}