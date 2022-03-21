import React, { FC } from 'react'
import Layout from '../Layout'
import getDividends from 'utils/getDividinds';
import CircularProgressWithLabel from 'components/CircularProgressWithLabel';
import Section from 'components/Section';
import {JsonTable} from 'react-json-to-html';
import styled from 'styled-components';

interface image {
  alt: string;
  src: string;
}

interface link {
  href: string,
  text: string,
  target: string,
  rel: string
}

interface pageInfoProps {
  pageInfo: {
    meta: any,
    urlInfo: any,
    url: string,
    articleDate: string,
    images: [image],
    title: string,
    description: string,
    canonical: string,
    ampUrl: string,
    robots: string,
    h1: [string],
    h2: [string],
    h3: [string],
    h4: [string],
    httpStatus: string,
    og: {
      title: string,
      siteName: string,
      description: string,
      type: string,
      image: string,
      url: string,
    },
    twitter: {
      card: string,
      site: string,
      siteId: string,
      creator: string,
      creatorId: string,
      description: string,
      title: string,
      image: string,
      imageAlt: string,
    },    
    headers: any,
    //html,
    schema: any,
    links: [link],
    articleText: string,
    mainContent: string,
    parsedMainContent: string    
  }
}

const OverallScores = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OverallScoresScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
`;

const LhScores = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LhScoresScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
`;

const Home:FC<pageInfoProps> = ({ pageInfo }) => {
  const onSubmit = async (e) => {
    e.preventDefault()
    const info = await getDividends(e.currentTarget.symbol.value)
    console.log(info);
  }

  const average = (array) => array.reduce((a, b) => a + b) / array.length;
  const overallScore = average([
    pageInfo.urlInfo.score,
    pageInfo.meta.score,
    pageInfo.schema.score, 
    pageInfo.articleDate.score, 
    pageInfo.headers.score,
    pageInfo.links.score
  ])

  const Css = {
    jsonTr: {
      height: '25px',
      backgroundColor: 'green'
    },
    jsonTd: {
      padding: '5px',
      borderSpacing: '2px',
      borderRadius: '5px'
    },
    rowSpacer: {
      height: '2px'
    },
    rootElement: {
      padding: '5px',
      borderSpacing: '2px',
      backgroundColor: '#BBBBBB',
      fontWeight: 'bold',
      fontFamily: 'Arial',
      borderRadius: '5px'
    },
    subElement: {
      padding: '5px',
      borderSpacing: '2px',
      backgroundColor: '#DDDDDD',
      fontWeight: 'bold',
      fontFamily: 'Arial',
      borderRadius: '5px'
    },
    dataCell: {
      borderSpacing: '2px',
      backgroundColor: '#F1F1F1',
      fontFamily: 'Arial',
      borderRadius: '5px'
    }
  }
  

  return (
    <Layout>
      <>
        <div>
        <OverallScores>
          <OverallScoresScore>
            <CircularProgressWithLabel value={overallScore} />
            <h3>Overall Score</h3>
            </OverallScoresScore>
          </OverallScores>

          <hr />

          <OverallScores>

            <OverallScoresScore>
              <CircularProgressWithLabel value={pageInfo.urlInfo.score} />
              <h3>Url</h3>
            </OverallScoresScore>

            <OverallScoresScore>
              <CircularProgressWithLabel value={pageInfo.meta.score} />
              <h3>Meta</h3>
            </OverallScoresScore>

            <OverallScoresScore>
              <CircularProgressWithLabel value={pageInfo.schema.score} />
              <h3>Schema</h3>
            </OverallScoresScore>

            <OverallScoresScore>
              <CircularProgressWithLabel value={pageInfo.articleDate.score} />
              <h3>Date</h3>
            </OverallScoresScore>            

            <OverallScoresScore>
              <CircularProgressWithLabel value={pageInfo.headers.score} />
              <h3>Headers</h3>
            </OverallScoresScore>    

            <OverallScoresScore>
              <CircularProgressWithLabel value={pageInfo.links.score} />
              <h3>Links</h3>
            </OverallScoresScore>                

            {pageInfo?.lh?.data &&
              <OverallScoresScore>
                <CircularProgressWithLabel value={'100'} />
                <h3>Lighthouse</h3>
              </OverallScoresScore>             
            }
          </OverallScores>

        </div>

        <hr />

        <Section heading="Url" score={pageInfo.urlInfo.score}>
          <JsonTable css={Css} json={pageInfo.urlInfo.data} />
        </Section>
        <hr />

        <Section heading="Meta" score={pageInfo.meta.score}>
          <>
            <JsonTable json={pageInfo.meta.data} />
          </>
        </Section>

        <hr />

        <Section heading="Schema" score={pageInfo.schema.score}>
          <>
            {pageInfo.schema.data.map(item => {
              return (
                <div>
                  <strong>Type:</strong> {item['@type']}
                  <div>
                    <JsonTable json={item} />
                  </div>
                </div>
              )
            })}
          </>
        </Section>

        <hr />

        <Section heading="Date" score={pageInfo.articleDate.score}>
          <JsonTable json={pageInfo.articleDate.data} />
        </Section>
        
        < hr />

        <Section heading="Headers" score={pageInfo.headers.score}>
          <JsonTable json={pageInfo.headers.data} />
        </Section>
        
        <hr />
        
        <Section heading="Images" score={pageInfo.images.score}>
          <div>
            {pageInfo.images.data.map(image => {
              return (
                <>
                <JsonTable json={image} />
                <hr />
                </>
              )
            })}
          </div>
        </Section>

        <hr />        

        <Section heading="Links" score={pageInfo.links.score}>
          <div>
            {pageInfo.links.data.map((link, index) => {
              return (
                <div key={link.text + index}>
                  <JsonTable json={link} />
                  <hr />
                </div>
              )
            })}
          </div>
        </Section>

        <hr />

        {pageInfo?.lh?.data ? 
          <Section heading="Lighthouse" score="100">
            <LhScores>
              {pageInfo.lh.data.map(item => {
                return (
                  <LhScoresScore>
                    <CircularProgressWithLabel value={item.score} />
                    <h3>{item.title}</h3>
                  </LhScoresScore>
                )
              })}
            </LhScores>
          </Section>         
        : 'lighthouse loading'}
      </>
    </Layout>
  )
}

export default Home
