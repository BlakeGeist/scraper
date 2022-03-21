import React, { useState, FC } from 'react';
import CircularProgressWithLabel from 'components/CircularProgressWithLabel';
import styled from 'styled-components';

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    h2 {
        margin: 0 15px 0 0;
    }
`;

const StyledButton = styled.button`
    margin-top: 10px;
`;

const Heading = styled.h2`
    display: flex;
    align-items: center;

    button {
        background-color: transparent;
        border: none;
        margin: 0 10px;
        font-size: 16px;
        cursor: pointer;
    }
`;

interface SectionProps {
    heading: string;
    children: JSX.Element;
    score: string;
}

const Section:FC<SectionProps> = ({ heading, children, score = 0 }) => {
    const [isOpen, seIsOpen] = useState(false);

    const toggleIsOpen = () => {
        seIsOpen(!isOpen);
    }
    return (
        <section>
            <Header>
                <Heading>
                    {heading}
                    <StyledButton onClick={toggleIsOpen}>
                        {isOpen ? 'Less -' : 'More +'}
                    </StyledButton>                    
                </Heading>
                <CircularProgressWithLabel value={score} />
            </Header>
            {isOpen && 
                children
            }
            
        </section>
    )
}

export default Section;