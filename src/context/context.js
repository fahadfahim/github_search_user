import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';
//create context
const GithubContext = React.createContext();
//useing useContext hook we can skip the consumer

//seperate component use that we're just using because there's going
//now we are wrapping the hole app and the wohle app is goint to be children
//since we are using provider value right now what's really cool
//we can set up my state value useState and pass in whatever i'm getting back from the user

const GithubProvider = ({children}) =>{
    const [githubUser,setGithubUser] = useState(mockUser);
    const [repos,setRepos] = useState(mockRepos);
    const [followers,setFollowers] = useState(mockFollowers);

    //request loading
    const [request,setRequests] = useState(0);
    const [isloading,setIsLoading] = useState(false);
    //error
    const [error,setError] = useState({show:false,msg:''});
    //serch user
    const searchGithubUser = async (user) => {
        toggleError();
         //we want to implement it when i start fetching for the user

         setIsLoading(true)
        const response = await axios(`${rootUrl}/users/${user}`).catch(err => console.log(err))
        console.log(response);
        if(response){
            setGithubUser(response.data)
            const {login,followers_url} = response.data;
            //repos
            axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) => setRepos(response.data))
            //followers
            axios(`${followers_url}?per_page=100`).then((response) => setFollowers(response.data))
        }else{
            toggleError(true,'there is no user with that username')
        }
        //hide loading once i'm done
        checkRequests();
        setIsLoading(false);
    }
    //check rate
    const checkRequests = () =>{
        axios(`${rootUrl}/rate_limit`).then(({data}) =>{
            //destructuring the data 
            let {rate:{remaining}} = data;
            // remaining = 0
            setRequests(remaining)
            if(remaining === 0){
                //throw an error for hourly rate
                toggleError(true,'Sorry you are exeeded your hourly rate limit!')
            }
        }).catch((err) => console.log(err))
    }
    //in toggle set some defaults value it would do if i want to set it back to default i can just simply say toggle error and we just going to invoke it without passing any parameters
    //in the show we pass false that means i'll always hide the message 
    function toggleError(show = false,msg = ''){
        setError({show,msg})
    }
    //error

    //once the app load then we just use check request
    //as our callback function 
    useEffect(checkRequests,[]);
    return <GithubContext.Provider 
    value={{
        githubUser,repos,followers,request,error,searchGithubUser,isloading
    }}
    >{children}</GithubContext.Provider>
}
//now we have to wrape our application in GithubProvider
export{GithubProvider,GithubContext};