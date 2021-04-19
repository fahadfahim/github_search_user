import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const {repos} = React.useContext(GithubContext);
  //in order to find the language we use reduce 
  //and the second thing was what we're trying to return from 
  //the you reduce our markers 
  let languages = repos.reduce((total,item) =>{
    const { language,stargazers_count } = item;
    //escape the null
    if(!language) return total;
    //console.log(language);
    //if the property on the object does not exist
    if(!total[language]){
      //then create new one 
      total[language] = {label:language,value:1,stars:stargazers_count};
    }else{
      //if the language are one the object
      // total[language] = total[language] +1;
      total[language] = {...total[language],
      value: total[language].value +1,
      stars:total[language].stars + stargazers_count,
    };
    }
      return total;
  },{})
  //converting an object to an array
  const mostUsed = Object.values(languages).sort((a,b) =>{
    return b.value - a.value;
  }).slice(0,5);

  //count most stars language
  const mostPopular = Object.values(languages).sort((a,b)=>{
    return b.stars - a.stars;
  }).map((item)=>{
    return {...item,value:item.stars}
  }).slice(0,5);

  console.log(mostPopular);
  //console.log(repos);

   //stars, forks
   //using reduce returning object with two properties that are
   //object itself and right away to desstructure them
   //then in the fun body 
   let {stars,forks} = repos.reduce((total,item)=>{
    const {stargazers_count,name,forks} = item;
    total.stars[stargazers_count] = {label:name,value:stargazers_count}
    total.forks[forks] = {label:name,value:forks}
    return total;
   },{
     //returning a object where the properties are 
     //object it self 
     stars:{},
     forks:{}
   })
   //how to get last value using slice and reverse them
   stars = Object.values(stars).slice(-5).reverse();
   forks = Object.values(forks).slice(-5).reverse();
   //console.log(stars);
  // STEP 2 - Chart Data
// const chartData = [
//   {
//     label: "HTML",
//     value: "13"
//   },
//   {
//     label: "CSS",
//     value: "23"
//   },
//   {
//     label: "JavaScript",
//     value: "80"
//   }
// ];
  return (
  <section className='section'>
    <Wrapper className='section-center'>
    {/* <ExampleChart data={chartData}/> */}
    <Pie3D data={mostUsed} /> 
    <Column3D data={stars}/>
    <Doughnut2D data={mostPopular} />
    <Bar3D data={forks} />
    </Wrapper>
  </section>
  
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
