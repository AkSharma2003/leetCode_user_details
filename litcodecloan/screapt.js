document.addEventListener("DOMContentLoaded",function(){
    const searchButton =document.getElementById("search");
    const userINput =document.getElementById("userId");
    const statsContainer =document.querySelector(".stats")
    const easyProgressCircle =document.getElementById("easy");
    const mediumProgressCircle =document.getElementById("medium");
    const hardProgressCircle =document.getElementById("hard");
    const easlyLabel =document.getElementById("easyL");
    const mediumLabel =document.getElementById("mediumL");
    const hardLabel =document.getElementById("hardL");
    const cardSelecter =document.querySelector(".cards");
    const totalCard =document.getElementById("totalC");
    const easyCard =document.getElementById("easyC");
    const mediumCard =document.getElementById("mediumC");
    const hardCard =document.getElementById("hardC");
    

    // retun tru or false based on rgx

    function vailidUserName(username){
        if(username.trim()===""){
            alert("User Name should not be empty");
            return false;
        }

        const regex =/^[a-zA-Z0-9_-]{1,15}$/;
        const isMaching=regex.test(username);
        if(!isMaching){
            alert("Invailid User name")
        }
        return isMaching;
    }

    async function fetchUserDetails(username) {
    try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const proxyUrl = "https://cors-anywhere.herokuapp.com/";
            const targetUrl = "https://leetcode.com/graphql/";

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const graphql = JSON.stringify({
            query: `
                query userSessionProgress($username: String!) {
                allQuestionsCount {
                    difficulty
                    count
                }
                matchedUser(username: $username) {
                    submitStats {
                    acSubmissionNum {
                        difficulty
                        count
                        submissions
                    }
                    totalSubmissionNum {
                        difficulty
                        count
                        submissions
                    }
                    }
                }
                }`,
            variables: { username: username }
            });

            const requestOptions = {
            method: "POST",
            headers: myHeaders,  
            body: graphql,
            redirect: "follow"
            };

            const response = await fetch(proxyUrl + targetUrl, requestOptions);

            if (!response.ok) {
            throw new Error("Unable to fetch user details");
            }

            const parsdata = await response.json();
            console.log("LeetCode data:", parsdata);
            displayUserDat(parsdata);

        } 
        catch (error) {
            console.error("Error fetching details:", error);
            statsContainer.innerHTML = "<p>No data found</p>";
        }
        finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updatePrograss(solved, total, label, circle){
        const progressDegree=((solved/total)*100);
        circle.style.setProperty("--progress-degree",`${progressDegree}%`);
        label.textContent=`${solved}/${total}`;
    }

    function updateCard(card,submit){
        card.textContent=`${submit}`;

    }

    function displayUserDat(parsdata){
        const all = parsdata.data.allQuestionsCount;
        const ac = parsdata.data.matchedUser.submitStats.acSubmissionNum;

        const totaleasyQuestion = all.find(q => q.difficulty === "Easy")?.count || 0;
        const totalmediumQuestion = all.find(q => q.difficulty === "Medium")?.count || 0;
        const totalhardQuestion = all.find(q => q.difficulty === "Hard")?.count || 0;

        const solvedTotaleasyQuestion = ac.find(q => q.difficulty === "Easy")?.count || 0;
        const solvedTotalmediumQuestion = ac.find(q => q.difficulty === "Medium")?.count || 0;
        const solvedTotalhardQuestion = ac.find(q => q.difficulty === "Hard")?.count || 0;


        updatePrograss(solvedTotaleasyQuestion, totaleasyQuestion, easlyLabel, easyProgressCircle);
        updatePrograss(solvedTotalmediumQuestion, totalmediumQuestion, mediumLabel, mediumProgressCircle);
        updatePrograss(solvedTotalhardQuestion, totalhardQuestion, hardLabel, hardProgressCircle);

        const ac2 = parsdata.data.matchedUser.submitStats.totalSubmissionNum;
        const totalSubmission = ac2.find(q => q.difficulty === "All")?.count || 0;
        const totalEasySubmission = ac2.find(q => q.difficulty === "Easy")?.count || 0;
        const totalMediumSubmission = ac2.find(q => q.difficulty === "Medium")?.count || 0;
        const totalHardSubmission = ac2.find(q => q.difficulty === "Hard")?.count || 0;

        updateCard(totalCard, totalSubmission);
        updateCard(easyCard,totalEasySubmission);
        updateCard(mediumCard, totalMediumSubmission);
        updateCard(hardCard, totalHardSubmission);
    }
    searchButton.addEventListener('click', function(){
        const username=userINput.value;
        console.log("login user name= ",username);
        if(vailidUserName(username)){
            fetchUserDetails(username);
        }
    })
})